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
    import DynamicTable from "./teamRoles/dynamic_Table.svelte";
    import StaticTable from "./teamRoles/static_Table.svelte";
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
                {#if $userModelStore.role != roles.admin && $userModelStore.role != roles.manager}
                    {#each $collabListStore as collabs}
                        <StaticTable bind:collabs />
                    {/each}
                {:else}
                {#each $collabListStore as collabs}
                        {#if collabs.role == roles.admin&& $businessModelStore.adminIds[0]==collabs.uid}
                            <StaticTable bind:collabs />
                        {/if}
                    {/each}
                    {#each $collabListStore as collabs}
                        {#if collabs.role != roles.admin || (collabs.role == roles.admin&& $businessModelStore.adminIds[0]!=collabs.uid) }
                            <DynamicTable
                                bind:selectedRole
                                bind:selectedTeammate
                                bind:collabs
                                clearSelection={() => clearSelection()}
                            />
                        {/if}
                    {/each}
                {/if}
            </Table>
        </div>
    {:else if select == "Invite Teammate"}
        <Team />
    {/if}
</BodyWrapper>

<style>
</style>
