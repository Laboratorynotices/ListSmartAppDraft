<template>
  <div class="shopping-list">
    <!-- Форма добавления нового элемента -->

    <!-- Фильтры и статистика -->

    <!-- Список покупок -->
    <div class="space-y-2">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="flex items-center p-3 border rounded hover:bg-gray-50"
        :class="{ 'bg-gray-100': item.completed }"
      >
        <div class="flex-grow">
          <div :class="{ 'line-through text-gray-500': item.completed }">
            {{ item.name }}
          </div>
          <div class="text-sm text-gray-600">
            {{ item.category || "Без категории" }} • {{ item.quantity }} шт.
          </div>
        </div>
        Удалить
      </div>
    </div>

    <!-- Сообщение, если список пуст -->
    <div v-if="store.items.length === 0" class="text-center py-8 text-gray-500">
      'Список покупок пуст'
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Инициализируем store
const store = useShoppingStore();
</script>
