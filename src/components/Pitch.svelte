<script lang="ts">
    import { d3, errors, pitch } from "../store";
    import type D3 from "../3d";
    import Icon from "./icon/Icon.svelte";
    import { onMount } from "svelte";
    import FirstLastChild from "./FirstLastChild.svelte";

    let url =
        localStorage.url ||
        "https://raw.githubusercontent.com/persbot/pitch/master/";

    document.body.classList.add("loading");
    onMount(async () => {
        fetch(url + "pitch.json", { cache: "reload" })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((json) => (content = json))
            .catch((error) => ($errors = ["Url: " + error.message, ...$errors]))
            .finally(() => document.body.classList.remove("loading"));
    });

    let content: {
        text: string;
        world?: Parameters<D3["update"]>[1];
    }[] = [];

    let d3A: D3, wordA: Parameters<D3["update"]>[1];

    $: d3A?.update(url, wordA);

    $: if (content?.length) {
        pitch.subscribe((pitch) => (wordA = content?.[pitch]?.world || {}));
        d3.subscribe((d3) => (d3A = d3));
    }

    let pieces: string[];
</script>

<div class="brake" />
<div id="pitch" class="key"><span><Icon name="Presentation" />Pitch</span></div>
<div class="brake" />
{#each content as { text, world }, i}
    <div
        class="key"
        data-pitch={i}
        on:click={() => ($pitch === i ? (wordA = world) : ($pitch = i))}
    >
        {#if !i}<FirstLastChild id="pitch" is="first" />{/if}
        {#if $pitch === i}<span class="bookmark"><Icon name="Bookmark" /></span
            >{/if}<span class="text"
            >{#each text.split(/((?:\/[^/]+\/)?https?:\/\/\S+)(?<!,|\.)/g) as item, i}
                {#if i % 2 === 1}{#if (pieces = item.split(/\/([^\/]+)\/(https?:\/\/\S+)/))}<a
                            class="link"
                            href={pieces[2] || pieces[0]}
                            >{pieces[1] || pieces[2] || pieces[0]}</a
                        >{/if}{:else}<span>{item}</span>{/if}{/each}</span
        >{#if content.length === i + 1}<FirstLastChild
                id="pitch"
                is="last"
            />{/if}
    </div>
{/each}

<style lang="scss">
    [data-pitch] {
        text-indent: 1rem;
        line-height: 1.2;

        .bookmark {
            position: absolute;
            left: 0;
            top: 0.15rem;
        }
    }
</style>
