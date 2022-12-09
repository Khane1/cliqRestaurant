<script>
    import { roles } from "../../../../firebase/functions/restaurant_funcs/businessLogic";
    import { updateCollabRole } from "../../../../firebase/functions/restaurant_funcs/restaurants";

    export let selectedRole, selectedTeammate, collabs, clearSelection;
</script>

<div class="mt-2" />
<tr class="bg-slate-50">
    <td class="pl-2 py-2  text-sm font-medium text-gray-900whitespace-nowrap">
        {collabs.name}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
        {collabs.role}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
        {#if selectedTeammate.uid == collabs.uid || selectedTeammate == ""}
            <select
                bind:value={selectedRole}
                on:change={() => {
                    selectedTeammate = collabs;
                    console.log(selectedTeammate);
                }}
            >
                <option class="bg-slate-500 text-white" value="">
                    {collabs.role}
                </option>
                <option value={roles.admin}>{roles.admin}</option>
                <option value={roles.attendant}>{roles.attendant}</option>
                <option value={roles.cashier}>{roles.cashier}</option>
                <option value={roles.manager}>{roles.manager}</option>
                <option value={roles.unallocated}>{roles.unallocated} </option>
            </select>
        {:else}
            <select disabled />
        {/if}
    </td>
    <td class="text-sm font-light px-6 py-2 whitespace-nowrap">
        {#if selectedRole.length > 0 && selectedRole != collabs.role && selectedTeammate.uid == collabs.uid}
            <span
                class="ml-3 px-3 py-1 bg-green-500 border rounded text-white"
                on:click={() => {
                    updateCollabRole(collabs.uid, selectedRole);
                    clearSelection();
                }}>Save</span
            >
        {/if}
    </td>
</tr>
