<template>
  <div>
    <h1>Check console.log() for test.</h1>
    <br />
    <button v-if="user" @click="logoutAuth">Logout</button>
  </div>
  <hr />
  <div>
    <nuxtPage />
  </div>
</template>

<script setup lang="ts">
const user = useCurrentUser();

// @TODO удалить
console.log(user);

// @TODO перенести в хелпер
const auth = useFirebaseAuth();
const router = useRouter();

const logoutAuth = () => {
  auth?.signOut();
  // Альтернатива signOut(auth) из "firebase/auth"
  router.push("/");
};
</script>
