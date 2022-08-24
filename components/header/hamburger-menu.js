app.component('shop-header-hamburger-menu', {
    inject: ['productData'],
    emits: ['sectionSelected', 'categorySelected'],
    data() {
        return {
            menuActive: false
        }
    },
    methods: {
        openMenu() {
            this.menuActive = true;
        },
        closeMenu() {
            this.menuActive = false;
        },
        clickSection(section) {
            this.closeMenu();
            this.$emit('sectionSelected', section);
        },
        clickCategory(category) {
            this.closeMenu();
            this.$emit('categorySelected', category);
        }
    },
    template: `
        <img src="images/hamburger.png" alt="A hamburger menu icon." class="shop-header-hamburger-icon"
            @click="openMenu">
        <div class="shop-header-hamburger-menu" :class="{ 'shop-header-hamburger-menu-active': menuActive }">
            <img src="images/close.png" alt="A close icon." class="shop-header-hamburger-menu-close-img"
                @click="closeMenu">
            <ul>
                <li v-for="section in productData">
                    <h2 class="shop-header-hamburger-menu-item" @click="clickSection(section)">{{ section.name }}</h2>
                    <ul>
                        <li v-for="category in section.categories">
                            <h3 class="shop-header-hamburger-menu-item" @click="clickCategory(category)">
                                {{ category.name }}
                            </h3>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `
});