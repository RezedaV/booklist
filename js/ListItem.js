export const ListItem = {
    props: ['ListItem'],
    emits: ['remove'],
    template: `
         <div class="List-item">
                    <div class="product-bio">
                        <div class="product-desc">
                            <p class="product-title">{{ListItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{ListItem.quantity}}</p>

                        </div>
                    </div>
                    <div class="right-block">

                        <button class="del-btn" @click="$emit('remove', ListItem)">&times;</button>
                    </div>
          </div>
    `
};
