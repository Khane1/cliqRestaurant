<script>
    export let submenu, selected;

    function select(id) {
        selected = id;
    }
</script>

<div
    class="{submenu.length > 3
        ? 'w-90'
        : 'w-72'} shadow rounded-full p-3 flex justify-center"
>
    {#each submenu as sub}
        <span
            class={selected.id == sub.id
                ? "mr-5 font-bold rounded text-md px-2 text-blue-800"
                : "mr-5 font-medium text-slate-500"}
            on:click={select(sub)}
        >
            {sub.value}
        </span>
    {/each}
</div>

<style>
    span {
        cursor: pointer;
    }
</style>
