<template>
  <div class="bg-background border border-border rounded-lg shadow-sm p-4 flex flex-col items-start gap-3 transition-all hover:shadow-md">
    <div class="bg-light-gray p-2 rounded-md">
      <span class="text-2xl">{{ icon }}</span>
    </div>
    <h3 class="text-lg font-bold text-text-primary">{{ title }}</h3>
    <p class="text-sm text-text-secondary">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>
