<script lang="ts">
  import Warning from "./icons/Warning.svelte";
  import Mouth from "./icons/Mouth.svelte";
  import Ear from "./icons/Ear.svelte";
  import ThumbRight from "./icons/ThumbRight.svelte";
  import ThumbUpR from "./icons/ThumbUpR.svelte";
  import ThumbUpL from "./icons/ThumbUpL.svelte";
  import ThumbDownR from "./icons/ThumbDownR.svelte";
  import ThumbDownL from "./icons/ThumbDownL.svelte";
  import DayNight from "./icons/DayNight.svelte";
  import BrowserGear from "./icons/BrowserGear.svelte";
  import Moon from "./icons/Moon.svelte";
  import Sun from "./icons/Sun.svelte";
  import KeyCap from "./icons/KeyCap.svelte";
  import Direction from "./icons/Direction.svelte";
  import Wrap from "./icons/Wrap.svelte";
  import Link from "./icons/Link.svelte";
  import People from "./icons/People.svelte";
  import Support from "./icons/Support.svelte";
  import Twitter from "./icons/Twitter.svelte";
  import Youtube from "./icons/Youtube.svelte";
  import Presentation from "./icons/Presentation.svelte";
  import Bookmark from "./icons/Bookmark.svelte";

  export let name: string;
</script>

<svg
  class="ico"
  width="48"
  height="48"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  ><svelte:component
    this={{
      Warning,
      Mouth,
      Ear,
      ThumbRight,
      ThumbUpR,
      ThumbUpL,
      ThumbDownR,
      ThumbDownL,
      DayNight,
      BrowserGear,
      Moon,
      Sun,
      KeyCap,
      Direction,
      Wrap,
      Link,
      People,
      Support,
      Twitter,
      Youtube,
      Presentation,
      Bookmark,
    }[name]}
  /></svg
>
