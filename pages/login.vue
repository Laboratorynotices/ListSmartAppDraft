<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <p>Для входа в систему необходимо авторизоваться в Google.</p>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// @TODO перенести в хелпер
const auth = useFirebaseAuth();

const loginWithGoogle = () => {
  // auth может быть null, что нам не подходит
  if (auth) {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
};
</script>
