<script>
    import Modal from "svelte-simple-modal";
    import { fly } from "svelte/transition";
    import { MoneyFormat } from "../../../../../func_essential";
    import {
        businessModelStore,
        editItemDetailStore,
        screenSizeStore,
        userStore,
    } from "../../../../../stores";
    import MenuPopup from "../../../viewMenu/popUpdetails/menu_Popup.svelte";
    import AdminEditButton from "./itemImageComps/adminEditButton.svelte";
    import OrderActionButton from "./itemImageComps/order_actionButton.svelte";
    import PlusMinusItems from "./itemImageComps/plusMinusItems.svelte";
    export let item;
    export let onclick;
    export let order;
    export let reduce;
    export let showOption;
    function completeReduce() {
        (showOption = !showOption), reduce();
        let index = order.findIndex((val) => item.name == val.val);
        order = [...order.slice(0, index), ...order.slice(index + 1)];
    }
</script>
{#if $screenSizeStore.size >
    400}
<div class="sm:justify-center relative mb-4 rounded-lg ml-5 ">
    <Modal>
        <MenuPopup data={item} bind:order {onclick} {reduce}>
            <img
                class="object-cover  md:h-40 md:w-60 xl:h-40 xl:w-72 shadow rounded-lg mb-2 {$screenSizeStore.size >
                800
                    ? ''
                    : 'upload'}"
                src={item.avatar}
                alt=""
            />
        </MenuPopup>
    </Modal>
    {#if $userStore == "authorized"}
        <AdminEditButton
            bind:showOption
            onclick={() => {
                editItemDetailStore.update((e) => item);
            }}
        />
    {/if}
    {#if $userStore != "authorized"}
        {#if $businessModelStore.orderToggle == false}
            <div />
        {:else if showOption == false}
            <OrderActionButton
                bind:order
                bind:item
                bind:showOption
                onclick={() => onclick()}
            />
        {:else}
            <PlusMinusItems
                reduce={() => reduce()}
                bind:order
                bind:item
                onclick={() => onclick()}
            />
        {/if}
    {/if}

    <div class="py-2">
        <span class="font-semibold text-md">
            {item.name}
        </span>
        <div class="flex text-lg  text-red-500 font-semibold ">
            <h6 class="text-sm mt-1">ugx.</h6>
            <h5 class="text-lg">
                {MoneyFormat(item.price)}
            </h5>
        </div>
    </div>
</div>
{:else}
<Modal>
    <MenuPopup data={item} bind:order {onclick} {reduce}>
        <div class="w-full h-full">
            <div class=" mr-0 ml-5 mb-4">
                <div class="flex justify-start">
                    <div class="">
                                <img
                                    class="object-cover md:h-40 md:w-60 xl:h-40 xl:w-72 shadow rounded-lg mb-2 {$screenSizeStore.size >
                                    800
                                        ? ''
                                        : 'upload2'}"
                                    src={item.avatar}
                                    alt=""
                                />
                    </div>                   
                    <div class="ml-5">
                        <div class="text-md text-blue-800 font-semibold">{item.name}</div>
                        <div class="text text-sm text-slate-600">
                            {item.description} 
                        </div>
                        <div class="flex justify-between">
                            <div class="flex text-md">
                                <h6 class="text-sm">ugx.</h6>
                                <h5 class="text-sm font-semibold">
                                    {MoneyFormat(item.price)}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
</MenuPopup>
</Modal>
{/if}
<style>
    .upload {
        height: 15rem;
        width: 30rem;
    }

    .upload2 {
        height: 6rem;
        width: 6.2rem;
    }
    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
