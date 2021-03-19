export const ProductItem = {
    props:['product'],
    template: `
    <div class="product-item" >
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ \` Автор - \` + product.author }}</p>
                        <p>{{ \` Год издания - \` + product.year }}</p>
                        <button class="buy-btn" @click="$root.&refs.cart.addProduct">Добавить книгу в список</button>
                    </div>
        </div>
    `
};