'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';

/**
 * TestPanel 组件
 *
 * 允许用户使用不同模型测试生成的提示词。
 * 提供测试结果的即时反馈。
 * 支持从localStorage读取用户保存的模型设置。
 */
export default function TestPanel() {
    const t = useTranslations('PromptOptimizer.testPanel');
    
    // 状态管理
    const [isLoading, setIsLoading] = useState(false);
    const [testResult, setTestResult] = useState('');
    const [testError, setTestError] = useState('');
    const [selectedModel, setSelectedModel] = useState('gpt4');
    const [promptText, setPromptText] = useState('');
    
    // 从localStorage读取模型设置
    const [modelOptions, setModelOptions] = useState([
        { value: 'gpt4', label: 'GPT-4' },
        { value: 'claude3', label: 'Claude 3' },
        { value: 'gemini', label: 'Gemini Pro' }
    ]);
    
    // 初始化时从localStorage读取模型设置
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem('modelSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                if (settings && settings.providers) {
                    // 构建模型选项
                    const options = [];
                    for (const provider of settings.providers) {
                        if (provider.enabled && provider.models && provider.models.length > 0) {
                            for (const model of provider.models) {
                                if (model.enabled) {
                                    options.push({
                                        value: `${provider.id}:${model.id}`,
                                        label: `${provider.name} - ${model.name}`
                                    });
                                }
                            }
                        }
                    }
                    
                    if (options.length > 0) {
                        setModelOptions(options);
                        setSelectedModel(options[0].value);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading model settings:', error);
        }
    }, []);

    // 处理测试提交
    const handleTestPrompt = async () => {
        if (!promptText.trim()) {
            setTestError(t('errorEmptyPrompt'));
            return;
        }
        
        setIsLoading(true);
        setTestError('');
        setTestResult('');
        
        try {
            // 模拟API调用，实际项目中应替换为真实API
            await new Promise(resolve => setTimeout(resolve, 1500));
            setTestResult(t('testResultExample', { model: selectedModel }));
        } catch (error) {
            setTestError(t('errorTestFailed'));
            console.error('Test prompt error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="shadow-sm border-primary/10 h-full">
            <CardHeader className="bg-background">
                <CardTitle className="text-primary">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t('modelLabel')}</label>
                    <Select 
                        options={modelOptions}
                        value={selectedModel}
                        onChange={(value) => setSelectedModel(value)}
                        className="w-full bg-background/50 border-primary/20"
                    />
                </div>
                
                <Textarea 
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary/50" 
                    placeholder={t('placeholder')} 
                />
                
                <Button 
                    onClick={handleTestPrompt}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('testingButton')}
                        </>
                    ) : t('testButton')}
                </Button>
                
                {testError && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{testError}</AlertDescription>
                    </Alert>
                )}
                
                <div className="mt-4 p-4 bg-background/50 rounded-md border border-primary/10">
                    <h3 className="text-sm font-medium mb-2">{t('resultsTitle')}</h3>
                    {testResult ? (
                        <pre className="text-sm bg-muted p-2 rounded whitespace-pre-wrap overflow-auto max-h-[200px] md:max-h-[300px]">
                            {testResult}
                        </pre>
                    ) : (
                        <p className="text-sm text-muted-foreground">{t('resultsPlaceholder')}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
