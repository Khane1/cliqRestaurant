<script>
        let   color = "#725bff";
       let textColor = "#ffffff"
</script>

<div class="m-5">
    <span class="font-bold">Qr  Brand Color Settings</span>
    <div class="flex justify-between my-2">
        <div>Qr Body Colors</div>
        <div>
            <input type="color" value={color} disabled>
        </div>
    </div>
    <div class="flex justify-between my-2">
        <div>Qr Text Colors</div>
        <div>
            <input type="color" value={textColor} disabled>
        </div>
    </div>
</div>