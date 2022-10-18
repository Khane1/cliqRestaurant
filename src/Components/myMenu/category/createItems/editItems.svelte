<script>
    import { submitItemUpdate } from "../../../../functions_convert";
    import {
        screenSizeStore,
        editItemDetailStore,
        notifyUser,
    } from "../../../../stores";
    import BodyWrapper from "../../../bodyWrapper.svelte";
    import Button from "../../../resuable/buttons/button.svelte";
    import AddDetails from "./components/addDetails.svelte";
    import AddImage from "./components/addImage.svelte";
    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();
    $: y = $screenSizeStore.size;
    let avatar = $editItemDetailStore.avatar;
    let Description = $editItemDetailStore.description;
    let price = $editItemDetailStore.price;
    let name = $editItemDetailStore.name;
    let updateItem = () => {
        if (
            avatar == $editItemDetailStore.avatar &&
            Description == $editItemDetailStore.description &&
            price == $editItemDetailStore.price &&
            name == $editItemDetailStore.name
        ) {
            notifyUser(
                "No changes made to " + name,
                addNotification,
                "default"
            );
            history.back();
        } else {
            submitItemUpdate(
                {
                    avatar: avatar,
                    description: Description,
                    itemId: $editItemDetailStore.itemId,
                    name: name,
                    price: price,
                    subItemId: $editItemDetailStore.subItemId,
                    categoryId: $editItemDetailStore.categoryId,
                    menuId: $editItemDetailStore.menuId,
                    originalName: $editItemDetailStore.originalName,
                },
                $editItemDetailStore.originalName,
                avatar != $editItemDetailStore.avatar //is this a new Link
            ).then((e) => {
                notifyUser(
                    e.message == "success"
                        ? "Updated "+name+"! Refresh to see changes " 
                        : "An error occured!",
                    addNotification,
                    e.message
                );
                history.back();
            });
        }
    };
</script>

<BodyWrapper>
    <div class="flex justify-evenly">
        <div class=" font-semibold text-xl">
            Edit {$editItemDetailStore.name}
        </div>
        <span
            class="border px-3 py-1 bg-red-500 text-white rounded"
            on:click={() => history.back()}
        >
            go back
        </span>
    </div>
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
                onClick={() => {
                    updateItem();
                    // addItems(selected)
                }}
                bind:value={name}
                title="Edit Item"
            />
        {/if}
    </div>
</BodyWrapper>
