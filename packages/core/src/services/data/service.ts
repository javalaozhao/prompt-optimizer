/**
 * 数据服务
 * 
 * 提供数据管理功能
 */

import { DataManager } from './manager';
import { 
  IDataManager, 
  ExportData 
} from './types';

/**
 * 创建数据服务
 * 
 * @param modelManager 模型管理器
 * @param templateManager 模板管理器
 * @param historyManager 历史记录管理器
 * @param preferenceManager 偏好设置管理器
 * @returns 数据管理器实例
 */
export function createDataService(
  modelManager: any, 
  templateManager: any, 
  historyManager: any, 
  preferenceManager: any
): IDataManager {
  return new DataManager(modelManager, templateManager, historyManager, preferenceManager);
}

// 导出类和类型
export { DataManager };
export type { 
  IDataManager,
  ExportData
};
