<script>
    import { onMount } from "svelte";
    import { orderTogglesettings } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { businessModelStore, userModelStore } from "../../stores";

    $: switcher = false;
    onMount((e) => {
        switcher = $businessModelStore.orderToggle;
    });
</script>

<div class="">
    <div class="space-y-3 px-10 py-5">
        <span class="font-bold pb-5 flex justify-center">Account Settings</span>

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
                <label class="switch">
                    <input
                        type="checkbox"
                        on:change={() =>
                            orderTogglesettings(
                                $businessModelStore.BusinessId,
                                !switcher
                            )}
                        bind:checked={switcher}
                    />
                    <span class="slider round" />
                </label>
            </div>
        </div>
        <hr />
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

<style>
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #2196f3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
