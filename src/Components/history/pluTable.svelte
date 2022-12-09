<script>
    import { MoneyFormat } from "../../func_essential";
    import { screenSizeStore } from "../../stores";
    import Table from "./table.svelte";

    export let list;
</script>
<Table headers={$screenSizeStore.size < 400?[" Name", "Qty","Total" ]:[" Name", "Price", "Qty","Total" ]} >
    {#each list as item}
    <div
        class="font-bold px-6 py-2 whitespace-nowrap text-sm text-gray-900 mt-2"
    >
        {item.category}
    </div>
    {#each item.data as detail}
        <tr class="bg-slate-50 space-y-4">
            <td
                class="px-6 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
            >
                {detail.name}
            </td>
            {#if $screenSizeStore.size > 400}
            <td
                class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
            >
                ugx. {MoneyFormat(detail.price)}
            </td>
            {/if}
            <td
                class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
            >
                {detail.qty}
            </td>
            <td
                class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
            >
                ugx. {MoneyFormat(detail.total)}</td
            >
        </tr>
        <div class="mt-2" />
    {/each}
    <tr>
        <td />
        <td />
        {#if $screenSizeStore.size > 400}
        <td />
        {/if}
        <td
            class="border bg-slate-200 text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap"
        >
            ugx.{MoneyFormat(
                item.data.reduce(
                    (a, { total }) => a + total,
                    0
                )
            )}
        </td>
    </tr>
{/each}
</Table>
