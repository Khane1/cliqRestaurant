<script>
    import TextInput from "../resuable/text_input.svelte";
    export let email, pass, password;
    import { signUp } from "../../firebase/functions/auth";
</script>

<div>
    <span class="text-sm">Email</span>
    <TextInput placeholder="Input your email" bind:value={email} />
</div>
<div>
    <span class="text-sm">Password</span>
    <TextInput placeholder="Input your password" bind:value={pass} />
</div>
<div>
    <span class="text-sm">Confirm Password</span>
    <TextInput placeholder="Confirm your password" bind:value={password} />
</div>
{#if  pass == password && pass.length > 6 && password.length > 6}
    <span
        on:click={() => signUp(email,password)}
        class="flex justify-center border px-5 py-2 mt-5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >Sign Up</span
    >
{/if}
