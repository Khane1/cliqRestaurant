<script>
import ItemImage from "./itemImage.svelte";
    import PreviewImage from "./previewImage.svelte";

    export let list;
    export let onclick;
</script>

{#each list as item (item.itemId)}
    <!-- <ItemImage bind:item bind:onclick/> -->
    <PreviewImage bind:item bind:onclick/>
{/each}

