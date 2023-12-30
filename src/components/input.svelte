<script>
	// TODO: Find a way to use maskInput for yearlytax, period and brokeFee using bind - current not working
	//import MaskInput from "./maskinput.svelte"; 
	import CurrencyInput from '@canutin/svelte-currency-input';
	/**
	 * @type {any}
	 */
	export let name;
	/**
	 * @type {any}
	 */
	export let placeholder;
	/**
	 * @type {any}
	 */
	export let value;
	export let label = '';
	export let required = false;
	export let type = 'text';
	/**
	 * @type {any}
	 */
	 export let mask = '';
	/**
	 * @param {HTMLInputElement} node
	 */
	function typeAction(node) {
		node.type = type;
	}
</script>
<style>
        
	div.w-full :global(input.currencyInput__formatted) {
		padding-top: 0.625rem!important;
		padding-bottom: 0.625rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		border-width: 2px;
		border-radius: 0.5rem!important;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 0.5rem;
		
	}
	div.w-full :global(input.currencyInput__formatted:focus) {
		
		border-color: #5D87FF;
		outline: none;
	}
</style>
<div class="w-full">
	<label class="font-bold ml-1" for={name}>{label}</label>
	{#if mask == ''}
	<CurrencyInput
		bind:value
		{name}
		{placeholder}
		{required}
		currency='BRL'
	/>
	{:else}
	<input
		id={name}
		bind:value
		class="py-2.5 px-3 mb-2 w-full border-2 rounded-lg box-border focus:outline-none focus:border-blue-modernize"
		use:typeAction
		{name}
		{placeholder}
		{required}
	/>
	{/if}
</div>
