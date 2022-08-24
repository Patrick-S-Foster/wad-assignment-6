app.component('shop-screen-cart', {
    inject: ['products'],
    props: {
        cartIds: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.$emit('grandTotalChanged', this.grandTotal);
    },
    computed: {
        cartItems() {
            let cartItems = [];
            this.cartIds.forEach(cartId => {
                const existingCartItem = cartItems.find(cartItem => cartItem.id === cartId);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    let cartItem;
                    this.products.forEach(product => {
                        if ('variants' in product) {
                            product.variants.forEach(variant => {
                                if (variant.id === cartId) {
                                    cartItem = {
                                        id: cartId,
                                        name: `${product.name} (${variant.name})`,
                                        price: variant.price,
                                        quantity: 1,
                                        image: product.image
                                    };
                                }
                            });
                        } else if (product.id === cartId) {
                            cartItem = {
                                id: cartId,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                image: product.image
                            }
                        }
                    });
                    cartItems.push(cartItem);
                }
            });
            return cartItems;
        },
        grandTotal() {
            let grandTotal = 0;
            this.cartItems.forEach(cartItem => {
                grandTotal += cartItem.price * cartItem.quantity;
            });
            return grandTotal.toFixed(2);
        }
    },
    methods: {
        decrementCartId(cartId) {
            this.$emit('decrementCartId', cartId);
            this.$emit('grandTotalChanged', this.grandTotal);
        },
        incrementCartId(cartId) {
            this.$emit('incrementCartId', cartId);
            this.$emit('grandTotalChanged', this.grandTotal);
        }
    },
    template: `
        <div class="shop-screen-cart">
            <div v-for="cartItem in cartItems" class="shop-screen-cart-item">
                <div class="shop-screen-cart-item-quantity">
                    <img src="images/delete.png" alt="A delete icon." class="shop-screen-cart-item-delete"
                        @click="decrementCartId(cartItem.id)">
                     <img src="images/add.png" alt="An add icon." class="shop-screen-cart-item-add"
                        @click="incrementCartId(cartItem.id)">
                </div>
                <img :src="cartItem.image" alt="A product image." class="shop-screen-cart-item-image">
                <div class="shop-screen-cart-item-text">
                    <h3 class="shop-screen-cart-item-name">{{ cartItem.name }}</h3>
                    <p class="shop-screen-cart-item-total">{{ cartItem.quantity }} x €{{ cartItem.price }}</p>
                </div>
            </div>
        </div>
    `
});