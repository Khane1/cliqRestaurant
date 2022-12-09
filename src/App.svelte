<script>
	import { onMount } from "svelte";
	import OpeningScreen from "./Components/openingScreens/OpeningScreen.svelte";
	import Sidebar from "./Components/sidebar/sidebar.svelte";
	import Routes from "./routes.svelte";
	import Notifications from "svelte-notifications";
	import {
		screenSizeStore,
		userStore,
		userModelStore,
		pageNameStore,
		clearMemory,
		fbMenuStore,
		businessModelStore,
		collabListStore,
	} from "./stores";
	import { onLoadApp } from "./functions_convert";
	import {
		collabListSnapshot,
		loadUser,
	} from "./firebase/functions/restaurant_funcs/restaurants";
	import { pingURL } from "./func_essential";
	import BottomBar from "./Components/myMenu/viewMenu/floating/bottomBar.svelte";
	let y;
	function screenSizeChange(y) {
		screenSizeStore.update((e) => {
			return { size: y };
		});
	}
	function handleThis(e) {
		console.log(e);
	}
	$: $collabListStore.forEach((e) => {
		if (e.uid == $userModelStore.uid && e.role != $userModelStore.role) {
			let user = $userModelStore;
			user.role = e.role;
			userModelStore.update((e) => {
				return user;
			});
		}
	});
	onMount((e) => {
		if (
			window.location.href.includes("customer_order") &&
			$userModelStore.uid == null
		) {
			clearMemory();
			pageNameStore.update((e) => {
				return { pageName: "makeOrder" };
			});
		}
		if ($userStore == "authorized") {
			pingURL();
			if ($businessModelStore != undefined) {
				collabListSnapshot($businessModelStore.BusinessId);
				onLoadApp($businessModelStore.BusinessId);
			} else {
				// loadUser($userModelStore);
			}
		}
	});
</script>

<span class="hidden">
	{screenSizeChange(y)}
</span>
<svelte:window on:change={handleThis} bind:innerWidth={y} />
<Notifications>

	<main class="flex md:space-x-30 md:space-x-80 ">
		{#if y > 640}
			<div class="sm:hidden  md:block ">
				<Sidebar />
			</div>
		{/if}
		<body>
			<div class=" px-5 py-0">
				<Routes />
			</div>
		</body>
	</main>
</Notifications>

{#if ($screenSizeStore.size < 768 && $userModelStore.displayName != undefined && $userStore == "authorized")}
<BottomBar />
{/if}

<style>
</style>
