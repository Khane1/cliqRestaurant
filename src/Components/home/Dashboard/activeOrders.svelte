<script>
    import {
        userModelStore,
        activeOrderStore,
        activeOrderItemDetailStore,
    } from "../../../stores";

    import { onMount } from "svelte";
    import Business from "../business/business.svelte";
    import BodyWrapper from "../../bodyWrapper.svelte";
    import { getAllMyOrders } from "../../../firebase/functions/restaurant_funcs/restaurants";
    import { stringify } from "uuid";
    import OrderCard from "../order_card.svelte";
    import { MoneyFormat } from "../../../func_essential";
    import { dataset_dev } from "svelte/internal";
    import {
        completeOrder,
        enumComplete,
    } from "../../../firebase/functions/restaurant_funcs/orders";
    let selectedId = "all";
    let orderId = 0;
    let list = [];
    let itemDetails = [];
    let table = [];
    $: getTables = $activeOrderStore.forEach((e) => {
        if (!table.includes(e.data().table)) {
            table = [...table, e.data().table];
        } else {
            console.log(e.data().table);
        }
    });
    let business;
    onMount(async (e) => {
        getAllMyOrders(
            $userModelStore.uid,
            $activeOrderStore != undefined &&
                $activeOrderStore.order != undefined
                ? $activeOrderStore.order
                : []
        );

        console.log($activeOrderStore.order);
        activeOrderStore.update((e) => {
            return [];
        });
    });
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

    <div class="flex justify-evenly">
        <div class=" px-2 py-1 mb-3 w-1/3">
            <span class="flex justify-center font-bold underline"
                >Table Orders</span
            >
            <div class=" px-1 py-1" />
            {#if $activeOrderStore.length > 0}
                {#each table as table}
                    <div class=" px-1 py-1">
                        <span
                            class={selectedId == table ? "font-bold" : ""}
                            on:click={() => {
                                itemDetails = [];
                                x;
                                selectedId = table;
                                console.log(selectedId);
                                // console.log(table.data().customerId);
                            }}
                        >
                            Table {table}
                        </span>
                    </div>
                {/each}
            {:else}
                <div class="text-sm flex justify-center">
                    No active tables yet!
                </div>
            {/if}
        </div>
        <div class="w-full ml-10 px-5 py-5 border rounded-xl shadow-sm mb-5">
            <div class="font-semibold underline">
                Table {selectedId == "*" ? "Number" : selectedId}
            </div>
            <div class="mb-2 text-sm">Click to crossout what is completed.</div>
            {#if selectedId == "*"}
                <div class="text-sm text-blue-600">
                    Select a table number to see order details.
                </div>
            {/if}
            {#each $activeOrderStore as table}
                {#if selectedId == table.data().table}
                    <div class=" my-2.5">
                        <div class="text-sm text-orange-500">
                            {table.data().customerId}
                        </div>
                        <div class="text-sm">
                            Status : <span class="font-semibold text-green-500">
                                {table.data().state}
                            </span>
                        </div>
                    </div>

                    {#each $activeOrderItemDetailStore as order}
                        {#if table.data().customerId == order.data.customerId}
                            <OrderCard order={order.data} dataId={order.id} />
                        {/if}
                    {/each}
                {/if}
            {/each}
            {#if selectedId != "all"}
                <div class="flex justify-end ">
                    <span>
                        Total : {MoneyFormat(total)}
                    </span>
                </div>
            {/if}
            <div class="flex justify-end mt-3">
                {#if !itemDetails.filter((val) => "unserved" == val.status).length > 0 && selectedId != "all"}
                    <span
                        class="border rounded-md mx-2 px-5 py-1 bg-blue-500 text-white"
                        on:click={() => {
                            itemDetails.forEach((e) => {
                                completeOrder(
                                    $userModelStore.uid,
                                    e.customerId,
                                    enumComplete.pending
                                ),
                                    (selectedId = "all");
                            });
                        }}>next order</span
                    >
                {/if}
            </div>
            {#if selectedId == "all"}
                Open Table orders
            {/if}
        </div>
    </div>
</BodyWrapper>

<style>
    .hidden {
        visibility: hidden;
    }
</style>
