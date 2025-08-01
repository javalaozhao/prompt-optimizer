'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

/**
 * ToolCard 组件
 *
 * 用于展示工具或功能的卡片组件。
 * 使用设计系统的 Card 组件确保一致性。
 */
export default function ToolCard({ title, description }: { title: string; description: string }) {
    const t = useTranslations('Components.ToolCard');

    return (
        <Card className="shadow-sm border-primary/10">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
