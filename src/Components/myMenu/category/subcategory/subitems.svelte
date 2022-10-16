<script>
    import { similar } from "../../../../func_essential";
    import Radio from "../../../resuable/radio.svelte";
    import TextInput from "../../../resuable/text_input.svelte";
    import Header from "../../../resuable/header.svelte";
    import TagBar from "../../../resuable/tags/tagBar.svelte";
    import Button from "../../../resuable/buttons/button.svelte";
    import { fly, fade } from "svelte/transition";
    import NextButton from "../../../resuable/buttons/nextButton.svelte";
    import { v4 } from "uuid";
    import { categoryStore } from "../../../../stores";
    import { onMount } from "svelte";
    export let title;
    export let selected = true;
    export let onsubmit;
    export let tags = [];
    export let alreadyExistTag = [];
    let addedTags = [];
    let value = "";
    let message = "";
    let highSimilarityscore = false;
    let score = 0;
    const addTags = () => {
        highSimilarityscore = false;
        alreadyExistTag.forEach((name) => {
            if (similar(name, value) > 50) {
                score = similar(name, value);
                highSimilarityscore = true;
            }
        });
        if (highSimilarityscore) {
            message = "High similarity score " + score + "%";
        } else if (
            addedTags.includes(value) ||
            alreadyExistTag.includes(value)
        ) {
            message = "This sub menu name exists";
        } else if (value.trim().length >= 3 && tags.length < 5) {
            tags = [
                ...tags,
                {
                    id: v4(),
                    cat_name: title,
                    value: value.charAt(0).toUpperCase() + value.slice(1),
                },
            ];
            addedTags = [...addedTags, value];
            value = "";
            message = "";
        } else if (tags.length > 4) {
            message = "You can have a max of 5 sub menus";
        } else if (value.trim().length <= 2) {
            message = "Must be more than 3 characters";
        }
    };
    function removebyId(id) {
        tags = tags.filter((m) => m.id !== id);
    }
    const onKeyPress = (e) => {
        if (e.charCode === 13) addTags();
    };
    const NextClearTags = () => {
        (tags = []), onsubmit();
    };
    $: message = value.trim().length == 0 ? "" : message;
    // Execute a function when the user presses a key on the keyboard
</script>

<div class="m-4">
    <div class="space-y-4">
        <div>
            <Header title="Category name" />
            <div>
                {title}
            </div>
        </div>
        {#if alreadyExistTag.length > 0}
            <div>
                <Header title="My created sub menu titles" />
                <div class="flex justify-left pl-2">
                    {#each $categoryStore.value as category}
                        {#if title == category.name}
                            {#each category.subMenu as subItem}
                                {#if !tags.includes(subItem)}
                                    <span
                                        style="cursor:none"
                                        class="pr-5 my-4 mr-2"
                                    >
                                        {subItem.value}
                                    </span>
                                {/if}
                            {/each}
                        {/if}
                    {/each}
                </div>
            </div>
        {/if}
        <div>
            <Header title="Do you want to add a sub Menu." />
        </div>

        <div class="flex space-x-3">
            <Radio title="yes" value={true} bind:groupVal={selected} />
            <Radio title="no" value={false} bind:groupVal={selected} />
        </div>
        {#if selected == true}
            <div class="space-y-4" transition:fade={{ x: 100, duration: 500 }}>
                <div>
                    <Header title="Add a Sub Menu" />
                    <div />
                    {#if value.length > 2}
                        <div>
                            <span class="text-sm"
                                >Press "enter" to add a sub menu</span
                            >
                        </div>
                    {/if}
                    <div class="flex justify-self-auto">
                        <div class="w-80">
                            <TextInput
                                bind:value
                                keydown={onKeyPress}
                                id="tag"
                                placeholder="eg. Soft drinks, Alcohol, cakes, icecreams ..."
                            />
                        </div>
                        {#if tags.length < 5 && value.length >= 3}
                            <span
                                transition:fly
                                style="cursor: pointer;"
                                on:click={addTags}
                                class="ml-2 px-3 border bg-blue-600 rounded text-white text-center pt-1.5"
                            >
                                Add
                            </span>
                        {/if}
                    </div>
                    <span class="text-sm text-red-500">
                        {message}
                    </span>
                </div>

                <div>
                    <TagBar remove={removebyId} bind:tags />
                    <span class="text-sm text-orange-400">
                        Tap on the item to delete
                    </span>
                </div>

                <div class="flex justify-center">
                    {#if !value.length > 0}
                        <Button
                            value={tags}
                            title="Create"
                            onClick={onsubmit}
                        />
                    {/if}
                </div>
            </div>
        {:else}
            <div
                class="flex justify-left "
                transition:fade={{ y: 100, duration: 700 }}
            >
                <NextButton title="Next" onClick={NextClearTags} />
            </div>
        {/if}
    </div>
</div>
