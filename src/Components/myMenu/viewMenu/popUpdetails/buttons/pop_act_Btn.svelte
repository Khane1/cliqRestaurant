<script>
  import { getContext } from "svelte";
  const { close } = getContext("simple-modal");

    export let count,reduce,onclick;
</script>
    <div
        class="
    w-full h-16 fixed left-0 bottom-0
    flex justify-center items-center 
    text-white text-md"
    >
        <div
            class="w-full bg-white
                 border-white shadow"
        >
            <div class="w-full py-5 flex justify-between px-3 ">
                <div class="flex justify-start space-x-3 bg-slate-200 rounded-lg ">
                    <span
                        class="font-bold text-3xl px-3 py-1 {count != 0
                            ? 'text-slate-700'
                            : 'text-slate-400 '}"
                        on:click={() => {
                            if (count != 0) {
                                reduce(), count--;
                            } else {
                                count;
                            }
                        }}>&minus;</span
                    >
                    <span class="font-bold text-2xl text-slate-700 px-2 py-1" style="cursor:none"
                        >{count}</span
                    >
                    <span
                        class="font-bold text-3xl px-3 py-1 text-slate-700"
                        on:click={() => {
                            onclick(), count++;
                        }}>&plus;</span
                    >
                </div>
                <span
                    class="font-semibold text-md border bg-green-500 rounded-lg px-4 py-2"
                    on:click={() => {
                    close()
                    }}>{count>0?"Add to order":"back"}</span
                > 
            </div>
        </div>
    </div>
<!-- {/if} -->
