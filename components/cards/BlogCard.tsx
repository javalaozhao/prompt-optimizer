'use client';

import { useTranslations } from 'next-intl';

/**
 * BlogCard Component
 *
 * A card for displaying a blog post summary.
 */
export default function BlogCard({ title, summary }: { title: string; summary: string }) {
    const t = useTranslations('Components.BlogCard');

    return (
        <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{summary}</p>
        </div>
    );
}
