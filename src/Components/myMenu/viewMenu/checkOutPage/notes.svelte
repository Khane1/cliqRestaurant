<script>
    import Button from "../../../resuable/buttons/button.svelte";
    import TextInput from "../../../resuable/text_input.svelte";

    export let value, selected, order, notes;
    let noteList=[];
    let addNote=(note)=>{
        if(!noteList.includes(note)){
            noteList=[...noteList,note]
            value+=note
        }
    }
</script>
<div class="my-10 pt-7 w-full pb-5 items-center mt-10">
    <div class="mb-5">Make a special request</div>
    <div class="flex justify-start space-x-5">
        <div class="">
            <img
                class="object-cover md:h-40 md:w-60 xl:h-40 xl:w-72 shadow rounded-lg mb-2 upload"
                src={selected.data.avatar}
                alt=""
            />
        </div>
        <div class="font-bold text-xl">
            <span class="border px-3 py-1 shadow-lg rounded-full">
                {selected.count}
            </span>
            {selected.val}
        </div>
    </div>
    <div class=" mx-3 py-3 w-full md:w-1/2 mt-5">
        <div class=" flex justify-left">
            I would like my {selected.val} ...
        </div>
        <div class=" flex justify-center  ">
            <TextInput
                bind:value
                placeholder="Additional notes"
                isText={true}
            />
        </div>
        <div class="mt-3 ">
            <div class="my-1.5 font-semibold">Quick message.</div>

            <div class="mt-2">
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Take away, ")
                    }}>Take away</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" No sugar, ")
                    }}>No sugar</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" No salt, ")

                    }}>No salt</span
                >
            </div>
            <div class="my-1.5">Drinks.</div>
            <div class="">
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Hot, ")

                    }}>Hot</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Cold, ")

                    }}>Cold</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Room temperature ")

                    }}>Room temperature</span
                >
            </div>
            <div class="my-1.5">Steak.</div>
            <div class="mt-2">
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" medium ")
                    }}>Medium</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Rare ")
                    }}>Rare</span
                >
                <span
                    class="border px-2 py-1 mr-4"
                    on:click={() => {
                        addNote(" Well done ")
                    }}>Well done</span
                >
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <span
                on:click={() => {
                    if (value.length > 0 ) {
                        const Index = order.findIndex(
                            (obj) => obj.val == selected.val
                        );
                        order[Index].notes = value;
                        console.log(order);
                        order = order;
                        selected = order[Index];
                        value = "";
                        notes = !notes;
                    }
                }}
                class="border {value.length == 0
                    ? 'bg-slate-300'
                    : 'bg-green-500'} text-white rounded-xl px-10 py-2 ml-2"
                >Save</span
            >
            <span
                on:click={() => {
                    notes = !notes;
                }}
                class="border bg-slate-700 text-white rounded-xl px-10 py-2 ml-2"
                >Cancel</span
            >
        </div>
    </div>
</div>

<style>
    .upload {
        height: 80px;
        width: 80px;
    }
</style>
