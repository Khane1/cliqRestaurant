<script>
	import { onMount } from "svelte";
	import { checkAuth } from "./appscripts";
	import OpeningScreen from "./Components/openingScreens/OpeningScreen.svelte";
	import Sidebar from "./Components/sidebar/sidebar.svelte";
	import Routes from "./routes.svelte";
	import Notifications from "svelte-notifications";
	import {
		screenSizeStore,
		userStore,
		userModelStore,
		pageNameStore,
		activeOrderStore,
		customerOrderHistory,
        clearMemory,
	} from "./stores";
	import {
		getAllMyOrders,
		getCategories,
	} from "./firebase/functions/restaurant_funcs/restaurants";
	import { customerOrder, getfbCategories } from "./functions_convert";
	import { getPendingPayments } from "./firebase/functions/restaurant_funcs/orders";
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
		clearMemory();
		console.log(window.location.href.includes("customer_order"));
		if (window.location.href.includes("customer_order")&& $userModelStore.uid==null) {
			pageNameStore.update((e) => {
				return { pageName: "makeOrder" };
			});
		}
		if ($userStore == "authorized") {
			getfbCategories($userModelStore.uid);
			getPendingPayments($userModelStore.uid);
			getAllMyOrders(
				$userModelStore.uid,
				$activeOrderStore != undefined &&
					$activeOrderStore.order != undefined
					? $activeOrderStore.order
					: []
			);
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
