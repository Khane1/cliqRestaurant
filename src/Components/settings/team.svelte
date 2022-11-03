<script>
    import Button from "../resuable/buttons/button.svelte";
    import TextInput from "../resuable/text_input.svelte";
    let value='';
</script>

<!-- export let placeholder='';
export let keydown;
export let isText; --> 

<div class="p-10 space-y-5">
    <span class="text-md">
        Invite a team member.
    </span>
    <TextInput bind:value placeholder="Input email" ,isText={true} />

    <div class="flex justify-center">
        <Button title={'Invite'} onClick={()=>{}} bind:value/>
    </div>
</div>
