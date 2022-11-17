<script>
    import { onMount } from "svelte";
    import { stringify } from "uuid";
    import { roles } from "../../../firebase/functions/restaurant_funcs/businessLogic";
    import {
        collabListSnapshot,
        updateCollabRole,
    } from "../../../firebase/functions/restaurant_funcs/restaurants";
    import {
        businessModelStore,
        collabListStore,
        userModelStore,
    } from "../../../stores";
    import BodyWrapper from "../../bodyWrapper.svelte";
    import Table from "../../history/table.svelte";
    import Team from "../../settings/team.svelte";
    import UserInfo from "./userInfo.svelte";
    let select = "My Team";
    $: classStyle = (selected) =>
        select == selected
            ? "text-white border bg-slate-500 rounded px-3 py-1"
            : "border px-3 py-1";

    let selectedTeammate = "";
    let selectedRole = "";

    onMount((e) => {});
    let clearSelection = () => {
        (selectedTeammate = ""), (selectedRole = "");
    };
</script>

<BodyWrapper>
    <div class=" flex justify-start space-x-4">
        <span
            on:click={() => (select = "My Team")}
            class={classStyle("My Team")}
        >
            My Team
        </span>
        <span
            on:click={() => (select = "Invite Teammate")}
            class={classStyle("Invite Teammate")}
        >
            Invite Teammate
        </span>
    </div>

    <div class="mt-10 font-semibold">{select}</div>
    {#if select == "My Team"}
        <div class="mt-5">
            <div class="flex justify-between">
                {#if selectedRole.length > 0}
                    <div>
                        Change
                        <strong>
                            {selectedTeammate.name}
                        </strong>
                        from
                        {selectedTeammate.role} to
                        <strong>
                            {selectedRole}
                        </strong>
                    </div>
                {/if}
                <span
                    on:click={() => clearSelection()}
                    class="border bg-black text-white text-sm px-3 py-1 rounded"
                    >Clear Selection</span
                >
            </div>
            <Table headers={[" Name", "Role", "change Role", "action"]}>
                {#each $collabListStore as collabs}
                    {#if collabs.uid == $businessModelStore.adminIds[0]}
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
                                Master Account
                            </td>
                            <td
                                class="text-sm font-light px-6 py-2 whitespace-nowrap"
                            />
                        </tr>
                    {/if}
                {/each}
                {#each $collabListStore as collabs}
                    {#if collabs.uid != $businessModelStore.adminIds[0]}
                        <div class="mt-2" />
                        <tr class="bg-slate-50">
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
                                {#if selectedTeammate.uid == collabs.uid || selectedTeammate == ""}
                                    <select
                                        bind:value={selectedRole}
                                        on:change={() => {
                                            selectedTeammate = collabs;
                                            console.log(selectedTeammate);
                                        }}
                                    >
                                        <option
                                            class="bg-slate-500 text-white"
                                            value=""
                                        >
                                            {collabs.role}
                                        </option>
                                        <option value={roles.admin}
                                            >{roles.admin}</option
                                        >
                                        <option value={roles.attendant}
                                            >{roles.attendant}</option
                                        >
                                        <option value={roles.cashier}
                                            >{roles.cashier}</option
                                        >
                                        <option value={roles.manager}
                                            >{roles.manager}</option
                                        >
                                        <option value={roles.unallocated}
                                            >{roles.unallocated}
                                        </option>
                                    </select>
                                {:else}
                                    <select disabled />
                                {/if}
                            </td>
                            <td
                                class="text-sm font-light px-6 py-2 whitespace-nowrap"
                            >
                                {#if selectedRole.length > 0 && selectedRole != collabs.role && selectedTeammate.uid == collabs.uid}
                                    <span
                                        class="ml-3 px-3 py-1 bg-green-500 border rounded text-white"
                                        on:click={() => {
                                            updateCollabRole(
                                                collabs.uid,
                                                selectedRole
                                            );
                                            clearSelection();
                                        }}>Save</span
                                    >
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </Table>
        </div>
    {:else if select == "Invite Teammate"}
        <Team />
    {/if}
</BodyWrapper>

<style>
</style>
