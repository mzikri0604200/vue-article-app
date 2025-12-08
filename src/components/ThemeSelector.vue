<script setup>
import { useThemeStore } from '@/store/themeStore'
const themeStore = useThemeStore()

function changeTheme(e) {
	const value = e.target.value
	themeStore.setTheme(value)
}
</script>

<template>
	<div class="font-control mx-2">
		<select class="select select-border" :value="themeStore.theme" @change="changeTheme">
			<option disabled selected>Pick a color</option>
			<option v-for="theme in themeStore.availableThemes" :key="theme" :value="theme">{{ theme }}</option>
		</select>
	</div>
</template>