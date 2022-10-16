<script>
    export let onClick;

    export let title;
</script>

<button  on:click={onClick} class="valid py-2 px-10 font-extrabold rounded-full">{title}</button>
