<template>
  <v-app id="inspire" class="bg">
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
        <v-col cols="12" sm="15">
          <v-col cols="12" sm="20">
            <v-card flat>
              <v-tabs
                horizontal
                centered
                show-arrows
                center-active
                fixed-tabs
                color="cyan"
              >
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
                          <v-layout row>
                            <v-col md="6">
                              <h5>Nome</h5>
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
                            <v-col md="6">
                              <h5>Telefone</h5>
                              <v-text-field
                                v-model="model.celular"
                                type="text"
                                @input="acceptNumber"
                                label="Digite o número de contato"
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
                                type="date"
                                color="cyan"
                                v-model="model.datadenascimento"
                                label="Digite a data de nascimento"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-layout>
                        </v-container>
                        <v-spacer></v-spacer>
                      </v-card>
                      <v-card flat>
                        <v-card-text>
                          <h3 class="cyan--text">Dados do Endereço</h3>
                        </v-card-text>
                        <v-container>
                          <v-layout row>
                            <v-col md="6">
                              <h5>CEP</h5>
                              <v-text-field
                                dense
                                solo
                                flat
                                outlined
                                color="cyan"
                                v-model="model.cep"
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
                                type="number"
                                color="cyan"
                                v-model="model.Numero"
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
                                label="Digite o seu estado"
                                required
                              ></v-text-field>
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
                          </v-layout>
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
                                type="number"
                                v-model="model.Numero"
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
                                label="Digite o seu estado"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col>
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
                                type="number"
                                outlined
                                color="cyan"
                                label="(sem o dígito)"
                                v-model="model.Agencia"
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
                                type="number"
                                color="cyan"
                                label="(sem o dígito)"
                                v-model="model.Conta"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <h5>Dígito da conta</h5>
                              <v-text-field
                                dense
                                solo
                                type="number"
                                flat
                                outlined
                                color="cyan"
                                v-model="model.Digitodaconta"
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
                          Operadores
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
                    </v-app-bar>
                    <v-spacer></v-spacer>
                  </v-container>
                  <v-col>
                    <v-data-table
                      class="elevation-1"
                      :headers="headers"
                      :items="operador"
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
                                        <v-col md="12">
                                          <v-text-field
                                            solo
                                            flat
                                            v-model="model.nome"
                                            outlined
                                            label="Nome do Operador"
                                            color="cyan"
                                            prepend-icon="mdi-account-outline"
                                          ></v-text-field>
                                        </v-col>
                                      </v-banner>
                                      <v-banner>
                                        <v-col md="12">
                                          <v-text-field
                                            solo
                                            flat
                                            outlined
                                            v-model="model.emailoperador"
                                            label="Email de acesso do operador"
                                            color="cyan"
                                            prepend-icon="mdi-email-multiple-outline"
                                          ></v-text-field>
                                        </v-col>
                                      </v-banner>
                                      <v-banner>
                                        <v-col md="12">
                                          <v-text-field
                                            solo
                                            flat
                                            outlined
                                            v-model="model.password2"
                                            prepend-icon="mdi-lock-outline"
                                            color="cyan"
                                            background-color="transparent"
                                            :append-icon="
                                              show1 ? 'mdi-eye' : 'mdi-eye-off'
                                            "
                                            :type="show1 ? 'text' : 'password'"
                                            :rules="[
                                              rules.requirida,
                                              rules.min,
                                            ]"
                                            name="input-10-1"
                                            label="Senha"
                                            hint="Minimo 6 caracteres"
                                            counter
                                            @click:append="show1 = !show1"
                                          ></v-text-field>
                                        </v-col>
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
                                            v-model="model.VisualizarCobrancas"
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
                                            v-model="model.VisualizarExtrato"
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
                                            v-model="model.VisualizarClientes"
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
                                            v-model="model.VisualizarPlanos"
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
                                            v-model="
                                              model.VisualizarFinanciamentos
                                            "
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
                                            v-model="model.VisualizarSeguros"
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
                          <v-dialog v-model="dialogDelete" max-width="510px">
                            <v-card>
                              <v-card-title class="text-h8"
                                >Você tem certeza que deseja remover este
                                operador?</v-card-title
                              >
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="closeDelete"
                                  >Cancelar</v-btn
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
                      <template v-slot:[`item.VisualizarClientes`]="{ item }">
                        {{ item.VisualizarClientes ? "Ativado" : "Desativado" }}
                      </template>
                      <template v-slot:[`item.VisualizarCobrancas`]="{ item }">
                        {{
                          item.VisualizarCobrancas ? "Ativado" : "Desativado"
                        }}
                      </template>
                      <template v-slot:[`item.VisualizarPlanos`]="{ item }">
                        {{ item.VisualizarPlanos ? "Ativado" : "Desativado" }}
                      </template>
                      <template
                        v-slot:[`item.VisualizarFinanciamentos`]="{ item }"
                      >
                        {{
                          item.VisualizarFinanciamentos
                            ? "Ativado"
                            : "Desativado"
                        }}
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
      show1: false,
      dialog: false,
      loader: null,
      loading: false,
      tab: null,
      column: null,
      dialogDelete: false,
      row: null,
      user: [],
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
          value: "emailoperador",
        },
        {
          text: "V.Clientes",
          align: "center",
          sortable: true,
          value: "VisualizarClientes",
        },
        {
          text: "V.Cobranças",
          align: "center",
          value: "VisualizarCobrancas",
        },

        {
          text: "V.Planos",
          align: "center",
          value: "VisualizarPlanos",
        },
        {
          text: "V.Financiamentos",
          align: "center",
          value: "VisualizarFinanciamentos",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],

      operadors: [],
      operador: [],
      child_of: "",

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
        nome: "",
        emailoperador: "",
        operadorSelecionado: null,
        password2: "",
        VisualizarCobrancas: "",
        VisualizarExtrato: "",
        VisualizarClientes: "",
        VisualizarPlanos: "",
        VisualizarFinanciamentos: "",
        VisualizarSeguros: "",
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
        nome: "",
        emailoperador: "",
        operadorSelecionado: null,
        password2: "",
        VisualizarCobrancas: "",
        VisualizarExtrato: "",
        VisualizarClientes: "",
        VisualizarPlanos: "",
        VisualizarFinanciamentos: "",
        VisualizarSeguros: "",
      },
      rules: {
        requirida: (value) => !!value || "Requirida.",
        min: (v) => v.length >= 6 || "Mínimo 6 characteres",
      },
      operadorSelecionado: "",
      userSelecionado: null,
    };
  },
  computed: {
    newUser() {
      return this.model && this.model.id && this.model.id > 0;
    },
    newOperador() {
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
    acceptNumber() {
      var x = this.model.celular
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      this.model.celular = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    get() {
      let self = this;
      self.$api.get("users/me").then((res) => {
        self.model = res.data;
        console.table(self.model);
      });
    },
    getOperador() {
      let self = this;
      self.$api
        .get(`operadors/`)
        .then(({ data }) => {
          self.operador = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          console.log(self.operador);
        })
        .catch((erro) => {
          console.log(erro);
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
      self.model["operador"] = self.operadorSelecionado;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .post("users/", {
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
            child_of: child_of,
            nome: self.model.nome,
            emailoperador: self.model.emailoperador,
            password2: self.model.password2,
            VisualizarCobrancas: self.model.VisualizarCobrancas,
            VisualizarExtrato: self.model.VisualizarExtrato,
            VisualizarClientes: self.model.VisualizarClientes,
            VisualizarPlanos: self.model.VisualizarPlanos,
            VisualizarFinanciamentos: self.model.VisualizarFinanciamentos,
            VisualizarSeguros: self.model.VisualizarSeguros,
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
      self.model["operador"] = self.operadorSelecionado;
      const child_of = self.$store.state.app.user.id;
      self.$api
        .put(`users/` + self.model.id, {
          child_of: child_of,
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
          nome: self.model.nome,
          emailoperador: self.model.emailoperador,
          password2: self.model.password2,
          VisualizarCobrancas: self.model.VisualizarCobrancas,
          VisualizarExtrato: self.model.VisualizarExtrato,
          VisualizarClientes: self.model.VisualizarClientes,
          VisualizarPlanos: self.model.VisualizarPlanos,
          VisualizarFinanciamentos: self.model.VisualizarFinanciamentos,
          VisualizarSeguros: self.model.VisualizarSeguros,
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
        self.getOperador();
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
    self.get();
    self.getOperador();
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
