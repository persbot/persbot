<script lang="ts">
  import { errors, pitch } from "../store";
  import TWEEN from "@tweenjs/tween.js";
  import { d3models } from "../3d";
  import Icon from "./icon/Icon.svelte";

  const synth = window.speechSynthesis;

  let group: "on" | "off" = "off";
  let elWithText: null | HTMLElement = null;
  let showWaveform = false;
  let pitchJump: number;

  const sayPiece = () => {
    elWithText = document.querySelector(
      "[data-pitch='" + $pitch + "']>.text"
    ) as HTMLElement;

    if (!elWithText) {
      off();
      group = "off";
      $pitch = 0;
      return;
    }

    elWithText.parentElement.scrollIntoView(false);

    let allText = "";

    for (const child of elWithText.children) {
      const text = child.textContent.replace(/\s\s+|\r\n|\r|\n/g, " ");
      const splits = text.split(" ");
      spanEachWord(child as HTMLElement, splits);
      allText += text;
    }

    say(allText, () => {
      if (group === "off") return;
      if (typeof pitchJump === "number") {
        $pitch = pitchJump;
        pitchJump = null;
      } else $pitch++;
      sayPiece();
    });
  };

  const onClickEl = (event) => {
    pitchJump = +event.currentTarget.dataset.pitch;
    synth.cancel();
  };

  const on = () => {
    document.body.classList.add("loading");

    sayPiece();

    document
      .querySelectorAll("[data-pitch]")
      .forEach((el) => el.addEventListener("click", onClickEl));
  };

  const off = () => {
    showWaveform = false;
    synth.cancel();

    document
      .querySelectorAll("[data-pitch]")
      .forEach((el) => el.removeEventListener("click", onClickEl));
  };

  const replaceWordsForSpeech = (str: string) =>
    str?.replace("Persbot", "Pers-bot") || "";

  const splitPunctuation = (word: string) => word.split(/([\w-]+)|(.+)/);

  function spanEachWord(el: HTMLElement, words: string[]) {
    if (el.classList.contains("split")) return;
    let html = "";
    words.forEach((word, i) => {
      const splits = splitPunctuation(word);
      if (splits[1])
        html +=
          '<span data-word="' +
          replaceWordsForSpeech(splits[1] || "") +
          '">' +
          splits[1] +
          "</span>";
      html += splits[5] || splits[2] || "";
      if (words.length - 1 > i) html += " ";
    });

    el.innerHTML = html;
    el.classList.add("split");
  }

  function getWordAt(str: string, pos: number) {
    const left = str.slice(0, pos + 1).search(/\S+$/),
      right = str.slice(pos).search(/\s/);
    if (right < 0) return str.slice(left);
    return str.slice(left, right + pos);
  }

  const makeWaveform = () => {
    const d3model = d3models["bot"]?.model;
    if (!d3model) return;

    const rand = 1 + Math.random() / 10;

    const tween = new TWEEN.Tween(d3model.scale)
      .to({ x: rand, y: rand, z: rand }, 70)
      .start()
      .onComplete(makeWaveform)
      .onStop(() =>
        new TWEEN.Tween(d3model.scale).to({ x: 1, y: 1, z: 1 }, 70).start()
      );

    if (!showWaveform) tween.stop();
  };

  const say = (utter: string, next?: () => void) => {
    if (synth.speaking) synth.cancel();

    if (!utter) return;

    const utterThis = new SpeechSynthesisUtterance(
      replaceWordsForSpeech(utter)
    );

    utterThis.onstart = () => {
      if (!showWaveform) {
        document.body.classList.remove("loading");
        showWaveform = true;
        makeWaveform();
      }
    };

    utterThis.onend = () => {
      const word = elWithText?.querySelector(".word");
      if (word) word.classList.remove("word");
      next?.();
    };

    let wordIndex: { [_: string]: number } = {};

    utterThis.onboundary = (event) => {
      const word =
        splitPunctuation(
          getWordAt((event.target as any).text, event.charIndex)
        )[1] || "";
      const spans = elWithText.querySelectorAll(
        '[data-word="' + word + '"]'
      ) as NodeListOf<HTMLElement>;

      const span = spans[wordIndex[word] || (wordIndex[word] = 0)];
      if (!span) return;

      wordIndex[word]++;

      elWithText.querySelector(".word")?.classList.remove("word");

      span.classList.add("word");
    };

    utterThis.onerror = (event) => {
      document.body.classList.remove("loading");
      $errors = [JSON.stringify(event.error), ...$errors];
      group = "off";
    };

    synth.speak(utterThis);
  };

  window.addEventListener("beforeunload", () => {
    off();
    group = "off";
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      off();
      group = "off";
    }
  });
</script>

<div class="key">
  <span><Icon name="Mouth" />Speak</span><label
    ><input type="radio" bind:group value="off" on:input={off} /><span
    />off</label
  ><label
    ><input type="radio" bind:group value="on" on:input={on} /><span />on</label
  >
</div>

<style lang="scss" global>
  [data-word].word {
    border-bottom: 2px dashed;
  }
</style>
