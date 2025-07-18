<template>
  <footer class="modern-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span class="copyright">
          © 2024 Prompt Generator. All rights reserved.
        </span>
      </div>
      
      <div class="footer-center">
        <div class="footer-links">
          <a href="#" class="footer-link">关于</a>
          <a href="#" class="footer-link">帮助</a>
          <a href="#" class="footer-link">隐私</a>
          <a href="#" class="footer-link">条款</a>
        </div>
      </div>
      
      <div class="footer-right">
        <div class="footer-stats">
          <span class="stat-item">
            <span class="stat-label">版本:</span>
            <span class="stat-value">v1.3.0</span>
          </span>
          <span class="stat-item">
            <span class="stat-label">构建:</span>
            <span class="stat-value">{{ buildTime }}</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const buildTime = computed(() => {
  return new Date().toLocaleDateString('zh-CN')
})
</script>

<style scoped>
.modern-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left {
  flex: 1;
}

.copyright {
  color: var(--color-text-muted);
}

.footer-center {
  flex: 1;
  text-align: center;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

.footer-right {
  flex: 1;
  text-align: right;
}

.footer-stats {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.stat-item {
  display: flex;
  gap: 0.25rem;
}

.stat-label {
  color: var(--color-text-muted);
}

.stat-value {
  color: var(--color-text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .footer-left,
  .footer-center,
  .footer-right {
    text-align: center;
  }
  
  .footer-links,
  .footer-stats {
    justify-content: center;
  }
}
</style>