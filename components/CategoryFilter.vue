<template>
  <select
    v-model="selectedCategory"
    class="p-2 border rounded"
    @change="updateFilter"
  >
    <option value="">Все категории</option>
    <option
      v-for="category in store.categories"
      :key="category"
      :value="category"
    >
      {{ category }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useShoppingStore } from "@/stores/useShoppingStore";

// Инициализируем store
const store = useShoppingStore();

// Текущая выбранная категория для фильтрации
const selectedCategory = ref("");

// Вычисляемый список с учётом фильтра по категории
const filteredItems = computed(() => {
  if (!selectedCategory.value) {
    return store.items;
  }
  return store.getItemsByCategory(selectedCategory.value);
});

/********************************************
 * Передача данных родительскому компоненту *
 ********************************************/
// объявление события, которое компонент может отправлять родителю
const emit = defineEmits(["update:filteredItems", "update:selectedCategory"]);

/**
 * Функция вызывается каждый раз, когда пользователь меняет категорию в select
 * Она отправляет родителю новый отфильтрованный список
 * и выбранную категорию через событие
 */
const updateFilter = () => {
  emit("update:filteredItems", filteredItems.value);
  emit("update:selectedCategory", selectedCategory.value);
};

// Экспортируем filteredItems для родительского компонента
defineExpose({
  filteredItems,
  selectedCategory,
});
</script>
