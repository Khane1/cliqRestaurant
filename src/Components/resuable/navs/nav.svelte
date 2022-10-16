<script>
    import { onMount } from "svelte";
    export let headers = [];///{index:1,title:"title"}
    export let store;
    function pageSwitch(i) {
        store.update((e) => {
            return { index: i };
        });
    }
    $: selected = 1;
    function switchPage(index) {
        selected = index;
        pageSwitch(index)
        // myMenuPages.update((e) => {
        //     return { index: index };
        // });
    }
    $: isActive = (val) => {
        return val == selected ? "font-bold text-slate-600" : " text-slate-600";
    };
    onMount((e) => {
        pageSwitch(1);
    });
</script>

<div
    class="xSmall rounded-lg bg-slate-200 shadow lg:py-6 sm:py-2 px-4 lg:px-40 sm:px-10 mt-5 sm:mx-5 lg:mx-5 "
>
    <div class="flex justify-between ...">
        {#each headers as title}
            <span
                on:click={() => {
                    switchPage(title.index);
                }}
                class={isActive(title.index)}>{title.title}</span
            >
        {/each}
    </div>
</div>

<style>
    span:hover {
        cursor: pointer;
    }
    @media (min-width: 300px) {
        .xSmall {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }
</style>
