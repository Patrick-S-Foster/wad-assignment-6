app.component('shop-page-manager', {
    inject: ['products'],
    data() {
        return {
            cartIds: [],
            screenIndex: 0,
            transitioning: false,
            toCheckoutString: '',
            grandTotal: 0,
            toPurchaseString: ''
        }
    },
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
    watch: {
        displayedProducts() {
            if (this.screenIndex === 0) return;

            this.goToShop();
        }
    },
    computed: {
        toCartString() {
            return this.cartIds.length > 0 ? `To Cart (${this.cartIds.length})` : 'To Cart';
        },
        isShopVisible() {
            return this.screenIndex === 0;
        },
        isCartVisible() {
            return this.screenIndex === 1;
        },
        isCheckoutVisible() {
            return this.screenIndex === 2;
        }
    },
    methods: {
        goToShop() {
            this.transitionWaitSet(0);
        },
        goToCart() {
            if (this.cartIds.length > 0) {
                this.transitionWaitSet(1);
            } else {
                alert('Please add a product to the cart first.');
            }
        },
        goToCheckout() {
            this.transitionWaitSet(2);
        },
        goToPurchase() {
            this.cartIds = [];
            alert('At this point, assuming that the contact details are all valid, the customer would be redirected to \
an external payment page, such as Stripe. Now, the cart will empty, and the customer will be redirected to the home \
page.');
            this.goToShop()
        },
        transitionWaitSet(newIndex) {
            if (this.transitioning) return;

            this.transitioning = true;

            const delaySeconds = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--shop-page-transition-duration'));
            const delayMilliseconds = delaySeconds * 1000;

            setTimeout(() => {
                this.screenIndex = newIndex;
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.transitioning = false;
                });
            }, delayMilliseconds);
        },
        addToCart(id) {
            this.cartIds.push(id);
        },
        decrementCartId(cartId) {
            const index = this.cartIds.lastIndexOf(cartId);
            if (index > -1) {
                this.cartIds.splice(index, 1);
            }

            if (this.cartIds.length === 0) {
                this.goToShop();
            }
        },
        incrementCartId(cartId) {
            this.cartIds.push(cartId);
        },
        grandTotalChanged(grandTotal) {
            this.grandTotal = grandTotal;

            this.toCheckoutString = grandTotal > 0 ? `To Checkout (€${grandTotal})` : 'To Checkout';
            this.toPurchaseString = `Purchase (€${grandTotal})`;
        }
    },
    template: `
        <div class="shop-page-manager">
            <shop-page :class="{ 'shop-page-inactive': transitioning }" :forward-text="toCartString"
                v-if="isShopVisible" @forward="goToCart">
                <shop-screen-shop @addToCart="addToCart" :displayedProducts="displayedProducts" :title="title">
                </shop-screen-shop>
            </shop-page>
            <shop-page :class="{ 'shop-page-inactive': transitioning }" back-text="Back to Shop"
                :forward-text="toCheckoutString" v-if="isCartVisible" @back="goToShop" @forward="goToCheckout">
                <shop-screen-cart :cart-ids="cartIds" @decrementCartId="decrementCartId"
                    @incrementCartId="incrementCartId" @grandTotalChanged="grandTotalChanged">
                </shop-screen-cart>
            </shop-page>
            <shop-page :class="{ 'shop-page-inactive': transitioning }" back-text="Back to Cart"
                :forward-text="toPurchaseString" v-if="isCheckoutVisible" @back="goToCart" @forward="goToPurchase">
                <shop-screen-checkout></shop-screen-checkout>
            </shop-page>
        </div>
    `
});