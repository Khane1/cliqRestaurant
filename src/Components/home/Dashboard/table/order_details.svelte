<script>
    import { enumComplete } from "../../../../firebase/functions/restaurant_funcs/orders";
    import { complete_Order } from "../../../../firebase/functions/restaurant_funcs/restaurants";
    import { MoneyFormat, royalRights } from "../../../../func_essential";
    import {
        activeOrderItemDetailStore,
        activeOrderStore,
        businessModelStore,
        screenSizeStore,
        userModelStore,
    } from "../../../../stores";
    import OrderCard from "../../order_card.svelte";

    export let selectedId, total, itemDetails;
</script>

<div
    class="w-full{$screenSizeStore.size > 500
        ? 'ml-2'
        : 'ml-2 mr-4'} px-5 py-5 border rounded-xl shadow-sm mb-5"
>
    <div class="font-semibold underline">
        Table {selectedId == "*" ? "Number" : selectedId}
    </div>
    {#if royalRights($userModelStore)}
        <div class="mb-2 text-sm">Click to crossout what is completed.</div>
    {/if}
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
    {#if selectedId != "all" && $screenSizeStore.size > 500}
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
                    if (royalRights($userModelStore)) {
                        itemDetails.forEach((e) => {
                            complete_Order(
                                $businessModelStore.BusinessId,
                                e.customerId,
                                enumComplete.pending
                            ),
                                (selectedId = "all");
                        });
                    }
                }}>next order</span
            >
        {/if}
    </div>
    {#if selectedId == "all"}
        Open Table orders
    {/if}
</div>
