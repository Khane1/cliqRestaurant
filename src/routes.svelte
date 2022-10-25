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
    } from "./stores";
    let page;
    import { v4 } from "uuid";
    import ErrorPage from "./Components/resuable/Error/errorPage.svelte";
    import EditItems from "./Components/myMenu/category/createItems/editItems.svelte";
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
        if($userStore=='authorized'){
            pageNameStore.update((e) => {
            return { pageName: "home" };
        });
        return (page = Home);
        }else{
            pageNameStore.update((e) => {
                return { pageName: "login" };
            });
            return (page = OpeningScreen);
        }
    });
    router("/signUp", () => {
        pageNameStore.update((e) => {
            return { pageName: "login" };
        });
        return (page = Business);
    });
    router("/settings", () => {
        pageNameStore.update((e) => {
            return { pageName: "settings" };
        });
        return (page = Settings);
    });
    router("/home", () => {
        pageNameStore.update((e) => {
            return { pageName: "home" };
        });
        return (page = Home);
    });
    router("/mymenu", () => {
        pageNameStore.update((e) => {
            return { pageName: "myMenu" };
        });
        return (page = Mymenu);
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
        if (
            $userModelStore.uid != null 
        ) {
            pageNameStore.update((e) => {
                return { pageName: "history" };
            });
            return (page = History);
        } else errorRouteScreen();
    });
    router("/editItem", (e) => {
        if (
            $userModelStore.uid != null)
        {
            pageNameStore.update((e) => {
                return { pageName: "editItem" };
            });
            return (page = EditItems);
        } else errorRouteScreen();
    });
    router.start();
</script>

<svelte:component this={page} />
