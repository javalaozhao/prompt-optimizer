'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useEffect } from 'react';

import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

/**
 * LanguageSwitcher Component
 * 
 * Renders a dropdown menu to switch the application's locale.
 * It uses `next-intl` and Next.js navigation hooks to change the language
 * while preserving the current page path.
 */
export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    // Store the current locale in localStorage when it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredLanguage', locale);
        }
    }, [locale]);

    const onSelectChange = (nextLocale: string) => {
        // The `startTransition` hook is used to prevent the UI from blocking
        // during the navigation to the new locale's path.
        startTransition(() => {
            // Save the selected locale to localStorage for persistence
            if (typeof window !== 'undefined') {
                localStorage.setItem('preferredLanguage', nextLocale);
            }
            
            const pathParts = pathname.split('/');
            // Remove the current locale if it exists in the path
            if (['en', 'zh'].includes(pathParts[1])) {
                pathParts.splice(1, 1);
            }
            const newPath = `/${nextLocale}${pathParts.join('/') || '/'}`;
            router.replace(newPath);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" disabled={isPending}>
                    {locale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSelectChange('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSelectChange('zh')}>
                    中文
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
