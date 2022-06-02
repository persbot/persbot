<script lang="ts">
  import FirstLastChild from "../FirstLastChild.svelte";
  import Icon from "../icon/Icon.svelte";

  const values: ["horizontal", "vertical"] = ["horizontal", "vertical"];

  let group =
    values.find((it) => it === localStorage.keys_direction) || values[0];

  $: document.documentElement.dataset.keys_direction =
    localStorage.keys_direction = group;
</script>

<div class="key">
  <FirstLastChild id="keys" is="first" />
  <span><Icon name="Direction" />Direction</span>
  {#each values as value}
    <label><input type="radio" bind:group {value} /><span />{value}</label>
  {/each}
</div>

<style lang="scss">
</style>
