app.component('shop-header-desktop-menu', {
    inject: ['productData'],
    emits: ['sectionSelected', 'categorySelected'],
    methods: {
        clickSection(section) {
            this.$emit('sectionSelected', section);
        },
        clickCategory(category) {
            this.$emit('categorySelected', category);
        }
    },
    template: `
        <div class="shop-header-desktop-category" v-for="section in productData">
            <h2 @click="clickSection(section)">{{ section.name }}</h2>
            <div class="shop-header-desktop-category-list">
                <h2 @click="clickSection(section)"><pre>{{ section.name }}</pre></h2>
                <ul class="shop-header-desktop-category-products">
                    <li v-for="category in section.categories" @click="clickCategory(category)">{{ category.name }}</li>
                </ul>
            </div>
        </div>
    `
});