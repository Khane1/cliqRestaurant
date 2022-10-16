<script>
import { userStore } from "../../stores";

    import BodyWrapper from "../bodyWrapper.svelte";
    import Header from "../resuable/header.svelte";
    import TextInput from "../resuable/text_input.svelte";
    import SignIn from "./signIn.svelte";
    import SignUp from "./SignUp.svelte";
    let page = "signIn";
    let email =''
    let password=''
    function onPageChange(newPage) {
        page = newPage;
    }
</script>
{$userStore}
<BodyWrapper>
    <div class="flex justify-center">
        <div class="mt-20 pl-10">
            <!-- <Header title="Sign In" /> -->
            <div class="cardBody space-y-5 border rounded-lg px-5 pt-5 pb-5">
                <div class="flex justify-between">
                    <span
                        on:click={() => {
                            onPageChange("signIn");
                        }}
                        class="{page == 'signIn'
                            ? 'isActive'
                            : ''} flex justify-center border px-11 py-2"
                    >
                        <span class=""> Sign In </span>
                    </span>
                    <span
                        on:click={() => {
                            onPageChange("signUp");
                        }}
                        class="{page == 'signUp'
                            ? 'isActive'
                            : ''} flex justify-center border px-11 py-2"
                    >
                        <span class=""> Sign Up </span>
                    </span>
                </div>
                {#if page == "signIn"}
                    <SignIn bind:email bind:password/>
                {:else if page == "signUp"}
                    <SignUp bind:email bind:password />
                {/if}
                <div class="flex justify-center border rounded-lg m-10">
                    {#if page == "signIn"}
                        <span
                        class="text-blue-600"
                            on:click={() => {
                                onPageChange("signUp");
                            }}
                        >
                            I don't have an account.
                        </span>
                    {:else if page == "signUp"}
                        <span
                        class="text-blue-600"
                            on:click={() => {
                                onPageChange("signIn");
                            }}
                        >
                        I already have an account.
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    </div></BodyWrapper
>

<style>
    .cardBody {
        width: 22rem;
        border-radius: 20px;
        padding-bottom: 30px;
    }
    .isActive {
       color: #715bff;
        /* color: white; */
        font-weight: bold;
    }
</style>
