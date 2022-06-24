<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Clientes</h2>
        </div>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Cadastrar cliente</h5>
            </v-btn>
          </template>
        </v-dialog>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-row>
        <v-col sm="7" class="pa-7">
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
              label="Buscar "
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
        :items="cliente"
        :items2="plano"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px"> </v-dialog>
            <v-dialog v-model="dialog" width="800">
              <v-card flat outlined>
                <v-tabs horizontal color="cyan">
                  <v-tab>Cadastrar cliente </v-tab>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Nome</h5>
                        <v-text-field
                          v-model="model.nome"
                          offset-y
                          item-value="nome"
                          label="Selecione o tipo"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Selecione o plano desejado</h5>
                        <v-select
                          v-model="planoSelecionado"
                          offset-y
                          item-value="id"
                          item-text="nomePlano"
                          :items="planos"
                          label="Selecione o tipo"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Email</h5>
                        <v-text-field
                          label="Digite o seu email"
                          v-model="model.email"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Telefone</h5>
                        <v-text-field
                          label="Digite o seu telefone"
                          v-model="model.phone"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>CPF/CNPJ</h5>
                        <v-text-field
                          label="Selecione o seu cpf ou cnpj"
                          v-model="model.cpfCnpj"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Endereço</h5>
                        <v-text-field
                          label="Digite o seu endereço"
                          v-model="model.postalCode"
                          outlined
                          color="cyan"
                          solo
                          flat
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
                  <v-btn :disabled="loading" color="green" text @click="doSave"
                    >Salvar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-dialog v-model="dialogDelete" max-width="520px">
            <v-card>
              <v-card-title class="text-h5"
                >Você tem certeza que deseja remover este cliente?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="green" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" color="primary" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small color="red" @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:item.plano="{ item }">
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
  data: () => ({
    search: "",
    loading: false,
    dialog: false,
    dialogDelete: false,
    adminType: ["true", "false"],
    notifications: ["true", "false"],
    headers: [
      {
        text: "Nome",
        align: "center",
        sortable: true,
        value: "nome",
      },
      {
        text: "Plano",
        align: "center",
        sortable: true,
        value: "plano",
      },
      {
        text: "CPF",
        align: "center",
        value: "cpfCnpj",
      },
      {
        text: "Email",
        align: "center",
        value: "email",
      },
      {
        text: "Telefone",
        align: "center",
        value: "phone",
      },
      {
        text: "CEP",
        align: "center",
        value: "postalCode",
      },
      { text: "Ações", value: "actions", sortable: false },
    ],
    cliente: [],
    model: {
      nome: "",
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
      admin: "",
      plano: "",
    },
    defaultItem: {
      nome: "",
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

    subscriptions: [],
    clienteSelecionado: null,
    planos: [
      {
        nomePlano: "",
      },
    ],
    planoSelecionado: null,
    cobrancas: {
      cliente: "",
      billingType: "",
      value: "",
      dueDate: "",
      descripition: "",
    },
    cobrancaSelecionado: null,
    veiculos: [],
    veiculoSelecionado: null,
  }),
  computed: {
    newCliente() {
      return this.model && this.model.id && this.model.id > 0;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getCliente() {
      let self = this;
      self.$api
        .get(`clientes?populate=planos&populate=child_of`)
        .then(({ data }) => {
          self.cliente = data.data.map((item) => {
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
      else self.novoCliente();
    },
    novoCliente() {
      let self = this;
      self.model["plano"] = self.planoSelecionado;
      self.model["cliente"] = self.clienteSelecionado;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .post("clientes", {
          data: {
            nome: self.model.nome,
            cpfCnpj: self.model.cpfCnpj,
            email: self.model.email,
            phone: self.model.phone,
            address: self.model.address,
            addressNumber: self.model.addressNumber,
            complement: self.model.complement,
            province: self.model.province,
            postalCode: self.model.postalCode,
            externalReference: self.model.externalReference,
            notification: self.model.notification,
            child_of: child_of,
            additionalEmails: self.model.additionalEmails,
            observations: self.model.observations,
            groupName: self.model.groupName,
            admin: self.model.admin,
            plano: self.model.plano,
          },
        })
        .then(() => {
          setTimeout(() => {
            self.dialog = false;
            self.getCliente();
          }, 1000);
          console.log(self.model["cliente"]);
        });
    },
    save() {
      let self = this;
      self.model["cliente"] = self.clienteSelecionado;
      self.model["plano"] = self.planoSelecionado;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .put("clientes/" + self.model.id, {
          data: {
            nome: self.model.nome,
            cpfCnpj: self.model.cpfCnpj,
            email: self.model.email,
            phone: self.model.phone,
            address: self.model.address,
            addressNumber: self.model.addressNumber,
            complement: self.model.complement,
            province: self.model.province,
            postalCode: self.model.postalCode,
            externalReference: self.model.externalReference,
            notification: self.model.notification,
            child_of: child_of,
            additionalEmails: self.model.additionalEmails,
            observations: self.model.observations,
            groupName: self.model.groupName,
            admin: self.model.admin,
            plano: self.model.plano,
          },
        })
        .then(() => {
          if (self.editedIndex > -1)
            Object.assign(self.cliente[self.editedIndex], self.model.id);
          else self.cliente.push(self.model);
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getCliente();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.editedIndex = self.cliente.indexOf((i) => i.id === item.id);
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
      self.$api.delete("clientes/" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getCliente();
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
    getAssinaturas() {
      let self = this;
      self.$api
        .get("subscriptions")
        .then(({ data }) => {
          self.subscriptions = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    getCobrancas() {
      let self = this;
      self.$api
        .get("cobrancas")
        .then(({ data }) => {
          self.cobrancas = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    getVeiculos() {
      let self = this;
      self.$api
        .get("veiculos")
        .then(({ data }) => {
          self.veiculos = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
  },
  mounted() {
    let self = this;
    console.log(self.$store.state.app.user.id);
    self.getCliente();
    self.getPlanos();
    self.getAssinaturas();
    self.getCobrancas();
    self.getVeiculos();
  },
  components: {
    SideBar,
  },
};
</script>
