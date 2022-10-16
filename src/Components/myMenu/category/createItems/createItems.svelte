<script>
    import { onMount } from "svelte";
    import {
        screenSizeStore,
        menuListStore,
        notifyUser,
    } from "../../../../stores";
    import Button from "../../../resuable/buttons/button.svelte";
    import Tags from "../../../resuable/tags/tags.svelte";
    import AddDetails from "./components/addDetails.svelte";
    import AddImage from "./components/addImage.svelte";
    import SubmenuTab from "./components/submenuTab.svelte";
    import { stringify, v4 } from "uuid";
    import { submitItems } from "../../../../functions_convert";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
    export let submenu, hasSubmenu, CreateCategoryTitle;
    export let alreadyExistTagObject = [];
    export let categoryId;
    let price = 0;
    $: price = price == null ? "" : price;
    let Description = "";
    let name = "";
    let avatar = "";
    function submit() {
        console.log({ price: price });
    }
    let selected = "";

    let menuItems = [];

    let itemList = [];

    function addItems(selected) {
        let id = v4();
        menuItems = [
            ...menuItems,
            {
                id: submenu.length > 0 ? selected.id : CreateCategoryTitle,
                items: [
                    ...itemList,
                    {
                        itemId: id,
                        name: name,
                        description: Description,
                        price: price,
                        avatar: avatar,
                    },
                ],
            },
        ];
        notifyUser("Creating " + name, addNotification, 'default');
        submitItems({
            cat_name: CreateCategoryTitle,
            categoryId:categoryId,
            subItemId: submenu.length > 0 ? selected.id : CreateCategoryTitle,
            itemId: id,
            name: name,
            description: Description,
            price: price,
            avatar: avatar,
        }).then((e) => {
            notifyUser("Created " + name, addNotification, e.message);
        });
        menuListStore.update((e) => {
            return menuItems;
        });
        price = 0;
        Description = "";
        name = "";
        avatar = "";
    }
    let count = 2;
    onMount((e) => {
        if (alreadyExistTagObject.length > 0) {
            hasSubmenu = true;
        }
        selected = submenu[0];
        menuItems = $menuListStore;
    });
    $: y = $screenSizeStore.size;
</script>

<div class="mt-5 space-y-4">
    <span class="font-semibold text-2xl"
        >{CreateCategoryTitle}
        {submenu.length > 0 ? "-" + selected.value : ""}</span
    >
    {#if hasSubmenu}
        <div class="space-y-2">
            <div>
                <span class="">Add products to the sub-menu</span>
            </div>
            <!-- <span class="font-semibold">Sub-menu</span> -->
            <SubmenuTab bind:submenu bind:selected />
            <div class="my-3 space-x-1">
                {#if menuItems.length < 5}
                    {#each menuItems as items}
                        {#if items.id == selected.id}
                            {#each items.items as item (item.itemId)}
                                <Tags tagName={item.name} />
                            {/each}
                        {/if}
                    {/each}
                {:else}
                    <span class="text-md text-cyan-600"
                        >{menuItems.length +
                            " items added. You can see them in preview mode."}</span
                    >
                {/if}
            </div>
        </div>
        <div />
        <!-- <TagBar bind:tags={submenu} /> -->
    {:else}
        <div>
            {menuItems.length}
            {#each menuItems as items}
                {#each items.items as item (item.id)}
                    <Tags tagName={item.name} />
                {/each}
            {/each}
        </div>
    {/if}
    <div>
        <div
            class={y <= 912
                ? "justify-center"
                : "grid grid-cols-2 lg:grid lg:grid-cols-2 space-x-4 mt-2  md:flex"}
        >
            <AddImage bind:avatar />
            <AddDetails bind:Description bind:price bind:name />
        </div>
        {#if name.length == 0 || avatar.length == 0 || price.length == 0}
            Either name or avatar or price is not filled
        {:else}
            <Button
                class="pt-4"
                onClick={() => addItems(selected)}
                bind:value={name}
                title="addItem"
            />
        {/if}
    </div>
</div>

<style>
</style>
