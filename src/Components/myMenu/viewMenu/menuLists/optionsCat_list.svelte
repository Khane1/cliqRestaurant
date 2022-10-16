<script>
    import { stringify } from "uuid";
    import { categoryStore } from "../../../../stores";
    export let selectedId;
    export let selectedSub;
    export let selectOption;
</script>

<div class="flex items-center top-5">
    <span class="pr-3 text-md">Select </span>
    <select
        bind:value={selectOption}
        on:change={(e) => {
            (selectedId = selectOption.categoryId),
                (selectedSub = selectOption.subMenu[0].id);
        }}
        class="flex justify-center text-md"
        type="submit"
    >
        {#if $categoryStore.value != undefined}
            {#each $categoryStore.value as category}
            {#if category.name != undefined}
                <option
                    value={category}
                    class={category.categoryId == selectedId
                        ? "scrollItem px-5 ml-3 font-semibold text-md"
                        : "scrollItem px-5 ml-3 text-md"}
                >
                    <span 
                        on:click={() => {
                            (selectedId = category.categoryId),
                                (selectedSub = category.subMenu[0].id);
                        }}
                    >
                        {category.name}
                    </span>
                </option>
                {:else}
                <option
                    value=''>
                    <span>
                        Category
                    </span>
                </option>
                {/if}
            {/each}
        {/if}
    </select>
</div>
