<script>
    import {
        categoryStore,
        fbMenuStore,
        screenSizeStore,
        userModelStore,
        customerOrderStore,
        customerOrderListStore,
        userStore,
    } from "../../../stores";
    import BodyWrapper from "../../bodyWrapper.svelte";
    import ItemImage from "../category/createItems/components/itemImage.svelte";
    import SubCategoryList from "../viewMenu/menuLists/sub_categoryList.svelte";
    import CategoryList from "../viewMenu/menuLists/categoryList.svelte";
    import AToButton from "../viewMenu/floating/aTO_button.svelte";
    import OptionsCatList from "../viewMenu/menuLists/optionsCat_list.svelte";
    import RestaurantTitle from "../viewMenu/floating/RestaurantTitle.svelte";
    import CheckOutPage from "../viewMenu/checkOutPage/checkOutPage.svelte";
    import { MoneyFormat } from "../../../func_essential";
    import Mybill from "../viewMenu/checkOutPage/mybill.svelte";
    import { stringify } from "uuid";
    import RestaurantLandingPage from "../../openingScreens/restaurantLandingPage.svelte";
    let selectedId = 'welcome';
    let selectOption =
        $categoryStore.value != null && $categoryStore.value.length > 0
            ? $categoryStore.value[0]
            : "";
    let selectedSub =
        $categoryStore.value != null &&
        $categoryStore.value.length > 0 &&
        $categoryStore.value[0].subMenu.length > 0
            ? $categoryStore.value[0].subMenu[0].id
            : 0;
    let list = [];
    let item = 1;
    let checkOutPage = false;
    let readyToEat = false;
    let notes = false;
    let order = [];
    let orderId = 1;

    function addToOrder(value) {
        const Index = order.findIndex((obj) => obj.val == value.name);
        if (order.filter((val) => value.name == val.val).length > 0) {
            order[Index].count = order[Index].count + 1;
        } else {
            order = [
                ...order,
                {
                    count: 1,
                    val: value.name,
                    data: value,
                    price: value.price,
                    notes: "",
                },
            ];
        }
    }
    function reduceOrder(value) {
        if (order.length == 0) {
        } else {
            const Index = order.findIndex((obj) => obj.val == value);
            let filter = order.filter((val) => value == val.val);
            if (filter.length > 0 && order[Index].count > 1) {
                order[Index].count = order[Index].count - 1;
            } else {
                order = [...order.slice(0, Index), ...order.slice(Index + 1)];
            }
        }
    }

    function getData(value) {
        const Index = order.findIndex((obj) => obj.val == value);
        return order[Index];
    }
    let scrollPosition = "";

    $: total = order.reduce((a, { price, count }) => a + price * count, 0);
</script>

<BodyWrapper>
    {#if selectedId == 'welcome' && $userStore != "authorized"}
        <div class="flex justify-center h-1/2">
            <RestaurantLandingPage bind:selectedId bind:selectedSub/>
        </div>
    {:else if selectedId == 'welcome' && $userStore == "authorized"}
        <div class="flex justify-center">
            This is the menu your customer sees.
        </div>
        <div class="flex justify-center">
            <RestaurantLandingPage  bind:selectedId bind:selectedSub/>
        </div>
    {/if}
    {#if $categoryStore.value != null && selectedId!='welcome'}
        {#if checkOutPage == false}
            <!-- ....................Make Order page......................... -->
            {#if $screenSizeStore.size > 800}
                <div class="flex justify-center">
                    <CategoryList bind:selectedId bind:selectedSub />
                </div>
                <div class="flex justify-center mt-3">
                    <SubCategoryList bind:selectedId bind:selectedSub />
                </div>
            {/if}
            <div
                class="{$screenSizeStore.size < 800
                    ? 'mt-36'
                    : 'mt-8'} grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center"
            >
                {#each $fbMenuStore.value as item}
                    {#if selectedId == item.categoryId && selectedSub == item.subItemId}
                        <ItemImage
                            bind:item
                            bind:order
                            reduce={() => {
                                reduceOrder(item.name);
                            }}
                            showOption={orderId == item.name}
                            onclick={() => {
                                orderId = item.name;
                                addToOrder(item);
                                setTimeout((e) => {
                                    orderId = 1;
                                }, 7000);
                            }}
                        />
                    {:else if selectedId == item.categoryId && selectedSub == "*"}
                        <ItemImage
                            bind:item
                            bind:order
                            reduce={() => {
                                reduceOrder(item.name);
                            }}
                            showOption={orderId == item.name}
                            onclick={() => {
                                orderId = item.name;
                                addToOrder(item);
                                setTimeout((e) => {
                                    orderId = 1;
                                }, 7000);
                            }}
                        />
                    {/if}
                {/each}
            </div>
        {:else if checkOutPage == true}
            <!-- ....................Check out page......................... -->
            {#if readyToEat == true}
                <Mybill bind:order />
            {:else}
                <CheckOutPage
                    bind:order
                    {reduceOrder}
                    {addToOrder}
                    bind:notes
                />
            {/if}
        {/if}
    {/if}
</BodyWrapper>

<!-- ....................Floating Bottom Items......................... -->
{#if !readyToEat}
    <AToButton bind:order bind:checkOutPage bind:readyToEat bind:notes />
{/if}
{#if $screenSizeStore.size < 800 && selectedId != 'welcome'}
    <!-- ....................Floating Top Items......................... -->
    <div
        class="{scrollPosition < 50
            ? 'top-2 mt-0'
            : 'top-0 my-0'}  fixed w-full bg-white  py-3"
    >
        <div class="flex justify-between">
            <RestaurantTitle
                title={($userModelStore.displayName == undefined &&
                    $userStore != "authorized") ||
                ($userModelStore.displayName == undefined &&
                    $userStore != "authorizing")
                    ? $customerOrderStore.restaurant
                    : $userModelStore.displayName}
            />
    <!-- Top Closing button -->
            {#if checkOutPage}
                <span
                    class="font-bold text-xl mr-10 border rounded-full px-3 py-1 bg-red-500 text-white"
                    on:click={() => {
                        checkOutPage = !checkOutPage;
                        readyToEat = false;
                    }}
                >
                    X
                </span>
                {:else}
                <span class="mr-10 rounded-full px-3 py-1 border shadow"
                on:click={() => {
                    checkOutPage = !checkOutPage;
                }}
                >
                    <img height="20" width="20" src='/favicon.png' alt="plate"/>
                </span>
            {/if}
        </div>
        {#if $customerOrderListStore.table != undefined}
            <div class="text-lg font-semibold ">
                <span >{"Current Table " + $customerOrderStore.table}</span>
            </div>
        {/if}
        {#if !checkOutPage}
            <OptionsCatList
                bind:selectedId
                bind:selectedSub
                bind:selectOption
            />
            <div class="flex  mt-0 mb-0 justify-center">
                <SubCategoryList bind:selectedId bind:selectedSub />
            </div>
        {:else}
            <div class="flex  mt-0 mb-0 justify-between mr-10">
                <h3>My Order</h3>
                <h3 class="font-semibold text-lg">shs.{MoneyFormat(total)}</h3>
            </div>
        {/if}
    </div>
{:else if ($userModelStore.displayName == undefined && $userStore != "authorized") || $userStore != "authorized"}
    <div
        class="{scrollPosition < 50
            ? 'top-2 mt-0'
            : 'top-0 my-0'} fixed w-full py-2 "
    >
        <RestaurantTitle
            title={$userStore != "authorizing"
                ? $customerOrderStore.restaurant
                : ""}
        />
            <span class="text-md">{"Current table " + $customerOrderStore.table} </span>
    </div>
{/if}

<svelte:window bind:scrollY={scrollPosition} />
