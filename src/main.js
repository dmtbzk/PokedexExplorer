import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; 
import { aliases, mdi } from "vuetify/iconsets/mdi"; 
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const apolloClient = new ApolloClient({
  link : httpLink,
  cache: new InMemoryCache(),
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets      : {
      mdi,
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(vuetify);
app.provide(DefaultApolloClient, apolloClient);
app.mount("#app");
