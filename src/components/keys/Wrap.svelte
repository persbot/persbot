<script lang="ts">
  import FirstLastChild from "../FirstLastChild.svelte";
  import Icon from "../icon/Icon.svelte";

  const values: ["off", "on"] = ["off", "on"];

  let group = values.find((it) => it === localStorage.keys_wrap) || values[0];

  $: document.documentElement.dataset.keys_wrap = localStorage.keys_wrap =
    group;
</script>

<div class="key">
  <span><Icon name="Wrap" />Wrap</span>
  {#each values as orientation}
    <label
      ><input type="radio" bind:group value={orientation} /><span
      />{orientation}</label
    >
  {/each}
  <FirstLastChild id="keys" is="last" />
</div>
