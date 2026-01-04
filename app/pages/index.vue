<script setup lang="ts">
import { authClient } from '@/utils/clientAuth'

const { data: session } = await authClient.useSession(useFetch)
</script>

<template>
  <div>
    <h1>Hallo Welt</h1>
    <pre>{{ session }}</pre>
  </div>
</template>
