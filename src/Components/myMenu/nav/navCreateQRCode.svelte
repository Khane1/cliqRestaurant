<script>
    import { onMount } from "svelte";
    import { downloadQrTableStore, businessModelStore } from "../../../stores";
    import { jsPDF } from "jspdf";

    import BodyWrapper from "../../bodyWrapper.svelte";
    import Header from "../../resuable/header.svelte";
    import TextInput from "../../resuable/text_input.svelte";
    import GenerateQr from "../createQrCode/generateQr.svelte";
    import SwitchButton from "../../resuable/buttons/switchbutton/switchButton.svelte";
    $: value = value == null ? 1 : value;
    let assignedValue;
    let placeholder = "#";
    let url = "";
    let color = "#ffffff";
    let textColor = "#000000";
    let showTableNumber = false;
    let downloadOption = "";
    let topTitle = "OUR MENU";
    let bottomTitle = $businessModelStore.businessName;
    function resetColors() {
        // color = "#725bff";
        color = "#ffffff";
        textColor = "#000000";
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
    // window.jsPDF = window.jspdf.jsPDF;
    function singleScreenShot(filename) {
        // window.devicePixelRatio = 2;

        // // your code to be executed after 1 second
        // html2canvas(document.getElementById("qrBoxID"), {
        //     allowTaint: true,
        //     useCORS: true,
        //     scale: 5,
        // })
        //     .then(function (canvas) {
        //         // It will return a canvas element
        //         let image = canvas.toDataURL("image/png", 20);
        //         url = image;
        //         const createEl = document.createElement("a");
        //         createEl.href = url;

        //         // This is the name of our downloaded file
        //         createEl.download =
        //             $businessModelStore.businessName + " Table " + filename;
        //         createEl.click();
        //         // window.location.href = image;
        //     })
        //     .catch((e) => {
        //         // Handle errors
        //         // console.log(e);
        //         alert(e);
        //     });
        downloadPDFPage(filename);
    }

    function downloadPDFPage(filename) {
        var doc = new jsPDF("p", "pt", "a4", true);

        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.getElementById("qrBoxID");
        doc.internal.write(0, "Tw");
        doc.html(elementHTML, {
            callback: function (doc) {
                // Save the PDF
                doc.save(
                    $businessModelStore.businessName +
                        " Table " +
                        filename +
                        ".pdf"
                );
            },
            margin: [90, 20, 20, 80],
            autoPaging: "text",
            x: 0,
            y: 0,
            // image: { type: "png", quality: 100 },
            html2canvas: {
                // scale: 0.238,
                scale:1,
                // allowTaint: true,
                // letterRendering: true,
                // svgRendering: true,
            },
            // width: 100, //target width in the PDF document
            // // height:0,
            // windowWidth: 1000, //window width in CSS pixels
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
                <label for="" class=" space-y-2">
                    <span> Change top title </span>
                    <div>
                        <input type="text" class="px-2" bind:value={topTitle} />
                    </div>
                </label>
                <label for="" class=" space-y-2 my-2">
                    <span class="mt-2"> Change bottom text </span>
                    <div>
                        <input
                            type="text"
                            class="px-2"
                            bind:value={bottomTitle}
                        />
                    </div>
                </label>
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
                        {#if downloadOption != "multiple"}
                            <div class={downloadOption == "" ? "hidden" : ""}>
                                <label for="" class="flex justify-between mb-5">
                                    <span> Show table number </span>
                                    <SwitchButton
                                        switchFunc={() => {
                                            value = 1;
                                        }}
                                        bind:switcher={showTableNumber}
                                    />
                                </label>
                            </div>
                        {/if}
                        {#if showTableNumber == true}
                            <span
                                class="text-md {downloadOption != 'single'
                                    ? 'hidden'
                                    : ''}">Input table number.</span
                            >
                        {/if}
                    </div>

                    {#if showTableNumber == true || downloadOption == "multiple"}
                        <div
                            class="h-10 w-1/2 mb-5{downloadOption == ''
                                ? 'hidden'
                                : ''}"
                        >
                            <TextInput
                                bind:value
                                placeholder="2"
                                isText={false}
                            />
                        </div>
                    {/if}
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
                        <option value="#{$businessModelStore.businessName}"
                            >{$businessModelStore.businessName}</option
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
                        <span
                            on:click={() => resetColors()}
                            class="border px-3 bg-blue-600 text-white"
                            >Reset</span
                        >
                    </div>
                </div>
                <div id="qrBoxID">
                    <div style="background-color:{color}" class="border qrBox ">
                        <span
                            style="color:{textColor};text-align:center"
                            class="qrTitle flex justify-center font-bold text-white text-2xl w-60"
                            >{topTitle}</span
                        >
                        <div class="p-4 bg-white rounded-lg">
                            <GenerateQr
                                codeValue="{window.location
                                    .origin}/customer_order/{$businessModelStore.businessName}/{downloadOption ==
                                'multiple'
                                    ? $downloadQrTableStore.table
                                    : value}"
                                squareSize="200"
                            />
                        </div>
                        {#if showTableNumber == true}
                            <span
                                style="color:{textColor}"
                                class=" flex justify-center pt-4  font-bold"
                                >Table {downloading == false
                                    ? value
                                    : $downloadQrTableStore.table}</span
                            >
                        {/if}
                        <span
                            class=" flex justify-center text-sm font-bold text-orange-500"
                            >{assignedValue}</span
                        >
                        <span
                            style="color:{textColor}; text-align:center;"
                            class="qrTitle flex justify-center text-white text-lg w-60"
                            >{bottomTitle}</span
                        >
                        <!-- <span
                            style="color:{textColor}"
                            class=" flex justify-center text-sm"
                            >Product of Cliq</span
                        > -->
                    </div>
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
        padding-top: 50px;
        padding-bottom: 40px;
        padding-left: 40px;
        padding-right: 40px;
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
