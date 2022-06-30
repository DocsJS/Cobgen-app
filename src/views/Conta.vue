<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">
            Minha Conta
          </h2>
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
            <v-card flat>
              <v-tabs horizontal color="cyan">
                <v-tab> Pessoal </v-tab>
                <v-tab> Empresarial </v-tab>
                <v-tab> Contas Corrente </v-tab>
                <v-tab-item>
                  <v-col>
                    <v-card outlined>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Dados Pessoais</h3>
                        </v-card-text>
                        <v-container>
                          <v-row>
                            <v-col md="6">
                              <h5>Nome completo</h5>
                              <v-text-field
                                v-model="model.username"
                                label="Digite o seu nome completo"
                                color="cyan"
                                solo
                                flat
                                persistent-hint
                                required
                                dense
                                outlined
                              >
                              </v-text-field>
                            </v-col>
                            <!-- <v-col md="6">
                              <h5>Email</h5>
                              <v-text-field
                                v-model="model.email"
                                label="Digite o seu email"
                                color="cyan"
                                solo
                                flat
                                required
                                dense
                                outlined
                              ></v-text-field>
                            </v-col> -->
                            <v-col md="6">
                              <h5>Telefone</h5>
                              <v-text-field
                                v-model="model.celular"
                                label="Digite o seu número de contato"
                                color="cyan"
                                solo
                                flat
                                required
                                dense
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>CPF</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cpfcnpj"
                                :rules="nameRules"
                                label="Digite o seu cpf"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>RG</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.rg"
                                :rules="nameRules"
                                label="Digite o seu rg"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Dados do Endereço</h3>
                        </v-card-text>
                        <v-container>
                          <v-row>
                            <v-col md="6">
                              <h5>CEP</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cep"
                                :rules="nameRules"
                                label="Digite o seu cep"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Logradouro</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Rua"
                                :rules="nameRules"
                                label="Digite a sua rua"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Número</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Numero"
                                :rules="nameRules"
                                label="Digite o número da sua residência"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Bairro</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Bairro"
                                :rules="nameRules"
                                label="Digite o seu bairro"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Cidade</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cidade"
                                :rules="nameRules"
                                label="Digite a sua cidade"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Estado</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.estado"
                                :rules="nameRules"
                                label="Digite o seu estado"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-spacer></v-spacer>
                              <v-btn color="green" text @click="doSave"
                                >Salvar</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-tab-item>
                <v-tab-item>
                  <v-col>
                    <v-card outlined>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Dados da Empresa</h3>
                        </v-card-text>
                      </v-card>
                      <v-card flat>
                        <v-container>
                          <v-row>
                            <v-col md="6">
                              <h5>Razão Social</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.razaosocial"
                                :rules="nameRules"
                                label="Digite a sua razão social"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Nome Fantasia</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.nomefantasia"
                                :rules="nameRules"
                                label="Digite o seu nome fantasia"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>CNPJ</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.CNPJ"
                                :rules="nameRules"
                                label="Digite o seu cnpj"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Contrato Social</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.contratosocial"
                                :rules="nameRules"
                                label="Digite o seu contrato social"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Telefone Comercial</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.fone"
                                :rules="nameRules"
                                label="Digite o seu número de contato"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Dados do Endereço</h3>
                        </v-card-text>
                        <v-container>
                          <v-row>
                            <v-col md="6">
                              <h5>CEP</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cep"
                                :rules="nameRules"
                                label="Digite o seu cep"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Logradouro</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Rua"
                                :rules="nameRules"
                                label="Digite a sua rua"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Número</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Numero"
                                :rules="nameRules"
                                label="Digite o número da sua residência"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Bairro</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cidade"
                                :rules="nameRules"
                                required
                                label="Digite o seu Bairro"
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Cidade</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cidade"
                                :rules="nameRules"
                                label="Digite a sua cidade"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Estado</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.estado"
                                :rules="nameRules"
                                label="Digite o seu estado"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-spacer></v-spacer>
                              <v-btn
                                :disabled="loading"
                                color="green"
                                text
                                @click="doSave"
                                >Salvar</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-tab-item>
                <v-tab-item>
                  <v-col>
                    <v-card outlined>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Cadastrar conta bancária</h3>
                        </v-card-text>
                      </v-card>
                      <v-card flat>
                        <v-container>
                          <v-row>
                            <v-col md="6">
                              <h5>Nome do banco</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Banco"
                                label="Digite o nome do seu banco"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Agência</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                label="(sem o dígito)"
                                v-model="model.Agencia"
                                :rules="nameRules"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Conta</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                label="(sem o dígito)"
                                v-model="model.Conta"
                                :rules="nameRules"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Dígito da conta</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Digitodaconta"
                                :rules="nameRules"
                                label="Digite o dígito da conta"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-spacer></v-spacer>
                              <v-btn
                                :disabled="loading"
                                color="green"
                                text
                                @click="doSave"
                                >Salvar</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
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
  data() {
    return {
      dialog: false,
      tab: null,
      column: null,
      row: null,
      user: [],
      model: {
        username: "",
        nome: "",
        email: "",
        password: "",
        site: "",
        datadenascimento: "",
        celular: "",
        fone: "",
        Rua: "",
        Numero: "",
        Complemento: "",
        Bairro: "",
        cpfcnpj: "",
        CEP: "",
        cidade: "",
        estado: "",
        rg: "",
        razaosocial: "",
        nomefantasia: "",
        CNPJ: "",
        contratosocial: "",
        Banco: "",
        Agencia: "",
        Conta: "",
        Digitodaconta: "",
      },
      defaultItem: {
        username: "",
        nome: "",
        email: "",
        password: "",
        site: "",
        datadenascimento: "",
        celular: "",
        fone: "",
        Rua: "",
        Numero: "",
        Complemento: "",
        Bairro: "",
        cpfcnpj: "",
        cep: "",
        cidade: "",
        estado: "",
        rg: "",
        razaosocial: "",
        nomefantasia: "",
        CNPJ: "",
        contratosocial: "",
        Banco: "",
        Agencia: "",
        Conta: "",
        Digitodaconta: "",
      },
    };
  },
  computed: {
    newUser() {
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
    get() {
      let self = this;
      self.$api.get("users/me").then((res) => {
        self.model = res.data;
        console.table(self.model);
      });
    },
    doSave() {
      let self = this;
      if (self.model && self.model.id && self.model.id > 0) self.save();
      else self.novoUser();
    },
    novoUser() {
      let self = this;
      self.model["user"] = self.userSelecionado;
      self.$api
        .post("users", {
          data: self.model,
        })
        .then(() => {
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getUser();
          }, 1000);
        });
    },
    save() {
      let self = this;
      self.model["user"] = self.userSelecionado;
      self.$api
        .put("users/" + self.model.id, {
          username: self.model.username,
          nome: self.model.nome,
          email: self.model.email,
          password: self.model.password,
          site: self.model.site,
          datadenascimento: self.model.datadenascimento,
          celular: self.model.celular,
          fone: self.model.fone,
          Rua: self.model.Rua,
          Numero: self.model.Numero,
          Complemento: self.model.Complemento,
          Bairro: self.model.Bairro,
          cpfcnpj: self.model.cpfcnpj,
          cep: self.model.cep,
          cidade: self.model.cidade,
          estado: self.model.estado,
          rg: self.model.rg,
          razaosocial: self.model.razaosocial,
          nomefantasia: self.model.nomefantasia,
          CNPJ: self.model.CNPJ,
          contratosocial: self.model.contratosocial,
          Banco: self.model.Banco,
          Agencia: self.model.Agencia,
          Conta: self.model.Conta,
          Digitodaconta: self.model.Digitodaconta,
        })
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.get();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.editedIndex = self.user.indexOf((i) => i.id === item.id);
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
      self.editedIndex = -1;
      self.$api.delete("users/me" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getUser();
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
      self.$nextTick(() => {});
    },
  },
  mounted() {
    let self = this;
    self.get();
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
