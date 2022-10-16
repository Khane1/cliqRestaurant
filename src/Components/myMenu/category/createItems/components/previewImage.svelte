<script>
    import { MoneyFormat } from "../../../../../func_essential";
    import {screenSizeStore} from '../../../../../stores'
    export let item;
</script>

<div class="sm:justify-center relative mb-4 rounded-lg ml-5 ">
            <img
                class="object-cover  md:h-40 md:w-60 xl:h-40 xl:w-72 shadow rounded-lg mb-2 {$screenSizeStore.size>800?"":"upload"}"
                src={item.avatar}
                alt=""
            />
    <div class="py-2">
        <span class="font-semibold text-md">
            {item.name.trim().length > 10
                ? item.name.substring(0, 10) + ".."
                : item.name}
        </span>
        <div class="flex text-lg  text-red-500 font-semibold ">
            <h6 class="text-sm mt-1">ugx.</h6>
            <h5 class="text-lg">
                {MoneyFormat(item.price)}
            </h5>
        </div>
    </div>
</div>

<style>
    .upload{
        height: 15rem;
        width:30rem;
    }
</style>
