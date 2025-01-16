<template>
  <h1>Hallo</h1>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Тест
// Получаем доступ к хранилищу
const shoppingStore = useShoppingStore();

// Проверим содержимое
console.log(shoppingStore);
</script>
