<script>
    import TextInput from "../../../../resuable/text_input.svelte";
    export let name, Description, price;
</script>

<div class="grid space-y-1">
    <label for="Name">
        Item name
        <TextInput
            bind:value={name}
            isText={true}
            placeholder="eg.Smokey Burger ..."
        />
    </label>
    <label for="Description">
        Description
        <TextInput
            bind:value={Description}
            placeholder="eg. Spiced Beef, Cheese , ..."
        />
    </label>

    <label for="Description">
        Price
        <TextInput placeholder="eg. 3000" isText={false} bind:value={price} />
    </label>
</div>
