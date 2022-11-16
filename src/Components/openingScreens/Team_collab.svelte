<script>
    import BodyWrapper from "../bodyWrapper.svelte";
    import SignUp from "./SignUp.svelte";
    let email='xmp@yahoo.com';
    let   password = "12345678";
    let name=''
</script>

<BodyWrapper>
    <div class="flex justify-center">
        <div class="mt-14 pl-10">
            <div class="text-xl font-semibold ml-5">Team Collaboration</div>
            <div class="text-sm ml-5">
                Sign up and get assigned to your team.
            </div>
            <div
                class="cardBody space-y-5 border rounded-lg px-5 pt-2 mt-5 pb-5 "
            >
                <div class="mt-5">
                    <SignUp bind:name bind:email bind:password />
                </div>
            </div>
        </div>
    </div>
</BodyWrapper>

<style>
    .cardBody {
        width: 22rem;
        border-radius: 20px;
        padding-bottom: 30px;
    }
</style>
