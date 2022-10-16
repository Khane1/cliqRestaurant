<script>
    import { MoneyFormat } from "../../../../func_essential";
    import {
        customerOrderStore,
        customerOrderHistory,
    } from "../../../../stores";
    // export let order;
</script>

<div class="">
    <div class="mt-32">
        My bill
        <div class="border px-10 py-2">
            {#each $customerOrderHistory as order}
                <div class="flex justify-between ">
                    <span>{order.count} Qty</span>
                    <span>{order.val}</span>
                    <span>ugx.{MoneyFormat(order.count * order.price)}</span>
                </div>
            {/each}
        </div>
    </div>
    <div class="mt-10">
        Requests
        <div class=" px-10 py-2">
            {#each $customerOrderHistory as order}
                <div class="flex justify-between ">
                    <span>{order.val}</span>
                    <span
                        >{order.notes.length == 0
                            ? "No requests made"
                            : order.notes}</span
                    >
                </div>
            {/each}
        </div>
    </div>

    <div class="mt-10 bg-white px-10 py-5 rounded-lg">
        <div class="px-10 py-2">
            <div
                class=" flex justify-center text-xl font-semibold text-slate-500"
            >
                <span>Thank you!</span>
            </div>
            <div class=" flex justify-center text-slate-500 text-sm font-thin">
                <span>We are preparing your order</span>
            </div>
            <div
                class="flex justify-center font-semibold text-lg text-slate-500 mt-5"
            >
                <span
                    >{$customerOrderStore.restaurant}. Table {$customerOrderStore.table}</span
                >
            </div>
        </div>
    </div>
</div>
