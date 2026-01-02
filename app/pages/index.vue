<script setup lang="ts">
import { authClient } from '@/utils/clientAuth'

const { data: session } = await authClient.useSession(useFetch)
</script>

<template>
  <div>
    <pre>{{ session }}</pre>
  </div>
</template>
