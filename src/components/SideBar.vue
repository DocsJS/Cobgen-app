<template>
  <v-navigation-drawer
    v-model="drawer"
    permanent
    app
    expand-on-hover
    width="17%"
  >
    <v-list-item-avatar class="d-block mx-auto" flat size="64">
      <v-img src="../assets/cobgen.png"></v-img>
    </v-list-item-avatar>
    <v-list dense>
      <v-list-item-group v-model="selectedItem">
        <div class="d-block mx-auto">
          <v-list-item
            v-for="(item, i) in items"
            :key="`vendas-root-${i}`"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div class="d-block mx-auto">
          <v-list-group
            v-model="selectedItem3"
            prepend-icon="mdi-archive-outline"
          >
            <template v-slot:activator>
              <v-list-item-title>Vendas</v-list-item-title>
            </template>
            <v-list-item
              v-for="(item, i) in items3"
              :key="`vendas-item-${i}`"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <div class="d-block mx-auto">
          <v-list-group
            v-model="selectedItem2"
            prepend-icon="mdi-dots-horizontal"
          >
            <template v-slot:activator>
              <v-list-item-title>Ver mais</v-list-item-title>
            </template>
            <v-list-item
              v-for="(item, i) in items2"
              :key="`see-more-root-${i}`"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <div class="d-block mx-auto">
          <v-list-item
            v-for="(item, i) in items4"
            :key="`see-more-item-${i}`"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
    <!-- Logout -->
    <div
      style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
    >
      <v-list-item @click="logout">
        <v-icon v-text="'mdi-exit-to-app'" color="red"></v-icon>
        <v-list-item-title v-text="'Sair'"></v-list-item-title>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>
<script>
  export default {
    data: () => ({
      selectedItem: null,
      selectedItem2: null,
      selectedItem3: null,
      selectedItem4: null,
      drawer: null,
      mini: true,
      items: [
        { text: "Início", icon: "mdi-monitor-dashboard", to: "/" },
        {
          text: "Relatórios",
          icon: "mdi-chart-bar-stacked",
          to: "/relatorios",
        },
        {
          text: "Clientes",
          icon: "mdi-account-group-outline",
          to: "/clientes",
        },
      ],
      items2: [
        { text: "Seguros", icon: "mdi-plus-outline", to: "/seguros" },
        {
          text: "Financiamentos",
          icon: "mdi-car",
          to: "/financiamentos",
        },
      ],
      items3: [
        { text: "Minhas cobranças", icon: "mdi-finance", to: "/cobrancas" },
        {
          text: "Planos",
          icon: "mdi-package-variant-closed",
          to: "/planos",
        },

        { text: "Extrato", icon: "mdi-wallet-outline", to: "/extrato" },
      ],
      items4: [
        {
          text: "Minha conta",
          icon: "mdi-account-circle-outline",
          to: "/conta",
        },
      ],
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
    }),
    components: {
      // VueStar,
    },
    methods: {
      logout() {
        let self = this;
        self.$store.commit("app/clearStorage");
        delete self.$api.defaults.headers.common["Authorization"];
        setTimeout(() => {
          self.$router.push("/login");
        }, 500);
      },
    },
  };
</script>
<style>
  .v-list-item-group .v-list-item--active {
    color: #30c3cf !important;
    position: start;
  }
</style>
