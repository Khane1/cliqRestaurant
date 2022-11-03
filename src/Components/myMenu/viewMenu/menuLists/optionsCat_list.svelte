<script>
    import { onMount } from "svelte";
    import { stringify } from "uuid";
    import { categoryStore } from "../../../../stores";
    export let selectedId;
    export let selectedCat_Name;
    export let selectedSub;
    export let selectOption;
    let placeholder = "Category";
    onMount((e)=>{
        if($categoryStore.value!=undefined&&$categoryStore.value.length>0){
            selectedCat_Name=$categoryStore.value[0].name
        }
    })
</script>

<div class="flex items-center top-5">
    <span class="pr-3 text-md font-semibold">Select </span>
    <select
        style="text-align: center;"
        bind:value={selectOption}
        on:change={(e) => {
            console.log(selectOption);
                if(selectOption!='pinned'){
                    selectedId = selectOption.categoryId;
                    (selectedCat_Name = selectOption.name),
                    selectOption.subMenu.length > 0
                        ? (selectedSub = selectOption.subMenu[0].id)
                        : (selectedSub = "*");
                }else{
                    selectedId=selectOption
                    selectedSub = selectOption
                    selectedCat_Name = "suggestions"
                }
        }}
        class="flex justify-center text-md px-3"
        type="submit"
    >
        {#if placeholder}
            <option value="" disabled selected>
                <span> {placeholder} </span>
            </option>
        {/if}
        {#if $categoryStore.value != undefined}
        <option
                    value='pinned'
                    class={'pinned' == selectedId
                        ? "scrollItem px-5 ml-3 font-semibold text-md"
                        : "scrollItem px-5 ml-3 text-md"}
                >
                        Suggestions
                </option>
            {#each $categoryStore.value as category}
                {#if category.name != undefined}
                    <option
                        value={category}
                        class={category.categoryId == selectedId
                            ? "scrollItem px-5 ml-3 font-semibold text-md"
                            : "scrollItem px-5 ml-3 text-md"}
                    >
                            {category.name}
                    </option>
                {/if}
            {/each}
        {/if}
    </select>
</div>