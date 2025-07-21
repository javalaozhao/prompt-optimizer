import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

import Header from '@/components/Header';
import { getMessages } from './getMessages';

// Define props for the layout component
type Props = {
    children: ReactNode;
    params: { locale: string };
};

/**
 * Generates metadata for the page, such as the title.
 * This is an async function that fetches translations for the given locale.
 */
export async function generateMetadata({ params: { locale } }: Props) {
    // 使用我们的消息加载器加载翻译
    const messages = await getMessages(locale);
    
    // 从 Brand 命名空间获取应用标题
    const title = messages.Brand?.appTitle || 'Prompt Generator';
    
    return {
        title,
    };
}

/**
 * Root layout for internationalized routes.
 * It sets up the language context for the application.
 */
export default async function LocaleLayout({ children, params: { locale } }: Props) {
    // 使用我们的消息加载器加载对应语言的翻译
    const messages = await getMessages(locale);

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <main className="container py-6">{children}</main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
