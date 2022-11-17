<script>
    import { OrderItem_Complete } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { MoneyFormat } from "../../func_essential";
    import { businessModelStore, userModelStore } from "../../stores";
    export let order, dataId;
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
                        on:click={OrderItem_Complete(
                            $businessModelStore.BusinessId,
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
                            $businessModelStore.BusinessId,
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
                No note request
            {/if}
        </div>
        <div>ugx.{MoneyFormat(order.total)}</div>
    </div>
</div>

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
