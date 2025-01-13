<template>
  <div>
    <h1>Check console.log() for test.</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <br />
    <button @click="logoutWithGoogle">Logout with Google</button>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const user = useCurrentUser();

// @TODO удалить
console.log(user);

// @TODO перенести в мидлваре
const auth = useFirebaseAuth();

const loginWithGoogle = () => {
  // auth может быть null, что нам не подходит
  if (auth) {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
};

const logoutWithGoogle = () => {
  auth?.signOut();
};
</script>
