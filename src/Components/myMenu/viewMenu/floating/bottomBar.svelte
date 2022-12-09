<script>
    import { pageNameStore } from "../../../../stores";

    let selected = $pageNameStore.pageName ?? "home";
    let activeColor = "font-bold text-slate-600";
</script>

<div
    class="my-0 
w-full h-10 fixed left-0 bottom-0
flex justify-center items-center 
text-white text-md"
>
    <div class="pb-5 w-full bg-white">
        <div class="w-full border mx-1 py-5 shadow-lg">
            <div class="flex justify-evenly text-slate-600">
                <a
                    href="{window.location.origin}/home"
                    on:click={() => {
                        selected = "home";
                    }}
                    class={selected != "home" ? "" : activeColor}>Orders</a
                >
                <a
                    href="{window.location.origin}/mymenu"
                    on:click={() => {
                        selected = "myMenu";
                    }}
                    class={selected != "myMenu" ? "" : activeColor}>Menu</a
                >
                <a
                    href="{window.location.origin}/history"
                    on:click={() => {
                        selected = "history";
                    }}
                    class={selected != "history" ? "" : activeColor}>History</a
                >
                <a
                    href="{window.location.origin}/settings"
                    on:click={() => {
                        selected = "settings";
                    }}
                    class={selected != "settings" ? "" : activeColor}
                    >Settings</a
                >
            </div>
        </div>
    </div>
</div>

<style>
    a {
        color: rgb(38, 38, 44);
    }
    a:active {
        color: rgb(38, 38, 44);
    }
</style>
