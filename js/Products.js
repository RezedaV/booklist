import {ProductItem} from './ProductItem.js'

export const Products = {
    inject: ['API', 'getJson'],
    component:{
        ProductItem
    },
    data() {
        return{
            catalogUrl: '/catalogData.json',
            products: [
                { id_product: 1, quantity: 1, year: '1868-1869', product_name: '"Война и мир"', author: 'Толстой Л.Н.'},
                { id_product: 2, quantity: 1, year: '1866', product_name: '"Преступление и наказание"', author: 'Достоевский Ф.М.'},
                { id_product: 3, quantity: 1, year: '1833', product_name: '"Евгений Онегин"', author: 'Пушкин А.С.'}],
        }
    },
    // computed: {
    //     filtered() {
    //         const regexp = new RegExp(this.userSearch, 'i');
    //         return this.products.filter(el => regexp.test(el.product_name));
    //     }
    // },
    mounted(){
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`) // это потом удалить
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    },

    template: `
         <div class="products">
                <ProductItem 
                v-for="el of products" 
                :key="el.id_product"
                :product="el"
                >               
                </ProductItem>
         </div>
    `
};