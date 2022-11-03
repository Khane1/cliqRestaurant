<script>
  import CreateCategory from "../category/createCategory.svelte";
  import { onMount } from "svelte";
  import { businessModelStore, categoryStore } from "../../../stores";
  import Header from "../../resuable/header.svelte";
  import {
    createCategorySteps,
    menuListStore,
    notifyUser,
  } from "../../../stores";
  import Subitems from "../category/subcategory/subitems.svelte";
  import CreateItems from "../category/createItems/createItems.svelte";
  import BodyWrapper from "../../bodyWrapper.svelte";
  import MenuPreview from "../category/createItems/menuPreview.svelte";
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();
  import {
    changeToNextScreen,
    submitCategory,
    submitSubMenu,
  } from "../../../functions_convert";
  import { stringify, v4 } from "uuid";
  let CreateCategoryTitle = "";
  let submenu = [];
  let alreadyExistTag = [];
  let alreadyExistTagObject = [];
  let hasSubmenu = true;
  function submitSub() {
    submitSubMenu({ submenu }, $businessModelStore.BusinessId).then((e) => {
      notifyUser("Created submenus", addNotification, e.message);
    }),
      changeToNextScreen(3);
  }
  $: $categoryStore.value == null || $categoryStore.value == undefined
    ? console.log("non")
    : $categoryStore.value.forEach((category) => {
        if (CreateCategoryTitle == category.name) {
          (alreadyExistTag = []),
            (alreadyExistTagObject = []),
            category.subMenu.forEach((subItem) => {
              console.log(subItem.id);
              if (submenu.filter((val) => val.id == subItem.id).length == 0) {
                submenu = [...submenu, subItem];
              }

              if (!alreadyExistTag.includes(subItem.value)) {
                alreadyExistTagObject = [...alreadyExistTagObject, subItem];
                alreadyExistTag = [...alreadyExistTag, subItem.value];
              }
            });
        }
      });
  let categoryId = v4();
  onMount((e) => {
    createCategorySteps.update((e) => {
      return { pn: 1 };
    });
  });
</script>

{#if $createCategorySteps.pn == 1}
  <div class="flex justify-center mt-10">
    <h1 class="heading font-bold">Set a new category name</h1>
  </div>
{/if}
<BodyWrapper>
  <div class="flex justify-between mb-3">
    <div>
      <span
        class="heading font-bold rounded-full bg-slate-600 text-white px-3 py-1.5"
        >{$createCategorySteps.pn}</span
      >
      {#if $createCategorySteps.pn != 1}
        <button
          class="rounded px-2"
          on:click={() => {
            changeToNextScreen($createCategorySteps.pn - 1);
            // ((alreadyExistTagObject = []), (alreadyExistTag = [])
            // );
          }}>Back</button
        >
        {#if $createCategorySteps.pn == 3}
          <button
            class="rounded px-2"
            on:click={() => changeToNextScreen($createCategorySteps.pn + 1)}
            >Preview</button
          >
        {/if}
      {/if}
    </div>
  </div>
  {#if $createCategorySteps.pn == 1}
    <div class="space-y-5">
      {#if $categoryStore.value != undefined && $categoryStore.value.length > 0}
        <Header title="Available Categories" />
        <div class="flex justify-left">
          <div>
            {#each $categoryStore.value as category}
              <span
                class="px-3 border py-1 mr-2 m-3 "
                on:click={() => {
                  ((CreateCategoryTitle = category.name),
                  (categoryId = category.categoryId)),
                    changeToNextScreen(2);
                }}
              >
                {category.name}
              </span>
            {/each}
          </div>
        </div>
      {/if}

      <CreateCategory
        bind:value={CreateCategoryTitle}
        onSubmit={() => {
          changeToNextScreen(2),
            submitCategory({
              title: CreateCategoryTitle,
              submenu: submenu,
              hasSubmenu: hasSubmenu,
              items: $menuListStore,
              categoryId: categoryId,
              menuId: $businessModelStore.BusinessId,
            });
        }}
      />
    </div>
  {:else if $createCategorySteps.pn == 2}
    <Subitems
      bind:alreadyExistTag
      bind:tags={submenu}
      bind:selected={hasSubmenu}
      title={CreateCategoryTitle}
      onsubmit={() => {
        changeToNextScreen(3);
        submitSub();
      }}
    />
  {:else if $createCategorySteps.pn == 3}
    <CreateItems
      bind:alreadyExistTagObject
      bind:CreateCategoryTitle
      bind:categoryId
      {submenu}
      bind:hasSubmenu
    />
    <!-- </div> -->
  {:else if $createCategorySteps.pn == 4}
    <MenuPreview {submenu} title={CreateCategoryTitle} bind:alreadyExistTag />
  {/if}
</BodyWrapper>
