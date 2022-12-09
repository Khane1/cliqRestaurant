<script>
    import { onMount } from "svelte";
    import { orderTogglesettings } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { execRights} from "../../func_essential";
    import { businessModelStore, screenSizeStore, userModelStore } from "../../stores";
    import SwitchButton from "../resuable/buttons/switchbutton/switchButton.svelte";

    $: switcher = false;
    onMount((e) => {
        switcher =
            $businessModelStore != undefined
                ? $businessModelStore.orderToggle
                : false;
    });
</script>

<div class="">
    <div class="space-y-3 {$screenSizeStore.size > 600?'px-10':''}  py-5">
        <span class="font-bold pb-5 flex justify-center">Account Settings</span>

        {#if execRights($userModelStore)}
        <div class="flex justify-between">
                <div>
                    <span class="font-semibold"> Customer Orders </span>
                    <div>
                        <span class="text-sm"
                            >Your customers can make orders with the app</span
                        >
                    </div>
                </div>
                <div>
                    <SwitchButton
                        switchFunc={() => {
                            if (execRights($userModelStore)) {
                                orderTogglesettings(
                                    $businessModelStore.BusinessId,
                                    !switcher
                                );
                            } else {
                                alert(
                                    "Sorry you don't have rights to make this change"
                                );
                            }
                        }}
                        bind:switcher
                    />
                </div>
            </div>
            <hr />
            {/if}
        <div>
            <div class="flex justify-between pb-4">
                <span class="font-semibold">Email</span>
                <span class="text-sm">
                    {$userModelStore.email}
                </span>
            </div>
            <hr />
            <div class="flex justify-between py-4">
                <span class="font-semibold">Name</span>
                <span class="text-sm">
                    {$userModelStore.displayName}
                </span>
            </div>
            <hr />
        </div>
        <div>
            <div class="flex justify-between py-4">
                <span class="font-semibold">Plan</span>
                <span class="text-sm"> Basic </span>
            </div>
            <hr />
            <div class="flex justify-between py-4">
                <span class="font-semibold">Expiry</span>
                <span class="text-sm"> 20/3/2022 </span>
            </div>
        </div>
    </div>
</div>
