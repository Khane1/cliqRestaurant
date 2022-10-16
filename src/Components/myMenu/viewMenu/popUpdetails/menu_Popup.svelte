<script>
  import { getContext } from "svelte";
  import Popup from "./Popup.svelte";
  const { open } = getContext("simple-modal");
  export let data;
  export let order,onclick,reduce;
  const showSurprise = () => open(Popup, { data: data , order,onclick:onclick,reduce:reduce});
</script>

<div on:click={showSurprise}>
  <slot>
    
  </slot>
</div>

<style>
  /* section {
    padding-top: 0.5em;
  } */
</style>
