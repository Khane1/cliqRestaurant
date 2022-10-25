<script>
    import { list } from "firebase/storage";
    import { onMount } from "svelte";
    import { stringify } from "uuid";
    import { enumComplete } from "../../../firebase/functions/restaurant_funcs/orders";
    import {
        complete_Order,
        complete_OrderItems,
    } from "../../../firebase/functions/restaurant_funcs/restaurants";
    import { MoneyFormat } from "../../../func_essential";
    import {
        pendingPaymentStore,
        userModelStore,
        activeOrderItemDetailStore,
    } from "../../../stores";
    import BodyWrapper from "../../bodyWrapper.svelte";
    let selectedId = "*";
    onMount((e) => {});
    let table = [];
    $: table =
        $pendingPaymentStore.length != undefined &&
        table.length != undefined &&
        $pendingPaymentStore.length != table.length
            ? []
            : table;
    $: loadTable = $pendingPaymentStore.forEach((e) => {
        if (!table.includes(e.data().table)) {
            table = [...table, e.data().table];
        }
    });
    let customerIds = [];
    $: getCustomerId = $pendingPaymentStore.forEach((element) => {
        if (selectedId == element.data().table) {
            customerIds = [...customerIds, element.data().customerId];
        }
    });
    let itemDetails = [];
    $: y = $activeOrderItemDetailStore.forEach((element) => {
        if (customerIds.includes(element.data.customerId)) {
            console.log(element.data.total, element.data.name);
            itemDetails = [
                ...itemDetails,
                { total: element.data.total, id: element.id },
            ];
        }
    });
    $: total = itemDetails.reduce((a, { total }) => a + total, 0);
    let clearTable = () => {
        if (table.filter((val) => selectedId == val).length > 0) {
            const Index = table.findIndex((obj) => obj == selectedId);
            table.pop(table[Index]);
        }
    };

    let removeItemFromList = (list, item) => {
        if (list.filter((val) => item == val).length > 0) {
            const Index = list.findIndex((obj) => obj == item);
            list.pop(list[Index]);
        }
    };
</script>

<div class="hidden">
    {y}
</div>
<BodyWrapper>
    <div class="flex justify-evenly">
        <div class="w-1/2">
            <span
                class="font-semibold mb-5 underline"
                on:click={() => (selectedId = "*")}
            >
                Select customer table
            </span>

            {#each table as table}
                <div>
                    <span>
                        <div
                            class="{selectedId == table
                                ? 'font-semibold'
                                : ''} text-lg"
                            on:click={() => {
                                customerIds = [];
                                getCustomerId;
                                itemDetails = [];
                                y;
                                selectedId = table;
                            }}
                        >
                            Table {table}
                        </div>
                    </span>
                </div>
            {/each}
            <div class="text-sm text-red-600">
                {#if $pendingPaymentStore.length == 0}
                    No Pending Payments
                {/if}
            </div>
        </div>
        <div class="w-1/2">
            <div class="font-semibold underline">
                Table {selectedId == "*" ? "Number" : selectedId}
            </div>
            {#if selectedId == "*"}
                <div class="text-sm text-blue-600">
                    Select a table number to see order details.
                </div>
            {/if}
            {#each $pendingPaymentStore as pending}
                {#if selectedId == pending.data().table}
                    <div class="">
                        <div class=" my-5">
                            <div class="text-sm text-orange-500">
                                {pending.data().customerId}
                            </div>
                            <div class="text-sm">
                                Status : <span
                                    class="font-semibold text-green-500"
                                >
                                    {pending.data().state}
                                </span>
                            </div>
                        </div>
                        <div />
                        <div class="mb-2" />
                    </div>
                    {#each $activeOrderItemDetailStore as order}
                        {#if order.data.customerId == pending.data().customerId}
                            <div class="flex justify-between space-x-5">
                                <div>
                                    Qty {order.data.qty}
                                </div>
                                <div>
                                    {order.data.name}
                                </div>
                                <div>ugx.{MoneyFormat(order.data.total)}</div>
                            </div>
                        {/if}
                    {/each}
                {/if}
            {/each}
            <div class="flex justify-between mt-5 ">
                {#if selectedId != "*"}
                    <span
                        class="border px-5 py-1 rounded-md bg-green-600 text-white"
                        on:click={() => {
                            if (
                                table.filter((val) => selectedId == val)
                                    .length > 0
                            ) {
                                const Index = table.findIndex(
                                    (obj) => obj == selectedId
                                );
                                table.pop(table[Index]);
                            }
                            customerIds.forEach((customerId) => {
                                complete_Order(
                                    $userModelStore.uid,
                                    customerId,
                                    enumComplete.paid
                                );
                                selectedId = "*";
                            });
                            complete_OrderItems(
                                $userModelStore.uid,
                                itemDetails,
                                enumComplete.paid
                            );
                            table = [];
                            customerIds = [];
                        }}
                    >
                        Paid
                    </span>
                    <span class="flex justify-evenly">
                        Total: <h3 class="text-sm font-semibold">ugx.</h3>
                        <span class=" font-bold text-lg">
                            {MoneyFormat(total)}
                        </span>
                    </span>
                {/if}
            </div>
        </div>
    </div>
</BodyWrapper>
