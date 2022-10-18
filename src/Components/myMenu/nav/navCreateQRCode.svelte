<script>
    import { onMount } from "svelte";
    import { downloadQrTableStore, userModelStore } from "../../../stores";

    import BodyWrapper from "../../bodyWrapper.svelte";
    import Header from "../../resuable/header.svelte";
    import TextInput from "../../resuable/text_input.svelte";
    import GenerateQr from "../createQrCode/generateQr.svelte";
    $: value = value == null ? "" : value;
    let assignedValue;
    let placeholder = "#";
    let url = "";
    let color = "#725bff";
    let textColor = "#ffffff";
    let downloadOption = "";
    function resetColors() {
        color = "#725bff";
        textColor = "#ffffff";
    }
    $: downloading = false;

    function QrScreenShot(isMultiple) {
        var i = 0;
        downloading = true;
        if (isMultiple) {
            var tid = setInterval(function () {
                if (i < value) {
                    i++;
                    updateTableNumber(i);
                    var timer = setInterval(function () {
                        singleScreenShot(i);
                        clearInterval(timer);
                    }, 1000);
                } else {
                    downloading = false;
                    // updateTableNumber(value)
                    // console.log(i + " clear");
                    clearInterval(tid);
                }
            }, 2000);
        } else if (isMultiple == false) {
            singleScreenShot(value);
            downloading = false;
        }
    }

    function updateTableNumber(i) {
        downloadQrTableStore.update((e) => {
            return { table: i };
        });
    }
    function singleScreenShot(filename) {
        // your code to be executed after 1 second
        html2canvas(document.getElementById("qrBoxID"), {
            allowTaint: true,
            useCORS: true,
        })
            .then(function (canvas) {
                // It will return a canvas element
                let image = canvas.toDataURL("image/png", 10);
                url = image;
                const createEl = document.createElement("a");
                createEl.href = url;

                // This is the name of our downloaded file
                createEl.download = "theAlef Table " + filename;
                createEl.click();
                // window.location.href = image;
            })
            .catch((e) => {
                // Handle errors
                // console.log(e);
                alert(e);
            });
    }
    onMount((e) => {
        updateTableNumber(1);
    });
</script>
<BodyWrapper>
    <div class="space-y-4">
        <Header title="Create Qr Codes" />
        <div class=" flex justify-between">
            <div>
                Choose download Option
                <div class="border rounded p-5  mb-10 space-y-5">
                    <label for="" class="flex justify-between space-x-5">
                        <span> Multiple QR_Codes </span>
                        <input
                            type="radio"
                            bind:group={downloadOption}
                            value="multiple"
                        />
                    </label>
                    <label for="" class="flex justify-between">
                        <span> Single Qr_Code </span>
                        <input
                            type="radio"
                            bind:group={downloadOption}
                            value="single"
                        />
                    </label>
                </div>
                <div>
                    <div class="">
                        <span
                            class="text-md {downloadOption != 'multiple'
                                ? 'hidden'
                                : ''}">How many Table Codes do you want?</span
                        >
                        <span
                            class="text-md {downloadOption != 'single'
                                ? 'hidden'
                                : ''}">Input table number.</span
                        >
                    </div>

                    <div
                        class="h-32 w-1/2 {downloadOption == ''
                            ? 'hidden'
                            : ''}"
                    >
                        <TextInput bind:value placeholder="2" isText={false} />
                    </div>
                </div>

                <div>
                    <div class={downloadOption == "" ? "hidden" : ""}>
                        <span class="text-md">Do you want a custom header?</span
                        >
                    </div>
                    <select
                        bind:value={assignedValue}
                        class=" flex text-center mt-2 {downloadOption == ''
                            ? 'hidden'
                            : ''}"
                        name="dog-names"
                        id="selectStatus"
                    >
                        {#if placeholder == "#"}
                            <option class="bg-slate-400 text-slate-50" value=""
                                >Select qr Title</option
                            >
                        {/if}
                        <option value="#{$userModelStore.displayName}"
                            >{$userModelStore.displayName}</option
                        >
                        <option value="#Order Here">Order Here</option>
                        <option value="#Scan To see menu"
                            >Scan To see menu</option
                        >
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <div class="flex justify-between mb-1">
                        <span>Customize your brand color </span>
                        <input type="color" bind:value={color} />
                    </div>
                    <div class="flex justify-between mb-1">
                        <span>Change text color </span>
                        <input type="color" bind:value={textColor} />
                    </div>
                    <div class="flex justify-end mb-1 ">
                        <span on:click={()=>resetColors()} class='border px-3 bg-blue-600 text-white'>Reset</span>
                        
                    </div>
                </div>
                <div
                    style="background-color:{color}"
                    id="qrBoxID"
                    class="qrBox px-10"
                >
                    <span
                        style="color:{textColor}"
                        class="qrTitle flex justify-center font-bold text-white text-3xl"
                        >THE ALEF</span
                    >
                    <div class="p-4 bg-white">
                        <GenerateQr
                            codeValue="{window.location.origin}/customer_order/{$userModelStore.displayName}/{downloadOption ==
                            'multiple'
                                ? $downloadQrTableStore.table
                                : value}"
                            squareSize="200"
                        />
                    </div>

                    <span
                        style="color:{textColor}"
                        class=" flex justify-center pt-4  font-bold"
                        >Table {downloading == false
                            ? value
                            : $downloadQrTableStore.table}</span
                    >
                    <span
                        class=" flex justify-center text-sm font-bold text-orange-200"
                        >{assignedValue}</span
                    >
                    <span
                        style="color:{textColor}"
                        class=" flex justify-center text-sm"
                        >Product of Cliq</span
                    >
                </div>
                <div class={downloading ? "flex justify-center" : "hidden"}>
                    Downloading {$downloadQrTableStore.table}
                </div>
                <span
                    on:click={downloadOption == "multiple"
                        ? QrScreenShot(true)
                        : QrScreenShot(false)}
                    class="downloadImages flex justify-center border py-1  px-3 mt-6 {downloadOption ==
                        '' || value == 0
                        ? 'hidden'
                        : ''}">Download Images</span
                >
            </div>
        </div>
    </div>
</BodyWrapper>

<style>
    .qrBox {
        /* border-radius: 15px; */
        /* background-color: #725bff; */
        /* background-color:rgb(5, 74, 249); */
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .qrTitle {
        padding-bottom: 20px;
    }
    .downloadImages {
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #725bff;
        color: white;
    }
    .downloadImages:hover {
        background-color: #4e37ff;
        color: white;
    }
</style>
