import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

/**
 * Input Panel Component
 * 
 * The main input area for the user to enter their prompt.
 * This is a React-based recreation of the InputPanelUI from the Vue app.
 */
export default function InputPanel() {
    const t = useTranslations('PromptOptimizer.inputPanel');

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    placeholder={t('placeholder')}
                    className="min-h-[150px]"
                />
                <div className="flex justify-between items-center">
                    {/* Model and Template selectors will be added here */}
                    <div></div>
                    <Button>{t('optimizeButton')}</Button>
                </div>
            </CardContent>
        </Card>
    );
}
