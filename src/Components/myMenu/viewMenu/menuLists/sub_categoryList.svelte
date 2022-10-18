<script>
    import { categoryStore } from "../../../../stores";
    export let selectedId;
    export let selectedSub;
</script>

{#if $categoryStore.value != undefined}
    {#each $categoryStore.value as category}
        {#if selectedId == category.categoryId}
            {#if selectedSub != 0}
            <span
            on:click={() => (selectedSub = '*')}
            class={'*' == selectedSub
            ? " px-5 my-4 ml-2 font-semibold text-md border-b-2"
            : "px-5 my-4 ml-2 text-md"}
            > All</span>
                {#each category.subMenu as subItem}
                    <span
                        class={subItem.id == selectedSub
                            ? " px-5 my-4 ml-2 font-semibold text-md border-b-2"
                            : "px-5 my-4 ml-2 text-md"}
                        on:click={() => (selectedSub = subItem.id)}
                    >
                        {subItem.value}
                    </span>
                {/each}
            {/if}
        {/if}
    {/each}
{/if}
