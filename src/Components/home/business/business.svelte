<script>
    import BodyWrapper from "../../bodyWrapper.svelte";
    import CreateTemplate from "../../resuable/createTemplate/createTemplate.svelte";
    import SignUpPreview from "./SignUp_preview.svelte";
    import UserInfo from "./userInfo.svelte";
    import {userModelStore} from '../../../stores'
    let value = "";
    let adminName = "Admin";
    let page = 1;
    function changePage(pg) {
        page = pg;
    }
</script>
<BodyWrapper>
    <div>
        <div class="mt-10 m-10">
            <h1 class="heading font-bold flex justify-center ">
                Welcome To cliq host mini service
            </h1>
            <div class="flex justify-center mt-5" />
            {#if page == 1}
                <CreateTemplate
                    title="Set business name"
                    onSubmit={() => changePage(2)}
                    bind:value
                />
            {:else if page == 2}
                <UserInfo bind:businessName={value} bind:name={adminName} changePage={() => changePage(3)} />
            {/if}
        </div>
    </div>
</BodyWrapper>

<style>
    .heading {
        font-size: large;
    }
</style>
