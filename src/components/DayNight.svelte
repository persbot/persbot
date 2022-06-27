<script lang="ts">
  import { daynight } from "../store";
  import Icon from "./icon/Icon.svelte";

  const items = [
    {
      icon: "BrowserGear",
      text: "auto",
      onInput: () => {
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? document.documentElement.classList.add("dark")
          : document.documentElement.classList.remove("dark");
        $daynight = "";
      },
    },
    {
      icon: "Sun",
      text: "light",
      onInput: () => {
        document.documentElement.classList.remove("dark");
        $daynight = "light";
      },
    },
    {
      icon: "Moon",
      text: "dark",
      onInput: () => {
        document.documentElement.classList.add("dark");
        $daynight = "dark";
      },
    },
  ];

  let group: string = $daynight || items[0].text;
</script>

<div class="key">
  <span><Icon name="DayNight" />Day/night</span>

  {#each items as { onInput, text, icon }}<label
      ><input value={text} bind:group type="radio" on:input={onInput} /><span
      /><Icon name={icon} />{text}</label
    >{/each}
</div>
