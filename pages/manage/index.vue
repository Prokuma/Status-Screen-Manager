<template>
    <NuxtLayout>
        <v-container>
            <v-card max-width="500" class="mt-10 mx-auto">
                <v-card-text>
                    <v-card-title>デバイスリスト</v-card-title>
                    <v-list lines="two">
                        <v-list-item
                            v-for="device in devices"
                            :key="device.id"
                            :title="device.name"
                            :subtitle="device.id"
                        >
                            <template v-slot:prepend>
                                <v-avatar :color="colorMap[device.status]">
                                    <v-icon color="white">tekito</v-icon>
                                </v-avatar>
                            </template>
                            <template v-slot:append>
                                <v-btn
                                    icon="mdi-more"
                                    nuxt
                                    :to="`/manage/device/${ device.id }`"
                                >
                                </v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="w-100 px-4">
                        <v-btn x-large color="white" block class="mx-auto mb-5" nuxt to="/manage/add">
                            追加
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

import { getFirestore, getDocs, query, collection } from 'firebase/firestore';

interface Device {
    id: string;
    name: string;
    status: number;
}

var auth: Auth | null  = null;
var isSignIn = ref(false);
var devices: Ref<Array<Device>> = ref([]);
const title = useTitleStore();

const colorMap = ['#42AFD6', '#BB75D9', '#93E38F', '#EDFBC1', '#CBC2FF', '#7FFFD4'];

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
    title.value.title = "管理画面";

    const querySnapshot = await getDocs(collection(db, 'users/' + auth.currentUser!.uid + '/device_ids'));
    querySnapshot.forEach((doc) => {
        const data = {id: doc.id as string, name: doc.data().name as string, status: doc.data().status as number} as Device;
        devices.value.push(data);
    })
    console.log(devices)
})
</script>