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
import { locales, localeCodes } from '@/config/locales';

/**
 * LanguageSwitcher Component
 * 
 * Renders a dropdown menu to switch the application's locale.
 * It uses a centralized configuration for locales, making it easily extensible.
 */
export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredLanguage', locale);
        }
    }, [locale]);

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('preferredLanguage', nextLocale);
            }
            
            const pathParts = pathname.split('/');
            if (localeCodes.includes(pathParts[1])) {
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
                {locales.map((l) => (
                    <DropdownMenuItem key={l.code} onClick={() => onSelectChange(l.code)}>
                        {l.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
