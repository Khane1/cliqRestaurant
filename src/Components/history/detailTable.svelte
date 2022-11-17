<script>
    import { MoneyFormat } from "../../func_essential";
    import { historyDataStore } from "../../stores";
    import Table from "./table.svelte";

</script>


<Table headers={["Category", "Item", "Date", "Time", "Qty", "Total"]}>
    {#each  $historyDataStore as item}
    <div class="hover:text-lg my-3"/>
            <tr class=" bg-slate-50 space-y-4">
                <td
                    class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
                >
                    {item.category}
                </td>
                <td
                    class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
                >
                    {item.name}
                </td>
                <td
                    class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                >
                {new Date(item.orderTimestamp.seconds*1000).toLocaleDateString()}
                </td>
                <td
                    class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                >
            
                {new Date(item.orderTimestamp.seconds*1000).toLocaleTimeString()}

                </td>
                <td
                    class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                >
                    {item.qty}
                </td>
                <!-- <td
                    class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                >
                    ugx. {MoneyFormat(detail.price)}
                </td> -->

                <td
                    class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                >
                    ugx. {MoneyFormat(item.total)}</td
                >
            </tr>
            <div class="mt-2" />
        {/each}
</Table>

<style>
</style>