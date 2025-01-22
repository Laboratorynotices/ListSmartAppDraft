import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
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
const COLLECTION_NAME: string = "shoppingItems" as const;

/**
 * Вспомогательные (приватные) методы для работы с Firebase
 */
const storeHelpers = {
  // Сохранение данных в Firebase
  async addDocToFirebase(
    item: Omit<ShoppingItem, "id">
  ): Promise<DocumentData> {
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
      console.error(`Ошибка при добавлении ${COLLECTION_NAME}:`, e);
      return { id: undefined };
    }
  },
  /**
   * Удаление элемента из Firebase.
   * @param store контекст хранилища
   * @param id идентификатор элемента для удаления
   */
  async deleteDocFromFirebase(
    store: ReturnType<typeof useShoppingStore>,
    id: string
  ): Promise<void> {
    // Получаем доступ к базе данных через VueFire
    const db = useFirestore();

    try {
      // Получаем указатель на элемент, который нужно удалить
      const docRef = doc(db, COLLECTION_NAME, id);

      // Удаляем элемент
      await deleteDoc(docRef);
    } catch (e) {
      store.error = "Ошибка при удалении элемента";
      console.error(`Ошибка при удалении ${COLLECTION_NAME}:`, e);
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
    // Удаление элемента из списка
    removeItem(itemId: string) {
      // Используем метод findIndex для поиска индекса элемента в массиве по его id
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        // Если элемент найден (индекс больше -1),
        // используем метод splice для удаления одного элемента начиная с найденного индекса
        this.items.splice(index, 1);

        // Удаляем элемент из базы данных
        storeHelpers.deleteDocFromFirebase(this, itemId);
      } else {
        // Если элемент не найден, выводим сообщение об ошибке
        console.log("Элемент не найден");
        this.error = "Элемент не найден";
      }
    },
    // @TODO Обновление существующего элемента
    // @TODO Переключение статуса выполнения
    // @TODO Добавление новой категории
    // @TODO Загрузка данных из Firebase
    // Загрузка данных из Firebase
    async loadFromFirebase() {
      // Получаем доступ к базе данных через VueFire
      const db = useFirestore();

      try {
        // Делаем из полученных данных массив и приводим к формату списка ShoppingItem
        this.items = (await getDocs(collection(db, COLLECTION_NAME))).docs.map(
          (doc) => ({
            ...(doc.data() as ShoppingItem),
            id: doc.id,
          })
        );
      } catch (e) {
        this.error = "Ошибка при загрузке данных";
        console.error("Ошибка при загрузке из Firebase:", e);
      }
    },
    // @TODO Очистка списка
  },
});
