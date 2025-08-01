/**
 * 存储服务实现
 * 
 * 提供统一的存储接口，支持不同的存储后端
 */

import { IStorageProvider } from './types';
import { createLocalStorage } from './localStorageProvider';
import { createMemoryStorage } from './memoryStorageProvider';
import { createFileStorage } from './fileStorageProvider';
import { createDexieStorage } from './dexieStorageProvider';
import { isRunningInElectron, isNode } from '../../utils/environment';

/**
 * 创建存储服务
 * 
 * 根据运行环境选择合适的存储实现
 * 
 * @param type 存储类型，可选值：'local', 'memory', 'file', 'dexie'
 * @param options 存储选项
 * @returns 存储提供者实例
 */
export function createStorageService(type: string = 'auto', options: any = {}): IStorageProvider {
  // 自动选择存储类型
  if (type === 'auto') {
    if (isRunningInElectron() || isNode()) {
      return createFileStorage(options);
    } else if (typeof window !== 'undefined' && window.indexedDB) {
      return createDexieStorage(options);
    } else if (typeof localStorage !== 'undefined') {
      return createLocalStorage();
    } else {
      return createMemoryStorage();
    }
  }

  // 根据指定类型创建存储
  switch (type) {
    case 'local':
      return createLocalStorage();
    case 'memory':
      return createMemoryStorage();
    case 'file':
      return createFileStorage(options);
    case 'dexie':
      return createDexieStorage(options);
    default:
      throw new Error(`不支持的存储类型: ${type}`);
  }
}
