<template>
  <h1>информация о пользователе {{ user?.displayName }}</h1>
  <p>Эту информацию о вас мы узнали:</p>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
// @TODO закрыть доступ неавторизованным пользователям

const user = useCurrentUser();
</script>
