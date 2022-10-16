<script>
    import { fly } from "svelte/transition";
    export let showOption, onclick;
</script>

<a href="/editItem">
    <span
        on:click={() => {
            (showOption = !showOption), onclick();
        }}
        class="  bg-blue-600  absolute text-white top-1 right-1 px-2.5  mr-5 rounded-full shadow-full "
        transition:fly={{ duration: 500 }}
    >
        edit
    </span>
</a>
