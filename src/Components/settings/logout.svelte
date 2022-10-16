<script>
    import { signOut } from "../../firebase/functions/auth";
</script>

<div class="space-y-5">
    <div class=" mt-10 flex justify-center text-lg font-semibold">Log out</div>
    <div class=" flex justify-center">
        <span class="flex items-center "> Are you sure? </span>
    </div>
    <div class="space-y-10 flex justify-center">
        <span
            class="border px-5 py-1 mb-5 bg-red-500 text-white rounded-full"
            on:click={() => signOut()}>Logout</span
        >
    </div>
</div>
