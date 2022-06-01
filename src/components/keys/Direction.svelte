<script lang="ts">
  import FirstLastChild from "../FirstLastChild.svelte";
  import Icon from "../icon/Icon.svelte";

  const values: ["horizontal", "vertical"] = ["horizontal", "vertical"];

  let group =
    values.find((it) => it === localStorage.keys_orientation) || values[0];

  $: document.documentElement.dataset.keys_orientation =
    localStorage.keys_orientation = group;
</script>

<div class="key">
  <FirstLastChild id="keys" is="first" />
  <span><Icon name="Direction" />Direction</span>
  {#each values as orientation}
    <label
      ><input type="radio" bind:group value={orientation} /><span
      />{orientation}</label
    >
  {/each}
</div>

<style lang="scss">
</style>
