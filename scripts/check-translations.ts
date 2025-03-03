const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 读取翻译文件
const enTranslations = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/messages/en.json'), 'utf8')
)
const zhTranslations = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/messages/zh.json'), 'utf8')
)

// 用于存储找到的翻译键
const foundTranslationKeys = new Set<string>()

// 从对象中获取所有键（包括嵌套键）
function getAllKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = []
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = [...keys, ...getAllKeys(obj[key], newKey)]
    } else {
      keys.push(newKey)
    }
  }
  return keys
}

// 检查键是否存在于翻译文件中
function checkKeyExists(key: string, translations: any): boolean {
  const parts = key.split('.')
  let current = translations

  for (const part of parts) {
    if (current[part] === undefined) {
      return false
    }
    current = current[part]
  }

  return true
}

// 从文件内容中提取翻译键
function extractTranslationKeys(content: string): string[] {
  // 在 next-intl 中，通常使用以下模式引用翻译：
  // 1. t('key')
  // 2. useTranslations()('key')
  // 3. <FormattedMessage id="key" />
  
  const keys = new Set<string>()
  
  // 匹配模式 1: t('key') 或 t("key")
  const pattern1 = /t\(['"]([^'"]+)['"]\)/g
  let match
  while ((match = pattern1.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  // 匹配模式 2: useTranslations()('key') 或 useTranslations()("key")
  const pattern2 = /useTranslations\(\)\(['"]([^'"]+)['"]\)/g
  while ((match = pattern2.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  // 匹配模式 3: <FormattedMessage id="key" />
  const pattern3 = /FormattedMessage[^>]*id=['"]([^'"]+)['"]/g
  while ((match = pattern3.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  // 匹配模式 4: messages.key 或 messages['key']
  const pattern4 = /messages\.([a-zA-Z0-9_]+)/g
  while ((match = pattern4.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  const pattern5 = /messages\[['"]([^'"]+)['"]\]/g
  while ((match = pattern5.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  // 匹配模式 5: getTranslations('namespace')
  const pattern6 = /getTranslations\(['"]([^'"]+)['"]\)/g
  while ((match = pattern6.exec(content)) !== null) {
    keys.add(match[1])
  }
  
  return Array.from(keys)
}

// 主函数
async function checkTranslations() {
  console.log('开始检查翻译...')
  
  // 获取所有 TSX/TS 文件
  const files = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
    ignore: ['src/**/*.d.ts', 'src/**/*.test.ts', 'src/**/*.test.tsx', 'node_modules/**']
  })

  console.log(`找到 ${files.length} 个文件需要扫描`)

  // 扫描所有文件
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8')
      const keys = extractTranslationKeys(content)
      
      if (keys.length > 0) {
        console.log(`在文件 ${file} 中找到以下键:`)
        keys.forEach(key => {
          console.log(`  - ${key}`)
          foundTranslationKeys.add(key)
        })
      }
    } catch (error) {
      console.error(`处理文件 ${file} 时出错:`, error)
    }
  }

  console.log('\n检查翻译文件中的键...')
  
  // 获取翻译文件中的所有键
  const allEnKeys = getAllKeys(enTranslations)
  const allZhKeys = getAllKeys(zhTranslations)
  
  console.log(`英文翻译文件中有 ${allEnKeys.length} 个键`)
  console.log(`中文翻译文件中有 ${allZhKeys.length} 个键`)
  console.log(`在代码中找到 ${foundTranslationKeys.size} 个使用的键`)

  // 检查结果
  const missingInEn: string[] = []
  const missingInZh: string[] = []

  foundTranslationKeys.forEach(key => {
    // 检查完整键 (例如 "common.buttons.signIn")
    if (!checkKeyExists(key, enTranslations)) {
      // 尝试检查命名空间键 (例如 "buttons.signIn" 在 "common" 命名空间下)
      let found = false
      for (const namespace of Object.keys(enTranslations)) {
        if (checkKeyExists(key, enTranslations[namespace])) {
          found = true
          break
        }
      }
      if (!found) {
        missingInEn.push(key)
      }
    }
    
    if (!checkKeyExists(key, zhTranslations)) {
      // 尝试检查命名空间键
      let found = false
      for (const namespace of Object.keys(zhTranslations)) {
        if (checkKeyExists(key, zhTranslations[namespace])) {
          found = true
          break
        }
      }
      if (!found) {
        missingInZh.push(key)
      }
    }
  })

  // 生成报告
  console.log('\n=== 翻译检查报告 ===\n')
  
  if (missingInEn.length > 0) {
    console.log('🔴 英文翻译文件中缺失的键:')
    missingInEn.forEach(key => console.log(`  - ${key}`))
  } else {
    console.log('✅ 英文翻译文件中包含所有使用的键')
  }

  if (missingInZh.length > 0) {
    console.log('\n🔴 中文翻译文件中缺失的键:')
    missingInZh.forEach(key => console.log(`  - ${key}`))
  } else {
    console.log('✅ 中文翻译文件中包含所有使用的键')
  }

  // 检查两个翻译文件的键是否一致
  const enOnlyKeys = allEnKeys.filter(key => !allZhKeys.includes(key))
  const zhOnlyKeys = allZhKeys.filter(key => !allEnKeys.includes(key))

  if (enOnlyKeys.length > 0) {
    console.log('\n⚠️ 仅在英文翻译文件中存在的键:')
    enOnlyKeys.forEach(key => console.log(`  - ${key}`))
  }

  if (zhOnlyKeys.length > 0) {
    console.log('\n⚠️ 仅在中文翻译文件中存在的键:')
    zhOnlyKeys.forEach(key => console.log(`  - ${key}`))
  }

  console.log('\n=== 报告结束 ===\n')

  // 如果有任何问题，返回非零状态码
  return missingInEn.length > 0 || missingInZh.length > 0 ? 1 : 0
}

// 运行检查
checkTranslations().then(exitCode => {
  process.exit(exitCode)
}) 