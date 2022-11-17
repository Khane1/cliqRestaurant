<script>
    import { intros } from "svelte/internal";
    import { parse, stringify } from "uuid";
    import { getOrders_ByDate } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { getDateToday, MoneyFormat } from "../../func_essential";
    import { businessModelStore, historyDataStore, userModelStore, userStore } from "../../stores";
    import BodyWrapper from "../bodyWrapper.svelte";
    import DetailTable from "./detailTable.svelte";
    import PluTable from "./pluTable.svelte";
    import Table from "./table.svelte";
    $: categories = [];
    let date = getDateToday();
    let from;
    let to;
    let list = [];
    $: list =
        $historyDataStore.length != undefined &&
        $historyDataStore.length != list.length
            ? []
            : list;
    $: sort = $historyDataStore.forEach((e) => {
        if (
            list.filter((val) => e.category == val.category).length == 0
        ) {
            list = [
                ...list,
                {
                    category: e.category,
                    data: [
                        {
                            name: e.name,
                            price: e.price,
                            qty: e.qty,
                            total: e.total,
                        },
                    ],
                },
            ];
        } else if (
            list.filter((val) => e.category == val.category).length == 1
        ) {
            let index = list
                .map((object) => object.category)
                .indexOf(e.category);
            let item = list[index].data.filter(
                (data) => e.name == data.name
            )[0];

            if (
                list[index].data.filter((data) => e.name == data.name).length ==
                1
            ) {
                item.qty += e.qty;
                item.total += e.total;
            } else {
                list[index].data = [
                    ...list[index].data,
                    {
                        name: e.name,
                        price: e.price,
                        qty: e.qty,
                        total: e.total,
                        orderTimestamp: e.orderTimestamp.seconds,
                    },
                ];
            }
        }
    });
    function conv_T(timeStamp) {
        return { date: new Date.parse(Date(timeStamp).toString("d")) };
    }
    $: total = $historyDataStore.reduce((a, { total }) => a + total, 0);
    $: detailList = true;
</script>

<BodyWrapper>
    <span class="text-sm">
        {$userModelStore.displayName}
    </span>
    <div class="mb-5 font-bold text-xl">Plu Table</div>
    <div class="pb-5 flex justify-evenly">
        <div class=" space-x-2  pl-2 pb-0 rounded">
            <span> From </span>
            <input
                bind:value={from}
                max={new Date().toISOString().split("T")[0]}
                type="date"
            />
        </div>
        <div class="pl-2 pb-0 rounded">
            <span class="pr-2"> To </span>
            {#if from != undefined && from != ""}
                <input
                    bind:value={to}
                    min={from}
                    max={new Date().toISOString().split("T")[0]}
                    type="date"
                />
            {:else}
                <input disabled type="date" />
            {/if}
        </div>
        <div>
            <span
                on:click={async () => {
                    if (to != undefined && to.length != 0) {
                        await getOrders_ByDate($businessModelStore.BusinessId, from, to);
                    } else {
                        alert("please fill in the to date!");
                    }
                }}
                class="{to != undefined && to.length != 0
                    ? 'bg-gray-700 text-white border rounded shadow'
                    : 'text-gray-200'} border px-3 py-1 rounded">search</span
            >
        </div>
    </div>
    <div class="flex justify-evenly py-3">
        <span
            on:click={() => {
                detailList = true;
            }}
            class="text-sm {detailList
                ? 'bg-slate-500 text-white border  px-4 py-2 rounded-md '
                : ' border  px-4  py-2 rounded '} "
        >
            Summary PLU Table
        </span>
        <span
            on:click={() => {
                detailList = false;
                list = [];
            }}
            class="text-sm {!detailList
                ? 'bg-slate-500 text-white border  px-4 py-2 rounded-md '
                : ' border  px-4  py-2 rounded '} "
        >
            Detail PLU Table
        </span>
        <span
            class="hover:text-lg py-2 text-sm text-slate-700 underline text-md px-1 rounded"
        >
            Overall Total ugx.
            {MoneyFormat(total)}
        </span>
    </div>
    {#if detailList}
        <PluTable bind:list />
    {:else}
        <DetailTable />
    {/if}
    {#if list.length==0}
        No Items to display
    {/if}
</BodyWrapper>
