/**
 * i18n 消息加载器
 * 
 * 负责根据语言环境加载对应的翻译文件
 */
export async function getMessages(locale: string) {
    try {
        // 动态导入对应语言的翻译文件
        // 注意：路径是相对于项目根目录的
        return (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`加载语言文件失败: ${locale}`, error);
        // 如果加载失败，返回一个空对象作为降级处理
        return {};
    }
}
