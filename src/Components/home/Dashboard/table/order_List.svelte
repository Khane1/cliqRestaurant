<script>
    export let table,selectedId,itemDetails,x;
</script>
{#each table as table}
                    <div class=" px-1 py-1">
                        <span
                            class={selectedId == table ? "font-bold" : ""}
                            on:click={() => {
                                itemDetails = [];
                                x;
                                selectedId = table;
                                console.log(selectedId);
                                // console.log(table.data().customerId);
                            }}
                        >
                            Table {table}
                        </span>
                    </div>
                {/each}