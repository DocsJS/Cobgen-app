<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">
            Meus Seguros
          </h2>
        </div>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Contratar Seguro</h5>
            </v-btn>
          </template>
        </v-dialog>
        <v-btn icon>
          <v-icon color="black">mdi-help-circle-outline</v-icon>
        </v-btn>
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
      <v-data-table :search="search" :headers="headers" :items="seguro">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px"> </v-dialog>
            <v-dialog v-model="dialog" width="800">
              <v-card flat outlined>
                <v-tabs horizontal color="cyan">
                  <v-tab> Automóvel </v-tab>
                  <v-tab> Saúde </v-tab>
                  <v-tab> Odontológico </v-tab>
                  <v-tab> Vida </v-tab>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-text-field
                          v-model="model.nome"
                          offset-y
                          item-value="nome"
                          item-text="nome"
                          label="Selecione o tipo"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email</h5>
                        <v-text-field
                          label="Digite o email do cliente"
                          v-model="model.additionalEmails"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email de consulta</h5>
                        <v-text-field
                          label="Digite o email a ser enviado os dados de cadastro"
                          v-model="model.email"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Estado Civil</h5>
                        <v-select
                          label="Selecione o seu estado civil"
                          v-model="model.estadocivil"
                          :options="estadocivil"
                          offset-y
                          :items="estadocivil"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>CEP</h5>
                        <v-text-field
                          label="Digite o seu CEP"
                          v-model="model.cep"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Residência</h5>
                        <v-text-field
                          label="Digite o tipo da sua residência"
                          v-model="model.residencia"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Tem portão?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.portao"
                          :options="portao"
                          offset-y
                          :items="portao"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Tem condutor menor de 26 anos?</h5>
                        <v-select
                          label="Selecione a sua resposta"
                          v-model="model.condutor"
                          :options="condutor"
                          offset-y
                          :items="condutor"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Quantos veículos tem na residência?</h5>
                        <v-text-field
                          label="Digite a sua resposta"
                          v-model="model.quantidade"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Placa do veiculo</h5>
                        <v-text-field
                          label="Digite a sua resposta"
                          v-model="model.placa"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>O veiculo tem alarme?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.alarme"
                          :options="alarme"
                          offset-y
                          :items="alarme"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>
                          Tem alguma modificação? Se sim especifique qual.
                        </h5>
                        <v-text-field
                          label="Digite a sua resposta"
                          v-model="model.modificacao"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Está financiado?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.financiado"
                          :options="financiado"
                          offset-y
                          :items="financiado"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Usa para trabalho?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.trabalho"
                          :options="trabalho"
                          offset-y
                          :items="trabalho"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Usa para ir para a faculdade?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.faculdade"
                          :options="faculdade"
                          offset-y
                          :items="faculdade"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Usa para ir ao trabalho?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.trabalho2"
                          :options="trabalho2"
                          offset-y
                          :items="trabalho2"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <v-col>
                        <h5>Tem estacionamento?</h5>
                        <v-select
                          label="Digite a sua resposta"
                          v-model="model.estacionamento"
                          :options="estacionamento"
                          offset-y
                          :items="estacionamento"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                      </v-col>
                      <!-- <form ref="form">
                        <v-row>
                          <v-col cols="12" md="2">
                            <v-file-input
                              color="cyan"
                              ref="file"
                              id="file"
                              @click="chooseFiles"
                              @change="handleFileUpload"
                              name="files"
                              type="file"
                              offset-y
                              v-model="arquivo"
                              chips
                              label="Enviar os documentos referente ao veiculo e pessoa"
                            >
                            </v-file-input>
                            {{ arquivoname }}
                            <v-img :src="url ? url : arquivo"></v-img>
                          </v-col>
                        </v-row>
                      </form> -->
                    </v-col>
                  </v-tab-item>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-text-field
                          v-model="model.user"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email</h5>
                        <v-text-field
                          label="Digite o email do cliente"
                          v-model="model.additionalEmails"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email de consulta</h5>
                        <v-text-field
                          label="Digite o email a ser enviado os dados de cadastro"
                          v-model="model.email"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Quantidade de membros na familia</h5>
                        <v-text-field
                          v-model="model.quantidadevidas"
                          type="number"
                          offset-y
                          label="Digite a quantidade"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Telefone</h5>
                        <v-text-field
                          v-model="model.celular"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>CPF</h5>
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
                        <h5>CEP</h5>
                        <v-text-field
                          label="Digite o seu cep"
                          v-model="model.postalCode"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                    </v-col>
                  </v-tab-item>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-text-field
                          v-model="model.user"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email</h5>
                        <v-text-field
                          label="Digite o email do cliente"
                          v-model="model.additionalEmails"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email de consulta</h5>
                        <v-text-field
                          label="Digite o email a ser enviado os dados de cadastro"
                          v-model="model.email"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Quantidade de membros na familia</h5>
                        <v-text-field
                          v-model="model.quantidadevidas"
                          type="number"
                          offset-y
                          label="Digite a quantidade"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Telefone</h5>
                        <v-text-field
                          v-model="model.celular"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>CPF</h5>
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
                        <h5>CEP</h5>
                        <v-text-field
                          label="Digite o seu cep"
                          v-model="model.postalCode"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                    </v-col>
                  </v-tab-item>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-text-field
                          v-model="model.user"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email</h5>
                        <v-text-field
                          label="Digite o email do cliente"
                          v-model="model.additionalEmails"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Email de consulta</h5>
                        <v-text-field
                          label="Digite o email a ser enviado os dados de cadastro"
                          v-model="model.email"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Quantidade de vidas</h5>
                        <v-text-field
                          v-model="model.quantidadevidas"
                          type="number"
                          offset-y
                          label="Digite a quantidade de vidas"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>Telefone</h5>
                        <v-text-field
                          v-model="model.celular"
                          offset-y
                          label="Selecione o cliente"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h5>CPF</h5>
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
                        <h5>CEP</h5>
                        <v-text-field
                          label="Digite o seu cep"
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
                  <v-btn
                    color="green"
                    text
                    @click="
                      doSave();
                      loader = 'loading';
                    "
                    :loading="loading"
                    :disabled="loading"
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" color="primary" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small color="red" @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
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
    loader: null,
    loading: false,
    dialog: false,
    dialogDelete: false,
    adminType: ["true", "false"],
    estadocivil: ["Solteiro", "Viúvo", "Casado", "Divorciado"],
    portao: ["Sim", "Não"],
    financiado: ["Sim", "Não"],
    trabalho: ["Sim", "Não"],
    trabalho2: ["Sim", "Não"],
    faculdade: ["Sim", "Não"],
    estacionamento: ["Sim", "Não"],
    condutor: ["Sim", "Não"],
    alarme: ["Sim", "Não"],
    notifications: ["true", "false"],
    // documentos: [
    //   {
    //     name: "",
    //   },
    // ],
    name: null,
    // url: null,
    // arquivo: null,
    // arquivoname: null,
    headers: [
      {
        text: "Nome",
        align: "center",
        sortable: true,
        value: "nome",
      },

      {
        text: "Email",
        align: "center",
        value: "additionalEmails",
      },
      {
        text: "Estado Civil",
        align: "center",
        value: "estadocivil",
      },
      {
        text: "CEP",
        align: "center",
        value: "cep",
      },
      { text: "Ações", value: "actions", sortable: false },
    ],
    // cliente: [
    //   {
    //     nome: "",
    //   },
    // ],
    // clienteSelecionado: null,
    seguro: [],
    model: {
      nome: "",
      email: "",
      estadocivil: "",
      cep: "",
      residencia: "",
      portao: "",
      condutor: "",
      quantidade: "",
      quantidadevidas: "",
      placa: "",
      alarme: "",
      modificacao: "",
      financiado: "",
      trabalho: "",
      faculdade: "",
      trabalho2: "",
      estacionamento: "",
    },
    editedIndex: -1,
    editedItem: {
      nome: "",
      email: "",
      estadocivil: "",
      cep: "",
      residencia: "",
      portao: "",
      condutor: "",
      quantidade: "",
      quantidadevidas: "",
      placa: "",
      alarme: "",
      modificacao: "",
      financiado: "",
      trabalho: "",
      faculdade: "",
      trabalho2: "",
      estacionamento: "",
    },
    defaultItem: {
      // tipodeseguro: "",
      nome: "",
      email: "",
      estadocivil: "",
      cep: "",
      residencia: "",
      portao: "",
      condutor: "",
      quantidade: "",
      quantidadevidas: "",
      placa: "",
      alarme: "",
      modificacao: "",
      financiado: "",
      trabalho: "",
      faculdade: "",
      trabalho2: "",
      estacionamento: "",
    },
  }),
  computed: {
    newSeguro() {
      return this.model && this.model.id && this.model.id > 0;
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 1000);
      this.loader = null;
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    getSeguro() {
      let self = this;
      // const child_of = self.$store.state.app.user.id;
      const qs = require("qs");
      const query = qs.stringify(
        {
          populate: { child_of: true },
          // sort: ["createdAt"],
          // pagination: {
          //   limit: params._limit,
          //   start: params._start,
          // },
          // filters: {
          //   child_of: {
          //     id: child_of,
          //   },
          // },
        },
        {
          encodeValuesOnly: true,
        }
      );
      self.$api
        .get(`seguros?${query}`)
        .then(({ data }) => {
          self.seguro = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          console.log(self.seguro);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    doSave() {
      let self = this;
      if (self.model && self.model.id && self.model.id > 0) self.save();
      else self.novoSeguro();
    },
    novoSeguro() {
      let self = this;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .post("seguros/email", {
          data: {
            nome: self.model.nome,
            email: self.model.email,
            additionalEmails: self.model.additionalEmails,
            estadocivil: self.model.estadocivil,
            cep: self.model.cep,
            residencia: self.model.residencia,
            portao: self.model.portao,
            condutor: self.model.condutor,
            quantidade: self.model.quantidade,
            quantidadevidas: self.model.quantidadevidas,
            placa: self.model.placa,
            alarme: self.model.alarme,
            modificacao: self.model.modificacao,
            financiado: self.model.financiado,
            trabalho: self.model.trabalho,
            faculdade: self.model.faculdade,
            trabalho2: self.model.trabalho2,
            estacionamento: self.model.estacionamento,
            child_of: child_of,
          },
        })
        .then(() => {
          setTimeout(() => {
            self.dialog = false;
            self.getSeguro();
          }, 1000);
        });
    },
    save() {
      let self = this;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .put("seguros/" + self.model.id, {
          data: {
            nome: self.model.nome,
            email: self.model.email,
            additionalEmails: self.model.additionalEmails,
            estadocivil: self.model.estadocivil,
            cep: self.model.cep,
            residencia: self.model.residencia,
            portao: self.model.portao,
            condutor: self.model.condutor,
            quantidade: self.model.quantidade,
            quantidadevidas: self.model.quantidadevidas,
            placa: self.model.placa,
            alarme: self.model.alarme,
            modificacao: self.model.modificacao,
            financiado: self.model.financiado,
            trabalho: self.model.trabalho,
            faculdade: self.model.faculdade,
            trabalho2: self.model.trabalho2,
            estacionamento: self.model.estacionamento,
            child_of: child_of,
          },
        })
        .then(() => {
          if (self.editedIndex > -1)
            Object.assign(self.seguro[self.editedIndex], self.model.id);
          else self.seguro.push(self.model);
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getSeguro();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.editedIndex = self.seguro.indexOf((i) => i.id === item.id);
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
      self.$api.delete("seguros/" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getSeguro();
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
    // getCliente() {
    //   let self = this;
    //   self.$api
    //     .get("clientes")
    //     .then(({ data }) => {
    //       self.cliente = data.data.map((item) => {
    //         return { id: item.id, ...item.attributes };
    //       });
    //       console.log(self.cliente);
    //     })
    //     .catch((erro) => {
    //       console.log(erro);
    //     });
    // },
  },
  mounted() {
    let self = this;
    self.getSeguro();
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
body {
  font-family: "verdana";
}
h1 {
  margin-top: 0px;
  margin-bottom: 10px;
}
p {
  margin-top: 0px;
  margin-bottom: 0px;
}
hr {
  margin-bottom: 15px;
}
.msg {
  padding-top: 15px;
}
.referencia {
  padding-bottom: 15px;
}
</style>
