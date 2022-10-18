<script>
import BodyWrapper from "../../bodyWrapper.svelte";
import {pageNameStore} from '../../../stores'

</script>

<BodyWrapper>
    <div class="flex justify-center mt-40">
        <h1 class="text-4xl text-slate-500">Sorry {$pageNameStore.message}</h1>
    </div>
    <div class="flex justify-center  ">
        <a style="color: white;" href="/mymenu" class="mt-10 border rounded text-2xl bg-blue-600 px-4 py-2 text-white" >Go back</a>
    </div>
</BodyWrapper>

