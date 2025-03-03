/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, CreditCard, Key, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';

export default async function SettingsPage() {
  const t = await getTranslations('settings');

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.profile')}</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.account')}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.notifications')}</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.billing')}</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.api')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.personalInfo.title')}</CardTitle>
                <CardDescription>{t('profile.personalInfo.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border">
                    <Image
                      src="/images/avatars/default.webp"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      {t('profile.personalInfo.changeAvatar')}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {t('profile.personalInfo.avatarRequirements')}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.personalInfo.nameLabel')}</label>
                  <input
                    type="text"
                    defaultValue="张三"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.personalInfo.emailLabel')}</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      defaultValue="zhangsan@example.com"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled
                    />
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.personalInfo.bioLabel')}</label>
                  <textarea
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={t('profile.personalInfo.bioPlaceholder')}
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>{t('profile.personalInfo.saveChanges')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('profile.preferences.title')}</CardTitle>
                <CardDescription>{t('profile.preferences.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.preferences.languageLabel')}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.preferences.themeLabel')}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="system">{t('profile.preferences.themeSystem')}</option>
                    <option value="light">{t('profile.preferences.themeLight')}</option>
                    <option value="dark">{t('profile.preferences.themeDark')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('profile.preferences.timezoneLabel')}</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>{t('profile.preferences.saveChanges')}</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-6">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('account.security.title')}</CardTitle>
                <CardDescription>{t('account.security.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('account.security.currentPasswordLabel')}</label>
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('account.security.newPasswordLabel')}</label>
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('account.security.confirmPasswordLabel')}</label>
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>{t('account.security.updatePassword')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('account.twoFactor.title')}</CardTitle>
                <CardDescription>{t('account.twoFactor.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{t('account.twoFactor.status')}</p>
                    <p className="text-sm text-muted-foreground">{t('account.twoFactor.statusDescription')}</p>
                  </div>
                  <Button variant="outline">{t('account.twoFactor.enable')}</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">{t('account.dangerZone.title')}</CardTitle>
                <CardDescription>{t('account.dangerZone.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{t('account.dangerZone.deleteAccount')}</p>
                    <p className="text-sm text-muted-foreground">{t('account.dangerZone.deleteDescription')}</p>
                  </div>
                  <Button variant="destructive">{t('account.dangerZone.delete')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications.preferences.title')}</CardTitle>
              <CardDescription>{t('notifications.preferences.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('notifications.preferences.emailNotifications')}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">{t('notifications.preferences.productUpdates')}</p>
                    <p className="text-sm text-muted-foreground">{t('notifications.preferences.productUpdatesDescription')}</p>
                  </div>
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-primary p-1">
                    <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">{t('notifications.preferences.securityAlerts')}</p>
                    <p className="text-sm text-muted-foreground">{t('notifications.preferences.securityAlertsDescription')}</p>
                  </div>
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-primary p-1">
                    <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">{t('notifications.preferences.accountActivity')}</p>
                    <p className="text-sm text-muted-foreground">{t('notifications.preferences.accountActivityDescription')}</p>
                  </div>
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-muted p-1">
                    <div className="h-4 w-4 rounded-full bg-white transition-transform"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">{t('notifications.preferences.marketing')}</p>
                    <p className="text-sm text-muted-foreground">{t('notifications.preferences.marketingDescription')}</p>
                  </div>
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-muted p-1">
                    <div className="h-4 w-4 rounded-full bg-white transition-transform"></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>{t('notifications.preferences.saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="mt-6">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('billing.subscription.title')}</CardTitle>
                <CardDescription>{t('billing.subscription.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Space IDE Professional</p>
                      <p className="text-sm text-muted-foreground">¥99 / {t('billing.subscription.monthly')}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {t('billing.subscription.active')}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p>{t('billing.subscription.nextBilling')}: 2024-01-15</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline">{t('billing.subscription.cancel')}</Button>
                <Button>{t('billing.subscription.upgrade')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('billing.paymentMethod.title')}</CardTitle>
                <CardDescription>{t('billing.paymentMethod.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">**** **** **** 4242</p>
                        <p className="text-sm text-muted-foreground">{t('billing.paymentMethod.expires')}: 12/2025</p>
                      </div>
                    </div>
                    <Badge>{t('billing.paymentMethod.default')}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline">{t('billing.paymentMethod.edit')}</Button>
                <Button>{t('billing.paymentMethod.addNew')}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('billing.billingHistory.title')}</CardTitle>
                <CardDescription>{t('billing.billingHistory.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 p-4 font-medium">
                      <div>{t('billing.billingHistory.date')}</div>
                      <div>{t('billing.billingHistory.amount')}</div>
                      <div className="text-right">{t('billing.billingHistory.status')}</div>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t">
                      <div>2023-12-15</div>
                      <div>¥99.00</div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {t('billing.billingHistory.paid')}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t">
                      <div>2023-11-15</div>
                      <div>¥99.00</div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {t('billing.billingHistory.paid')}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t">
                      <div>2023-10-15</div>
                      <div>¥99.00</div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {t('billing.billingHistory.paid')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">{t('billing.billingHistory.downloadAll')}</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('api.keys.title')}</CardTitle>
              <CardDescription>{t('api.keys.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 p-4 font-medium">
                    <div>{t('api.keys.name')}</div>
                    <div>{t('api.keys.created')}</div>
                    <div className="text-right">{t('api.keys.actions')}</div>
                  </div>
                  <div className="grid grid-cols-3 p-4 border-t">
                    <div>
                      <p>Production API Key</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">sk_live_*****************************</p>
                    </div>
                    <div className="self-center">2023-10-01</div>
                    <div className="text-right self-center">
                      <Button variant="ghost" size="sm">{t('api.keys.revoke')}</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-4 border-t">
                    <div>
                      <p>Development API Key</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">sk_dev_*****************************</p>
                    </div>
                    <div className="self-center">2023-11-15</div>
                    <div className="text-right self-center">
                      <Button variant="ghost" size="sm">{t('api.keys.revoke')}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>{t('api.keys.generate')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 