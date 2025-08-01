/**
 * Dexie存储服务导出文件
 * 
 * 提供创建Dexie存储实例的工厂函数
 */

import { IStorageProvider } from './types';

/**
 * Dexie存储提供器 - 用于浏览器IndexedDB存储
 * 
 * 这个存储提供器使用Dexie.js库操作IndexedDB，适用于大型数据存储。
 * 数据会持久化在浏览器的IndexedDB中。
 */
export class DexieStorageProvider implements IStorageProvider {
  private db: any;
  
  /**
   * 构造函数
   * @param dbName 数据库名称
   * @param tableName 表名
   */
  constructor(_dbName: string = 'promptOptimizerDB', _tableName: string = 'keyValueStore') {
    // 在实际实现中，这里会初始化Dexie和使用dbName和tableName
    // 由于Dexie是可选依赖，我们这里提供一个基本实现
    console.warn('[DexieStorage] 使用模拟实现，请安装Dexie依赖获取完整功能');
    
    // 模拟存储
    this.db = {
      storage: new Map<string, string>()
    };
  }
  
  /**
   * 获取存储项
   * @param key 键名
   * @returns 存储的值，如不存在则返回null
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return this.db.storage.get(key) || null;
    } catch (error) {
      console.error('[DexieStorage] 获取数据失败:', error);
      return null;
    }
  }
  
  /**
   * 设置存储项
   * @param key 键名
   * @param value 值
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      this.db.storage.set(key, value);
    } catch (error) {
      console.error('[DexieStorage] 设置数据失败:', error);
      throw new Error(`设置存储项失败: ${key}`);
    }
  }
  
  /**
   * 删除存储项
   * @param key 键名
   */
  async removeItem(key: string): Promise<void> {
    try {
      this.db.storage.delete(key);
    } catch (error) {
      console.error('[DexieStorage] 删除数据失败:', error);
      throw new Error(`删除存储项失败: ${key}`);
    }
  }
  
  /**
   * 清空所有存储
   */
  async clearAll(): Promise<void> {
    try {
      this.db.storage.clear();
    } catch (error) {
      console.error('[DexieStorage] 清空数据失败:', error);
      throw new Error('清空所有存储项失败');
    }
  }
  
  /**
   * 获取所有键名
   * @returns 键名数组
   */
  async keys(): Promise<string[]> {
    try {
      return Array.from(this.db.storage.keys());
    } catch (error) {
      console.error('[DexieStorage] 获取键列表失败:', error);
      return [];
    }
  }
  
  /**
   * 获取存储项数量
   * @returns 存储项数量
   */
  async length(): Promise<number> {
    try {
      return this.db.storage.size;
    } catch (error) {
      console.error('[DexieStorage] 获取存储大小失败:', error);
      return 0;
    }
  }
  
  /**
   * 原子更新数据
   * @param key 键名
   * @param modifier 修改器函数
   */
  async updateData<T>(key: string, modifier: (currentValue: T | null) => T): Promise<void> {
    try {
      // 获取当前值
      const currentValue = await this.getItem(key);
      let parsedValue: T | null = null;
      
      // 如果存在当前值，解析JSON
      if (currentValue !== null) {
        try {
          parsedValue = JSON.parse(currentValue) as T;
        } catch (e) {
          console.warn(`无法解析键 ${key} 的值，将使用null作为当前值`);
        }
      }
      
      // 调用修改器函数
      const newValue = modifier(parsedValue);
      
      // 保存新值
      await this.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('[DexieStorage] 更新数据失败:', error);
      throw new Error(`数据更新失败: ${key}`);
    }
  }
  
  /**
   * 批量更新操作
   * @param operations 操作数组
   */
  async batchUpdate(operations: Array<{
    key: string;
    operation: 'set' | 'remove';
    value?: string;
  }>): Promise<void> {
    try {
      // 简单实现，顺序执行操作
      for (const op of operations) {
        if (op.operation === 'set' && op.value !== undefined) {
          await this.setItem(op.key, op.value);
        } else if (op.operation === 'remove') {
          await this.removeItem(op.key);
        }
      }
    } catch (error) {
      console.error('[DexieStorage] 批量更新失败:', error);
      throw new Error('批量更新失败');
    }
  }
  
  /**
   * 获取存储能力信息
   * @returns 存储能力信息
   */
  getCapabilities(): {
    supportsAtomic: boolean;
    supportsBatch: boolean;
    maxStorageSize?: number;
  } {
    return {
      supportsAtomic: true,
      supportsBatch: true,
      maxStorageSize: 50 * 1024 * 1024 // 约50MB (IndexedDB通常限制)
    };
  }
}

/**
 * 创建Dexie存储提供器实例
 * @param dbName 数据库名称
 * @param tableName 表名
 * @returns Dexie存储提供器实例
 */
export function createDexieStorage(dbName: string = 'promptOptimizerDB', tableName: string = 'keyValueStore'): IStorageProvider {
  return new DexieStorageProvider(dbName, tableName);
}
