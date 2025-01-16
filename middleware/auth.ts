export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  // Если пользователь авторизован и открывает страницу авторизации, то перенаправляем на главную страницу
  if (user && to.name === "login") {
    return navigateTo("/");
  }

  // Если пользователь не авторизирован и мы ещё не направляемся на страницу входа
  if (!user && to.path !== "/login") {
    // перенаправляемся на страницу логина
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
