<script>
    import CreateTemplate from "../../resuable/createTemplate/createTemplate.svelte";
    export let value;
    export let onSubmit;
</script>


<CreateTemplate
    title="Create new category"
    placeholder="Please input name ...eg.Drinks, beverages, dessert "
    {onSubmit}
    bind:value
/>
