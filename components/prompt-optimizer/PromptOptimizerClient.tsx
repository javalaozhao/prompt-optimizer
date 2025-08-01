'use client';

import { useTranslations } from 'next-intl';
import InputPanel from './InputPanel';
import PromptPanel from './PromptPanel';
import TestPanel from './TestPanel';

/**
 * Prompt Optimizer Client Component
 * 
 * This component holds the state and logic for the prompt optimizer tool.
 * It's the React equivalent of the App.vue component.
 */
export default function PromptOptimizerClient() {
    const t = useTranslations('PromptOptimizer');

    // State and logic will be added here incrementally.

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-primary mb-8">{t('title')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <InputPanel />
                    <PromptPanel />
                </div>
                <div className="lg:col-span-1">
                    <TestPanel />
                </div>
            </div>
        </div>
    );
}
