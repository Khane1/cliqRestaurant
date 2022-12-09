<script>
  import { onMount, onDestroy } from "svelte";
  import { stringify } from "uuid";
  import { loadUser } from "../../firebase/functions/restaurant_funcs/restaurants";
    import { execRights } from "../../func_essential";

  import {
    pageNameStore,
    userStore,
    userModelStore,
    activeOrderStore,
    businessModelStore,
  } from "../../stores";

  function onclick() {
    let sidebar = document.getElementsByClassName("sidebar");
    console.log(sidebar);
    //    sidebar.sidebar('toggle')
  }
  // let audio;
  $: length;
  let unsubscribe = activeOrderStore.subscribe(async (value) => {
    if ($userStore == "authorized") {
      Notification.requestPermission((perm) => {
        if (perm == "granted" && $activeOrderStore.length > 0) {
          new Notification("New Order", {
            body: "Open active order page",
            icon: "favicon.png",
            silent: true,
          });
        }
      });
    }
  });
  onMount((e) => {
  });
  onDestroy(unsubscribe);
</script>

<aside class="w-80 fixed left-0 top-0 h-screen p-5">
  {#if $userStore == "authorized" && $userStore != undefined && $userStore != null}
    <h1 class="text-white text-3xl font-extrabold">
      {$businessModelStore == undefined 
        ? "Loading..."
        : $businessModelStore.businessName}
    </h1>
    <h1 style='text-transform:capitalize'class="text-slate-300 text-lg font-extrabold ">{$userModelStore.displayName}</h1>

    <h1  style='text-transform:capitalize' class="text-slate-300 text-sm">{$userModelStore.role}</h1>
  {/if}
  <div class="mt-20">
    {#if $userStore == "authorized" && $userStore != "" && $userStore != undefined && $userStore != null}
      <ul class="relative align-middle">
        {#if $businessModelStore != undefined && $businessModelStore.orderToggle == true}
          <li class="relative">
            <a
              class="{$pageNameStore.pageName == 'home'
                ? 'isActive'
                : ''} flex items-center justify-center text-white text-ellipsis transition duration-300 ease-in-out"
              href="/home"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              {#if $activeOrderStore.length > 0}
                <span>
                  Active Orders <span
                    class="bg-white font-bold ml-3 px-2.5 py-0.5 text-slate-600 text-sm rounded-full"
                  >
                    {$activeOrderStore.length}
                  </span>
                </span>
              {:else}
                <span> Active Orders </span>
              {/if}
            </a>
          </li>
        {/if}
        <li class="relative">
          <a
            class=" {$pageNameStore.pageName == 'myMenu'
              ? 'isActive'
              : ''} flex items-center justify-center text-white text-ellipsis transition duration-300 ease-in-out"
            href="/mymenu"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            ><span> My menu </span>
          </a>
        </li>
        {#if execRights($userModelStore)}
        <li class="relative">
          <a
            on:click={() => {
              // signOut();
            }}
            class=" {$pageNameStore.pageName == 'myTeam'
              ? 'isActive'
              : ''} flex items-center justify-center text-white text-ellipsis transition duration-300 ease-in-out"
            href="/myTeam"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            ><span> Team </span>
          </a>
        </li>
        {/if}
        {#if execRights($userModelStore)}
        <li class="relative">
          <a
            class=" {$pageNameStore.pageName == 'history'
              ? 'isActive'
              : ''} flex items-center justify-center text-white text-ellipsis transition duration-300 ease-in-out"
            href="/history"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            ><span> History </span>
          </a>
        </li>
{/if}
        <li class="relative">
          <a
           
            class=" {$pageNameStore.pageName == 'settings'
              ? 'isActive'
              : ''} flex items-center justify-center text-white text-ellipsis transition duration-300 ease-in-out"
            href="/settings"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            ><span> Settings </span>
          </a>
        </li>
      </ul>
    {:else if $userStore != "authorized"}
      <h1 class="cliqHeader text-white text-2xl font-extrabold">
        CLIQ MINI SERVICE
      </h1>
    {/if}
  </div>
  {#if $userStore == "authorized" && $userStore != undefined && $userStore != null}
  <h1 style="position: fixed;
  bottom: 30px;" class="text-slate-300 text-lg font-extrabold ">CLIQ MINI SERVICE</h1>
{/if}
</aside>

<!-- <audio
  src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3"
  bind:this={audio}
/> -->
<style>
  li a {
    border-radius: 10px;
    background-color: #6237e6;
    /* background-color:#243fd697; */
    margin-bottom: 35px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 24px;
    padding-right: 24px;
    color: white;
    font-weight: 500;
  }
  li a:hover {
    /* background-color: #FF5B72; */
    background-color: #2cf84786;
    color: rgb(255, 255, 255);
    font-weight: 600;
  }
  .isActive {
    background-color: #2cf847c8;
    /* #0fe7ffe0; */
    color: rgb(255, 255, 255);
    font-weight: 600;
  }
  aside {
    padding: 25px;
    padding-top: 40px;
    background-color: #725bff;
    /* background-color: #000d6e; */
    font-family: "Poppins", sans-serif;
  }
</style>
