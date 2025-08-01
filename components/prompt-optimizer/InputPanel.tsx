import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select } from '../ui/select';

/**
 * InputPanel 组件
 * 
 * 用户输入提示词的主要区域。
 * 这是基于 Vue 应用中 InputPanelUI 的 React 重写版本。
 */
export default function InputPanel() {
    const t = useTranslations('PromptOptimizer.inputPanel');
    const [modelOptions, setModelOptions] = useState<{value: string, label: string}[]>([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [providerOptions, setProviderOptions] = useState<{value: string, label: string}[]>([]);
    
    // 从localStorage加载模型设置
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSettings = localStorage.getItem('modelSettings');
            if (savedSettings) {
                try {
                    const settings = JSON.parse(savedSettings);
                    
                    // 构建提供商选项
                    const providers = Object.keys(settings).map(key => ({
                        value: key,
                        label: key === 'custom' ? t('customProvider') : key.charAt(0).toUpperCase() + key.slice(1)
                    }));
                    
                    setProviderOptions(providers);
                    
                    // 如果有提供商，默认选择第一个
                    if (providers.length > 0) {
                        const firstProvider = providers[0].value;
                        setSelectedProvider(firstProvider);
                        
                        // 加载该提供商的模型
                        if (settings[firstProvider]) {
                            // 预定义的模型提供商
                            const predefinedProviders = [
                                {
                                    id: 'openai',
                                    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o']
                                },
                                {
                                    id: 'anthropic',
                                    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']
                                },
                                {
                                    id: 'gemini',
                                    models: ['gemini-pro', 'gemini-ultra']
                                },
                                {
                                    id: 'kimi',
                                    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k']
                                },
                                {
                                    id: 'deepseek',
                                    models: ['deepseek-chat', 'deepseek-coder']
                                },
                                {
                                    id: 'chatglm',
                                    models: ['chatglm_turbo', 'chatglm_pro', 'chatglm_std']
                                },
                                {
                                    id: 'qwen',
                                    models: ['qwen-turbo', 'qwen-plus', 'qwen-max']
                                },
                                {
                                    id: 'custom',
                                    models: ['custom-model']
                                }
                            ];
                            
                            const provider = predefinedProviders.find(p => p.id === firstProvider);
                            if (provider) {
                                const modelOpts = provider.models.map(model => ({
                                    value: model,
                                    label: model
                                }));
                                setModelOptions(modelOpts);
                                
                                // 默认选择第一个模型
                                if (modelOpts.length > 0) {
                                    setSelectedModel(modelOpts[0].value);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error loading model settings:', error);
                }
            } else {
                // 如果没有保存的设置，使用默认选项
                setProviderOptions([{ value: 'openai', label: 'OpenAI' }]);
                setModelOptions([
                    { value: 'gpt-4', label: 'GPT-4' },
                    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
                ]);
                setSelectedProvider('openai');
                setSelectedModel('gpt-4');
            }
        }
    }, [t]);
    
    // 当提供商改变时更新模型选项
    const handleProviderChange = (provider: string) => {
        setSelectedProvider(provider);
        
        if (typeof window !== 'undefined') {
            const savedSettings = localStorage.getItem('modelSettings');
            if (savedSettings) {
                try {
                    const settings = JSON.parse(savedSettings);
                    
                    // 预定义的模型提供商
                    const predefinedProviders = [
                        {
                            id: 'openai',
                            models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o']
                        },
                        {
                            id: 'anthropic',
                            models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']
                        },
                        {
                            id: 'gemini',
                            models: ['gemini-pro', 'gemini-ultra']
                        },
                        {
                            id: 'kimi',
                            models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k']
                        },
                        {
                            id: 'deepseek',
                            models: ['deepseek-chat', 'deepseek-coder']
                        },
                        {
                            id: 'chatglm',
                            models: ['chatglm_turbo', 'chatglm_pro', 'chatglm_std']
                        },
                        {
                            id: 'qwen',
                            models: ['qwen-turbo', 'qwen-plus', 'qwen-max']
                        },
                        {
                            id: 'custom',
                            models: ['custom-model']
                        }
                    ];
                    
                    const providerData = predefinedProviders.find(p => p.id === provider);
                    if (providerData) {
                        const modelOpts = providerData.models.map(model => ({
                            value: model,
                            label: model
                        }));
                        setModelOptions(modelOpts);
                        
                        // 默认选择第一个模型
                        if (modelOpts.length > 0) {
                            setSelectedModel(modelOpts[0].value);
                        } else {
                            setSelectedModel('');
                        }
                    }
                } catch (error) {
                    console.error('Error loading model settings:', error);
                }
            }
        }
    };
    
    // 模板选项
    const template_options = [
        { value: 'none', label: t('templates.none') },
        { value: 'creative', label: t('templates.creative') },
        { value: 'technical', label: t('templates.technical') },
        { value: 'story', label: t('templates.story') },
        { value: 'analysis', label: t('templates.analysis') }
    ];

    return (
        <Card className="shadow-sm border-primary/10">
            <CardHeader className="bg-background">
                <CardTitle className="text-primary">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <Textarea
                    placeholder={t('placeholder')}
                    className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary/50"
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Select 
                            options={providerOptions}
                            value={selectedProvider}
                            onChange={handleProviderChange}
                            placeholder={t('selectProvider')}
                            className="bg-background/50 border-primary/20 w-full sm:w-auto"
                        />
                        <Select 
                            options={modelOptions}
                            value={selectedModel}
                            onChange={setSelectedModel}
                            placeholder={t('selectModel')}
                            className="bg-background/50 border-primary/20 w-full sm:w-auto"
                        />
                        <Select 
                            options={template_options}
                            placeholder={t('selectTemplate')}
                            className="bg-background/50 border-primary/20 w-full sm:w-auto"
                        />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                        {t('optimizeButton')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
