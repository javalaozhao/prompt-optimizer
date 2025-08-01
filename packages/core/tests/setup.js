import { vi } from 'vitest'
import dotenv from 'dotenv'
import path from 'path'

// 加载环境变量（从项目根目录加载）
dotenv.config({ path: path.resolve(process.cwd(), '../../.env.local') })

// The 'jsdom' environment provides localStorage. We just need to clear it before each test.
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
}); 