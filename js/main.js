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

import {Cart} from './Cart.js'
import {Products} from './Products.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'


const App = {
    components:{
        Cart,
        Products
    },
    data(){
        return{
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            userSearch: ''
        }
    },

    provide(){
        return{
            API: this.API,
            getJson: this.getJson
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
        }
    },
    created(){

        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: 'AIzaSyDPhZKYPDj-tDJQqPw-ufwcr9ue-C4Zjk0',
            authDomain: 'booklist-19e48.firebaseapp.com',
            projectId: 'booklist-19e48',
            storageBucket: 'booklist-19e48.appspot.com',
            messagingSenderId: '207482255613',
            appId: '1:207482255613:web:4ba23a590a9f0791f3a694',
            measurementId: 'G-4ZYRRNRV9G'
        };

        firebase.initializeApp(firebaseConfig);

    },

};


Vue.createApp(App).mount('#app');
