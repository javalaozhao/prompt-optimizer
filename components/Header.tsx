import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Header Component
 * 
 * The main site header, containing navigation and other key controls.
 */
export default function Header() {
    const t = useTranslations('Brand');
    
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            {t('name')}
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {/* Navigation links will be added here later */}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
