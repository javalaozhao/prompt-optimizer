<template>
  <div class="bg-background border border-border rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
    <img v-if="image" :src="image" alt="Blog post image" class="w-full h-40 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-bold text-text-primary">{{ title }}</h3>
      <p class="text-sm text-text-secondary mt-2">{{ summary }}</p>
      <p class="text-xs text-text-secondary mt-4">{{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  title: string;
  summary: string;
  date: string;
}>();
</script>
