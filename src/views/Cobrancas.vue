<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Cobranças</h2>
        </div>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Nova cobrança</h5>
            </v-btn>
          </template>
        </v-dialog>
      </v-app-bar>
      <v-row>
        <v-col sm="8" class="pa-7">
          <v-navigation-drawer
            permanent
            expand-on-hover
            mini-variant
            mini-variant-width="250"
          >
            <v-text-field
              class="text-left"
              color="cyan"
              outlined
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-navigation-drawer>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
    <v-col>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="cobrancas"
        :items2="plano"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px"> </v-dialog>
            <v-dialog v-model="dialog" width="800">
              <v-card flat outlined>
                <v-tabs horizontal color="cyan">
                  <v-tab>Nova cobrança</v-tab>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-select
                          item-value="id"
                          item-text="nome"
                          v-model="clienteSelecionado"
                          :items="cliente"
                          :filter="customFilter"
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Selecione o plano desejado</h5>
                        <v-flex>
                          <v-autocomplete
                            item-value="id"
                            item-text="nomePlano"
                            :items="planos"
                            :filter="customFilter"
                            v-model="planoSelecionado"
                            outlined
                            chips
                            solo
                            flat
                            color="cyan"
                          >
                            <template v-slot:item="data">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-html="data.item.nomePlano"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                  v-html="data.item.nomeUnidade"
                                ></v-list-item-subtitle>
                                <v-list-item-subtitle
                                  v-html="data.item.codigoPlano"
                                ></v-list-item-subtitle>
                                <v-list-item-subtitle
                                  v-html="data.item.preco"
                                ></v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </v-autocomplete>
                        </v-flex>
                      </v-col>
                      <v-col>
                        <h5>Valor</h5>
                        <v-text-field
                          label="Defina o valor da cobrança"
                          v-model="model.value"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Descrição da cobrança</h5>
                        <v-textarea
                          v-model="model.descripition"
                          outlined
                          name="input-7-4"
                          label="Uma breve descrição da cobrança"
                          persistent-hint
                          solo
                          flat
                          color="cyan"
                        ></v-textarea>
                        <h5>Qual será a forma de pagamento?</h5>
                        <v-select
                          v-model="model.billingType"
                          :options="items3"
                          offset-y
                          :items="items3"
                          label="Selecione o tipo"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-select>
                        <h5>Data de Emissão</h5>
                        <v-text-field
                          v-model="model.dueDate"
                          outlined
                          name="input-7-4"
                          label="Defina a data de emissão da cobrança"
                          persistent-hint
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                    </v-col>
                  </v-tab-item>
                </v-tabs>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialog = false"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    :loading="loading"
                    :disabled="loading"
                    color="green"
                    text
                    @click="
                      doSave();
                      loader = 'loading';
                    "
                    >Salvar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="540px">
              <v-card>
                <v-card-title class="text-h8"
                  >Você tem certeza que deseja remover esta
                  cobrança?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn
                    color="green"
                    text
                    @click="
                      deleteItemConfirm();
                      loader = 'loading';
                    "
                    :loading="loading"
                    :disabled="loading"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="primary"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteItem(item)" color="red"
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:[`item.plano`]="{ item }">
          {{
            item.plano && item.plano.data && item.plano.data.attributes
              ? item.plano.data.attributes.nomePlano
              : ""
          }}
        </template>
      </v-data-table>
    </v-col>
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
      loader: null,
      loading: false,
      planoAtivo: ["true", "false"],
      notifications: ["Semana(s)", "Mês(s)", "Ano(s)"],

      items3: ["PIX", "CRÉDITO", "DÉBITO", "BOLETO"],

      dates: ["2022-05-17", "2022-05-25"],
      computed: {
        dateRangeText() {
          return this.dates.join(" ~ ");
        },
      },
      headers: [
        {
          text: "Nome",
          align: "center",
          sortable: true,
          value: "nome",
        },
        {
          text: "Valor",
          align: "start",
          value: "value",
        },
        {
          text: "Descrição",
          align: "start",
          value: "descripition",
        },
        {
          text: "Forma de pagamento",
          align: "start",
          value: "billingType",
        },
        {
          text: "Vencimento",
          align: "start",
          value: "dueDate",
        },
        {
          text: "Plano",
          align: "center",
          sortable: true,
          value: "plano",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "Nome",
          align: "start",
          value: "nome",
        },
        {
          text: "Plano",
          align: "start",
          value: "plano",
        },
        {
          text: "Valor",
          align: "start",
          value: "value",
        },
        {
          text: "descricao",
          align: "start",
          value: "descripition",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      headers3: [
        {
          text: "Nome",
          align: "start",
          value: "nome",
        },
        {
          text: "Plano",
          align: "start",
          value: "plano",
        },
        {
          text: "descricao",
          align: "start",
          value: "descripition",
        },
        {
          text: "status",
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
          text: "Plano",
          align: "start",
          value: "plano",
        },
        {
          cliente: "",
          status: "",
        },
      ],
      assinaturas: [],
      model: {
        nome: "",
        value: "",
        descripition: "",
        billingType: "",
        dueDate: "",
        plano: "",
      },
      defaultItem: {
        nome: "",
        value: "",
        descripition: "",
        billingType: "",
        dueDate: "",
        plano: "",
      },
      editedIndex: -1,
      editedItem: {
        nome: "",
        value: "",
        descripition: "",
        billingType: "",
        dueDate: "",
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
        .get(`cobrancas?populate=planos&populate=child_of`)
        .then(({ data }) => {
          self.cobrancas = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
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
      const child_of = self.$store.state.app.user.id;
      self.$api
        .post("cobrancas", {
          data: {
            nome: self.model.nome,
            value: self.model.value,
            descripition: self.model.descripition,
            billingType: self.model.billingType,
            dueDate: self.model.dueDate,
            plano: self.model.plano,
            child_of: child_of,
          },
        })
        .then(() => {
          setTimeout(() => {
            self.dialog = false;
            self.getCobrancas();
          }, 1000);
        });
    },
    save() {
      let self = this;

      const child_of = self.$store.state.app.user.id;
      self.$api
        .put("cobrancas/" + self.model.id, {
          data: {
            nome: self.model.nome,
            value: self.model.value,
            descripition: self.model.descripition,
            billingType: self.model.billingType,
            dueDate: self.model.dueDate,
            plano: self.model.plano,
            child_of: child_of,
          },
        })
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
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
