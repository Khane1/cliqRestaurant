<script>
    import { stringify } from "uuid";
    import { myDashBoardPages } from "../../../stores";
import NavDashboard from "../../resuable/navs/nav_dashboard.svelte";
    import ActiveOrders from "./activeOrders.svelte";
    import Pendingpayments from "./pendingpayments.svelte";
</script>

<NavDashboard/>
{#if $myDashBoardPages.index==1}
<ActiveOrders/>
{:else if $myDashBoardPages.index==2}
<Pendingpayments/>
{/if}