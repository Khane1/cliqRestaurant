<script>
    export let value;
    export let placeholder='';
    export let keydown;
    export let isText;

</script>
{#if placeholder.indexOf('password')>-1}

<input on:keypress={keydown} type='password' bind:value={value} class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal" placeholder={placeholder==undefined?"Please input name":placeholder} >

{:else}
{#if isText == undefined || isText == true}
<input
        on:keypress={keydown}
        type="text"
        bind:value
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
    {:else}
    <input
    type="number"
        min="0"
        bind:value
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
    {/if}
    {/if}
    
    <style>
    input {
        background-color: #e6e4f0;
    }
</style>
