<script>
    import Button from "../resuable/buttons/button.svelte";
    import TextInput from "../resuable/text_input.svelte";
    let value = "";
    import { businessModelStore, notifyUser, screenSizeStore } from "../../stores";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
</script>
<div class="{$screenSizeStore.size>800?'p-10':'p-4'} space-y-5">
        <span class="text-md">
            Click the button to get a shareable signup link for your team.
        </span>
        <div />
        
    <!-- <TextInput bind:value placeholder="Input email" ,isText={true} /> -->
    <div class="mb-3">
        <span
            on:click={async () => {
                await navigator.clipboard.writeText(
                    window.location.origin +
                        "/teamcollab/" +
                        $businessModelStore.BusinessId +
                        "/signup"
                );
                notifyUser("Team Link Copied", addNotification, "success");
            }}
            class="w-32 border px-3 py-1 bg-green-500 text-white shadow rounded-lg"
            >Copy sharable link.</span
        >
    </div>
</div>
