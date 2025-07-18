<template>
  <footer class="modern-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">Prompt Generator</h3>
        <p class="footer-description">
          专业的AI提示词生成器，帮助您创建更好的AI提示词
        </p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">快速链接</h4>
        <ul class="footer-links">
          <li><a href="#/dashboard" class="footer-link">控制台</a></li>
          <li><a href="#/prompts" class="footer-link">提示词管理</a></li>
          <li><a href="#/templates" class="footer-link">模板库</a></li>
          <li><a href="#/settings" class="footer-link">设置</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">支持</h4>
        <ul class="footer-links">
          <li><a href="#/help" class="footer-link">帮助中心</a></li>
          <li><a href="#/docs" class="footer-link">文档</a></li>
          <li><a href="#/feedback" class="footer-link">反馈</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">连接</h4>
        <div class="footer-social">
          <a href="#" class="social-link" title="GitHub">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" class="social-link" title="文档">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="footer-copyright">
        © 2024 Prompt Generator. 基于 MIT 许可证开源
      </div>
      <div class="footer-stats">
        <span>版本 v1.3.0</span>
        <span>•</span>
        <span>在线运行</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 组件不需要额外逻辑
</script>

<style scoped>
.modern-footer {
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

[data-theme="dark"] .modern-footer {
  background-color: #1f2937;
  border-top-color: #374151;
}

.footer-content {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: #111827;
}

[data-theme="dark"] .footer-title {
  color: white;
}

.footer-description {
  font-size: 0.875rem;
  color: #4b5563;
}

[data-theme="dark"] .footer-description {
  color: #d1d5db;
}

.footer-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

[data-theme="dark"] .footer-subtitle {
  color: white;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.875rem;
  color: #4b5563;
  transition: color 0.2s;
  display: block;
}

.footer-link:hover {
  color: #2563eb;
}

[data-theme="dark"] .footer-link {
  color: #d1d5db;
}

[data-theme="dark"] .footer-link:hover {
  color: #60a5fa;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #9ca3af;
  transition: color 0.2s;
}

.social-link:hover {
  color: #4b5563;
}

[data-theme="dark"] .social-link {
  color: #9ca3af;
}

[data-theme="dark"] .social-link:hover {
  color: #d1d5db;
}

.footer-bottom {
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

[data-theme="dark"] .footer-bottom {
  border-top-color: #374151;
}

@media (min-width: 640px) {
  .footer-bottom {
    flex-direction: row;
  }
}

.footer-copyright {
  color: #6b7280;
}

[data-theme="dark"] .footer-copyright {
  color: #9ca3af;
}

.footer-stats {
  color: #6b7280;
  display: flex;
  gap: 0.5rem;
}

[data-theme="dark"] .footer-stats {
  color: #9ca3af;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>