app.component('shop-screen-shop', {
    emits: ['addToCart'],
    props: {
        displayedProducts: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            default: undefined
        }
    },
    computed: {
        hasTitle() {
            return this.title !== undefined;
        }
    },
    methods: {
        addToCart(product) {
            this.$emit('addToCart', product);
        }
    },
    template: `
        <h3 class="shop-screen-shop-title" v-if="hasTitle">{{ title }}</h3>
        <div class="shop-screen-shop">
            <shop-screen-shop-card v-for="product in displayedProducts" :product="product" @addToCart="addToCart">
            </shop-screen-shop-card>
        </div>
    `
});