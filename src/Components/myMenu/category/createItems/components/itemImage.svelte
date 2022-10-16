<script>
    import Modal from "svelte-simple-modal";
    import { fly } from "svelte/transition";
    import { MoneyFormat } from "../../../../../func_essential";
    import { editItemDetailStore, screenSizeStore, userStore } from "../../../../../stores";
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
        <AdminEditButton bind:showOption onclick={() => {
            editItemDetailStore.update((e)=>item)
        }} />
    {:else if showOption == false }
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

    <div class="py-2">
        <!-- <div class=" text-black text-sm font-bold ">
            {Intl.NumberFormat("en-US").format(item.price)}
            <span class="text-sm">Shs</span>
        </div>-->
        <span class="font-semibold text-md">
                { item.name}
        </span>
        <div class="flex text-lg  text-red-500 font-semibold ">
            <h6 class="text-sm mt-1">ugx.</h6>
            <h5 class="text-lg">
                {MoneyFormat(item.price)}
            </h5>
        </div>
    </div>
</div>

<style>
    .upload {
        height: 15rem;
        width: 30rem;
    }
</style>
