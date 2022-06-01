<script lang="ts">
    export let id: string;
    export let is: "first" | "last";
    const handleClick = (
        e: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }
    ) => {
        const hasClsOn = e.currentTarget.classList.contains("on");

        document
            .querySelectorAll("[data-edge].on")
            .forEach((el) => el.classList.remove("on"));

        if (hasClsOn) return;

        document
            .querySelectorAll("[data-edge=" + id + "]")
            .forEach((el) => el.classList.add("on"));
    };
</script>

<span on:click|stopPropagation={handleClick} data-edge={id} class={is} />
