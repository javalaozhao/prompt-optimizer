'use client';

import { useTranslations } from 'next-intl';
import ToolCard from '../cards/ToolCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

/**
 * PromptPanel 组件
 *
 * 展示生成的提示词并允许用户与其交互。
 * 提供复制和保存功能。
 */
export default function PromptPanel() {
    // 使用国际化翻译
    const t = useTranslations('PromptOptimizer.promptPanel');

    return (
        <Card className="shadow-sm border-primary/10">
            <CardHeader className="bg-background">
                <CardTitle className="text-primary">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <Textarea 
                    className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary/50" 
                    placeholder={t('placeholder')} 
                    readOnly 
                />
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button 
                        variant="outline" 
                        className="text-primary border-primary/20 hover:bg-primary/5 w-full sm:w-auto"
                    >
                        {t('copyButton')}
                    </Button>
                    <Button 
                        className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                    >
                        {t('saveButton')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
