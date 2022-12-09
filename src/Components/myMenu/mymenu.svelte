<script>
    import { onMount } from "svelte";
    import { stringify } from "uuid";
    import { crudRights } from "../../func_essential";
    import {
        myMenuPages,
        pageNameStore,
        screenSizeStore,
        userModelStore,
        userStore,
    } from "../../stores";
    import NoPermission from "../resuable/Error/no_permission.svelte";
    import NavMyMenu from "../resuable/navs/nav_myMenu.svelte";
    import NavCreateCat from "./nav/navCreateCat.svelte";
    import NavCreateQRCode from "./nav/navCreateQRCode.svelte";
    import NavMenu from "./nav/navMenu.svelte";
    import BottomBar from "./viewMenu/floating/bottomBar.svelte";
    onMount((e) => {
        myMenuPages.update((e) => {
            return { index: 1 };
        });
    });
</script>

{#if ($screenSizeStore.size > 768 && $userModelStore.displayName != undefined && $userStore == "authorized") || $userStore == "authorizing"}
    <NavMyMenu />
{/if}

{#if $myMenuPages.index == 1}
    <NavMenu />
{:else if $myMenuPages.index == 2 && crudRights($userModelStore)}
    <NavCreateCat />
{:else if $myMenuPages.index == 3 && crudRights($userModelStore)}
    <NavCreateQRCode />
{:else if !crudRights($userModelStore)}
    {crudRights($userModelStore)}
    <NoPermission />
{/if}

<style>
</style>
