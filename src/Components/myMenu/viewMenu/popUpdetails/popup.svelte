<script>
    import { onMount } from "svelte";
    import { stringify } from "uuid";
    import { businessModelStore, userStore } from "../../../../stores";
    import PopActBtn from "./buttons/pop_act_Btn.svelte";
    export let data;
    let pressed = false;
    let count = 0;
    export let order, onclick, reduce;
    onMount(() => {
        count =
            order.filter((val) => data.name == val.val).length > 0
                ? order.filter((val) => data.name == val.val)[0].count
                : 0;
    });
</script>
<div class="body overflow-auto">

<div class="h-full w-full">
    <img src={data.avatar} class="image w-full h-1/5" alt="" />
</div>
<div class="mt-5">
    <span class="font-semibold text-lg ">
        {data.name}
    </span>
    <div class="flex mt-1 text-lg  text-red-500 font-semibold ">
        <h6 class="text-sm mt-2">ugx.</h6>
        <h5 class="text-2xl">
            {Intl.NumberFormat("en-US").format(data.price)}
        </h5>
    </div>
</div>
<div class=" text-black text-md mt-4 mb-4 pb-2">
    {data.description} 
</div>
{#if $userStore != "authorized"}
    {#if $businessModelStore.orderToggle == true}
        <PopActBtn
            bind:count
            reduce={() => reduce()}
            onclick={() => onclick()}
        />
    {/if}
{/if}
</div>

<style>
    .image {
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    .body{
        scroll-behavior: auto;
        background-color: white;
   max-width: fit-content;
   max-height: fit-content;
  }
</style>
