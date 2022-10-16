<script>
import BodyWrapper from "../../bodyWrapper.svelte";
import {pageNameStore} from '../../../stores'

</script>

<BodyWrapper>
    <div class="flex justify-center mt-40">
        <h1 class="text-4xl text-slate-500">Sorry {$pageNameStore.message}</h1>
    </div>
    <div class="flex justify-center  ">
        <span class="mt-10 border rounded text-2xl bg-blue-600 px-4 py-2 text-purple-50" on:click={()=>{history.back()}}>Go back</span>
    </div>
</BodyWrapper>