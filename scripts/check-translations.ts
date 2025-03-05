/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'

// 定义类型
interface TranslationInfo {
  namespaces: Map<string, string> // 变量名 -> 命名空间
  keys: string[] // 完整的翻译键路径
}

interface TranslationReport {
  missingInEn: string[]
  missingInZh: string[]
  enOnlyKeys: string[]
  zhOnlyKeys: string[]
}

// 存储所有日志消息
const logMessages: string[] = []

// 自定义日志函数
function log(message: string): void {
  console.log(message)
  logMessages.push(message)
}

// 自定义错误日志函数
function logError(message: string): void {
  console.error(message)
  logMessages.push('[ERROR] ' + message)
}

// 读取翻译文件
const enTranslations: Record<string, any> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/messages/en.json'), 'utf8')
)
const zhTranslations: Record<string, any> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/messages/zh.json'), 'utf8')
)

// 用于存储找到的翻译键
const foundTranslationKeys: Set<string> = new Set()

// 从对象中获取所有键（包括嵌套键）
function getAllKeys(obj: Record<string, any>, prefix: string = ''): string[] {
  let keys: string[] = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = [...keys, ...getAllKeys(obj[key], newKey)]
      } else {
        keys.push(newKey)
      }
    }
  }
  return keys
}

// 检查键是否存在于翻译文件中
function checkKeyExists(key: string, translations: Record<string, any>): boolean {
  const parts = key.split('.')
  let current: any = translations

  for (const part of parts) {
    if (current[part] === undefined) {
      return false
    }
    current = current[part]
  }

  return true
}

// 从文件内容中提取翻译键和命名空间
function extractTranslationsInfo(content: string, filePath: string): TranslationInfo {
  const result: TranslationInfo = {
    namespaces: new Map<string, string>(),
    keys: []
  }

  // 匹配 getTranslations({ locale, namespace: 'namespace' }) 或 getTranslations('namespace')
  const getTranslationsPattern = /getTranslations\(\s*(?:{[^}]*namespace:\s*['"]([^'"]+)['"][^}]*}|['"]([^'"]+)['"])\s*\)/g
  let match: RegExpExecArray | null

  while ((match = getTranslationsPattern.exec(content)) !== null) {
    const namespace = match[1] || match[2]
    if (namespace) {
      // 尝试找到赋值语句，如 const t = await getTranslations(...)
      const beforeText = content.substring(0, match.index).split('\n').slice(-2).join('\n')
      const constMatch = /const\s+(\w+)\s*=/.exec(beforeText)
      if (constMatch) {
        result.namespaces.set(constMatch[1], namespace)
      }
    }
  }

  // 匹配 useTranslations('namespace')
  const useTranslationsPattern = /useTranslations\(\s*['"]([^'"]+)['"]\s*\)/g
  while ((match = useTranslationsPattern.exec(content)) !== null) {
    const namespace = match[1]
    // 尝试找到赋值语句，如 const t = useTranslations(...)
    const beforeText = content.substring(0, match.index).split('\n').slice(-2).join('\n')
    const constMatch = /const\s+(\w+)\s*=/.exec(beforeText)
    if (constMatch && constMatch[1]) {
      result.namespaces.set(constMatch[1], namespace)
    }
  }

  // 匹配 t('key') 或 t("key")，并检查 t 是否与已知命名空间关联
  const tPattern = /(\w+)\(\s*['"]([^'"]+)['"]\s*\)/g
  while ((match = tPattern.exec(content)) !== null) {
    const funcName = match[1]
    const key = match[2]

    // 过滤掉明显不是翻译函数的调用
    if (key.includes('/') || key === '') continue

    // 如果函数名与已知命名空间变量关联
    if (result.namespaces.has(funcName)) {
      const namespace = result.namespaces.get(funcName)
      if (namespace) {
        const fullKey = `${namespace}.${key}`
        result.keys.push(fullKey)
      }
    }
  }

  // 匹配 <FormattedMessage id="key" />
  const formattedMessagePattern = /<FormattedMessage[^>]*id=['"]([^'"]+)['"]/g
  while ((match = formattedMessagePattern.exec(content)) !== null) {
    const key = match[1]
    if (!key.includes('/') && key !== '') {
      // 对于 FormattedMessage，我们需要猜测命名空间
      // 通常会在同一文件中找到 useTranslations 调用
      if (result.namespaces.size > 0) {
        const namespace = Array.from(result.namespaces.values())[0]
        result.keys.push(`${namespace}.${key}`)
      } else {
        // 如果找不到命名空间，尝试从文件路径推断
        const pathMatch = filePath.match(/\[locale\]\/(?:\([^)]+\)\/)?([^/]+)/)
        if (pathMatch && pathMatch[1]) {
          const possibleNamespace = pathMatch[1]
          result.keys.push(`${possibleNamespace}.${key}`)
        }
      }
    }
  }

  return result
}

// 主函数
async function checkTranslations(): Promise<number> {
  log('开始检查翻译...')

  // 获取所有 TSX/TS 文件
  const files: string[] = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
    ignore: ['src/**/*.d.ts', 'src/**/*.test.ts', 'src/**/*.test.tsx', 'node_modules/**']
  })

  log(`找到 ${files.length} 个文件需要扫描`)

  // 扫描所有文件
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8')
      const { namespaces, keys } = extractTranslationsInfo(content, file)

      if (keys.length > 0 || namespaces.size > 0) {
        log(`在文件 ${file} 中找到以下信息:`)

        if (namespaces.size > 0) {
          log(`  命名空间变量映射:`)
          namespaces.forEach((namespace, varName) => {
            log(`    - ${varName} => ${namespace}`)
          })
        }

        if (keys.length > 0) {
          log(`  翻译键:`)
          keys.forEach(key => {
            log(`    - ${key}`)
            foundTranslationKeys.add(key)
          })
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        logError(`处理文件 ${file} 时出错: ${error.message}`)
      } else {
        logError(`处理文件 ${file} 时出错: 未知错误`)
      }
    }
  }

  log('\n检查翻译文件中的键...')

  // 获取翻译文件中的所有键
  const allEnKeys: string[] = getAllKeys(enTranslations)
  const allZhKeys: string[] = getAllKeys(zhTranslations)

  log(`英文翻译文件中有 ${allEnKeys.length} 个键`)
  log(`中文翻译文件中有 ${allZhKeys.length} 个键`)
  log(`在代码中找到 ${foundTranslationKeys.size} 个使用的键`)

  // 检查结果
  const report: TranslationReport = {
    missingInEn: [],
    missingInZh: [],
    enOnlyKeys: [],
    zhOnlyKeys: []
  }

  foundTranslationKeys.forEach(key => {
    if (!checkKeyExists(key, enTranslations)) {
      report.missingInEn.push(key)
    }

    if (!checkKeyExists(key, zhTranslations)) {
      report.missingInZh.push(key)
    }
  })

  // 检查两个翻译文件的键是否一致
  report.enOnlyKeys = allEnKeys.filter(key => !allZhKeys.includes(key))
  report.zhOnlyKeys = allZhKeys.filter(key => !allEnKeys.includes(key))

  // 生成报告
  log('\n=== 翻译检查报告 ===\n')

  if (report.missingInEn.length > 0) {
    log('🔴 英文翻译文件中缺失的键:')
    report.missingInEn.forEach(key => log(`  - ${key}`))
  } else {
    log('✅ 英文翻译文件中包含所有使用的键')
  }

  if (report.missingInZh.length > 0) {
    log('\n🔴 中文翻译文件中缺失的键:')
    report.missingInZh.forEach(key => log(`  - ${key}`))
  } else {
    log('✅ 中文翻译文件中包含所有使用的键')
  }

  if (report.enOnlyKeys.length > 0) {
    log('\n⚠️ 仅在英文翻译文件中存在的键:')
    report.enOnlyKeys.forEach(key => log(`  - ${key}`))
  }

  if (report.zhOnlyKeys.length > 0) {
    log('\n⚠️ 仅在中文翻译文件中存在的键:')
    report.zhOnlyKeys.forEach(key => log(`  - ${key}`))
  }

  log('\n=== 报告结束 ===\n')

  // 在所有操作完成后，一次性写入日志文件
  const logFilePath = path.join(process.cwd(), 'scripts', 'check.log')
  fs.writeFileSync(logFilePath, logMessages.join('\n'), 'utf8')

  log(`检查完成，日志已保存到 ${logFilePath}`)

  // 如果有任何问题，返回非零状态码
  return report.missingInEn.length > 0 || report.missingInZh.length > 0 ? 1 : 0
}

// 运行检查
checkTranslations().then(exitCode => {
  // 确保所有日志都已写入
  const logFilePath = path.join(process.cwd(), 'scripts', 'check.log')
  fs.writeFileSync(logFilePath, logMessages.join('\n'), 'utf8')
  console.log(`日志已保存到 ${logFilePath}`)

  process.exit(exitCode)
}).catch(error => {
  console.error('检查翻译时发生错误:', error)
  process.exit(1)
}) 