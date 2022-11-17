<script>
    import { fade, fly } from "svelte/transition";
    import {
        categoryStore,
        customerOrderStore,
        userModelStore,
        userStore,
    } from "../../stores";
    export let selectedId, selectedSub;
</script>

{#if $userStore != "authorized"}
    <div
        class="mt-60 "
        in:fly={{ y: 100, duration: 2000 }}
        out:fly={{ y: 50, duration: 500 }}
    >
        <div style="text-align: center;" class="text-2xl text-green-600">
            Welcome to {$userStore == "authorized"
                ? $userModelStore.displayName
                : $customerOrderStore.restaurant}!
        </div>
        <div class="flex justify-center">
            <span
                class=" mt-5 rounded border px-5 py-1"
                on:click={() => {
                    selectedId =
                        $categoryStore.value != undefined
                            ? $categoryStore.value[0].categoryId
                            : 0;
                    selectedSub =
                        $categoryStore.value != undefined
                            ? $categoryStore.value[0].subMenu.length > 0
                                ? $categoryStore.value[0].subMenu[0].id
                                : "*"
                            : "*";
                }}>View Our Menu</span
            >
        </div>
        </div>
{:else}
    <div class="mt-40 ">
        <div class="text-2xl text-slate-600">
            Welcome to {$userStore == "authorized"
                ? $userModelStore.displayName
                : $customerOrderStore.restaurant}!
        </div>
        <span
            class="flex justify-center"
            on:click={() => {
                selectedId =
                    $categoryStore.value != undefined
                        ? $categoryStore.value[0].categoryId
                        : 0;
                selectedSub =
                    $categoryStore.value != undefined
                        ? $categoryStore.value[0].subMenu.length > 0
                            ? $categoryStore.value[0].subMenu[0].id
                            : "*"
                        : "*";
            }}>View Our Menu</span
        >
    </div>
{/if}
