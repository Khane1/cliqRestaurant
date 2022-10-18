<script>
    import { fly } from "svelte/transition";
    import { stringify } from "uuid";
    import {
        complete_Order,
        OrderItem_Complete,
    } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { MoneyFormat } from "../../func_essential";
    import { userModelStore } from "../../stores";
    export let order, dataId;
    let checked = false;
    let listInclude = [];
    let completeList = [];
    $: closeOrder = true;
    // function checkFunction(item, order, checked) {
    //     let id = item.qty + item.name + item.total ;
    //     if (completeList.includes(id)) {
    //         alert("already complete");
    //     } else {
    //         console.log(listInclude);
    //         checked = !checked;
    //         checked == true && !listInclude.includes(id)
    //             ? listInclude.push(id)
    //             : !listInclude.includes(id)
    //             ? listInclude.push(id)
    //             : listInclude.pop(id);
    //         listInclude = listInclude;
    //         if (listInclude.length == order.length) {
    //             closeOrder = !closeOrder;
    //             completeList = [...completeList, id];
    //             console.log(completeList);
    //             ///update item
    //         }
    //     }
    // }
</script>

<div>
    <div
        class="{order.status == 'served'
            ? 'underlined'
            : 'unchecked'}  flex justify-between space-x-5"
    >
        <div class="m-0.5">
            <span>
                {#if order.status == "served"}
                    <input
                        class="{order.status == 'served'
                            ? 'disabled'
                            : ''}rounded-full"
                        type="checkbox"
                        disabled
                        checked={order.status == "served"}
                        on:click={OrderItem_Complete (
                            $userModelStore.uid,
                            dataId
                        )}
                    />
                {:else}
                    <input
                        class="{order.status == 'served'
                            ? 'disabled'
                            : ''}rounded-full"
                        type="checkbox"
                        checked={order.status == "served"}
                        on:click={OrderItem_Complete(
                            $userModelStore.uid,
                            dataId
                        )}
                    />
                {/if}
            </span>
            <span class=""> Qty {order.qty}</span>
        </div>
        <div class="flex justify-start w-32">{order.name}</div>
        <div class="w-32">
            {#if order.notes.length > 0}
                <div class=" text-red-400 flex justify-end">
                    Note:
                    {order.notes}
                </div>
            {:else}
                No Request
            {/if}
        </div>
        <div>ugx.{MoneyFormat(order.total)}</div>
    </div>
    <!-- <OrderCard order={order.data()} /> -->
</div>
<!-- {:else if selectedId == "all"}
<div>
    <OrderCard order={order.data()} />
</div>
-->

<!-- <div class="px-10 py-5 border rounded-xl shadow-sm mb-5 " transition:fly>
    <div class="">
        <div class="mt-10">
            <div class="font-semibold">
                <div class="text-lg">Table {order.table}</div>
                <div class="text-sm">Id - {order.customerId.substring(0,15)+'...'}</div>
            </div>
        </div>
        {#if closeOrder}
            <div class="">
                {#each order.order as item}
                    <div
                        class="{listInclude.includes(
                            item.qty + item.name + item.total + order.customerId
                        ) || completeList.includes(order.id)
                            ? 'underlined'
                            : 'unchecked'} flex justify-between space-x-5"
                    >
                        <div class="m-0.5">
                            <span>
                                {#if listInclude.length == order.order.length}
                                    <input type="checkbox" disabled />
                                {:else}
                                    <input
                                        class="rounded-full"
                                        type="checkbox"
                                        checked={completeList.includes(
                                            item.qty +
                                                item.name +
                                                item.total +
                                                order.customerId
                                        )
                                            ? true
                                            : listInclude.includes(
                                                  item.qty +
                                                      item.name +
                                                      item.total +
                                                      order.customerId
                                              )}
                                        on:click={() =>
                                            checkFunction(item, order, checked)}
                                    />
                                {/if}
                            </span>
                            <span class=""> Qty {item.qty}</span>
                        </div>
                        <div class="flex justify-start">{item.name}</div>
                        <div>
                            {#if item.notes.length > 0}
                            <div
                                class=" {listInclude.includes(
                                    item.qty +
                                        item.name +
                                        item.total +
                                        order.customerId
                                ) || completeList.includes(order.id)
                                    ? 'underlined'
                                    : 'unchecked'} text-red-400 flex justify-end"
                            >
                               Note:
                                {item.notes} 
                            </div>
                            {:else}
                            No Request  
                            {/if}
                        </div>
                        <div>{MoneyFormat(item.total)}</div>
                    </div>
                {/each}
            </div>
        {:else}
            <div>
                <span
                    class="border px-3 py-1"
                    on:click={() => {
                        closeOrder = !closeOrder;
                    }}
                >
                    See Order
                </span>
            </div>
        {/if}
    </div>
    <div class="flex justify-end ">
        <span
            class={listInclude.length == order.order.length
                ? "underlined"
                : "unchecked"}
        >
            Total : {MoneyFormat(total)}
        </span>
        {#if listInclude.length == order.order.length}
            <span
                class="border rounded-md mx-2 px-5 py-1 bg-blue-500 text-white"
                on:click={() => {
                    completeOrder($userModelStore.uid, order);
                    listInclude = [];
                }}>Customer Paid</span
            >
        {/if}
    </div>
</div> -->
<style>
    input[type="checkbox"] {
        accent-color: rgb(17, 255, 17);
        color: rgb(17, 255, 17);
        padding: 2em;
    }
    .underlined {
        text-decoration: line-through;
        opacity: 60%;
    }
    .unchecked {
        text-decoration: none;
    }
</style>
