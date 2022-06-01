<script lang="ts">
    import Icon from "./icon/Icon.svelte";
    let clicked = 0;

    const links = [
        {
            icon: "People",
            text: "Discussion",
            link: "https://github.com/persbot/persbot/discussions",
        },
        {
            icon: "Support",
            text: "Support",
            link: "https://github.com/persbot/pitch/issues",
        },
        // { icon: "Youtube", text: "YouTube", link: "http://" },
        // { icon: "Twitter", text: "Twitter", link: "http://" },
    ];
</script>

<div class="key">
    <span><Icon name="Link" />Links</span
    >{#each links as { icon, text, link }}<span
            ><Icon name={icon} /><a
                class="link"
                on:click|preventDefault={() => clicked++}
                href={link}>{text}</a
            ></span
        >{/each}<span>{clicked || ""}</span>
</div>
