<template>
  <h1>Hallo</h1>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Тест
// Получаем доступ к хранилищу
const shoppingStore = useShoppingStore();

// Добавляем товар
shoppingStore.addItem({
  name: "Молоко",
  quantity: 1,
  completed: false,
  category: "Продукты",
});

// Проверим содержимое
console.log(shoppingStore.items);
</script>
