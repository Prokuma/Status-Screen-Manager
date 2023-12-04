<template>
    <v-app>
        <v-snackbar v-model="successAlert.show" color="success" top right>
            {{ successAlert.message }}
        </v-snackbar>
        <v-snackbar v-model="failedAlert.show" color="error" top right>
            {{ failedAlert.message }}
        </v-snackbar>
        <v-app-bar absolute app dark elevate-on-scroll id="appbar" scroll-target="#scrolling-target">
            <v-icon></v-icon>
            <v-toolbar-title>{{ title.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="signIn()" v-if="!isSignIn"> ログイン </v-btn>
            <v-btn @click="signOutUser()" v-if="isSignIn"> ログアウト </v-btn>
        </v-app-bar>
        <v-main id="scrolling-target" class="overflow-y-auto" style="height: 100vh">
            <slot />
        </v-main>
    </v-app>
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

const successAlert = useSuccessAlertMessageStore();
const failedAlert = useFailedAlertMessageStore();
const title = useTitleStore();
var auth: Auth | null = null;
var isSignIn = ref(false);
var selected_page_title = ref("Status Screen");
var status_message = ref("");
var error_message = ref("");
var snackbar_status = ref(false);
var snackbar_error = ref(false);

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth!, (user) => {
            if (user != null) {
                isSignIn.value = true
            } else {
                isSignIn.value = false
            }
        }
    );
});

watch(successAlert, (now, prev) => {
    status_message.value = now.message;
    snackbar_status.value = true;
});

watch(failedAlert, (now, prev) => {
    error_message.value = now.message;
    snackbar_error.value = true;
});

watch(title, (now, prev) => {
    selected_page_title.value = now.title;
});

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
    if (getAuth() != null) {
        signOut(getAuth()).then(() => {
            isSignIn.value = false
            navigateTo("/")
        })
    }
};
</script>