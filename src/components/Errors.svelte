<script lang="ts">
  import { afterUpdate } from "svelte";

  import { errors } from "../store";
  import Icon from "./icon/Icon.svelte";

  let el: HTMLElement;

  afterUpdate(() => el?.scrollIntoView(false));
</script>

{#if $errors.length}
  <div bind:this={el} class="key error">
    <span><Icon name="Warning" />Error</span>
    {#each $errors as error}
      <span
        ><span
          class="close"
          on:click={() => {
            $errors = $errors.filter((item) => item !== error);
          }}>×</span
        >&nbsp;<span class="text">{error}</span></span
      >
    {/each}
  </div>
{/if}
