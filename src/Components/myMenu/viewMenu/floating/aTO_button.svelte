<script>
    import { createOrder } from "../../../../firebase/functions/restaurant_funcs/restaurants";
    import {
        customerOrderHistory,
        customerOrderStore,
        notifyUser,
        categoryStore,
    } from "../../../../stores";
    let loading = false;
    import { getNotificationsContext } from "svelte-notifications";
    import { MoneyFormat } from "../../../../func_essential";
    const { addNotification } = getNotificationsContext();
    export let order, checkOutPage, readyToEat, notes, total;
</script>

{#if !notes&&order.length>0}
    <div
        on:click={async () => {
            if (checkOutPage == false && order.length > 0) {
                checkOutPage = !checkOutPage;
            } else if (order.length > 0) {
                let restaurant = $customerOrderStore.restaurant;
                let tableNum = $customerOrderStore.table;
                let openTime = $customerOrderStore.time;
                let orderTime = new Date();
                if (loading == false) {
                    loading = true;
                    await createOrder(
                        $categoryStore.uid, // business Id
                        $customerOrderStore.customerId,
                        order,
                        restaurant,
                        tableNum,
                        openTime,
                        orderTime
                    ).then((e) => {
                        ///ordered
                        if (e == true) {
                            loading = true;
                            notifyUser(
                                "Order Complete",
                                addNotification,
                                "success"
                            );
                            customerOrderHistory.update((e) => {
                                return $customerOrderHistory.concat(order);
                            });
                            order = [];
                            readyToEat = !readyToEat;
                        } else {
                            notifyUser(
                                "An error occured! please try again",
                                addNotification,
                                "error"
                            );
                        }
                    });
                } else {
                    notifyUser("please wait", addNotification, "Warning");
                    // loading=false;
                }
            }
        }}
        class="my-0 
w-full h-16 mb-1 fixed left-0 bottom-0
flex justify-center items-center 
text-white text-md"
    >
        <div
            class="px-2 {order.length > 0
                ? loading
                    ? 'bg-green-600'
                    : !checkOutPage?'bg-indigo-600':' bg-green-500'
                : 'bg-slate-400'} border-white w-full shadow"
        >
            <div class="w-full mx-1 py-5 shadow-lg">
                {#if loading == false}
                    {#if !checkOutPage}
                        <div class="flex justify-between">
                            <span>
                                    Review Order
                                <span class="bg-white px-2.5 py-0.5 rounded-full font-bold text-slate-500">
                                    {order.length}
                                </span>
                            </span>
                            <span class="pr-4">
                                ugx.{MoneyFormat(total)}
                            </span>
                        </div>
                    {:else}
                        <div class="flex justify-between">
                            <span> Submit Order 
                                <span class="bg-white px-2.5 py-0.5 rounded-full font-bold text-slate-500">
                                    {order.length}
                                </span>
                            </span>
                            <span class="pr-4">
                                ugx.{MoneyFormat(total)}
                            </span>
                        </div>
                    {/if}
                {:else}
                    <span> Please wait </span>
                {/if}
            </div>
        </div>
    </div>
{/if}
