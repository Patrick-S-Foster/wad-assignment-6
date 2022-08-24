const { createApp } = Vue;

const app = createApp({
    inject: ['products'],
    data() {
        return {
            displayedProducts: this.products,
            title: undefined
        }
    },
    methods: {
        productsSelected(products, title) {
            this.displayedProducts = [];
            this.$nextTick(() => {
                this.displayedProducts = products;
                this.title = title;
            });
        }
    },
    template: `
        <shop-header @productsSelected="productsSelected"></shop-header>
        <shop-page-manager :displayedProducts="displayedProducts" :title="title"></shop-page-manager>
    `
});