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

<div class="h-1/5">
    <img src={data.avatar} class="image w-full h-1/5" alt="" />
</div>
<div class="mt-5">
    <span class="font-bold text-xl ">
        {data.name}
    </span>
    <div class="flex mt-1 text-lg  text-red-500 font-semibold ">
        <h6 class="text-sm mt-2">ugx.</h6>
        <h5 class="text-2xl">
            {Intl.NumberFormat("en-US").format(data.price)}
        </h5>
    </div>
</div>
<div class=" text-black text-md mt-4">
    {data.description}
</div>
{#if $userStore != "authorized"}
    {#if $businessModelStore.orderToggle == true}
        <PopActBtn
            bind:pressed
            bind:count
            reduce={() => reduce()}
            onclick={() => onclick()}
        />
    {/if}
{/if}

<style>
    .image {
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }
</style>
