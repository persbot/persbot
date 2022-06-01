<script lang="ts">
  import { errors } from "../store";
  import Icon from "./icon/Icon.svelte";
</script>

{#if $errors.length}
  <div class="key error">
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
