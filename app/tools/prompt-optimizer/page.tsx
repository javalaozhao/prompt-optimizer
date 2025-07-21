import PromptOptimizerClient from '@/components/prompt-optimizer/PromptOptimizerClient';
import { getTranslations } from 'next-intl/server';

// Define props for the page component
type Props = {
    params: { locale: string };
};

/**
 * Generates metadata for the Prompt Optimizer page.
 */
export async function generateMetadata({ params: { locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'PromptOptimizer' });
    return {
        title: t('title'),
    };
}

/**
 * Prompt Optimizer Page
 * 
 * This is the server component entry point for the tool.
 * It wraps the main client component.
 */
export default function PromptOptimizerPage() {
    return <PromptOptimizerClient />;
}
