<script setup>
import { useAuthStore } from '@/store/auth';
import CustomApi from '@/utils/api';
import { useMutation } from '@tanstack/vue-query';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();


const profileMutation = useMutation({
	mutationFn: async () => {
		await CustomApi.put('/user', {
			user: {
				username: username.value,
				image: image.value,
				bio: bio.value
			}
		},
			{
				headers: {
					Authorization: `Token ${authStore.token}`
				}
			}
		)
	},
	onSuccess: () => {
		router.replace({ name: 'profile' });
	},
	onError: (err) => {
		console.log(err);
	}

})

const props = defineProps({
	isUpdate: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
	}
})

// State
const image = ref('');
const bio = ref('');
const username = ref('');

onMounted(() => {
	if (props.isUpdate && props.data) {
		image.value = props.data.user.image;
		bio.value = props.data.user.bio;
		username.value = props.data.user.username;
	}
})

const handleSubmit = () => {
	profileMutation.mutate();
}

</script>
<template>
	<form @submit.prevent="handleSubmit">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Username</legend>
			<input type="text" class="input w-full" placeholder="username" v-model="username" />
		</fieldset>
		<fieldset class="my-2 fieldset">
			<legend class="fieldset-legend">URL Profile Image</legend>
			<label class="input w-full">
				<span class="label">https://</span>
				<input type="text" v-model="image" placeholder="Masukan URL of profile picture " />
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Biodata</legend>
			<textarea v-model="bio" class="textarea w-full" placeholder="Masukan Biodata Anda"></textarea>
		</fieldset>
		<div class="flex gap-4">
			<button type="submit" class="btn btn-warning mt-4">
				{{ props.isUpdate ? 'Update Profile' : 'Buat Profile' }}
			</button>
			<RouterLink :to="{ name: 'profile' }" type="button" class="btn btn-outline btn-error mt-4">
				Cancel
			</RouterLink>
		</div>
	</form>
</template>