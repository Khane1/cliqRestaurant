<script>
    import { createOrder } from "../../../../firebase/functions/restaurant_funcs/restaurants";
    import {
        customerOrderHistory,
        customerOrderStore,
        notifyUser,
        categoryStore
    } from "../../../../stores";
    let loading = false;
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
    export let order, checkOutPage, readyToEat, notes;
</script>

{#if !notes}
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
                        $categoryStore.uid,
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
        class="my-10 
w-full h-16 fixed left-0 bottom-0
flex justify-center items-center 
text-white text-md"
    >
        <div
            class="px-10 {order.length > 0
                ? loading
                    ? 'bg-green-500'
                    : ' bg-indigo-600'
                : 'bg-slate-400'} border-white rounded-full shadow"
        >
            <div class="w-full mx-3 py-3 flex justify-center">
                {#if loading == false}
                    {#if !checkOutPage}
                        Add {order.length} item{order.length >= 0 &&
                        order.length != 1
                            ? "s"
                            : ""} to Order
                    {:else}
                        I am ready to eat!
                    {/if}
                {:else}
                    Please wait
                {/if}
            </div>
        </div>
    </div>
{/if}
