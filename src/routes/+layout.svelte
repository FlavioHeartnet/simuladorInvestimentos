<script>
	import { onMount } from "svelte";
    import "../app.css";
    let init = false;
  onMount(() => {
		init = true;
	});
</script>
{#if init}
<slot />
{/if}
