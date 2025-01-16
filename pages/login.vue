<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <p>Для входа в систему необходимо авторизоваться в Google.</p>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Доступ только неавторизованным пользователям
definePageMeta({
  middleware: ["auth"],
});

// @TODO перенести в хелпер
const auth = useFirebaseAuth();

const loginWithGoogle = async () => {
  // Проверяем наличие объекта auth, без которого авторизация невозможна
  if (!auth) return;

  try {
    // Используем composable из Nuxt для доступа к текущему маршруту
    const route = useRoute();

    // Получаем путь для редиректа из query-параметров URL
    // Если параметр redirect отсутствует, используем корневой путь '/' как дефолтный
    let redirectPath = (route.query.redirect as string) || "/";

    // Проверка безопасности редиректа:
    // 1. Путь должен начинаться с '/' (быть относительным)
    // 2. Не должен содержать '://' (защита от редиректа на внешние сайты)
    // Если проверки не пройдены - редиректим на главную страницу
    if (!redirectPath.startsWith("/") || redirectPath.includes("://")) {
      console.warn(
        "Обнаружен потенциально небезопасный путь редиректа:",
        redirectPath
      );
      redirectPath = "/";
    }

    // Выполняем вход через Google с помощью Firebase Auth
    // signInWithPopup открывает всплывающее окно для выбора аккаунта Google
    // и возвращает Promise, который резолвится после успешной авторизации
    await signInWithPopup(auth, new GoogleAuthProvider());

    // После успешной авторизации:
    // 1. Получаем экземпляр роутера для программной навигации
    const router = useRouter();
    // 2. Перенаправляем пользователя на запрошенную страницу
    await router.push(redirectPath);
  } catch (error) {
    // Логируем ошибку для отладки
    console.error("Ошибка при входе через Google:", error);

    // TODO: Здесь можно добавить пользовательское уведомление об ошибке
    // Например, показать toast или alert с понятным описанием проблемы
  }
};
</script>
