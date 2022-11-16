<script>
    import TextInput from "../resuable/text_input.svelte";
    export let email, pass, password, name;
    import { signUp } from "../../firebase/functions/auth";
    import { collabBusinessId, emailStore, pageNameStore } from "../../stores";
</script>

<div>
    <span class="text-sm">Email</span>
    <TextInput type="email" placeholder="Input your email" bind:value={email} />
</div>
{#if $pageNameStore.pageName == "collab"}
    <div>
        <span class="text-sm">Name</span>
        <TextInput
            type="text"
            placeholder="Input your userName"
            bind:value={name}
        />
    </div>
{/if}

<div>
    <span class="text-sm">Password</span>
    <TextInput placeholder="Input your password" bind:value={pass} />
</div>
<div>
    <span class="text-sm">Confirm Password</span>
    <TextInput placeholder="Confirm your password" bind:value={password} />
</div>
<!-- {#if $emailStore && pass == password && pass.length > 6 && password.length > 6} -->
    <span
        on:click={() => {
            $pageNameStore.pageName != "collab"
                ? signUp(email, password, {})
                : signUp(email, password, {
                      pgName: $pageNameStore.pageName,
                      b_Id: $collabBusinessId.businessId,
                      userName: name,
                  });
        }}
        class="flex justify-center border px-5 py-2 mt-5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >Sign Up</span
    >
<!-- {:else} -->
    <!-- <span
        class="flex justify-center border px-5 py-2 mt-5 bg-gray-400 text-gray-500 rounded-full"
        >Sign Up</span
    > -->
<!-- {/if} -->
