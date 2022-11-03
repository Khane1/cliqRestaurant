<script>
    import { len } from "page";
    import { onMount } from "svelte";
    import { screenSizeStore } from "../../../stores";
    export let headers = [];
    export let store;
    function pageSwitch(i) {
        store.update((e) => {
            return { index: i };
        });
    }
    $: selected = $store.index != null || $store.index != undefined ? $store.index : 1;
    function switchPage(index) {
        selected = index;
        pageSwitch(index);
    }
    $: isActive = (val) => {
        return val == selected ? " text-white" : " text-slate-600";
    };
    onMount((e) => {
        pageSwitch(1);
    });
</script>

<!-- {#if headers.length > 2}
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
{:else} -->
<div
    class="xSmall lg:py-6 sm:py-2 px-32 lg:px-40 sm:px-10 mt-5 sm:mx-5 lg:mx-5"
>
    {#if $screenSizeStore.size > 700}
        <div class="flex justify-evenly">
            {#each headers as title}
                <div
                    on:click={() => {
                        switchPage(title.index);
                    }}
                    style="pointer:cursor;"
                    class={selected == title.index
                        ? "shadow px-16 py-3 mr-2 border rounded-lg bg-slate-500 text-white"
                        : "px-16 py-3 border rounded-lg"}
                >
                    <span
                        on:click={() => {
                            switchPage(title.index);
                        }}
                        class={isActive(title.index)}
                    >
                        {title.title}</span
                    >
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex justify-evenly">
            {#each headers as title}
                <button
                    on:click={() => {
                        switchPage(title.index);
                    }}
                    style="pointer:cursor;"
                    class={selected == title.index
                        ? "shadow text-sm px-14 ml-2 border rounded-lg bg-slate-500 text-white"
                        : " text-sm ml-2 px-14 border rounded-lg"}
                >
                    <span
                        on:click={() => {
                            switchPage(title.index);
                        }}
                        class={isActive(title.index)}
                    >
                        {title.title}
                    </span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<!-- {/if} -->
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
    .activeColor {
        background-color: #2cf847c8;
    }
</style>
