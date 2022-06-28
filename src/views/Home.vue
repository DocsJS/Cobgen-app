<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Dashboard</h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon dark class="">
          <v-icon color="black">mdi-android</v-icon>
        </v-btn>
        <v-btn icon dark class="">
          <v-icon color="black">mdi-apple</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card flat>
            <v-carousel
              :show-arrows="false"
              height="100%"
              tile
              cycle
              hide-delimiter-background
              delimiter-icon="mdi-minus"
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
          <v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-n1">
            <v-spacer></v-spacer>
            <span class="grey--text"></span>
          </v-toolbar>
          <v-row class="mt-n5">
            <v-col>
              <v-card flat class="mx-1 pa-10">
                <v-card color="#E3F2FD" outlined flat>
                  <v-card-title>
                    <v-icon color="#30C3CF">mdi-bag-checked</v-icon>
                  </v-card-title>
                  <v-card-text class="font-weight-medium">
                    Boletos hoje
                  </v-card-text>
                  <h3 class="pa-5">R$ 0,00</h3>
                  <v-spacer></v-spacer>
                </v-card>
              </v-card>
            </v-col>
            <v-col>
              <v-card flat class="mx-1 pa-10">
                <v-card outlined>
                  <v-card-title>
                    <v-icon color="#30C3CF">mdi-bag-checked</v-icon>
                  </v-card-title>
                  <v-card-text class="font-weight-medium">
                    Últimos 30 dias
                  </v-card-text>
                  <h3 class="pa-5">R$ 0,00</h3>
                  <v-spacer></v-spacer>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-col cols="12" sm="12">
            <v-card class="mt-8" width="5000" outlined>
              <v-app-bar color="rgba(0,0,0,0)" flat>
                <h5>Vendas últimos 7 dias / R$</h5>
              </v-app-bar>
              <template>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="white"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :labels="labels"
                    :value="value"
                    color="cyan"
                    line-width="2"
                    padding="16"
                  ></v-sparkline>
                </v-sheet>
              </template>
            </v-card>
          </v-col>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="rounded pa-8" color="blue lighten-5" flat>
            <v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-1">
              <br />
              <body>
                <h5 class="blue--text">
                  Você deve concluir a Verificação de Identidade para ter acesso
                  aos serviços bancários do Cobgen.
                </h5>
              </body>
              <v-btn small color="primary" href="/conta" dark>Verificar</v-btn>
            </v-toolbar>
          </v-card>
          <v-col>
            <v-card class="mx-4 pa-10" outlined>
              <v-card flat>
                <p>Meu saldo</p>
                <v-spacer></v-spacer>
                <h1 class="cyan--text">R$ 0,00</h1>
                <v-col></v-col>
                <h5>Saldo Bloqueado</h5>
                <v-spacer></v-spacer>
                <h5 class="orange--text">R$ 0,00</h5>
              </v-card>
              <v-col></v-col>
              <v-card flat>
                <h4>Cobranças por dispositivos</h4>
                <h6 class="font-weight-light">
                  Dados refere-se aos últimos 7 dias
                </h6>
              </v-card>
              <v-col></v-col>
              <v-card flat>
                <h5>Cobranças recentes</h5>
                <v-btn
                  class="ma-2"
                  outlined
                  color="blue"
                  large
                  href="/cobrancas"
                >
                  <h5>Ver todas as cobranças</h5></v-btn
                >
              </v-card>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import SideBar from "../components/SideBar";
export default {
  name: "Home",
  data: () => ({
    select: { state: "EN" },
    // items: ["EN", "ES", "DZ"],
    text: "weekly",
    items: [
      {
        src: " https://cdn.discordapp.com/attachments/855453874608930816/991431734426095676/bannercobgen.png",
      },
      {
        src: "https://cdn.discordapp.com/attachments/855453874608930816/991431702851367042/bannercobgen2.png",
      },
    ],
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    fill: false,
    type: "trend",
    autoLineWidth: false,
    labels: ["Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb.", "Dom."],
    value: [200, 675, 410, 390, 310, 460, 250],
  }),
  components: {
    SideBar,
  },
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
