<script>
    import BodyWrapper from "../bodyWrapper.svelte";
    import { fly, fade } from "svelte/transition";

    import Header from "../resuable/header.svelte";
    import AccountSettings from "./accountSettings.svelte";
    import Logout from "./logout.svelte";
    import Contactus from "./contactus.svelte";
    import Team from "./team.svelte";
    import BrandColors from "./brandColors.svelte";

    let page = 1;
    function changePage(pg) {
        page = pg;
    }
</script>

<BodyWrapper>
    <Header title="Settings" />

    <div class="mt-10 flex  justify-evenly">
        <div class=" w-1/2 space-y-10">
            <div on:click={() => changePage(1)}>
                <span class={page == 1 ? "isActive px-3" : ""} in:fade>
                    Account Settings
                </span>
            </div>
            <div on:click={() => changePage(2)}>
                <span class={page == 2 ? "isActive px-3 " : ""} in:fly>
                    Brand Colors
                </span>
            </div>
            <div on:click={() => changePage(3)}>
                <span class={page == 3 ? "isActive px-3 " : ""} in:fly>
                    Team
                </span>
            </div>
            <div on:click={() => changePage(4)}>
                <span class={page == 4 ? "isActive px-3" : ""} in:fade>
                    Contact Us
                </span>
            </div>
            <div on:click={() => changePage(5)}>
                <span class={page == 5 ? "isActive px-3" : ""} in:fade>
                    LogOut
                </span>
            </div>
        </div>

        <div class="bg-blue-100 rounded-md h-full w-full " in:fly>
            {#if page == 1}
            <AccountSettings />
            {:else if page == 2}
            <BrandColors />
            {:else if page == 3}
                <Team/>
            {:else if page == 4}
                <Contactus />
            {:else if page == 5}
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
