<script>
    import { categoryStore } from "../../../../stores";
    export let selectedId;
    export let selectedSub;
</script>

{#if $categoryStore.value != undefined}
    <div class="container w-full pr-10 pb-2">
        <div class="scrollmenu">
            {#each $categoryStore.value as category}
                {#if selectedId == category.categoryId}
                    {#if selectedSub != 0}
                        <span
                            on:click={() => (selectedSub = "*")}
                            class={"*" == selectedSub
                                ? "scrollItem  px-3 mt-2 lg:mt-4 ml-2 mr-2 font-semibold text-md border-b-2"
                                : "scrollItem px-3 mt-2 lg:mt-4 ml-2 mr-2 text-md"}
                        >
                            All</span
                        >
                        {#each category.subMenu as subItem}
                            <span
                                class={subItem.id == selectedSub
                                    ? "scrollItem  px-3 mt-2 lg:mt-4 ml-2 font-semibold text-md border-b-2"
                                    : "scrollItem px-3 mt-2 lg:mt-4 ml-2 text-md"}
                                on:click={() => (selectedSub = subItem.id)}
                            >
                                {subItem.value}
                            </span>
                        {/each}
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    div.scrollmenu {
        white-space: nowrap;
        overflow-x: scroll;
    }

    div.scrollmenu {
        overflow: auto;
        white-space: nowrap;
    }
    .container {
        text-decoration: none;
        overflow-x: hidden;
    }
    div.scrollmenu span {
        display: inline-block;
        text-align: center;
    }
    .scrollmenu::-webkit-scrollbar {
        display: none;
    }
</style>
