<script>
    import { stringify } from "uuid";
    import { categoryStore } from "../../../../stores";
    export let selectedId, selectedCat_Name;
    export let selectedSub;
</script>

{#if $categoryStore.value != undefined}
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
{/if}

<style>
    span.scrollItem {
        display: inline-block;
    }
</style>
