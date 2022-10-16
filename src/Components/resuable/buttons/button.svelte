<script>
    export let title;
    export let onClick;
    export let value;
</script>

{#if value.length>=1}
<button on:click={onClick} class="valid py-2 px-10 font-extrabold rounded-full">{title}</button>
{:else}
<button class="py-2 bg-slate-300 px-10 font-extrabold rounded-full" disabled>{title}</button>
{/if}
<style>

</style>
