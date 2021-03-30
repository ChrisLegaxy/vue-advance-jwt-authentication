<script lang="ts">
import Vue from 'vue';
import { getCurrentUser } from '@/api/auth';

export default Vue.extend({
  async mounted() {
    await getCurrentUser();
  },
});
</script>

<template>
  <main>
    <h1>
      Home
    </h1>
  </main>
</template>
