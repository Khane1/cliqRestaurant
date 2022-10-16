<script>
    import { fly } from "svelte/transition";
    export let reduce, order, item, onclick;
</script>

<span
    class="extendedaddToMenu absolute text-blue-300 top-1 mr-5 right-1 px-2 rounded-full shadow-full text-2xl font-extrabold"
    ><span
        class="pr-4"
        transition:fly={{ duration: 300 }}
        on:click={() => {
            reduce();
        }}>-</span
    >
    <span class="text-md"
        >{order.findIndex((obj) => obj.val == item.name) > -1
            ? JSON.stringify(
                  order[order.findIndex((obj) => obj.val == item.name)].count
              )
            : ""}</span
    >
    <span class="pl-4" on:click={onclick}>+</span>
</span>

<style>
       .extendedaddToMenu {
        background: #3adb15;
        color: white;
        align-items: center;
        /* border-radius: 30%; */
        stroke: white;
        stroke-width: 20%;
    }
</style>