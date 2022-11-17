<script>
    import { stringify } from "uuid";
    import { categoryStore, screenSizeStore } from "../../../../stores";
    export let selectedId, selectedCat_Name;
    export let selectedSub;
</script>

{#if $categoryStore.value != undefined}
    {#if $screenSizeStore.size > 800}
        <span
            on:click={() => (
                (selectedId = "pinned"),
                (selectedCat_Name = ""),
                (selectedSub = "pinned")
            )}
            class={"pinned" == selectedId
                ? "scrollItem px-5 pt-3 mt-2 ml-3 font-semibold text-md "
                : "scrollItem px-5 pt-3 mt-2 ml-3 text-md"}
        >
            {"Suggestions"}
        </span>
        {#each $categoryStore.value as category}
            <span
                on:click={() => (
                    (selectedId = category.categoryId),
                    (selectedCat_Name = category.name),
                    category.subMenu.length > 0
                        ? (selectedSub = category.subMenu[0].id)
                        : (selectedSub = "*")
                )}
                class={category.categoryId == selectedId
                    ? "scrollItem px-5 pt-3 mt-2 ml-3 font-semibold text-md "
                    : "scrollItem px-5 pt-3 mt-2 ml-3 text-md"}
            >
                {category.name}
            </span>
        {/each}
    {:else}
        <div class="container w-full">
            <div class="scrollmenu mt-5">
                <span
                    on:click={() => (
                        (selectedId = "pinned"),
                        (selectedCat_Name = ""),
                        (selectedSub = "pinned")
                    )}
                    class={"pinned" == selectedId
                        ? "px-2 pt-4 mt-2 ml-5 font-semibold text-md "
                        : "px-2 pt-4 mt-2 ml-5 text-md"}
                >
                    Suggestions
                </span>
            {#each $categoryStore.value as category}
                    <span
                        on:click={() => (
                            (selectedId = category.categoryId),
                            (selectedCat_Name = category.name),
                            category.subMenu.length > 0
                                ? (selectedSub = category.subMenu[0].id)
                                : (selectedSub = "*")
                        )}
                        class={category.categoryId == selectedId
                            ? "px-1 mt-2 ml-5 font-semibold text-md "
                            : "px-1 mt-2 ml-5 text-md"}
                    >
                        {category.name}
                    </span>
                    {/each}
                </div>
        </div>
       
    {/if}
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
        width: 500px;
        text-decoration: none;
        overflow-x: hidden;
    }
    div.scrollmenu span {
        display: inline-block;
        text-align: center;
        padding: 14px;
        width: 100px;
    }
    .scrollmenu::-webkit-scrollbar {
        display: none;
    }
</style>
