<template>
  <section>
    <v-dialog v-model="dialog" width="800px">
      <v-card flat outlined>
        <v-tabs horizontal color="cyan">
          <v-tab>Cadastrar Cliente </v-tab>
          <v-tab-item>
            <v-col>
              <v-col>
                <h5>Nome</h5>
                <v-text-field
                  v-model="model.nome"
                  item-value="nome"
                  label="Nome do cliente"
                  outlined
                  solo
                  flat
                  color="cyan"
                ></v-text-field>
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
                  v-model="model.phone"
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
              <v-col>
                <h5 for="cpfInput">Informe um cpf valido:</h5>
                <v-text-field
                  outlined
                  id="cpfInput"
                  type="number"
                  v-model="model.cpfCnpj"
                  @change="verificarCpf"
                  @input="pendente = true"
                  @keyup.enter="verificarCpf"
                  @keyup="verificarCpf"
                ></v-text-field>

                <v-col v-show="!pendente" :style="messageType" class="msg">
                  <span v-if="valido"> CPF Válido, parabéns! </span>
                  <span v-else>CPF inválido... </span>
                </v-col>
              </v-col>
              <v-col>
                <h5>Data de nascimento</h5>
                <v-text-field
                  label="Digite a data de nascimento"
                  v-model="model.datadenascimento"
                  outlined
                  color="cyan"
                  solo
                  type="date"
                  flat
                ></v-text-field>
              </v-col>
              <form @submit.prevent="save" novalidate="true">
                <v-col>
                  <h5>Cep</h5>
                  <v-text-field
                    label="Para efetuar a busca de endereco digite o seu cep"
                    outlined
                    color="cyan"
                    solo
                    flat
                    type="text"
                    class="form-control"
                    placeholder="cep"
                    maxlength="8"
                    v-model="model.cep"
                  ></v-text-field>
                  <ul class="list-group">
                    <h3
                      class="list-group-item active cyan--text text--lighten-1"
                    >
                      Dados do seu endereço:
                    </h3>
                    <li
                      v-if="resultadoCEP && resultadoCEP.logradouro"
                      class="list-group-item"
                    >
                      <span class="font-weight-bold">Logradouro :</span
                      >{{ resultadoCEP.logradouro }}
                    </li>

                    <li
                      v-if="resultadoCEP && resultadoCEP.bairro"
                      class="list-group-item"
                    >
                      <span class="font-weight-bold">Bairro : </span
                      >{{ resultadoCEP.bairro }}
                    </li>
                    <li
                      v-if="resultadoCEP && resultadoCEP.localidade"
                      class="list-group-item"
                    >
                      <span class="font-weight-bold">Localidade :</span
                      >{{ resultadoCEP.localidade }}
                    </li>
                    <li
                      v-if="resultadoCEP && resultadoCEP.uf"
                      class="list-group-item"
                    >
                      <span class="font-weight-bold">Estado :</span
                      >{{ resultadoCEP.uf }}
                    </li>
                  </ul>
                </v-col>
                <v-col>
                  <h5>complemento</h5>
                  <v-text-field
                    label="Digite o complemento do seu endereço"
                    outlined
                    color="cyan"
                    solo
                    flat
                    type="text"
                    class="form-control"
                    v-model="model.complement"
                  ></v-text-field>
                </v-col>
              </form>
            </v-col>
          </v-tab-item>
        </v-tabs>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
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
  </section>
</template>
<script>
  const validar = (cpf) => checkAll(prepare(cpf));
  const notDig = (i) => ![".", "-", " "].includes(i);
  const prepare = (cpf) => cpf.trim().split("").filter(notDig).map(Number);
  const is11Len = (cpf) => cpf.length === 11;
  const notAllEquals = (cpf) => !cpf.every((i) => cpf[0] === i);
  const onlyNum = (cpf) => cpf.every((i) => !isNaN(i));

  const calcDig = (limit) => (a, i, idx) => a + i * (limit + 1 - idx);
  const somaDig = (cpf, limit) => cpf.slice(0, limit).reduce(calcDig(limit), 0);
  const resto11 = (somaDig) => 11 - (somaDig % 11);
  const zero1011 = (resto11) => ([10, 11].includes(resto11) ? 0 : resto11);

  const getDV = (cpf, limit) => zero1011(resto11(somaDig(cpf, limit)));
  const verDig = (pos) => (cpf) => getDV(cpf, pos) === cpf[pos];

  const checks = [is11Len, notAllEquals, onlyNum, verDig(9), verDig(10)];
  const checkAll = (cpf) => checks.map((f) => f(cpf)).every((r) => !!r);

  const defaultItem = {
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
    datadenascimento: "",
    plano: null,
  };

  export default {
    data() {
      return {
        dialog: false,
        planoSelecionado: null,
        loading: false,
        resultadoCEP: null,
        pendente: true,
        valido: false,
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
          plano: null,
          datadenascimento: "",
        },

        planos: [
          {
            nomePlano: "",
          },
        ],
      };
    },
    watch: {
      // Interessante o cep que está no DATA seja o mesmo do método para fazer referência. Lembre toda propriedade que é função
      cep(cepVemDoFormulario) {
        // Vou limitar para apenas pesquisar depois que tiver 8 caracteres
        if (cepVemDoFormulario.length === 8) {
          fetch(`https://viacep.com.br/ws/${cepVemDoFormulario}/json`)
            .then((r) => r.json())
            .then((r) => {
              this.resultadoCEP = r;
            });
        }
      },
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
      customFilter(item, queryText) {
        const nome = item.nomePlano.toLowerCase();
        const classe = item.nomeUnidade.toLowerCase();
        const code = item.codigoPlano.toLowerCase();
        const preco = item.preco.toLowerCase();
        const searchText = queryText.toLowerCase();

        return (
          nome.indexOf(searchText) > -1 ||
          classe.indexOf(searchText) > -1 ||
          code.indexOf(searchText) > -1 ||
          preco.indexOf(searchText) > -1
        );
      },
      acceptNumber() {
        var x = this.model.phone
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        this.model.phone = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      },

      doSave() {
        let self = this;
        if (self.model && self.model.id && self.model.id > 0) self.save();
        else self.novoCliente();
      },
      novoCliente() {
        let self = this;
        const child_of = self.$store.state.app.user.id;
        self.$api
          .post("clientes?populate=*", {
            data: {
              nome: self.model.nome,
              cpfCnpj: self.model.cpfCnpj,
              email: self.model.email,
              phone: self.model.phone,
              address: self.model.address,
              addressNumber: self.model.addressNumber,
              complement: self.model.complement,
              province: self.model.province,
              cep: self.model.cep,
              externalReference: self.model.externalReference,
              notification: self.model.notification,
              child_of: child_of,
              additionalEmails: self.model.additionalEmails,
              observations: self.model.observations,
              groupName: self.model.groupName,
              admin: self.model.admin,
              plano: self.planoSelecionado,
              nomePlano: self.nomePlano,
              datadenascimento: self.model.datadenascimento,
            },
          })
          .then(() => {
            setTimeout(() => {
              self.dialog = false;
              self.model = {};
              self.planoSelecionado = null;
              self.cep = null;
            }, 1000);
          });
      },
      save() {
        let self = this;
        self.loading = true;
        const child_of = self.$store.state.app.user.id;
        self.$api
          .put(`clientes/${self.model.id}?populate=child_of` + self.plano, {
            data: {
              nome: self.model.nome,
              cpfCnpj: self.model.cpfCnpj,
              email: self.model.email,
              phone: self.model.phone,
              address: self.model.address,
              addressNumber: self.model.addressNumber,
              complement: self.model.complement,
              province: self.model.province,
              cep: self.model.cep,
              externalReference: self.model.externalReference,
              notification: self.model.notification,
              child_of: child_of,
              nomePlano: self.nomePlano,
              plano: self.planoSelecionado,
              datadenascimento: self.model.datadenascimento,
            },
          })
          .then(() => {
            setTimeout(() => {
              self.loading = false;
              self.dialog = false;
              self.close();
            }, 1000);
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
      verificarCpf() {
        this.valido = validar(this.model.cpfCnpj);
        this.pendente = false;
      },
      open(model = null) {
        if (model) {
          this.model = model;
          this.planoSelecionado = model.plano.data.id;
        } else {
          this.model = null;
          this.model = { ...defaultItem };
          this.planoSelecionado = null;
        }

        this.dialog = true;
        this.$emit("opened");
      },
      close() {
        this.dialog = false;
        this.$emit("closed");
      },
    },
    computed: {
      newCliente() {
        return this.model && this.model.id && this.model.id > 0;
      },
      messageType() {
        return {
          color: this.valido ? "green" : "red",
        };
      },
    },
    mounted() {
      this.getPlanos();
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
