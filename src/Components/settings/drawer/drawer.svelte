<script>
    import { screenSizeStore, userModelStore } from "../../../stores";

    import { fly,fade } from "svelte/transition";
    import AccountSettings from "../accountSettings.svelte";
    import BrandColors from "../brandColors.svelte";
    import Team from "../team.svelte";
    import Contactus from "../contactus.svelte";
    import Logout from "../logout.svelte";
    export let changePage, page, execRights, drawerLink;
</script>

<div
    on:click={() => {
        drawerLink = !drawerLink;
        console.log(drawerLink);
    }}
>
{#if drawerLink==false}
    <svg width="32" height="24">
        <line id="top" x1="0" y1="2" x2="32" y2="2" />
        <line id="middle" x1="0" y1="12" x2="24" y2="12" />
        <line id="bottom" x1="0" y1="22" x2="32" y2="22" />
    </svg>
    {:else}
    <span class="text-5xl">
        &times;
    </span>
    {/if}
</div>
<div class="aside ml-5 mt-10 flex  justify-evenly">
    {#if drawerLink == true}
        <div class=" w-1/2 space-y-10" in:fly="{{ x: -50, duration: 700 }}" out:fly="{{x:-50,duration:0}}">
            <div on:click={() => changePage(1)}>
                <span class={page == 1 ? "isActive px-2 " : ""}>
                    Account Settings
                </span>
            </div>
            {#if execRights($userModelStore)}
                <div on:click={() => changePage(2)}>
                    <span class={page == 2 ? "isActive px-3  " : ""}>
                        Brand Colors
                    </span>
                </div>
                <div on:click={() => changePage(3)}>
                    <span class={page == 3 ? "isActive px-3  " : ""}>
                        Team
                    </span>
                </div>
            {/if}
            <div on:click={() => changePage(4)}>
                <span class={page == 4 ? "isActive px-3 " : ""}>
                    Contact Us
                </span>
            </div>
            <div on:click={() => changePage(5)}>
                <span class={page == 5 ? "isActive px-3" : ""}> LogOut </span>
            </div>
        </div>
    {:else if drawerLink == false}
        <div class="{$screenSizeStore.size > 600?'border shadow':''} rounded-md h-full w-full "in:fly="{{ x: 50, duration: 200 }}" out:fly="{{x:50,duration:0}}" >
            {#if page == 1}
                <AccountSettings />
            {:else if page == 2 && execRights($userModelStore)}
                <BrandColors />
            {:else if page == 3 && execRights($userModelStore)}
                <Team />
            {:else if page == 4}
                <Contactus />
            {:else if page == 5}
                <Logout />
            {/if}
        </div>
    {/if}
</div>

<style>
    .aside {
        left: -100%;
        transition: left 0.3s ease-in-out;
    }
    .isActive {
        background-color: rgb(239, 239, 239);
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    svg {
        min-height: 20px;
        transition: transform 0.3s ease-in-out;
    }

    svg line {
        stroke: currentColor;
        stroke-width: 3;
        transition: transform 0.3s ease-in-out;
    }
    
</style>
