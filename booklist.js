// Реализовать SPA “Каталог книг” на любом frontend фреймворке/библиотеке.
//     Требования:
// !!! 1. Хранение данных организовать используя Firestore и соответствующий SDK.
// !!! 2. Реализовать аутентификацию и регистрацию - хранить список
// зарегистрированных пользователей в коллекции firestore и при логине
// проверять соответствие логина и пароля (никакого подтверждения не
// требуется).
// 3. На главной странице должен отображаться список всех книг доступных в
// системе с возможностью удалить или редактировать/добавить книги (поля
// книги: название, авторы, год издания, ISBN).
// 4. Добавление/редактирование книги реализовать на отдельном роуте.
//
//
//     Дополнительные функции (по желанию):
// 1. Валидация ISBN.
// 2. Реактивное отображение изменений сделанных в firestore вне текущего
// инстанса приложения (другим пользователем или через Firebase Console).

const App = {
    data(){
        return{
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            catalogUrl: '',
            products: [
                    { id_product: 1, quantity: 1, year: '1868-1869', product_name: '"Война и мир"', author: 'Толстой Л.Н.'},
                    { id_product: 2, quantity: 1, year: '1866', product_name: '"Преступление и наказание"', author: 'Достоевский Ф.М.'},
                    { id_product: 3, quantity: 1, year: '1833', product_name: '"Евгений Онегин"', author: 'Пушкин А.С.'}
                    ],
            userSearch: '',
            showList: false,
            ListItems:[],
            ListUrl: '',
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e));
        },
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
        }


    },
    computed: {
        filtered() {
            const regexp = new RegExp(this.userSearch, 'i');
            return this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted() {
        this.getJson(`${this.API + this.ListUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.ListItems.push(el);
                }
            });
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })

    }

};


Vue.createApp(App).mount('#app');
