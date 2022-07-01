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
                <v-tab> Operadores </v-tab>
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
                            <v-col md="6">
                              <h5>Data de nascimento</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.datadenascimento"
                                :rules="nameRules"
                                label="Digite a data de nascimento"
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
                              <h5>Complemento</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Complemento"
                                :rules="nameRules"
                                label="Digite o complemento"
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
                            <v-col md="6">
                              <h5>Site</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.site"
                                label="Digite o seu site"
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
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-tab-item>
                <v-tab-item>
                  <v-container>
                    <v-app-bar color="rgba(0,0,0,0)" flat>
                      <div>
                        <h2 class="font-weight-medium" style="font-size: 35px">
                          Meus Operadores
                        </h2>
                      </div>

                      <v-spacer></v-spacer>

                      <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="#30c3cf"
                            dark
                            large
                            v-bind="attrs"
                            v-on="on"
                          >
                            <h5>Novo</h5>
                          </v-btn>
                        </template>
                      </v-dialog>
                      <v-btn icon>
                        <v-icon color="black">mdi-help-circle-outline</v-icon>
                      </v-btn>
                    </v-app-bar>

                    <v-spacer></v-spacer>
                  </v-container>
                  <v-col>
                    <v-data-table
                      :search="search"
                      :headers="headers"
                      :items="planos"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-dialog v-model="dialog" max-width="900px">
                          </v-dialog>
                          <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="850px"
                          >
                            <v-card>
                              <v-row>
                                <v-col>
                                  <v-tabs horizontal color="cyan">
                                    <v-tab>Novo Operador</v-tab>
                                    <v-tab-item>
                                      <v-banner>
                                        <v-text-field
                                          solo
                                          flat
                                          outlined
                                          label="Nome do Operador"
                                          color="cyan"
                                          prepend-icon="mdi-account"
                                        ></v-text-field>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>

                                        Visualizar Cobranças

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>
                                        Visualizar Extrato

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo1"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>
                                        Visualizar Clientes

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo2"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>
                                        Visualizar Planos

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo3"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>
                                        Visualizar Financiamentos

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo4"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-banner single-line flat>
                                        <v-icon
                                          slot="icon"
                                          color="cyan"
                                          size="36"
                                        >
                                          mdi-eye-outline
                                        </v-icon>
                                        Visualizar Seguros

                                        <template v-slot:actions>
                                          <v-switch
                                            inset
                                            v-model="model.Ativo5"
                                            color="cyan"
                                          >
                                          </v-switch>
                                        </template>
                                      </v-banner>
                                      <v-divider></v-divider>
                                    </v-tab-item>
                                  </v-tabs>
                                </v-col>
                              </v-row>
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
                          <v-dialog v-model="dialogDelete" max-width="510px">
                            <v-card>
                              <v-card-title class="text-h8"
                                >Você tem certeza que deseja remover este
                                plano?</v-card-title
                              >
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="closeDelete"
                                  >Cancel</v-btn
                                >
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
                      <template v-slot:item.actions="{ item }">
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
                      <template v-slot:item.Ativo="{ item }">
                        {{ item.Ativo ? "Ativo" : "Inativo" }}
                      </template>
                    </v-data-table>
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
      loader: null,
      loading: false,
      tab: null,
      column: null,
      row: null,
      user: [],
      model: {
        username: "",
        email: "",
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
        email: "",
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
        .post("users/me", {
          data: {
            username: self.model.username,
            email: self.model.email,
            site: self.model.site,
            datadenascimento: self.model.datadenascimento,
            celular: self.model.celular,
            fone: self.model.fone,
            Rua: self.model.Rua,
            Numero: self.model.numero,
            Complemento: self.model.Complemento,
            Bairro: self.model.bairro,
            cpfcnpj: self.model.cpfcnpj,
            CEP: self.model.CEP,
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
          },
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
        .put(`users/` + self.model.id, {
          username: self.model.username,
          email: self.model.email,
          site: self.model.site,
          datadenascimento: self.model.datadenascimento,
          celular: self.model.celular,
          fone: self.model.fone,
          Rua: self.model.Rua,
          Numero: self.model.numero,
          Complemento: self.model.Complemento,
          Bairro: self.model.bairro,
          cpfcnpj: self.model.cpfcnpj,
          CEP: self.model.CEP,
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
      self.$api.delete("users/" + self.model.id).then(() => {
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
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
