<template>
    <NuxtLayout>
        <v-container class="mt-n3 px-0">
            <h1>Status Screen Manager</h1>
            <p>ログインはこちら↓</p>
            <div v-if="!isSignIn">
                <v-btn @click="signIn">
                    Githubでログイン
                </v-btn>
            </div>
            <div v-else>
                <v-btn @click="signOutUser">
                    ログアウト
                </v-btn>
            </div>
        </v-container>
    </NuxtLayout>
</template>
  
<script lang="ts" setup>
import {
    Auth,
    getAuth,
    onAuthStateChanged,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

var auth: Auth | null  = null;
var isSignIn = ref(false);
const title = useTitleStore();
title.value.title = "メイン";

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth!, (user) => {
        if (user != null) {
            isSignIn.value = true;
            navigateTo("manage/");
        } else {
            isSignIn.value = false;
        }
    });
})

function signIn() {
    var provider = new GithubAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((auth) => {
            console.log("login", auth.user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("faild to login", errorCode, errorMessage);
        });
};

function signOutUser() {
    signOut(getAuth());
};
</script>