<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Relatórios</h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="8">
          <v-col>
            <v-card-title>
              <v-row>
                <v-col>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-col sm="8">
                        <v-text-field
                          v-model="dates"
                          label="Date range"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                    </template>
                    <v-date-picker v-model="dates" range></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <v-select
                  label="Selecione o produto"
                  outlined
                  color="cyan"
                  solo
                  flat
                ></v-select>
              </v-col>
            </v-card-title>
          </v-col>
          <v-col sm="15" class="pa-7">
            <Bar
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </v-col>
          <v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-n1">
            <v-spacer></v-spacer>
            <span class="grey--text"></span>
          </v-toolbar>
          <v-row class="mt-n5">
            <v-col>
              <v-card flat class="mx-1 pa-10"> </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">últimas cobranças</div>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> - {{ message.time }}
                  </div>
                  <div>{{ message.message }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
          <v-col>
            <v-card class="mx-4 pa-10" outlined>
              <p>Meu saldo</p>
              <v-spacer></v-spacer>
              <h1 class="cyan--text">R$ 0,00</h1>
              <v-col></v-col>
              <h5>Saldo Bloqueado</h5>
              <v-spacer></v-spacer>
              <h5 class="orange--text">R$ 0,00</h5>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import SideBar from "../components/SideBar";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  name: "Home",
  props: {
    chartId: {
      type: String,
      default: "bar-chart,",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    dates: ["2022-05-17", "2022-05-25"],
    messages: [
      {
        from: "Teste 01",
        message: `Contrato.`,
        time: "10:42am",
        color: "cyan lighten-1",
      },
      {
        from: "Teste 02",
        message: "Contrato.",
        time: "09:37am",
        color: "cyan darken-1",
      },
      {
        from: "Teste 03",
        message: "Contrato.",
        time: "14:27am",
        color: "cyan darken-2",
      },
    ],
    chartData: {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          label: "Cobranças",
          backgroundColor: "cyan",
          data: [40, 20, 20, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  components: {
    SideBar,
    Bar,
  },
};
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
