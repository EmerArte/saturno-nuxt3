export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const unProtectedRoutes = ['/login', '/sign-up'];
  const found = unProtectedRoutes.find((freeRoute) => freeRoute === to.path);
  if (!user.value && found === undefined) {
    return navigateTo('/login');
  } else if (user.value && found != undefined) {
    return navigateTo('/dashboard');
  }
});
