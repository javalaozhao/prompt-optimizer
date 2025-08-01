import { useTranslations } from 'next-intl';
import ToolCard from '@/components/cards/ToolCard';
import BlogCard from '@/components/cards/BlogCard';

/**
 * Homepage Component
 * 
 * The main landing page of the application.
 */
export default function Homepage() {
    const t = useTranslations('Homepage');

    return (
        <div className="space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                    {t('title')}
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
                    {t('description')}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold tracking-tighter mb-4">{t('toolsTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ToolCard title={t('promptOptimizer.title')} description={t('promptOptimizer.description')} />
                    {/* Add more tools as they are created */}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold tracking-tighter mb-4">{t('blogTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BlogCard title={t('blogPost1.title')} summary={t('blogPost1.summary')} />
                    {/* Add more blog posts as they are created */}
                </div>
            </section>
        </div>
    );
}
