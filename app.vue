<template>
  <div>
    <h1>Check console.log() for test.</h1>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const user = useCurrentUser();

console.log(user);
</script>
