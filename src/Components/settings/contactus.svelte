<script>
        import { getNotificationsContext } from "svelte-notifications";
    import { notifyUser } from "../../stores";
    const { addNotification } = getNotificationsContext();

</script>

<div class="m-5">
    <div class="text-sm underline mb-2">
        Click to copy contact.
    </div>
    <div class="font-bold">
        Our Email
    </div>
    <div style="cursor: pointer;" on:click={()=>{
            notifyUser("Email copied", addNotification, 'success');
        navigator.clipboard.writeText('philip.mugz@yahoo.com')}}>
    philip.mugz@yahoo.com
    </div>
    <div class="font-bold mt-2">
        Our Phone 
    </div>
    <div>
    </div>
    <div style="cursor: pointer;" on:click={()=>{
        notifyUser("Contact copied", addNotification, 'success');
    navigator.clipboard.writeText('+256 788607954')}}>
        +256 788607954
</div>
</div>