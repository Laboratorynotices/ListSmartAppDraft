<template>
  <ShoppingList />
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Доступ только авторизованным пользователям
definePageMeta({
  middleware: ["auth"],
});

// Тест
// Получаем доступ к хранилищу
const shoppingStore = useShoppingStore();

// Проверим содержимое
console.log(shoppingStore.items);
</script>
