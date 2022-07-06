<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">
            Extrato Financeiro
          </h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-col>
        <v-list>
          <v-list-item>
            <v-col>
              <v-img
                max-width="45"
                src="https://adm.greenn.com.br/img/money-free.082dd5a7.svg"
              ></v-img>
              <v-list-item-content>
                <v-list-item-subtitle>Saldo disponível</v-list-item-subtitle>
                <h4>R$ 0,00</h4>
              </v-list-item-content>
            </v-col>
            <v-col>
              <v-img
                max-width="45"
                src="https://adm.greenn.com.br/img/money-block.1c762d60.svg"
              ></v-img>
              <v-list-item-content>
                <v-list-item-subtitle>Saldo bloqueado</v-list-item-subtitle>
                <h4>R$ 0,00</h4>
              </v-list-item-content>
            </v-col>
            <v-col>
              <v-img
                max-width="45"
                src="https://adm.greenn.com.br/img/money-wallet.7708419f.svg"
              ></v-img>
              <v-list-item-content>
                <v-list-item-subtitle>Minha carteira</v-list-item-subtitle>
                <h4>R$ 0,00</h4>
              </v-list-item-content>
            </v-col>
            <v-list-item-content>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="cyan"
                    dark
                    large
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  >
                    <h5>Sacar Dinheiro</h5>
                  </v-btn>
                </template>
              </v-dialog>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-row>
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
                    <v-col sm="7">
                      <v-text-field
                        v-model="dates"
                        color="cyan"
                        label="Date range"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </v-col>
                  </template>
                  <v-date-picker v-model="dates" range></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="search"
                color="cyan"
                append-icon="mdi-magnify"
                label="Nome do Produto"
                single-line
                hide-details
                outlined
              ></v-text-field>
            </v-col>
          </v-card-title>
          <v-col>
            <v-data-table :search="search" :headers="headers">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-dialog v-model="dialog" width="600">
                    <v-card>
                      <v-card-title class="text-h6"
                        >Solicitação de saque</v-card-title
                      >
                      <v-divider></v-divider>
                      <v-row>
                        <v-col>
                          <h3 class="text-center">EM BREVE</h3>
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" text @click="dialog = false"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          :disabled="loading"
                          color="green"
                          text
                          @click="doSave"
                          >Salvar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                  color="primary"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteItem(item)" color="red"
                  >mdi-delete</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import SideBar from "../components/SideBar";
import "vue-search-input/dist/styles.css";
export default {
  data() {
    return {
      text: "center",
      icon: "justify",
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      switch1: false,
      switch2: false,
      search: "",
      dialog: false,
      dialogDelete: false,
      loading: false,
      planoAtivo: ["true", "false"],
      cabranCada: ["Semana(s)", "Mês(s)", "Ano(s)"],

      items3: ["PIX", "CRÉDITO", "DÉBITO", "BOLETO"],

      dates: ["2022-05-17", "2022-05-25"],
      computed: {
        dateRangeText() {
          return this.dates.join(" ~ ");
        },
      },
      headers: [
        {
          text: "Data",
          align: "start",
          sortable: true,
          value: "cliente",
        },
        {
          text: "Tipo",
          align: "start",
          value: "value",
        },
        {
          text: "Produto",
          align: "start",
          value: "descripition",
        },
        {
          text: "Valor",
          align: "start",
          value: "billingType",
        },
        {
          text: "Disponível",
          align: "start",
          value: "dueDate",
        },
        { text: "Visualizar", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "Data",
          align: "start",
          value: "cliente",
        },
        {
          text: "Valor",
          align: "start",
          value: "value",
        },
        {
          text: "Produto",
          align: "start",
          value: "descripition",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      headers3: [
        {
          text: "Data",
          align: "start",
          value: "cliente",
        },
        {
          text: "Tipo",
          align: "start",
          value: "descripition",
        },
        {
          text: "Produto",
          align: "start",
          value: "status",
        },
      ],
      notificacoes: [
        {
          descripition: "",
          status: "",
        },
        {
          cliente: "",
          status: "",
        },
      ],
      assinaturas: [],
      model: {
        cliente: "",
        cpfCnpj: "",
        email: "",
        phone: "",
        address: "",
        addressNumber: "",
        complement: "",
        province: "",
        postalCode: "",
        externalReference: "",
        notification: "",
        additionalEmails: "",
        observations: "",
        groupName: "",
        admin: null,
      },
      defaultItem: {
        cliente: "",
        cpfCnpj: "",
        email: "",
        phone: "",
        address: "",
        addressNumber: "",
        complement: "",
        province: "",
        postalCode: "",
        externalReference: "",
        notificationDisabled: "",
        additionalEmails: "",
        observations: "",
        groupName: "",
        admin: "",
        plano: "",
      },
      editedIndex: -1,
      editedItem: {
        cliente: "",
        billingType: "",
        value: "",
        dueDate: "",
        descripition: "",
        plano: "",
      },
      cobrancas: [],
      cliente: [
        {
          nome: "",
        },
      ],
      clienteSelecionado: null,
      planos: [
        {
          nomePlano: "",
        },
      ],
      planoSelecionado: null,
    };
  },
  computed: {
    newCobranca() {
      return this.model && this.model.id && this.model.id > 0;
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    getCobrancas() {
      let self = this;
      self.$api
        .get("cobrancas?populate=plano")
        .then(({ data }) => {
          self.cobrancas = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          console.table(self.cobrancas);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    doSave() {
      let self = this;
      if (self.model && self.model.id && self.model.id > 0) self.save();
      else self.novaCobranca();
    },
    novaCobranca() {
      let self = this;
      self.model["cliente"] = self.clienteSelecionado;
      self.model["plano"] = self.planoSelecionado;
      self.$api.post("cobrancas", { data: self.model }).then(() => {
        setTimeout(() => {
          self.dialog = false;
          self.getCobrancas();
        }, 1000);
        console.log(self.model["cliente"]);
      });
    },
    save() {
      let self = this;
      self.model["cliente"] = self.clienteSelecionado;
      self.model["plano"] = self.planoSelecionado;
      self.$api
        .put("cobrancas/" + self.model.id, { data: self.model })
        .then(() => {
          if (self.editedIndex > -1)
            Object.assign(self.cobrancas[self.editedIndex], self.model.id);
          else self.cobrancas.push(self.model);
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getCobrancas();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.editedIndex = self.cobrancas.indexOf((i) => i.id === item.id);
      self.model = Object.assign({}, item);
      self.dialog = true;
    },
    deleteItem(item) {
      let self = this;
      self.model = Object.assign({}, item);
      self.dialogDelete = true;
    },
    deleteItemConfirm() {
      let self = this;
      self.$api.delete("cobrancas/" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getCobrancas();
      });
    },
    close() {
      let self = this;
      self.dialog = false;
      self.$nextTick(() => {
        self.model = Object.assign({}, self.defaultItem);
        self.editedIndex = -1;
      });
    },
    closeDelete() {
      let self = this;
      self.dialogDelete = false;
      self.$nextTick(() => {
        self.model = Object.assign({}, self.defaultItem);
        self.editedIndex = -1;
      });
    },

    getCliente() {
      let self = this;
      self.$api
        .get("clientes")
        .then(({ data }) => {
          self.cliente = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          console.log(self.cliente);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    getPlanos() {
      let self = this;
      self.$api
        .get("planos")
        .then(({ data }) => {
          self.planos = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          console.log(self.planos);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
  },
  mounted() {
    let self = this;
    self.getCobrancas();
    self.getCliente();
    self.getPlanos();
  },
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
