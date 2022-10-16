<script>
    import Nav from "./nav.svelte";
    import { myMenuPages } from "../../../stores";
</script>

<Nav
    headers={[
        { index: 1, title: "My Menu" },
        { index: 2, title: "Create Menu Category" },
        { index: 3, title: "Create Table QRCodes" },
    ]}
    store={myMenuPages}
/>
