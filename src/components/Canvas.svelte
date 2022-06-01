<script lang="ts">
  import D3 from "../3d";
  import { d3 } from "../store";

  let canvas: HTMLCanvasElement;
  $: canvas && ($d3 = new D3(canvas));
</script>

<canvas bind:this={canvas} />
