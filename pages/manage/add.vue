<template>
    <NuxtLayout>
        <v-container>
            <v-card max-width="500" class="mt-10 mx-auto">
                <v-card-text>
                    <v-card-title>デバイス登録</v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="device_id" label="デバイスID" required />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="device_name" label="デバイス名" required />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="w-100 px-4">
                        <v-btn x-large color="white" block class="mx-auto mb-5" @click="addDevice()">
                            登録
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-container>
    </NuxtLayout>
</template>
  
<script lang="ts" setup>
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const successAlert = useSuccessAlertMessageStore();
const failedAlert = useFailedAlertMessageStore();
const title = useTitleStore();

var device_name = ref("");
var device_id = ref("");

onMounted(() => {
    title.value.title = "デバイス追加";
})

async function addDevice() {
    const auth = getAuth();
    const db = getFirestore();

    var currentUser = auth.currentUser;
    if (currentUser != null) {
        try {
            const docRef = await setDoc(doc(db, 'users/' + currentUser.uid + '/device_ids', device_id.value), {
                name: device_name.value,
                status: 0
            });
            successAlert.value.message = "デバイスを追加しました。";
            successAlert.value.show = true;
            navigateTo("/manage");
            console.log("Added the device!", docRef);
        } catch (e) {
            failedAlert.value.message = "デバイスの追加に失敗しました。";
            failedAlert.value.show = true;
            console.log(e);
        }
    } else {
        failedAlert.value.message = "不正な操作です。";
        failedAlert.value.show = true;
    }
}
</script>