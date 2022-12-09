<script>
    import BodyWrapper from "../bodyWrapper.svelte";
    import { fly, fade } from "svelte/transition";

    import Header from "../resuable/header.svelte";
    import AccountSettings from "./accountSettings.svelte";
    import Logout from "./logout.svelte";
    import Contactus from "./contactus.svelte";
    import Team from "./team.svelte";
    import BrandColors from "./brandColors.svelte";
    import { execRights } from "../../func_essential";
    import { screenSizeStore, userModelStore } from "../../stores";
    import Drawer from "./drawer/drawer.svelte";
    $: drawerLink = true;
    let page = 1;
    function changePage(pg) {
        page = pg;
        drawerLink=!drawerLink;
    }
</script>
<BodyWrapper>
    {#if $screenSizeStore.size > 768}
    <Header title="Settings" />

    <div class="mt-10 flex  justify-evenly">
        <div class=" w-1/2 space-y-10">
            <div on:click={() => changePage(1)}>
                <span class={page == 1 ? "isActive px-3" : ""} >
                    Account Settings
                </span>
            </div>
            {#if execRights($userModelStore)}
            <div on:click={() => changePage(2)}>
                <span class={page == 2 ? "isActive px-3 " : ""}>
                    Brand Colors
                </span>
            </div>
            <div on:click={() => changePage(3)}>
                <span class={page == 3 ? "isActive px-3 " : ""}>
                    Team
                </span>
            </div>
            {/if}
            <div on:click={() => changePage(4)}>
                <span class={page == 4 ? "isActive px-3" : ""} >
                    Contact Us
                </span>
            </div>
            <div on:click={() => changePage(5)}>
                <span class={page == 5 ? "isActive px-3" : ""} >
                    LogOut
                </span>
            </div>
        </div>

        <div class="border shadow rounded-md h-full w-full ">
            {#if page == 1}
            <AccountSettings />
            {:else if page == 2 && execRights($userModelStore)}
            <BrandColors />
            {:else if page == 3 && execRights($userModelStore)}
                <Team/>
            {:else if page == 4 }
                <Contactus />
            {:else if page == 5}
                <Logout />
            {/if}
        </div>
    </div>
    {:else}
    <Drawer changePage={changePage} bind:page execRights={execRights} bind:drawerLink/>
    {/if}
</BodyWrapper>
<style>
    .isActive {
        background-color: rgb(239, 239, 239);
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
