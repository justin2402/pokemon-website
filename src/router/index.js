import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchCardPage from "@/Pages/SearchCardPage";
import AccountPage from "@/Pages/AccountPage";
import MyCardsPage from "@/Pages/MyCardsPage";
import DeckBuildPage from "@/Pages/DeckBuildPage";
import StorePage from "@/Pages/StorePage";

//gives us the <router-view>, <router-link>, etc
Vue.use(VueRouter);

let routes = [
    {path:'/', component: SearchCardPage},
    {path: '/search-card', component:SearchCardPage},
    {path: '/my-cards-page',component:MyCardsPage },
    {path: '/store-page',component:StorePage },
    {path: '/deck-build-page',component:DeckBuildPage },
    {path: '/account-page',component:AccountPage },
];

let router = new VueRouter({routes});




export default router;