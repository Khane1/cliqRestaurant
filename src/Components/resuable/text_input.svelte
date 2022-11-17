<script>
    export let value = "";
    export let placeholder = "";
    export let keydown;
    export let isText;
    export let type;

    import { emailValidator, requiredValidator } from "./validator/validators";
    import { createFieldValidator } from "./validator/validation.js";
    import { emailStore } from "../../stores";
    const [validity, validate] = createFieldValidator(
        requiredValidator(),
        emailValidator()
    );
    $: validity.valid;
</script>

{#if type == "email"}
    <input
        on:keypress={keydown}
        type="email"
        name="text1"
        bind:value
        on:keyup={() => {
            emailStore.update((e) => {
                return $validity.valid;
            });
        }}
        class:field-danger={value.length > 0 && !$validity.valid}
        class:field-success={$validity.valid}
        use:validate={value}
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
    {#if value.length > 0 && $validity.dirty && !$validity.valid}
        <span class="validation-hint text-sm">
            {$validity.message}
        </span>
    {/if}
{:else if placeholder.indexOf("password") > -1}
    <input
        on:keypress={keydown}
        type="password"
        bind:value
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
{:else if isText == undefined || isText == true}
    <input
        on:keypress={keydown}
        type="text"
        bind:value
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
{:else}
    <input
        type="number"
        min="0"
        bind:value
        class="max-w-screen rounded w-full bg-white py-2 px-3 leading-tight focus:outline-blue-600 placeholder:font-normal"
        placeholder={placeholder == undefined
            ? "Please input name"
            : placeholder}
    />
{/if}

<style>
    input {
        background-color: #e6e4f0;
    }
    input {
        outline: none;
        border-width: 2px;
    }

    .validation-hint {
        color: red;
        padding: 6px 0;
    }

    .field-danger {
        border-color: red;
    }

    .field-success {
        border-color: green;
    }
</style>
