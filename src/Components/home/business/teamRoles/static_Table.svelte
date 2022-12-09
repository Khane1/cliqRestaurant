<script>
    import { roles } from "../../../../firebase/functions/restaurant_funcs/businessLogic";
    import { businessModelStore } from "../../../../stores";


    export let collabs;
</script>

{#if collabs.uid == $businessModelStore.adminIds[0] || collabs.role != roles.admin || collabs.role != roles.manager}
<div class="mt-2" />
<tr class="bg-slate-200">
    <td
        class="pl-2 py-2  text-sm font-medium text-gray-900whitespace-nowrap"
    >
        {collabs.name}
    </td>
    <td
        class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
    >
        {collabs.role}
    </td>
    <td
        class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
    >
        {collabs.role == roles.admin
            ? " Master Account"
            : ""}
    </td>
    <td
        class="text-sm font-light px-6 py-2 whitespace-nowrap"
    />
</tr>
{/if}