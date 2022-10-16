<script>
    import { userModelStore } from "../../stores";
</script>

<div class="">
    <div class="space-y-3 p-10">
        <span class="font-bold pb-10">Account Settings</span>
        <div>
            <div>
                <span class="font-semibold">Email</span>
            </div>
            {$userModelStore.email}
            <div>
                <span class="font-semibold">Name</span>
            </div>
            {$userModelStore.displayName}
        </div>
        <div>
            <div>
                <span class="font-semibold">Plan</span>
            </div>
            Basic
            <div>
                <span class="font-semibold">Expiry</span>
            </div>
            20/3/2022
        </div>
    </div>
</div>
