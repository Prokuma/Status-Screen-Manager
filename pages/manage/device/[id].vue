<template>
    <NuxtLayout>
        <v-container>
            <v-card max-width="500" class="mt-10 mx-auto">
                <v-card-text v-if="device != null">
                    <v-card-title>{{ device.name }}</v-card-title>
                    <v-card-container>
                        <v-text-field v-model="status_set">
                            <template v-slot:append>
                                <v-icon color="red">
                                    mdi-plus
                                </v-icon>
                                <v-icon color="green">
                                    mdi-minus
                                </v-icon>
                            </template>
                            <template v-slot:prepend>
                                状態
                            </template>
                        </v-text-field>
                    </v-card-container>
                </v-card-text>
                <v-card-actions>
                    <div class="w-100 px-4">
                        <v-btn x-large color="white" block class="mx-auto mb-5" @click="updateStatus()">
                            適用
                        </v-btn>
                        <v-btn x-large color="red" block class="mx-auto mb-5" @click="deleteDevice()">
                            削除
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-container>
    </NuxtLayout>
</template>
  
<script lang="ts" setup>
import {
    Auth,
    getAuth,
    onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { stat } from 'fs';

interface Device {
    id: string;
    name: string;
    status: number;
}

var auth: Auth | null = null;
var isSignIn = ref(false);
var device: Ref<Device | null> = ref(null);
var status_set = ref("");
const title = useTitleStore();
const route = useRoute();
const successAlert = useSuccessAlertMessageStore();
const failedAlert = useFailedAlertMessageStore();
const { id } = route.params;

const colorMap = ['#42AFD6', '#BB75D9', '#93E38F', '#EDFBC1', '#BFCBC2'];

onMounted(async () => {
    const db = getFirestore();
    auth = getAuth();
    onAuthStateChanged(auth!, (user) => {
        if (user != null) {
            isSignIn.value = true;
        } else {
            isSignIn.value = false;
        }
    });
    title.value.title = "状態変更";

    try {
        const querySnapshot = await getDoc(doc(db, 'users/' + auth.currentUser!.uid + '/device_ids', id as string));
        const data = querySnapshot.data()!;
        device.value = { id: id as string, name: data.name, status: data.status };
    } catch(e) {
        console.log(e);
    }
})

async function updateStatus() {
    const db = getFirestore();
    try {
        await updateDoc(doc(db, 'users/' + auth?.currentUser!.uid + '/device_ids', id as string), {
            status: Number(status_set.value)
        });
        successAlert.value.message = "状態をアップデートしました。";
        successAlert.value.show = true;
        navigateTo("/manage");
    } catch (e) {
        failedAlert.value.message = "状態のアップデートに失敗しました。";
        failedAlert.value.show = true;
        console.log(e);
    }
}

async function deleteDevice() {
    const db = getFirestore();
    try {
        await deleteDoc(doc(db, 'users/' + auth?.currentUser!.uid + '/device_ids', id as string));
        navigateTo("/manage");
        successAlert.value.message = "デバイスを削除しました。";
        successAlert.value.show = true;
    } catch (e) {
        failedAlert.value.message = "デバイスの削除に失敗しました。";
        failedAlert.value.show = true;
        console.log(e);
    }
}
</script>