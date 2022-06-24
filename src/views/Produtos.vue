<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">
            Meus Planos
          </h2>
        </div>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Criar novo plano</h5>
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
      <v-data-table :search="search" :headers="headers" :items="planos">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px"> </v-dialog>
            <v-dialog v-model="dialog" width="800">
              <v-card>
                <v-card-title class="text-h6">Dados do Plano</v-card-title>
                <v-divider></v-divider>
                <v-row>
                  <v-col>
                    <v-col class="text-center">
                      <img src="" width="130" />
                    </v-col>
                    <v-col>
                      <v-file-input
                        class="pa-3"
                        label="Adicionar arquivo"
                        outlined
                        disabled
                        color="cyan"
                      ></v-file-input>
                    </v-col>
                  </v-col>
                  <v-col>
                    <v-col>
                      <h5>Ativar/Desativar Cliente</h5>
                      <v-switch
                        inset
                        v-model="model.Ativo"
                        color="cyan"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <h5>Título do Produto</h5>
                      <v-text-field
                        v-model="model.nomePlano"
                        outlined
                        label="Título curto, ex: Curso de marketing 2.0"
                        color="cyan"
                        solo
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <h5>Código do plano</h5>
                      <v-text-field
                        v-model="model.codigoPlano"
                        outlined
                        label="Insira o código do plano"
                        color="cyan"
                        solo
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <h5>Nome da Unidade</h5>
                      <v-text-field
                        v-model="model.nomeUnidade"
                        outlined
                        label="Digite o nome da unidade"
                        color="cyan"
                        solo
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <h5>Valor</h5>
                      <v-text-field
                        v-model="model.preco"
                        outlined
                        label="Insira o valor"
                        color="cyan"
                        solo
                        flat
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <h5>Descrição do Produto</h5>
                      <v-textarea
                        v-model="model.descricaoDoPlano"
                        outlined
                        name="input-7-4"
                        label="Digite uma breve descrição do plano"
                        persistent-hint
                        solo
                        flat
                        color="cyan"
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <h5>Número de Cobranças</h5>
                      <v-text-field
                        v-model="model.numeroDeCobranca"
                        outlined
                        label="Insira o número de cobranças"
                        persistent-hint
                        solo
                        flat
                        color="cyan"
                      ></v-text-field>
                      <h5>Avaliação Gratuita</h5>
                      <v-text-field
                        v-model="model.avaliacaoGratuita"
                        outlined
                        label="Insira o número de dias para uma avaliação gratuita"
                        persistent-hint
                        solo
                        flat
                        color="cyan"
                      ></v-text-field>
                      <h5>Taxa de Configuração</h5>
                      <v-text-field
                        v-model="model.taxaDeConfiguracao"
                        outlined
                        label="Insira a taxa de configuração"
                        persistent-hint
                        solo
                        flat
                        color="cyan"
                      ></v-text-field>
                      <h5>Imposto</h5>
                      <v-text-field
                        v-model="model.imposto"
                        outlined
                        label="Insira o imposto"
                        persistent-hint
                        solo
                        flat
                        color="cyan"
                      ></v-text-field>
                      <h5>Cobrar a cada</h5>
                      <v-select
                        v-model="model.cobrancaACada"
                        :options="cabranCada"
                        offset-y
                        :items="cabranCada"
                        label="Selecione o tipo"
                        outlined
                        solo
                        flat
                        color="cyan"
                      ></v-select>
                    </v-col>
                  </v-col>
                </v-row>
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
            <v-dialog v-model="dialogDelete" max-width="510px">
              <v-card>
                <v-card-title class="text-h8"
                  >Você tem certeza que deseja remover este plano?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="green" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="primary"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteItem(item)" color="red"
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
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      loading: false,
      cabranCada: ["Semana(s)", "Mês(s)", "Ano(s)"],
      headers: [
        {
          text: "Nome do Plano",
          align: "start",
          sortable: false,
          value: "nomePlano",
        },
        { text: "Código do plano", value: "codigoPlano" },
        { text: "Nome da unidade", value: "nomeUnidade" },
        { text: "Preço", value: "preco" },
        { text: "Cobrar a cada", value: "cobrancaACada" },
        { text: "Ciclos de cobrança", value: "numeroDeCobranca" },
        { text: "Ativo", value: "Ativo" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      planos: [],
      model: {
        nomePlano: "",
        codigoPlano: "",
        nomeUnidade: "",
        preco: "",
        cobrancaACada: "",
        numeroDeVezesDeCobranca: "",
        avaliacaoGratuita: "",
        taxaDeConfiguracao: "",
        imposto: "",
        descricaoDoPlano: "",
        Ativo: "",
        permitirClientesAddComplemento: false,
      },
      editedIndex: -1,
      editedItem: {
        nomePlano: "",
        codigoPlano: "",
        nomeUnidade: "",
        preco: "",
        cobrarACada: "",
        numeroDeCobranca: "",
        avaliacaoGratuita: "",
        taxaDeConfiguracao: "",
        imposto: "",
        descricaoDoPlano: "",
        ativo: "",
        permitirClientesAddComplemento: false,
      },
      defaultItem: {
        nomePlano: "",
        codigoPlano: "",
        nomeUnidade: "",
        preco: "",
        cobrancaACada: "",
        numeroDeCobranca: "",
        avaliacaoGratuita: "",
        taxaDeConfiguracao: "",
        imposto: "",
        descricaoDoPlano: "",
        ativo: "",
        permitirClientesAddComplemento: false,
      },
    };
  },
  computed: {
    newPlano() {
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
  created() {},
  methods: {
    getPlanos() {
      let self = this;
      const id = self.$store.state.app.user.id;
      const qs = require("qs");
      const query = qs.stringify({
        where: {
          child_of: {
            data: {
              id: id,
            },
          },
        },
      });
      self.$api
        .get(`planos?populate=child_of&${query}`)
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
    doSave() {
      let self = this;
      if (self.model && self.model.id && self.model.id > 0) self.save();
      else self.novoPlano();
    },
    novoPlano() {
      let self = this;
      // self.model["customer"] = self.clienteSelecionado;
      // self.model["id"] = self.planoSelecionado;
      self.model["child_of"] = self.$store.state.app.user.id;
      self.$api.post("planos", { data: self.model }).then(() => {
        setTimeout(() => {
          self.dialog = false;
          self.getPlanos();
        }, 1000);
      });
    },
    save() {
      let self = this;
      // self.model["customer"] = self.clienteSelecionado;
      // self.model["id"] = self.planoSelecionado;
      self.$api
        .put("planos/" + self.model.id, { data: self.model })
        .then(() => {
          if (self.editedIndex > -1)
            Object.assign(self.planos[self.editedIndex], self.model.id);
          else self.planos.push(self.model);
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getPlanos();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.editedIndex = self.planos.indexOf((i) => i.id === item.id);
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
      self.$api.delete("Planos/" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getPlanos();
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
  },
  mounted() {
    let self = this;
    self.getPlanos();
  },
  components: {
    SideBar,
  },
};
</script>
 