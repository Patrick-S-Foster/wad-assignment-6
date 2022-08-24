fetch('products.json')
    .then(response => response.json())
    .then(productData => {
        const products = [];
        productData.forEach(section => {
            section.categories.forEach(category => {
                category.products.forEach(product => {
                    products.push(product);
                });
            });
        });

        app.provide('productData', productData);
        app.provide('products', products);
        app.mount('#app');
    });