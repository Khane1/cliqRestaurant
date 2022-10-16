<script>
   export let avatar, fileinput;
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };
    };
</script>
<div class="">
    <span class="text-sm">
        click to edit item: Landscape Images are better
    </span>
<img class="object-cover h-60 w-96 shadow mb-5 mr-5 upload "
    src={avatar? avatar: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"}
    alt="" width="100px" height="100px"
    on:click={() => {
        fileinput.click();
    }}
/>
<input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
/>
</div>
