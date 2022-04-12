<script setup lang="ts">
import { useUserStore } from './stores/user'

const user = useUserStore();
</script>

<template>
  <router-view></router-view>  
</template>
