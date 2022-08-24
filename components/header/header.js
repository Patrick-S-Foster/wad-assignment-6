app.component('shop-header', {
    inject: ['productData', 'products'],
    emits: ['productsSelected'],
    methods: {
        allProducts() {
            this.scrollAndEmit(this.products);
        },
        clickSection(section) {
            const products = [];
            section.categories.forEach(category => {
                category.products.forEach(product => {
                    products.push(product);
                });
            });

            this.scrollAndEmit(products, `Showing results for "${section.name}"`);
        },
        clickCategory(category) {
            const products = [];
            category.products.forEach(product => {
                products.push(product);
            });

            this.scrollAndEmit(products, `Showing results for "${category.name}"`);
        },
        scrollAndEmit(products, title) {
            window.scrollTo(0, 0);
            this.$emit('productsSelected', products, title);
        }
    },
    template: `
        <div class="shop-header">
            <img src="images/logo.png" alt="A logo for the shop." class="shop-header-logo" @click="allProducts">
            <shop-header-hamburger-menu @sectionSelected="clickSection" @categorySelected="clickCategory">
            </shop-header-hamburger-menu>
            <shop-header-desktop-menu @sectionSelected="clickSection" @categorySelected="clickCategory">
            </shop-header-desktop-menu>
        </div>
    `
});