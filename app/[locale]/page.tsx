import { useTranslations } from 'next-intl';

/**
 * Homepage Component
 * 
 * The main landing page of the application.
 */
export default function Homepage() {
    const t = useTranslations('Homepage');

    return (
        <section className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                {t('title')}
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
                {t('description')}
            </p>
        </section>
    );
}
