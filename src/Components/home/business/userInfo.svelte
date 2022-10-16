<script>
    import { createBusiness } from "../../../firebase/functions/restaurant_funcs/restaurants";

    import CreateTemplate from "../../resuable/createTemplate/createTemplate.svelte";
    export let name = "";
    export let businessName = "";
    export let changePage;
    import { userModelStore } from "../../../stores";
</script>

<div class="mt-10 m-10">
    <span on:click={changePage}>Back</span>
    <div class="flex justify-center mt-5" />
    <CreateTemplate
        title="Enter your Admin Name"
        submitButtonTitle="Next"
        onSubmit={() => {
            createBusiness(businessName, name,$userModelStore.uid)
        }        
        }
        bind:value={name}
    />
</div>
