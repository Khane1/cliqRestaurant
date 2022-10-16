<script>
import Tags from "./tags.svelte";
import {fly} from 'svelte/transition'
export let tags;
export let remove;
</script>

<div class="tagbox max-w-lg rounded overflow-hidden shadow-sm border">
    <div class="flex justify-center space-x-2 text-center m-2 p-3">
        {#if tags.length>0}
      {#each tags as tag (tag.id)}
      <span transition:fly="{{ y: 100, duration: 500}}" on:click={remove(tag.id)}>
          <Tags  tagName={tag.value}/>
      </span>
       {/each}
       {:else}
       <span class="text-slate-400">no sub items added</span>
       {/if}
    </div>  
</div>

<style>
    /* we can have a class that activates when tags are more than a number */
    .tagbox{
        overflow-x: scroll;
        overflow-x: hidden;
    }
</style>