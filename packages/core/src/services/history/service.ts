/**
 * 历史记录服务
 * 
 * 提供历史记录管理功能
 */

import { HistoryManager, createHistoryManager } from './manager';
import { 
  IHistoryManager, 
  PromptRecord, 
  PromptRecordChain, 
  PromptRecordType
} from './types';

/**
 * 创建历史记录服务
 * 
 * @param storage 存储提供者
 * @param modelManager 模型管理器实例（可选）
 * @returns 历史记录管理器实例
 */
export function createHistoryService(storage: any, modelManager?: any): IHistoryManager {
  return new HistoryManager(storage, modelManager);
}

// 导出类和类型
export { HistoryManager, createHistoryManager };
export type { 
  IHistoryManager,
  PromptRecord,
  PromptRecordChain,
  PromptRecordType
};
