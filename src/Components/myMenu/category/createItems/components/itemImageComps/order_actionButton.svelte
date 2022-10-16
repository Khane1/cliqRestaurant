<script>
    import { fly } from "svelte/transition";
    export let order,item,showOption,onclick;
</script>

{#if order.filter((val) => item.name == val.val).length == 0}

 <span
 on:click={() => {
     (showOption = !showOption), onclick();
 }}
 class="addToMenu absolute text-blue-300 top-1 right-1 px-2 mr-5 rounded-full shadow-full text-2xl font-extrabold"
>
 +
</span>
{:else}
<span
 on:click={() => {
     (showOption = !showOption), onclick();
 }}
 class="addToMenu absolute text-blue-300 top-1 right-1 px-2.5  mr-5 rounded-full shadow-full font-extrabold"
 transition:fly={{ duration: 500 }}
 >{order.filter((val) => item.name == val.val)[0].count >= 1
     ? order.filter((val) => item.name == val.val)[0].count
     : "+"}
</span>
{/if}

<style>
       .addToMenu {
        background: #3adb15;
        color: white;
        align-items: center;
        border-radius: 50%;
        stroke: white;
        stroke-width: 20%;
    }
</style>