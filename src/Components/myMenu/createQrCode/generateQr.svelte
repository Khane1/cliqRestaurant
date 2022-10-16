<script>
import QRCode from "svelte-qrcode"
export let codeValue;
$:codeValue
</script>
<div class="">
    <QRCode value={codeValue.toString()}/>
</div>
<style>
    /* #qrcode {
        width: 20px;
        height: 200x;
        margin-top: 15px;
    } */
</style>
