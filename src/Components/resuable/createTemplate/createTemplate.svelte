<script>
    import Button from "../buttons/button.svelte";
    import Header from "../../resuable/header.svelte";
    import TextInput from "../../resuable/text_input.svelte";
    // $: value = "";
    export let onSubmit;
    export let value;
    export let title;
    export let placeholder;
    export let submitButtonTitle=''
</script>

<div>
    <div class="space-y-2">
        <div class="">
            <Header {title} />
            <div>
                {value}
            </div>
        </div>
        <div class="w-30">
            <TextInput bind:placeholder bind:value />
        </div>
    </div>
    <div class="flex justify-center items-center mt-10">
        <Button bind:value onClick={()=>{onSubmit()}} title={submitButtonTitle.length==0?"Start":submitButtonTitle} />
    </div>
</div>

<style>
</style>
