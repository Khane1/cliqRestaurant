<script>
    import Nav from "./nav.svelte";
    import { myDashBoardPages,activeOrderStore } from "../../../stores";
</script>

<Nav
    headers={[
        { index: 1, title: "Active Orders ("+  $activeOrderStore.length+")"},
        { index: 2, title: "Pending payments" },
        { index: 3, title: "History" },
    ]}
    store={myDashBoardPages}
/>
