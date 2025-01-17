<template>
  <div class="shopping-list">
    <!-- Форма добавления нового элемента -->
    <ShoppingItemForm />

    <!-- Фильтры и статистика -->
    <div class="flex justify-between items-center mb-4">
      <!-- @TODO статистика -->
      <CategoryFilter ref="categoryFilter" />
    </div>

    <!-- Список покупок -->
    <div class="space-y-2">
      <div
        v-for="item in filteredItems"
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
    <div
      v-if="filteredItems.length === 0"
      class="text-center py-8 text-gray-500"
    >
      {{
        currentCategory ? "В этой категории нет покупок" : "Список покупок пуст"
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Инициализируем store
const store = useShoppingStore();

/********************************************
 * Получение данных из дочернего компонента *
 *************  CategoryFilter  *************
 ********************************************/
/**
 * Объявляем свойство, которое будет принимать данные из дочернего компонента
 * Выбранную категорию
 */
const categoryFilter = ref();

/**
 * Обработчик события, когда данные из дочернего компонента изменяются
 * Вычисляемый список с учётом фильтра по категории
 */
const filteredItems = computed(
  () => categoryFilter.value?.filteredItems || store.items
);

// Текущая выбранная категория для фильтрации
const currentCategory = computed(
  () => categoryFilter.value?.selectedCategory || ""
);
</script>
