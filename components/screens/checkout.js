app.component('shop-screen-checkout', {
    template: `
        <div class="shop-screen-checkout">
            <h2 class="shop-screen-checkout-title">Customer Details:</h2>
            <form class="shop-screen-checkout-form" >
                <label for="checkout-first-name">First Name:</label>
                <input type="text" placeholder="John" id="checkout-first-name"/>
                <label for="checkout-last-name">Last Name:</label>
                <input type="text" placeholder="Doe" id="checkout-last-name"/>
                <label for="checkout-address">Address:</label>
                <textarea placeholder="123-45 Rd.\n1A3 C5E Country" id="checkout-address"/>
                <label for="checkout-email">Email:</label>
                <input type="email" placeholder="contact@youremail.com" id="checkout-email"/>
                <label for="checkout-phone">Phone:</label>
                <input type="tel" placeholder="(123) 456-7890" id="checkout-phone"/>
            </form>
        </div>
    `
});