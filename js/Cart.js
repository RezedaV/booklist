import {ListItem} from './ListItem.js'

export const Cart = {
    inject: ['API', 'getJson'],
    components: {
        ListItem
    },
    data(){
        return{
            showList: false,
            ListItems:[],
            ListUrl: '/getBasket.json', // удали потом
        }
    },

    mounted() {
        this.getJson(`${this.API + this.ListUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.ListItems.push(el);
                }
            });
    },
    methods: {
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result){
                        const find = this.ListItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            const prod = Object.assign({quantity: 1 }, product);
                            this.ListItems.push(prod);
                        }
                    }
                })
        },

        remove(product) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result){
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.ListItems.splice(this.ListItems.indexOf(product), 1)
                        }
                    }
                })
        },
    },


    template: `
        <button class="btn-List" type="button" @click="showList = !showList">Список добавленных книг</button>
            <div class="List-block" v-show="showList">
                <p v-if="!ListItems.length">Список книг пуст</p>
                <ListItem 
                v-for="item of ListItems" 
                :key="item.id_product"
                :ListItem="item"
                @remove="remove"
                ></ListItem>
            </div>
    `
};