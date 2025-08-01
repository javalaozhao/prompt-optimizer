/**
 * 核心服务导出文件
 * 
 * 这个文件导出所有核心服务，供其他模块使用
 */

// 导出模型管理器
export { ModelManager, createModelManager } from './services/model/manager';

// 导出LLM服务
export { LLMService, createLLMService } from './services/llm/service';
export { LLMResponse } from './services/llm/types';

// 导出存储服务
export { StorageService, createStorageService } from './services/storage/service';
export { LocalStorageProvider, createLocalStorage } from './services/storage/local';
export { MemoryStorageProvider, createMemoryStorage } from './services/storage/memory';
export { FileStorageProvider, createFileStorage } from './services/storage/file';
export { DexieStorageProvider, createDexieStorage } from './services/storage/dexie';

// 导出提示词服务
export { PromptService, createPromptService } from './services/prompt/service';

// 导出模板服务
export { TemplateManager, createTemplateService } from './services/template/service';
export { createTemplateManager } from './services/template/manager';

// 导出历史记录服务
export { HistoryManager, createHistoryService } from './services/history/service';
export { createHistoryManager } from './services/history/manager';

// 导出偏好设置服务
export { PreferenceManager, createPreferenceService } from './services/preference/service';

// 导出比较服务
export { CompareService, createCompareService } from './services/compare/service';

// 导出数据服务
export { DataManager, createDataService } from './services/data/service';

// 导出工具函数
export * from './utils/environment';
