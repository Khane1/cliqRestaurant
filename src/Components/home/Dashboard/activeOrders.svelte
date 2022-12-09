<script>
    import {
        userModelStore,
        activeOrderStore,
        activeOrderItemDetailStore,
        businessModelStore,
        screenSizeStore,
    } from "../../../stores";
    import { onMount } from "svelte";
    import BodyWrapper from "../../bodyWrapper.svelte";
    import {
        complete_Order,
        getAllMyOrders,
    } from "../../../firebase/functions/restaurant_funcs/restaurants";
    import OrderCard from "../order_card.svelte";
    import { MoneyFormat, royalRights } from "../../../func_essential";
    import { enumComplete } from "../../../firebase/functions/restaurant_funcs/orders";
    import { roles } from "../../../firebase/functions/restaurant_funcs/businessLogic";
    import OrderDetails from "./table/order_details.svelte";
    import OrderList from "./table/order_List.svelte";
    let selectedId = "all";
    let orderId = 0;
    let list = [];
    let itemDetails = [];
    let table = [];
    $: table =
        $activeOrderStore.length != undefined &&
        table.length != undefined &&
        $activeOrderStore.length != table.length
            ? []
            : table;
    $: getTables = $activeOrderStore.forEach((e) => {
        if (!table.includes(e.data().table)) {
            table = [...table, e.data().table];
        } else {
            console.log(e.data().table);
        }
    });
    let business;
    onMount(async (e) => {});
    $: x = $activeOrderItemDetailStore.forEach((e) => {
        //after getting individual Items
        $activeOrderStore.forEach((order) => {
            //sort items by table
            if (order.data().table == selectedId) {
                //check if table details are equal to item details
                if (order.data().customerId == e.data.customerId) {
                    //check if item table is already in sorted item List
                    if (
                        itemDetails.filter((val) => e.data.table != val.table)
                            .length > 0
                    ) {
                        //if not (then remove items)
                        const Index = itemDetails.findIndex(
                            (obj) => obj.table == e.data.table
                        );
                        itemDetails.pop(itemDetails[Index]);
                    }
                    if (
                        itemDetails.filter((val) => e.id == val.id).length > 0
                    ) {
                        // if  item by Id is in sorted list
                        const Index = itemDetails.findIndex(
                            (obj) => obj.id == e.id
                        );
                        // if  item status is not the same update
                        if (itemDetails[Index].status != e.data.status) {
                            itemDetails[Index].status = e.data.status;
                        }
                    } else {
                        // if  item by Id is not in the list then insert
                        itemDetails = [
                            ...itemDetails,
                            {
                                status: e.data.status,
                                id: e.id,
                                customerId: e.data.customerId,
                                total: e.data.total,
                            },
                        ];
                        console.log({
                            status: e.data.status,
                            id: e.id,
                            total: e.data.total,
                        });
                    }
                } else {
                    // console.log(e.id);
                }
            }
        });
    });
    $: total = itemDetails.reduce((a, { total }) => a + total, 0);
</script>

<div class="hidden">
    {x}
</div>
<BodyWrapper>
    <div class="text-sm mb-5 text-blue-800 flex justify-center">
        Serve and view your customer's active orders
    </div>

    <div class="flex {$screenSizeStore.size > 500? 'justify-evenly':'justify-start'}">
        <div class=" px-2 py-1 mb-3 {$screenSizeStore.size > 500?'w-1/3':'w-full'}">
            {#if selectedId == "all"}
            <span class="flex justify-center font-bold underline"
                >Table Orders</span
            >
            {/if}
            <div class=" px-1 py-1" />
            {#if $activeOrderStore.length > 0}
                {#if $screenSizeStore.size > 500}
                    <OrderList
                        bind:table
                        bind:selectedId
                        bind:itemDetails
                        bind:x
                    />
                {:else if selectedId == "all"}
                    <OrderList
                        bind:table
                        bind:selectedId
                        bind:itemDetails
                        bind:x
                    />
                {/if}
            {:else}
                <div class="text-sm flex justify-center">
                    No active tables yet!
                </div>
            {/if}
        </div>
        {#if $screenSizeStore.size > 500}
            <OrderDetails bind:selectedId bind:total bind:itemDetails />
        {:else if selectedId != "all"}
            <OrderDetails bind:selectedId bind:total bind:itemDetails />
        {/if}
    </div>
</BodyWrapper>

<style>
    .hidden {
        visibility: hidden;
    }
</style>
