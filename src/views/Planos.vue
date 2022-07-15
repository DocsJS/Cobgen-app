<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Planos</h2>
        </div>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Novo plano</h5>
            </v-btn>
          </template>

          <v-card>
            <v-row>
              <v-col>
                <v-card-title class="text-h6"
                  >Dados do Plano</v-card-title
                ></v-col
              >
              <v-col>
                <v-switch
                  label="Ativar Plano"
                  inset
                  v-model="model.Ativo"
                  color="cyan"
                  style="margin-right: 0"
                >
                </v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-col>
                  <h5>Nome</h5>
                  <v-text-field
                    v-model="model.nomePlano"
                    outlined
                    label="ex: Curso de marketing 2.0"
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
                    label="ex.: PLANO-001"
                    color="cyan"
                    solo
                    flat
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h5>Classe</h5>
                  <v-text-field
                    v-model="model.nomeUnidade"
                    outlined
                    label="ex.: Veículos"
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
                    type="number"
                    flat
                    color="cyan"
                  ></v-text-field>
                  <h5>Avaliação Gratuita (Dias)</h5>
                  <v-text-field
                    v-model="model.avaliacaoGratuita"
                    outlined
                    label="Insira o número de dias para uma avaliação gratuita"
                    persistent-hint
                    type="number"
                    solo
                    flat
                    color="cyan"
                  ></v-text-field>
                  <h5>Taxa de Configuração</h5>
                  <v-text-field
                    v-model="model.taxaDeConfiguracao"
                    outlined
                    label="Insira a taxa de configuração"
                    type="number"
                    persistent-hint
                    solo
                    flat
                    color="cyan"
                  ></v-text-field>
                  <h5>Imposto</h5>
                  <v-text-field
                    v-model="model.imposto"
                    type="number"
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
              <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
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
      <v-data-table :search="search" :headers="headers" :items="planos">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialogDelete" max-width="510px">
              <v-card>
                <v-card-title class="text-h8"
                  >Você tem certeza que deseja remover este plano?</v-card-title
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
        <template v-slot:[`item.Ativo`]="{ item }">
          {{ item.Ativo ? "Ativo" : "Inativo" }}
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
      loader: null,
      loading: false,
      cabranCada: ["Semana(s)", "Mês(s)", "Ano(s)"],
      headers: [
        {
          text: "Nome do Plano",
          align: "start",
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
        Ativo: true,
        permitirClientesAddComplemento: false,
        fields: [],
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
        Ativo: true,
        permitirClientesAddComplemento: false,
        fields: [],
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
        Ativo: true,
        permitirClientesAddComplemento: false,
        fields: [],
      },
    };
  },
  computed: {
    newPlano() {
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
  created() {},
  methods: {
    getPlanos() {
      let self = this;
      self.$api
        .get(`planos?populate=child_of`)
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
      const child_of = self.$store.state.app.user.id;
      self.$api
        .post("planos", {
          data: {
            numeroDeCobranca: self.model.numeroDeCobranca,
            nomePlano: self.model.nomePlano,
            codigoPlano: self.model.codigoPlano,
            nomeUnidade: self.model.nomeUnidade,
            preco: self.model.preco,
            cobrancaACada: self.model.cobrancaACada,
            numeroDeVezesDeCobranca: self.model.numeroDeVezesDeCobranca,
            avaliacaoGratuita: self.model.avaliacaoGratuita,
            taxaDeConfiguracao: self.model.taxaDeConfiguracao,
            imposto: self.model.imposto,
            descricaoDoPlano: self.model.descricaoDoPlano,
            Ativo: self.model.Ativo,
            fields: self.model.fields,
            permitirClientesAddComplemento:
              self.model.permitirClientesAddComplemento,
            child_of: child_of,
          },
        })
        .then(() => {
          setTimeout(() => {
            self.dialog = false;
            self.getPlanos();
          }, 1000);
        });
    },
    save() {
      let self = this;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .put("planos/" + self.model.id, {
          data: {
            numeroDeCobranca: self.model.numeroDeCobranca,
            nomePlano: self.model.nomePlano,
            codigoPlano: self.model.codigoPlano,
            nomeUnidade: self.model.nomeUnidade,
            preco: self.model.preco,
            cobrancaACada: self.model.cobrancaACada,
            numeroDeVezesDeCobranca: self.model.numeroDeVezesDeCobranca,
            avaliacaoGratuita: self.model.avaliacaoGratuita,
            taxaDeConfiguracao: self.model.taxaDeConfiguracao,
            imposto: self.model.imposto,
            descricaoDoPlano: self.model.descricaoDoPlano,
            Ativo: self.model.Ativo,
            fields: self.model.fields,
            permitirClientesAddComplemento:
              self.model.permitirClientesAddComplemento,
            child_of: child_of,
          },
        })
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
