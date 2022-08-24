app.component('shop-screen-shop-card', {
    data() {
        return {
            doAnimation: false,
            variantIndex: 0
        }
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        styleObject() {
            return {
                'background-image': `url(${this.product.image})`
            }
        },
        hasVariants() {
            return 'variants' in this.product;
        },
        price() {
            return 'variants' in this.product ? this.product.variants[this.variantIndex].price : this.product.price;
        }
    },
    methods: {
        addToCart() {
            this.doAnimation = true;

            'variants' in this.product ?
                this.$emit('addToCart', this.product.variants[this.variantIndex].id) :
                this.$emit('addToCart', this.product.id);
        },
        mouseDown() {
            this.doAnimation = false;
        },
        radioChanged(index) {
            this.variantIndex = index;
        }
    },
    template: `
        <div class="shop-screen-shop-card">
            <div class="shop-screen-shop-card-image" :style="styleObject">
                <p>Photo by 
                    <a :href="product.link" target="_blank">{{ product.author }}</a>
                    on
                    <a href="https://unsplash.com/" target="_blank">Unsplash</a>
                </p>
            </div>
            <h2 class="shop-screen-shop-card-name">{{ product.name }}</h2>
            <p class="shop-screen-shop-card-description">{{ product.description }}</p>
            <div class="shop-screen-shop-card-variants">
                <template v-if="hasVariants" v-for="(variant, index) in product.variants">
                    <input class="shop-screen-shop-card-variant-input" type="radio" :name="product.name"
                        :id="variant.id" :checked="index === 0 ? true : undefined" @change="radioChanged(index)">
                    <label :for="variant.id">{{ variant.name }}</label>
                </template>
            </div>
            <p class="shop-screen-shop-card-price">€{{ price }}</p>
            <button class="shop-screen-shop-card-button" :class="{ 'shop-screen-shop-card-button-active': doAnimation }"
                @click="addToCart" @mousedown="mouseDown">
                Add to cart
            </button>
        </div>
    `
});