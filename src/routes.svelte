<script>
    import router from "page";
    import History from "./Components/history/history.svelte";
    import Business from "./Components/home/business/business.svelte";
    import Home from "./Components/home/Dashboard/home.svelte";
    import Mymenu from "./Components/myMenu/mymenu.svelte";
    import OpeningScreen from "./Components/openingScreens/OpeningScreen.svelte";
    import SignIn from "./Components/openingScreens/signIn.svelte";
    import Settings from "./Components/settings/settings.svelte";
    import { customerOrder } from "./functions_convert";
    import {
        customerOrderStore,
        pageNameStore,
        userStore,
        userModelStore,
        collabBusinessId,
        businessModelStore,
    } from "./stores";
    let page;
    import { v4 } from "uuid";
    import ErrorPage from "./Components/resuable/Error/errorPage.svelte";
    import EditItems from "./Components/myMenu/category/createItems/editItems.svelte";
    import TeamCollab from "./Components/openingScreens/Team_collab.svelte";
    import Collaborator from "./Components/home/business/collaborator.svelte";
    import BodyWrapper from "./Components/bodyWrapper.svelte";
    import { roles } from "./firebase/functions/restaurant_funcs/businessLogic";
    import Logout from "./Components/settings/logout.svelte";

    let p_NHold = (name) =>
        pageNameStore.update((e) => {
            return { pageName: name };
        });

    let errorRouteScreen = () => {
        pageNameStore.update((e) => {
            return {
                pageName: "error",
                message: "you can't access this page!",
            };
        });
        return (page = ErrorPage);
    };
    router("/", () => {
        if ($userStore == "authorized") {
            p_NHold("home");
            return (page = Home);
        } else {
            p_NHold("login");
            return (page = OpeningScreen);
        }
    });
    router("/teamcollab/:id/signup", (e) => {
        let id = e.params.id;
        collabBusinessId.update((e) => {
            return { businessId: id };
        });
        console.log("-_-");
        if ($userStore != "authorized" && $userModelStore.uid == null) {
            p_NHold("collab");
            return (page = TeamCollab);
        } else errorRouteScreen();
    });
    router("/myteam", (e) => {
        if ($userStore == "authorized" && $userModelStore.uid != null) {
            p_NHold("myTeam");
            return (page = Collaborator);
        } else errorRouteScreen();
    });
    router("/signUp", () => {
        if ($userStore == "authorized") {
            p_NHold("home");
            return (page = Home);
        } else if ($userStore == "authorizing") {
            p_NHold("login");
            alert("mdd");
            return (page = Business);
        } else errorRouteScreen();
    });
    router("/settings", () => {
        if ($userStore == "authorized") {
            p_NHold("settings");
            return (page = Settings);
        } else errorRouteScreen();
    });
    router("/home", () => {
        if ($userStore == "authorized") {
            p_NHold("home");
            return (page = Home);
        } else errorRouteScreen();
    });
    router("/mymenu", () => {
        if ($userStore == "authorized") {
            p_NHold("myMenu");
            return (page = Mymenu);
        } else errorRouteScreen();
    });
    router("/customer_order/:restaurant/:table", (e) => {
        let restaurantName = e.params.restaurant;
        let table = e.params.table;
        if (
            $userModelStore.uid == null ||
            $userModelStore.displayName == restaurantName
        ) {
            customerOrderStore.update((e) => {
                return {
                    restaurant: restaurantName,
                    table: table,
                    customerId: restaurantName + "_" + v4(),
                    time: new Date(),
                };
            });
            customerOrder(e.params.restaurant);
            return (page = Mymenu);
        } else errorRouteScreen();
    });
    router("/history", (e) => {
        if ($userModelStore.uid != null) {
            p_NHold("history");
            return (page = History);
        } else errorRouteScreen();
    });
    router("/editItem", (e) => {
        if ($userModelStore.uid != null) {
            p_NHold("editItem");
            return (page = EditItems);
        } else errorRouteScreen();
    });
    router.start();
    $: pagePermissions = (pgName) =>
        $pageNameStore.pageName == pgName &&
        $userModelStore.role != roles.admin &&
        $pageNameStore.pageName == pgName &&
        $userModelStore.role != roles.manager;
</script>

{#if $userModelStore.role == roles.unallocated && !$businessModelStore.adminIds.includes($userModelStore.uid)}
    <BodyWrapper>
        <div>
            <div class="text-xl flex justify-center text-slate-500">
                Awaiting your role Assignment
            </div>
            <div class="flex justify-center">
                Current Role- {$userModelStore.role}
            </div>
        </div>
        <Logout message={"___"} />
    </BodyWrapper>
{:else if pagePermissions("history") || pagePermissions("myTeam")}
    <BodyWrapper>
        <div>
            <div class="text-xl flex justify-center text-slate-500">
                Only Admins and Managers are able to view this page
            </div>
            <div class="flex justify-center">
                Current Role- {$userModelStore.role}
            </div>
        </div>
    </BodyWrapper>
{:else}
    <svelte:component this={page} />
{/if}
