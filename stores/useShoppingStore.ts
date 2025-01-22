import { addDoc, collection, type DocumentData } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { defineStore } from "pinia";

// Определяем интерфейс для отдельного элемента списка покупок
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
  createdAt: Date;
  category?: string;
  notes?: string;
}

// Определяем интерфейс для состояния хранилища
interface ShoppingState {
  items: ShoppingItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

// Имя коллекции в Firebase
const COLLECTION_NAME = "shoppingItems";

/**
 * Вспомогательные (приватные) методы для работы с Firebase
 */
const storeHelpers = {
  // Сохранение данных в Firebase
  async addDocToFirebase(
    item: Omit<ShoppingItem, "id">
  ): Promise<DocumentData> {
    // Используем $db для доступа к базе данных
    //const { $db } = useNuxtApp();
    // Получаем доступ к базе данных через VueFire
    const db = useFirestore();

    try {
      // Добавляем элемент в базу данных
      // В первый раз ещё и создаст "коллекцию"
      return await addDoc(
        // авторизация и указание на "коллекцию"
        collection(db, COLLECTION_NAME),
        // данные для добавления
        item
      );
    } catch (e) {
      console.error("Ошибка при добавлении shoppingItem: ", e);
      return { id: undefined };
    }
  },
};

// Создаём store с использованием Composition API стиля
export const useShoppingStore = defineStore("shopping", {
  // Начальное состояние
  state: (): ShoppingState => ({
    items: [],
    categories: ["Продукты", "Бытовая химия", "Другое"],
    isLoading: false,
    error: null,
  }),

  // Геттеры - вычисляемые свойства store
  getters: {
    // @TODO Получаем количество элементов в списке
    // @TODO Получаем только невыполненные элементы
    // Получаем элементы по категории
    getItemsByCategory: (state) => {
      return (category: string) =>
        state.items.filter((item) => item.category === category);
    },
    // @TODO Проверяем, есть ли незавершённые элементы
  },

  // Actions - методы для изменения состояния
  actions: {
    // @TODO Добавление нового элемента в
    async addItem(item: Omit<ShoppingItem, "id" | "createdAt">) {
      // @TODO проверить есть ли элемент с таким именем
      // Создаём новый элемент
      const newItem: Omit<ShoppingItem, "id"> = {
        createdAt: new Date(),
        ...item,
      };

      // Добавляем элемент в базу данных, получаем ID
      // В первый раз ещё и создаст "коллекцию"
      const docRef = await storeHelpers.addDocToFirebase(newItem);

      // Добавляем элемент в список, добавляя ему ID
      this.items.push({ id: docRef.id, ...newItem });
    },
    // @TODO Удаление элемента из списка
    // @TODO Обновление существующего элемента
    // @TODO Переключение статуса выполнения
    // @TODO Добавление новой категории
    // @TODO Загрузка данных из Firebase
    // @TODO Очистка списка
  },
});
