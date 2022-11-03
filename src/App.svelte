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
	} from "./stores";		
	import {
		onLoadApp,
	} from "./functions_convert";
    import { stringify } from "uuid";
	let y;
	function screenSizeChange(y) {
		screenSizeStore.update((e) => {
			return { size: y };
		});
	}
	function handleThis(e) {
		console.log(e);
	}
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
			onLoadApp($businessModelStore.BusinessId);
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
				{#if $userStore == "authorized" || $userStore == "authorizing" || $pageNameStore.pageName == "makeOrder"}
					<Routes />
				{:else}
					<OpeningScreen />
				{/if}
			</div>
		</body>
	</main>
</Notifications>

<style>
</style>
