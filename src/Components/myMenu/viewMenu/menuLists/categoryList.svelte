<script>
    import { categoryStore } from "../../../../stores";
    export let selectedId;
    export let selectedSub;
</script>

{#if $categoryStore.value != undefined}
    {#each $categoryStore.value as category}
        <span
            class={category.categoryId == selectedId
                ? "scrollItem px-5 ml-3 font-semibold text-md "
                : "scrollItem px-5 ml-3 text-md"}
            on:click={() => (
                (selectedId = category.categoryId),
                (selectedSub = category.subMenu[0].id)
            )}
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