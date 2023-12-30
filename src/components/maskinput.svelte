<script>
    import { createEventDispatcher, tick, onMount, onDestroy } from 'svelte';
    import { createInput, defaults } from 'input-core';
  
    export let value = '';
    export let defaultValue = undefined;
    // @ts-ignore
    export let reformat = undefined;
    // @ts-ignore
    export let maskString = undefined;
    export let maskChar = defaults.maskChar;
    // @ts-ignore
    export let mask = defaults.mask;
    export let maskFormat = defaults.maskFormat;
    export let alwaysShowMask = false;
    export let showMask = false;
  
    const KEYBOARD = {
      BACKSPACE: 8,
      DELETE: 46,
    };
    const dispatch = createEventDispatcher();
  
    const input = createInput({
      value: value || defaultValue || '',
      reformat,
      maskString,
      maskChar,
      mask,
      maskFormat,
    });
  
    let shouldShowMask = alwaysShowMask || showMask;
    // @ts-ignore
    $: shouldShowMask = alwaysShowMask || showMask;
   // @ts-ignore
     $: input.setReformat(reformat);
   // @ts-ignore
     $: input.setMaskFormat(maskFormat);
   // @ts-ignore
     $: input.setMask(mask);
   // @ts-ignore
     $: input.setMaskString(maskString);
   // @ts-ignore
     $: input.setMaskChar(maskChar);
   // @ts-ignore
     $: value !== undefined && input.setValue(value);
  
    onMount(() => {
      input.subscribe(applyValue);
    });
  
    onDestroy(() => {
      input.unsubscribe(applyValue);
    });
  
    let canSetSelection = false;
    let inputValue = setupInputValue(input.getState());
  
    // @ts-ignore
    let inputEl;
  
    // @ts-ignore
    function setupInputValue({ maskedValue, visibleValue }) {
      if (shouldShowMask && (canSetSelection || alwaysShowMask)) {
        return maskedValue;
      }
      return visibleValue;
    }
  
    // @ts-ignore
    function applyValue({ maskedValue, visibleValue, selection, value }) {
      inputValue = setupInputValue({ maskedValue, visibleValue });
      setSelection(selection);
      dispatchChangeEvent({
        // @ts-ignore
        unmasked: reformat
          ? value
          : value
              // @ts-ignore
              .filter(item => item.type === 1)
              // @ts-ignore
              .map(item => item.char)
              .join(''),
        maskedValue,
        visibleValue,
      });
    }
  
    // @ts-ignore
    async function setSelection({ start, end }) {
      if (!canSetSelection) {
        return;
      }
  
      await tick();
      // @ts-ignore
      inputEl.setSelectionRange(start, end);
      const raf =
        window.requestAnimationFrame ||
        // @ts-ignore
        window.webkitRequestAnimationFrame ||
        // @ts-ignore
        window.mozRequestAnimationFrame ||
        (fn => setTimeout(fn, 0));
      // For android
      // @ts-ignore
      raf(() => inputEl.setSelectionRange(start, end));
    }
  
    function setupSelection() {
      input.setSelection({
        // @ts-ignore
        start: inputEl.selectionStart,
        // @ts-ignore
        end: inputEl.selectionEnd,
      });
    }
  
    function getValue() {
      if (showMask && (canSetSelection || alwaysShowMask)) {
        return input.getState().maskedValue;
      } else {
        return input.getState().visibleValue;
      }
    }
  
    // @ts-ignore
    function handleInput(e) {
      const prevValue = getValue();
  
      // fix conflict by update value in mask model
      if (e.target.value !== prevValue) {
        input.input(e.data);
        setSelection(input.getSelection());
        // Timeout needed for IE
        setTimeout(() => setSelection(input.getSelection()), 0);
      }
    }
  
    // @ts-ignore
    function handlePaste(e) {
      e.preventDefault();
      setupSelection();
  
      // getData value needed for IE also works in FF & Chrome
      input.paste(e.clipboardData.getData('Text'));
      setSelection(input.getSelection());
      // Timeout needed for IE
      setTimeout(() => setSelection(input.getSelection()), 0);
    }
  
    // @ts-ignore
    function handleKeyPress(e) {
      if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
        return;
      }
  
      e.preventDefault();
      setupSelection();
      input.input(e.key || e.data || String.fromCharCode(e.which));
      setSelection(input.getSelection());
    }
  
    // @ts-ignore
    function handleKeyDown(e) {
      if (e.which === KEYBOARD.BACKSPACE) {
        e.preventDefault();
        setupSelection();
        input.removePreviosOrSelected();
        setSelection(input.getSelection());
      }
  
      if (e.which === KEYBOARD.DELETE) {
        e.preventDefault();
        setupSelection();
        input.removeNextOrSelected();
        setSelection(input.getSelection());
      }
    }
  
    // @ts-ignore
    function handleFocus(e) {
      canSetSelection = true;
      dispatch('focus', e);
    }
  
    // @ts-ignore
    function handleBlur(e) {
      canSetSelection = false;
      dispatch('blur', e);
    }
  
    // @ts-ignore
    function dispatchChangeEvent({ unmasked, maskedValue, visibleValue }) {
      dispatch('change', {
        // @ts-ignore
        element: inputEl,
        inputState: { unmaskedValue: unmasked, maskedValue, visibleValue },
      });
    }
  </script>
  
  <input
    {...$$restProps}
    value={inputValue}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:keypress={handleKeyPress}
    on:paste={handlePaste}
    on:focus={handleFocus}
    on:blur={handleBlur}
    bind:this={inputEl} />
  