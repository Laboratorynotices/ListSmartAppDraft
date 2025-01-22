<template>
  <form @submit.prevent="addNewItem" class="mb-6">
    <div class="flex gap-4 mb-4">
      <input
        v-model="newItem.name"
        type="text"
        placeholder="Что нужно купить?"
        class="flex-grow p-2 border rounded"
        required
      />
      <input
        v-model.number="newItem.quantity"
        type="number"
        min="1"
        class="w-20 p-2 border rounded"
        required
      />
    </div>
    <div class="flex gap-4 mb-4">
      <select v-model="newItem.category" class="p-2 border rounded">
        <option value="">Выберите категорию</option>
        <option
          v-for="category in store.categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Добавить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useShoppingStore } from "@/stores/useShoppingStore";

// Инициализируем store
const store = useShoppingStore();

// Состояние для нового элемента
const newItem = ref({
  name: "",
  quantity: 1,
  category: "",
  completed: false,
});

// Метод добавления нового элемента
const addNewItem = async () => {
  store.addItem({
    name: newItem.value.name,
    quantity: newItem.value.quantity,
    category: newItem.value.category,
    completed: newItem.value.completed,
  });

  // Очищаем форму
  newItem.value.name = "";
  newItem.value.quantity = 1;
  newItem.value.category = "";
};
</script>
