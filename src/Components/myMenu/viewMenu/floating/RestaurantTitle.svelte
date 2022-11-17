<script>
    export let title;
</script>
<div class="">
    <h1  class=" text-3xl font-bold ">
        {title == undefined
            ? "Loading..."
            : title}
    </h1>
</div>