<script>
    import Notes from "./notes.svelte";
    export let reduceOrder, addToOrder, order;
    export let notes = false;
    let selected = 0;
    let value = "";
</script>

{#if !notes}
    <div class="mt-36">
        <div class="w-full px-1 h-full">
            {#if order.length > 0}
                {#each order as order}
                    <div class="mb-10 ml-2">
                        <div class="flex justify-start">
                            <div class="">
                                <img
                                    class="object-cover md:h-40 md:w-60 xl:h-40 xl:w-72 shadow rounded-lg mb-2 upload"
                                    src={order.data.avatar}
                                    alt=""
                                />
                            </div>
                            <div class="ml-5">
                                <div>
                                    {order.data.name}
                                </div>
                                <div class="flex justify-start ">
                                    {order.data.description}
                                </div>
                                <div class="text-red-500">
                                    ugx.{order.data.price}
                                </div>
                                <div class="flex justify-between">
                                    <span
                                        class="font-semibold"
                                        on:click={() => {
                                            notes = !notes;
                                            selected = order;
                                            value = selected.notes;
                                        }}
                                    >
                                        {order.notes.length == 0
                                            ? "Add"
                                            : "Edit"} notes</span
                                    >
                                    <span class="ml-3">
                                        <span
                                            class="font-bold text-2xl px-2 py-0.2 rounded-full border shadow-lg {order.count !=
                                            0
                                                ? ''
                                                : 'text-slate-300 '}"
                                            on:click={() => {
                                                if (order.count != 0) {
                                                    reduceOrder(
                                                        order.data.name
                                                    );
                                                } else {
                                                }
                                            }}>-</span
                                        >
                                        <span
                                            class="font-bold text-2xl px-2 py-1"
                                            style="cursor:none"
                                            >{order.count}</span
                                        >
                                        <span
                                            class="font-bold text-2xl px-2 py-0.2 rounded-full border shadow-lg"
                                            on:click={() => {
                                                addToOrder(order.data);
                                            }}>+</span
                                        >
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            {:else}
                <div class="flex justify-center font-semibold">
                    No Items added yet.
                </div>
            {/if}
        </div>
    </div>
{:else}
    <Notes bind:value bind:selected bind:order bind:notes/>
{/if}

<style>
    .upload {
        height: 80px;
        width: 80px;
    }
</style>
