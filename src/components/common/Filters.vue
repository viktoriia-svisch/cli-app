<template>
    <article>
        <input
            class="input"
            placeholder="Recherche"
            type="text"
            v-model="search"
            v-on:keyup.enter="sendQuery"
        />
        <p id="filters">
            <span class="filter_head">filtres&nbsp;:</span>
            <span
                class="filter button"
                @click="pushQuery('selecta')"
            >#selecta</span>
            <span
                class="filter button"
                @click="pushQuery('ambient')"
            >#ambient</span>
            <span
                class="filter button"
                @click="pushQuery('house')"
            >#house</span>
            <span
                class="filter button"
                @click="pushQuery('rap')"
            >#rap</span>
            <span
                class="filter button"
                @click="pushQuery('talk')"
            >#talk</span>
        </p>
    </article>
</template>
<script>
export default {
    name: "Filters",
    data() {
        return {
            search: "",
        };
    },
    methods: {
        pushQuery(filter) {
            this.search = filter;
            this.sendQuery();
        },
        sendQuery() {
            this.$router.push({ path: `/search/${this.search}` }).catch(() => { });
        },
    },
    mounted() {
        this.search = this.$route.params.query;
    },
};
</script>
<style lang="less" scoped>
article {
    .input {
        width: 300px;
        max-width: 500px;
        padding: 10px 17px 6px 17px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid grey;
        color: black;
        &:hover,
        &:active,
        &:focus {
            background-color: var(--color-primary-bg);
        }
        &:focus,
        &:focus-within,
        &focus-visible {
            outline: 1px solid var(--color-text);
        }
    }
    #filters {
        margin: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        .filter_head {
            position: relative;
        }
        .filter {
            position: relative;
            text-align: center;
            width: 100px;
        }
        .filter::before {
            content: "";
            position: absolute;
            top: 8px;
            left: 10px;
            width: 8px;
            height: 8px;
        }
        .filter:hover {
            background-color: var(--color-primary);
        }
    }
    @media (max-width: 300px) {
        .input {
            width: 100%;
        }
    }
}
</style>
