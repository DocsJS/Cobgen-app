<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Meus Links</h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="8">
          <v-col cols="12" sm="12">
            <v-card flat outlined>
              <v-tabs horizontal color="cyan">
                <v-tab> Vendedor </v-tab>
                <v-tab> Afiliado </v-tab>
                <v-tab-item>
                  <v-col>
                    <v-card flat>
                      <v-card-text>
                        <h3 class="cyan--text">Produtos Vendedor</h3>
                      </v-card-text>
                      <v-select
                        outlined
                        solo
                        flat
                        label="Selecione um produto para comecar"
                        color="cyan"
                      ></v-select>
                    </v-card>
                  </v-col>
                </v-tab-item>
                <v-tab-item>
                  <v-col>
                    <v-card flat>
                      <v-card-text>
                        <h3 class="cyan--text">Produtos Afiliado</h3>
                      </v-card-text>
                      <v-select
                        outlined
                        solo
                        flat
                        label="Selecione um produto para comecar"
                        color="cyan"
                      ></v-select>
                    </v-card>
                  </v-col>
                </v-tab-item>
              </v-tabs>
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
    items: ["EN", "ES", "DZ"],
    text: "weekly",

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
