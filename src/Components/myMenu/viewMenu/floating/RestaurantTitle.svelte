<script>
    export let title;
</script>
<div>
    <h1 class=" text-4xl font-extrabold">
        {title == undefined
            ? "Loading..."
            : title}
    </h1>
</div>