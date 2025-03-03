import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LayoutDashboard, Settings, Key, LogOut } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  
  return {
    title: t('overview'),
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Space-Brain</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              仪表板
            </Link>
            <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
              设置
            </Link>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>仪表板</span>
              </Link>
              <Link
                href="/licenses"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <Key className="h-4 w-4" />
                <span>许可证</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
                <span>设置</span>
              </Link>
              <Link
                href="/api/auth/signout"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span>退出登录</span>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
} 