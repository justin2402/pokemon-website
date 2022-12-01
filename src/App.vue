<template>
  <div id="app">
      <v-app>
  
  
          <v-app-bar app absolute color="#fcb69f" dark shrink-on-scroll src="https://i.pinimg.com/originals/6d/87/b2/6d87b2a9f05643000a37514ce90281df.jpg" scroll-target="#scrolling-techniques-2">
              <template v-slot:img="{ props }">
                  <v-img v-bind="props" gradient="to top right, rgba(255, 246, 143,.5), rgba(255, 240, 0,.8)"></v-img>
              </template>
  
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
  
            <v-app-bar-title>Pokemon Store</v-app-bar-title>
  
              <v-spacer> </v-spacer>
  
          </v-app-bar>
          <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" max-height="100vh">
              <v-container style="height: 100vh;text-align:center">
                  <v-main>
  
                      <div v-if="authUser === null">
                          <div>
                              <h2>Log In</h2>
                              <v-container style="width: 25rem">
                                  <v-btn @click="loginWithGoogle" color="red" width="10rem" class="ma-2">
                                      <v-icon>mdi-google</v-icon> Google Login
                                  </v-btn>
                              </v-container>
  
                          </div>
                      </div>
                      <div v-else>
                          <router-view @remove-one="removeOne" @remove-all="removeCards" @add-wishlist="addWishlist" @add-cardcollection="addCard" :authUser="authUser"></router-view>
                      </div>
  
                  </v-main>
  
              </v-container>
          </v-sheet>
          <v-navigation-drawer v-model="drawer" absolute temporary>
              <v-list nav dense>
                  <v-list-item-group active-class="deep-purple--text text--accent-4">
                      <v-btn block text>
                          <router-link style="color: black; width: 100%; text-decoration: none" to="/search-card">
                              <v-icon>mdi-magnify</v-icon> Search
                          </router-link>
                      </v-btn>
                      <v-btn block text>
                          <router-link style="color: black; width: 100%; text-decoration: none" to="/my-cards-page">
                              <v-icon>mdi-treasure-chest</v-icon> My Collection
                          </router-link>
                      </v-btn>
                      <v-btn block text>
                          <router-link style="color: black; width: 100%; text-decoration: none" to="/store-page">
                              <v-icon>mdi-cart</v-icon> Store
                          </router-link>
                      </v-btn>
                      <v-btn block text>
                          <router-link style="color: black; width: 100%; text-decoration: none" to="/deck-build-page">
                              <v-icon>mdi-hammer</v-icon> Build Deck
                          </router-link>
                      </v-btn>
                      <v-btn block text>
                          <router-link style="color: black; width: 100%; text-decoration: none;" to="/account-page">
                              <v-icon>mdi-account</v-icon> Account
                          </router-link>
                      </v-btn>
  
                      <v-btn v-if="authUser === null" block text>
                          <router-link style="color: black; width: 100%; text-decoration: none" to="/account-page">
                              <v-icon>mdi-location-enter</v-icon> Log In
                          </router-link>
                      </v-btn>
  
                      <div v-else>
                          <v-btn style="color: black; width: 100%; text-decoration: none" block text @click="logOut">
                              <v-icon>mdi-exit-to-app</v-icon> Log Out
                          </v-btn>
                      </div>
  
                  </v-list-item-group>
  
              </v-list>
          </v-navigation-drawer>
        <v-footer style="color: black" color="yellow">
            <h5>Nintendo don't sue me </h5>
        </v-footer>
      </v-app>
  </div>
  </template>
  
  <script>
  import router from "@/router";
  import {
      auth,
      db,
      firebase
  } from "@/firebase/firebase";
  import User from "@/Models/User";
  
  export default {
      name: 'App',
      components: {},
      router,
      data() {
          return {
              drawer: false,
              authUser: null,
              myCards: []
          }
      },
      watch: {
          group() {
              this.drawer = false
          },
      },
      methods: {
          async logOut() {
              await auth.signOut();
          },
          async addCard(e) {
              //count and id of doc
              let count = 1;
              let id = null;
              //gets cards from AuthUser
              this.myCards = await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').get().then(yo => {
                  return yo.docs;
              })
  
              //checks for any duplicate
              this.myCards.forEach(doc => {
                  if (doc.data().images.small === e.images.small) {
                      id = doc.id
                      count = doc.data().count + 1; //adds one more to the count of duplicates
                  }
              })
              e.count = count
              if (id === null) {
                  await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').add(e)
              } else {
                  await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').doc(id).update(e);
              }
          },
          async addWishlist(e) {
              //count and id of doc
              let count = 1;
              let id = null;
              //gets cards from AuthUser
              this.myCards = await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').get().then(yo => {
                  return yo.docs;
              })
  
              //checks for any duplicate
              this.myCards.forEach(doc => {
                  if (doc.data().images.small === e.images.small) {
                      id = doc.id
                      count = doc.data().count + 1; //adds one more to the count of duplicates
                  }
              })
              e.count = count
  
              if (id === null) {
                  await db.collection('Users').doc(this.authUser.uid).collection('wishcollection').add(e)
              } else {
                  await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').doc(id).update(e);
              }
          },
          async loginWithGoogle() {
              let provider = new firebase.auth.GoogleAuthProvider();
              await auth.signInWithPopup(provider).catch(error => {
                  console.error('Unable to Sign In', error)
              })
          },
          async removeCards(e) {
              let id = null
              this.myCards = await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').get().then(yo => {
                  return yo.docs;
              })
  
              this.myCards.forEach(doc => {
                  if (e.images.small === doc.data().images.small) {
                      id = doc.id
                  }
              })
              await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').doc(id).delete()
          },
          async removeOne(e) {
              let id = null
              this.myCards = await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').get().then(yo => {
                  return yo.docs;
              })
  
              this.myCards.forEach(doc => {
                  if (e.images.small === doc.data().images.small) {
                      id = doc.id
                  }
              })
              e.count--;
              await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').doc(id).update(e)
          }
  
      },
      beforeCreate: async function () {

        console.log(process.env.VUE_APP_FIREBASE_API_KEY)
          await auth.onAuthStateChanged(x => {
              if (x) {
                  this.authUser = new User(x);
              } else {
                  this.authUser = null
              }
          })
      }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');
  
  * {
    font-family: 'Dosis', sans-serif;
  }
  
  .card-image {
      width: 250px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      text-align: center;
  }
  
  .v-progress-circular {
      margin: 1rem;
  
  }
  
  .router-inf {
      color: black;
  }
  </style>
  