<script>
    import { roles } from "../../firebase/functions/restaurant_funcs/businessLogic";
    import { OrderItem_Complete } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { MoneyFormat } from "../../func_essential";
    import {
        businessModelStore,
        screenSizeStore,
        userModelStore,
    } from "../../stores";
    export let order, dataId;
</script>

<div>
    <div
        class="{order.status == 'served'
            ? 'underlined'
            : 'unchecked'}  flex justify-between space-x-5"
    >
        <div class="m-0.5">
            {#if $userModelStore.role != roles.undefined && $userModelStore.role != roles.attendant}
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
            {/if}
        </div>
        <div class="">Qty {order.qty}</div>
        <div class="flex justify-start w-32">{order.name}</div>

        {#if $screenSizeStore.size > 500}
            <div>ugx.{MoneyFormat(order.total)}</div>
        {/if}
    </div>
    <div class="">
        {#if order.notes.length > 0}
            <div
                class=" ml-0 {order.status == 'served'
                    ? 'underlined'
                    : 'unchecked'}"
            >
                <span class="font-semibold text-red-400"> Notes </span>
                <ul>
                    {#each order.notes.split(",") as note, i}
                        <li>
                            {i + 1} . {note}
                        </li>
                    {/each}
                </ul>
            </div>
        {:else}
            No note request
        {/if}
        <hr />
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
