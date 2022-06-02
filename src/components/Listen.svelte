<script lang="ts">
  import { errors } from "../store";

  import Icon from "./icon/Icon.svelte";

  const w = window as any;
  const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  let isStoppedSpeechRecognition = false,
    recognized: 1 | 2 | 3 | 4;

  recognition.addEventListener("result", (event) => {
    const pop = Array.from(event.results).pop() as any;
    // console.log(pop[0].transcript);
    if (!pop.isFinal) return;
    const text = pop[0].transcript;
    const el = document.querySelector(
      "[data-hear='" + text.trim() + "']"
    ) as HTMLElement | null;
    if (!el) return (recognized = recognized === 3 ? 4 : 3);
    recognized = recognized === 1 ? 2 : 1;
    el.classList.add("on");
    setTimeout(() => {
      el.classList.remove("on");
    }, 300);
    el.click();
  });

  recognition.addEventListener("error", (event) => {
    stop();
    group = "off";
    $errors = [JSON.stringify(event.error), ...$errors];
  });

  const start = () => {
    let count = 0;
    document.querySelectorAll("label,.link,.text").forEach((el) => {
      const hEl = el as HTMLElement;
      if (hEl.dataset.hear_off) return;
      hEl.dataset.hear = "" + ++count;
    });
    isStoppedSpeechRecognition = false;
    recognition.start();

    recognition.addEventListener("soundstart", () => (recognized = null));
    recognition.addEventListener("end", () =>
      isStoppedSpeechRecognition ? recognition.stop() : recognition.start()
    );
  };

  const stop = () => {
    recognized = null;
    document.querySelectorAll("label,.link,.text").forEach((el) => {
      const hEl = el as HTMLElement;
      delete hEl.dataset.hear;
    });
    isStoppedSpeechRecognition = true;
    recognition.stop();
  };

  let group = "off";

  window.addEventListener("beforeunload", () => {
    group = "off";
  });
</script>

<div class="key">
  <span><Icon name="Ear" />Listen</span><label class="radio"
    ><input
      on:input={stop}
      bind:group
      type="radio"
      value="off"
      name="listen"
    /><span />off</label
  ><label class="radio" data-hear_off="1"
    ><input
      on:input={start}
      bind:group
      type="radio"
      value="on"
      name="listen"
    /><span />on</label
  >
  {#if group === "on"}
    <span
      >{#if recognized === 1}
        <Icon name="ThumbUpR" />
      {:else if recognized === 2}
        <Icon name="ThumbUpL" />
      {:else if recognized === 3}
        <Icon name="ThumbDownR" />
      {:else if recognized === 4}
        <Icon name="ThumbDownL" />
      {:else}
        <Icon name="ThumbRight" />
      {/if}</span
    >{/if}
</div>
