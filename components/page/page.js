app.component('shop-page', {
    props: {
        backText: {
            type: String,
            required: false
        },
        forwardText: {
            type: String,
            required: false
        }
    },
    computed: {
        hasBackText() {
            return this.backText !== undefined;
        },
        hasForwardText() {
            return this.forwardText !== undefined;
        }
    },
    methods: {
        back() {
            this.$emit('back');
        },
        forward() {
            this.$emit('forward');
        }
    },
    template: `
        <div class="shop-page">
            <button class="shop-page-button shop-page-button-back" v-if="hasBackText" @click="back">
                {{ backText }}
            </button>
            <div class="shop-page-content">
                <slot v-bind="$attrs"></slot>
            </div>
            <button class="shop-page-button shop-page-button-forward" v-if="hasForwardText" @click="forward">
                {{ forwardText }}
            </button>
        </div>
    `
});