import { IStorageProvider } from './types';

/**
 * 内存存储提供器 - 用于测试和临时存储
 * 
 * 这个存储提供器将数据存储在内存中，适用于测试环境或临时存储场景。
 * 数据不会持久化，应用重启后数据会丢失。
 */
export class MemoryStorageProvider implements IStorageProvider {
  private storage: Map<string, string> = new Map();

  /**
   * 获取存储项
   * @param key 键名
   * @returns 存储的值，如不存在则返回null
   */
  async getItem(key: string): Promise<string | null> {
    return this.storage.has(key) ? this.storage.get(key) || null : null;
  }

  /**
   * 设置存储项
   * @param key 键名
   * @param value 值
   */
  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }

  /**
   * 删除存储项
   * @param key 键名
   */
  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  /**
   * 清空所有存储
   */
  async clear(): Promise<void> {
    this.storage.clear();
  }
  
  /**
   * 清空所有存储（兼容性方法，与clear相同）
   */
  async clearAll(): Promise<void> {
    return this.clear();
  }

  /**
   * 获取所有键名
   * @returns 键名数组
   */
  async keys(): Promise<string[]> {
    return Array.from(this.storage.keys());
  }

  /**
   * 获取存储项数量
   * @returns 存储项数量
   */
  async length(): Promise<number> {
    return this.storage.size;
  }
  
  /**
   * 原子更新数据 - 内存存储实现
   * @param key 键名
   * @param modifier 修改器函数
   */
  async updateData<T>(key: string, modifier: (currentValue: T | null) => T): Promise<void> {
    // 获取当前值
    const currentValue = await this.getItem(key);
    let parsedValue: T | null = null;
    
    // 如果存在当前值，解析JSON
    if (currentValue !== null) {
      try {
        parsedValue = JSON.parse(currentValue) as T;
      } catch (e) {
        // 如果解析失败，保持为null
        console.warn(`无法解析键 ${key} 的值，将使用null作为当前值`);
      }
    }
    
    // 调用修改器函数
    const newValue = modifier(parsedValue);
    
    // 保存新值
    await this.setItem(key, JSON.stringify(newValue));
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
    // 内存存储中的简单实现，顺序执行操作
    for (const op of operations) {
      if (op.operation === 'set' && op.value !== undefined) {
        await this.setItem(op.key, op.value);
      } else if (op.operation === 'remove') {
        await this.removeItem(op.key);
      }
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
      supportsAtomic: true,  // 内存存储支持原子操作
      supportsBatch: true,   // 内存存储支持批量操作
      maxStorageSize: undefined  // 内存存储无固定大小限制
    };
  }
}

/**
 * 创建内存存储提供器实例
 * @returns 内存存储提供器实例
 */
export function createMemoryStorage(): IStorageProvider {
  return new MemoryStorageProvider();
}
