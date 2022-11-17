<script>
import { signIn } from "../../firebase/functions/auth";
    import { emailStore } from "../../stores";
  export  let email,password;
    import TextInput from "../resuable/text_input.svelte";
    function onPageChange(newPage) {
        page = newPage;
    }
</script>

<div>
    <span class="text-sm">Email</span>
    <TextInput placeholder="Input your email" bind:value={email}/>
</div>
<div>
    <span class="text-sm">Password</span>
    <TextInput placeholder="Input your password" bind:value={password} />
</div>

{#if $emailStore && password.length > 6 && password.length > 6}
<span
on:click={()=>signIn(email,password)}
    class="flex justify-center border px-5 py-2 mt-5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
    >Sign In</span
>

{:else}
    <span
        class="flex justify-center border px-5 py-2 mt-5 bg-gray-400 text-gray-500 rounded-full"
        >Sign In</span
    >
{/if}
<style>
   
</style>
