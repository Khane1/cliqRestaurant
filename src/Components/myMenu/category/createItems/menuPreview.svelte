<script>
    import { onMount } from "svelte";
    import { screenSizeStore, menuListStore } from "../../../../stores";
    import Header from "../../../resuable/header.svelte";
    import Tags from "../../../resuable/tags/tags.svelte";
    import PreviewItems from "./components/previewItems.svelte";
    import SubmenuTab from "./components/submenuTab.svelte";
    export let submenu, title;
    let selected = "";
    function select(id) {
        selected.id = id;
    }

    onMount((e) => {
        selected = submenu[0];
    });
    let y = $screenSizeStore.size;
</script>

<div class="mt-5">
    <div class="space-y-4">
        <div class="">
            <Header {title} />
            <div>
                <span class="text-sm">Only new items displayed here</span>
            </div>
        </div>
        {#if selected != null}
            <div class="w-30">
                <SubmenuTab bind:submenu bind:selected />
            </div>
        {/if}
    </div>
    <div class="flex justify-center items-center mt-10">
        <!-- <Button bind:value onClick={onSubmit} title="Start" /> -->
    </div>
    <div
        class=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center"
    >
        <!-- <div class="flex-col justify-center inline-flex self-stretch"> -->
        {#each $menuListStore as list}
            {#if selected != null && list.id == selected.id}
                <PreviewItems bind:list={list.items} />
            {/if}
        {/each}
    </div>
</div>
