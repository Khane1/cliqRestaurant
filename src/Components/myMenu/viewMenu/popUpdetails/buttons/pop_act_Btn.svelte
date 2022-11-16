<script>
    export let pressed,count,reduce,onclick;
</script>
{#if pressed == false}
    <div class="flex justify-center">
        <span
            on:click={() => {
                pressed = !pressed;
            }}
            title="Contact Sale"
            style="background: #3adb15;"
            class="fixed z-90 shadow bottom-10 right-8 mr-3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl"
            >{count == 0 ? "+" : count}
        </span>
    </div>
{:else}
    <div
        class="my-10 
    w-full h-16 fixed left-0 bottom-0
    flex justify-center items-center 
    text-white text-md"
    >
        <div
            class="px-10 {count > 0
                ? ' bg-indigo-600'
                : 'bg-slate-400'} border-white rounded-full shadow"
        >
            <div class="w-full space-x-3 py-3 flex justify-evenly ">
                <span
                    class="font-bold text-2xl px-3 py-1 rounded-full border {count != 0
                        ? ''
                        : 'text-slate-300 '}"
                    on:click={() => {
                        if (count != 0) {
                            reduce(), count--;
                        } else {
                            count;
                        }
                    }}>-</span
                >
                <span class="font-bold text-2xl px-2 py-1" style="cursor:none"
                    >{count}</span
                >
                <span
                    class="font-bold text-2xl px-3 py-1 rounded-full border"
                    on:click={() => {
                        onclick(), count++;
                    }}>+</span
                >
                <span
                    class="font-semibold text-md border rounded-lg px-2 py-1.5"
                    on:click={() => {
                        pressed = !pressed;
                    }}>{count>0?"Ready":"back"}</span
                > 
            </div>
        </div>
    </div>
{/if}
