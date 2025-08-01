<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <Card class="flex flex-col h-full overflow-hidden">
    <CardContent class="p-6 flex flex-col flex-1 min-h-0">
      <slot />
    </CardContent>
  </Card>
</template>