<script>
    import { onMount } from "svelte";
    import {
        myMenuPages,
        screenSizeStore,
        userModelStore,
        userStore,
    } from "../../stores";
    import NavMyMenu from "../resuable/navs/nav_myMenu.svelte";
    import NavCreateCat from "./nav/navCreateCat.svelte";
    import NavCreateQRCode from "./nav/navCreateQRCode.svelte";
    import NavMenu from "./nav/navMenu.svelte";
    onMount((e)=>{
        myMenuPages.update((e) => {
            return { index: 1 };
        });
    })
</script>

{#if $screenSizeStore.size > 768 && ($userModelStore.displayName != undefined && $userStore == "authorized") || $userStore == "authorizing"}
    <NavMyMenu/>
{/if}

{#if $myMenuPages.index == 1}
    <NavMenu />
{:else if $myMenuPages.index == 2}
    <NavCreateCat />
{:else if $myMenuPages.index == 3}
    <NavCreateQRCode />
{/if}

<style>
</style>
