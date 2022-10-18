<script>
    import BodyWrapper from "../bodyWrapper.svelte";
    import { fly, fade } from "svelte/transition";

    import Header from "../resuable/header.svelte";
    import AccountSettings from "./accountSettings.svelte";
    import Admin from "./admin.svelte";
    import Logout from "./logout.svelte";
    import Contactus from "./contactus.svelte";

    let page = 2;
    function changePage(pg) {
        page = pg;
    }
</script>

<BodyWrapper>
    <Header title="Settings" />

    <div class="mt-10 flex  justify-evenly">
        <div class=" w-full space-y-10">
            <div on:click={() => changePage(1)}>
                <span class={page == 1 ? "isActive px-3 " : "" } in:fly>
                    Admin Settings
                </span>
            </div>
            <div on:click={() => changePage(2)}>
                <span class={page == 2 ? "isActive px-3" : ""} in:fade>
                    Account Settings
                </span>
            </div>
            <div on:click={() => changePage(3)}>
                <span class={page == 3 ? "isActive px-3" : ""} in:fade> Contact Us </span>
            </div>
            <div on:click={() => changePage(4)}>
                <span class={page == 4 ? "isActive px-3" : ""} in:fade> LogOut </span>
            </div>
        </div>

        <div class=" bg-blue-100 h-full w-full " in:fly>
            {#if page == 1}
                <Admin />
            {:else if page == 2}
                <AccountSettings />
            {:else if page == 3}
            <Contactus/>
            {:else if page==4}
            <Logout />
            {/if}
        </div>
    </div>
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
