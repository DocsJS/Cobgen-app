<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">Clientes</h2>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="#30c3cf" dark large @click="openCadastroDialog">
          <h5>Cadastrar cliente A</h5>
        </v-btn>
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
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" color="primary" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small color="red" @click="deleteItem(item)"
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
      <Cadastra ref="cadastra-dialog" @closed="getCliente()" />
      <v-dialog v-model="dialogDelete" max-width="520px">
        <v-card>
          <v-card-title class="text-h5"
            >Você tem certeza que deseja remover este cliente?</v-card-title
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
    </v-col>
  </v-app>
</template>
<script>
  import SideBar from "../components/SideBar";
  import "vue-search-input/dist/styles.css";
  import Cadastra from "../components/Clientes/Dialogs/Cadastra.vue";

  export default {
    components: {
      SideBar,
      Cadastra,
    },
    data: () => ({
      search: "",
      loader: null,
      loading: false,
      isEditing: false,
      cep: null,
      resultadoCEP: "",
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
          value: "cep",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      cliente: [],
      planoSelecionado: "",
      model: {
        nome: "",
        cpfCnpj: "",
        email: "",
        phone: "",
        address: "",
        addressNumber: "",
        complement: "",
        province: "",
        cep: null,
        externalReference: "",
        notification: "",
        additionalEmails: "",
        observations: "",
        groupName: "",
        admin: "",
        plano: "",
        datadenascimento: "",
        planoSelecionado: null,
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
        cep: null,
        externalReference: "",
        notificationDisabled: "",
        additionalEmails: "",
        observations: "",
        groupName: "",
        admin: "",
        plano: "",
        datadenascimento: "",
        planoSelecionado: null,
      },
      subscriptions: [],
      clienteSelecionado: null,
      pCliente: null,
      cobrancas: {
        cliente: "",
        billingType: "",
        value: "",
        dueDate: "",
        descripition: "",
      },
    }),

    methods: {
      openCadastroDialog() {
        this.$refs["cadastra-dialog"].open(false);
      },

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

      getPlanocliente(item) {
        let self = this;
        self.model = Object.assign({}, item);
        self.$api
          .get("clientes/" + self.model.id + "?populate=plano")
          .then((res) => {
            self.planoedit = res.data.data.attributes.plano;
            self.model.planoSelecionado =
              self.data[0].attributes.plano.data.attributes.nomePlano;
            console.log(self.model.model.planoSelecionado);
          })
          .catch((erro) => {
            console.log(erro);
          });
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

      editItem(item) {
        this.$refs["cadastra-dialog"].open(Object.assign({}, item));
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
      console.log(self.$store.state.app.user.id);
      self.getCliente();
      // self.getPlanos();
      // self.getAssinaturas();
      // self.getCobrancas();
    },
  };
</script>
