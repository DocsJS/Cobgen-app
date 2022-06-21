<template>
  <v-app id="inspire">
    <SideBar />
    <v-container>
      <v-app-bar color="rgba(0,0,0,0)" flat>
        <div>
          <h2 class="font-weight-medium" style="font-size: 35px">
            Financiamentos
          </h2>
        </div>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#30c3cf" dark large v-bind="attrs" v-on="on">
              <h5>Enviar proposta</h5>
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
      <v-data-table :search="search" :headers="headers" :items="financiamento">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px"> </v-dialog>
            <v-dialog v-model="dialog" width="800">
              <v-card flat outlined>
                <v-tabs ho rizontal color="cyan">
                  <v-tab>Enviar proposta</v-tab>
                  <v-tab-item>
                    <v-col>
                      <v-col>
                        <h5>Cliente</h5>
                        <v-text-field
                          v-model="model.nome"
                          offset-y
                          label="Selecione o tipo"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                        <h5>Email do Cliente</h5>
                        <v-text-field
                          v-model="model.additionalEmails"
                          offset-y
                          label="Digite o seu email"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                        <h5>Email do Consultor</h5>
                        <v-text-field
                          v-model="model.email"
                          offset-y
                          label="Digite o seu email"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                        <h5>CPF</h5>
                        <v-text-field
                          label="Digite o seu cpf"
                          v-model="model.cpf"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>RG</h5>
                        <v-text-field
                          label="Digite o seu rg"
                          v-model="model.rg"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Data de nascimento</h5>
                        <v-text-field
                          label="Digite a sua data de nascimento"
                          v-model="model.datadenascimento"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Natural de que estado</h5>
                        <v-text-field
                          label="Digite o seu estado"
                          v-model="model.estado"
                          outlined
                          solo
                          flat
                          color="cyan"
                        ></v-text-field>
                        <h5>Natural de que cidade</h5>
                        <v-text-field
                          label="Digite a sua cidade"
                          v-model="model.cidade"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>OE (ÓRGÃO EMISSOR)</h5>
                        <v-text-field
                          label="Digite o órgão emissor"
                          v-model="model.oe"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>UF</h5>
                        <v-text-field
                          label="Digite a unidade federativa"
                          v-model="model.uf"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Data de expedição do RG</h5>
                        <v-text-field
                          label="Digite a data de expedição do seu rg"
                          v-model="model.expedicao"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>

                        <h5>Endereço residencial completo e com CEP</h5>
                        <v-text-field
                          label="Digite o seu endereço completo"
                          v-model="model.endereco"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Quanto tempo de residência</h5>
                        <v-text-field
                          label="Digite o tempo de residência"
                          v-model="model.tempo"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Possuí CNH</h5>
                        <v-select
                          label="Selecione uma opção"
                          v-model="model.cnh"
                          :options="cnh"
                          offset-y
                          :items="cnh"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                        <h5>OCUPAÇÕES</h5>
                        <v-select
                          label="Selecione uma ocupação"
                          v-model="FormularioSelecionado"
                          offset-y
                          :items="ocupacoes"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-select>
                        <div v-if="FormularioSelecionado === 'EMPRESÁRIO'">
                          <h5>Renda mensal do cliente:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Profissão:</h5>
                          <v-text-field
                            label="Digite a profissão"
                            v-model="model.profissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Cargo:</h5>
                          <v-text-field
                            label="Digite o cargo"
                            v-model="model.cargo"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>CNpj da empresa:</h5>
                          <v-text-field
                            label="Digite a empresa"
                            v-model="model.cnpj2"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>
                            Razão social completa (conforme cartão CNPJ
                            atualizado):
                          </h5>
                          <v-text-field
                            label="Digite a razão"
                            v-model="model.razaosocial"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Endereço da empresa completo e com Cep</h5>
                          <v-text-field
                            label="Digite o endereço"
                            v-model="model.cep2"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Telefone fixo da empresa:</h5>
                          <v-text-field
                            label="Digite o telefone fixo"
                            v-model="model.telefone2"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Data de abertura da empresa (dia/mês/ano):</h5>
                          <v-text-field
                            label="Digite a data"
                            v-model="model.data2"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Faturamento mensal da empresa:</h5>
                          <v-text-field
                            label="Digite o faturamento"
                            v-model="model.faturamento"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>
                            Assina separadamente pela empresa, conforme contrato
                            social:
                          </h5>
                          <v-text-field
                            label="Digite a resposta"
                            v-model="model.assinar"
                            outlined
                            hint="CASO NÃO, FAVOR INFORMAR OS DADOS DO OUTRO SÓCIO QUE TAMBÉM ASSINA (só para propostas Pessoa Jurídica)"
                            persistent-hint
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div v-if="FormularioSelecionado === 'APOSENTADO'">
                          <h5>Profissão:</h5>
                          <v-text-field
                            label="Digite a profissão"
                            v-model="model.profissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Cargo:</h5>
                          <v-text-field
                            label="Digite o cargo"
                            v-model="model.cargo"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Renda mensal:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Tempo de aposentadoria:</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.aposentadoria"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Nº do benefício:</h5>
                          <v-text-field
                            label="Digite o número"
                            v-model="model.beneficio"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div v-if="FormularioSelecionado === 'AUTÔNOMO'">
                          <h5>Profissão:</h5>
                          <v-text-field
                            label="Digite a profissão"
                            v-model="model.profissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Cargo:</h5>
                          <v-text-field
                            label="Digite o cargo"
                            v-model="model.cargo"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Renda mensal:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Tempo de início de atividade:</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.atividade"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div v-if="FormularioSelecionado === 'ASSALARIADO'">
                          <h5>Nome da empresa em que trabalha:</h5>
                          <v-text-field
                            label="Digite o nome da empresa"
                            v-model="model.nomeempresa"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Profissão:</h5>
                          <v-text-field
                            label="Digite a profissão"
                            v-model="model.profissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Cargo/Função:</h5>
                          <v-text-field
                            label="Digite o cargo"
                            v-model="model.cargo"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Data de admissão:</h5>
                          <v-text-field
                            label="Digite a data"
                            v-model="model.admissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Renda mensal bruta:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h3>Dados da empresa onde trabalha:</h3>
                          <v-spacer></v-spacer>
                          <h5>Endereço da empresa completo com Cep:</h5>
                          <v-text-field
                            label="Digite o cep"
                            v-model="model.cep2"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Telefone da empresa:</h5>
                          <v-text-field
                            label="Digite o telefone da empresa"
                            v-model="model.telefoneempresa"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Tempo de empresa (em anos e mês):</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.atividade"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Tipo de comprovante de renda:</h5>
                          <v-text-field
                            label="Digite o tipo"
                            v-model="model.comprovante"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div v-if="FormularioSelecionado === 'LIBERAL'">
                          <h5>Profissão:</h5>
                          <v-text-field
                            label="Digite a profissão"
                            v-model="model.profissao"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Cargo:</h5>
                          <v-text-field
                            label="Digite o cargo"
                            v-model="model.cargo"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Renda mensal bruta:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Endereço do local de trabalho:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.endereco"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div v-if="FormularioSelecionado === 'CORRETOR'">
                          <h5>Renda mensal bruta:</h5>
                          <v-text-field
                            label="Digite a renda"
                            v-model="model.renda"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>
                            Tempo de início de atividade (em anos e meses):
                          </h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.atividade"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <div
                          v-if="FormularioSelecionado === 'NÃO POSSUO OCUPAÇÃO'"
                        >
                          <h5>Telefone fixo residêncial:</h5>
                          <v-text-field
                            label="Digite o nome completo"
                            v-model="model.telefonefixo"
                            hint="(caso não possua, favor informar um para recado e registrar no campo de observações que tel é para recado):"
                            persistent-hint
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>Telefone celular:</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.celular"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h3>FILIAÇÃO</h3>
                          <h5>PAI:</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.pai"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                          <h5>MÃE:</h5>
                          <v-text-field
                            label="Digite o tempo"
                            v-model="model.mae"
                            outlined
                            color="cyan"
                            solo
                            flat
                          ></v-text-field>
                        </div>
                        <v-col>
                          <h5>É pessoa exposta politicamente?</h5>
                          <v-switch
                            inset
                            v-model="model.Ativo"
                            color="cyan"
                          ></v-switch>
                        </v-col>
                      </v-col>
                      <v-col>
                        <h3>Dados Bancários:</h3>
                        <h5>Banco:</h5>
                        <v-text-field
                          label="Digite o banco"
                          v-model="model.banco"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Número do banco:</h5>
                        <v-text-field
                          label="Digite o número"
                          v-model="model.numero"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Agência:</h5>
                        <v-text-field
                          label="Digite a agência"
                          v-model="model.agencia"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Conta corrente</h5>
                        <v-text-field
                          label="Digite a conta"
                          v-model="model.conta"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Mês e ano de abertura da conta</h5>
                        <v-text-field
                          label="Digite o mês e o ano"
                          v-model="model.abertura"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h3>Dados da operação e do veículo:</h3>
                        <h5>Parcelar em quantas vezes:</h5>
                        <v-text-field
                          label="Digite o número de parcelas"
                          v-model="model.parcelar"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>

                        <h5>
                          Vai contratar a proposta, com ou sem seguro
                          prestamista?
                        </h5>
                        <v-text-field
                          label="Digite a agência"
                          v-model="model.seguro"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>
                          Cliente possui seguro de automóvel? Na porto ou em
                          outra seguradora?
                        </h5>
                        <v-text-field
                          label="Digite a conta"
                          v-model="model.outraseguradora"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Valor de compra do veículo:</h5>
                        <v-text-field
                          label="Digite o valor de compra do veículo"
                          v-model="model.valordecompra"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Valor de entrada:</h5>
                        <v-text-field
                          label="Digite o valor de entrada"
                          v-model="model.valorentrada"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h4>Veículo</h4>
                        <h5>Marca:</h5>
                        <v-text-field
                          label="Digite a marca do veículo"
                          v-model="model.marca"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Ano fabricação/ano modelo:</h5>
                        <v-text-field
                          label="Digite o ano"
                          v-model="model.fabricacao"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>

                        <h5>Versão completa do veículo:</h5>
                        <v-text-field
                          label="Digite a versão"
                          v-model="model.versao"
                          hint="(informar a potência do motor, se: 1.0, 1.8, etc)"
                          persistent-hint
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Cor do veículo:</h5>
                        <v-text-field
                          label="Digite a cor"
                          v-model="model.cor"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Chassi:</h5>
                        <v-text-field
                          label="Digite o chassi"
                          v-model="model.chassi"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Placa:</h5>
                        <v-text-field
                          label="Digite a placa"
                          v-model="model.placa"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>
                        <h5>Renavam:</h5>
                        <v-text-field
                          label="Digite o renavam"
                          v-model="model.renavam"
                          outlined
                          color="cyan"
                          solo
                          flat
                        ></v-text-field>

                        <form ref="form">
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
                                multiple
                                label="Enviar os documentos referente ao veiculo e pessoa"
                              >
                              </v-file-input>
                            </v-col>
                            <v-col>
                              <v-chip class="ma-2" color="cyan" dark>
                                {{ arquivo }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </form>
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
    select: { state: "Florida" },
    ocupacoes: [
      "EMPRESÁRIO",
      "APOSENTADO",
      "AUTÔNOMO",
      "ASSALARIADO",
      "LIBERAL",
      "CORRETOR",
      "NÃO POSSUO OCUPAÇÃO",
    ],
    FormularioSelecionado: null,
    name: "Vue.js",
    loading: false,
    dialog: false,
    dialogDelete: false,
    adminType: ["true", "false"],
    estadocivil: ["Solteiro", "Namorando", "Casado"],
    portao: ["Sim", "Não"],
    financiado: ["Sim", "Não"],
    cnh: ["Sim", "Não"],

    trabalho: ["Sim", "Não"],
    trabalho2: ["Sim", "Não"],
    faculdade: ["Sim", "Não"],
    estacionamento: ["Sim", "Não"],
    condutor: ["Sim", "Não"],
    alarme: ["Sim", "Não"],
    notifications: ["true", "false"],

    headers: [
      {
        text: "Nome",
        align: "center",
        sortable: true,
        value: "nome",
      },
      // {
      //   text: "Tipo",
      //   align: "center",
      //   value: "tipodeseguro",
      // },
      {
        text: "CPF",
        align: "center",
        value: "cpf",
      },
      {
        text: "RG",
        align: "center",
        value: "rg",
      },
      {
        text: "Data de nascimento",
        align: "center",
        value: "datadenascimento",
      },

      { text: "Ações", value: "actions", sortable: false },
    ],
    cliente: [
      {
        nome: "",
      },
    ],
    clienteSelecionado: null,
    financiamentoSelecionado: null,
    financiamento: [],
    arquivo: [],
    documentos: [
      {
        name: "",
      },
    ],
    model: {
      email: "",
      conta: "",
      renavam: "",
      valorentrada: "",
      abertura: "",
      placa: "",
      chassi: "",
      additionalEmails: "",
      valordecompra: "",
      marca: "",
      versao: "",
      cor: "",
      fabricacao: "",
      parcelar: "",
      outraseguradora: "",
      seguro: "",
      banco: "",
      agencia: "",
      numero: "",
      expedicao: "",
      Ativo: "",
      endereco: "",
      oe: "",
      uf: "",
      nome: "",
      cpf: "",
      rg: "",
      datadenascimento: "",
      estado: "",
      cidade: "",
      renda: "",
      profissao: "",
      cargo: "",
      cnpj2: "",
      razaosocial: "",
      cep2: "",
      telefone2: "",
      data2: "",
      faturamento: "",
      assinar: "",
      aposentadoria: "",
      beneficio: "",
      atividade: "",
      nomeempresa: "",
      admissao: "",
      telefoneempresa: "",
      comprovante: "",
      telefonefixo: "",
      celular: "",
      pai: "",
      mae: "",
    },

    defaultItem: {
      email: "",
      conta: "",
      renavam: "",
      valorentrada: "",
      abertura: "",
      placa: "",
      chassi: "",
      additionalEmails: "",
      valordecompra: "",
      marca: "",
      versao: "",
      cor: "",
      fabricacao: "",
      parcelar: "",
      outraseguradora: "",
      seguro: "",
      banco: "",
      agencia: "",
      numero: "",
      expedicao: "",
      Ativo: "",
      endereco: "",
      oe: "",
      uf: "",
      nome: "",
      cpf: "",
      rg: "",
      datadenascimento: "",
      estado: "",
      cidade: "",
      renda: "",
      profissao: "",
      cargo: "",
      cnpj2: "",
      razaosocial: "",
      cep2: "",
      telefone2: "",
      data2: "",
      faturamento: "",
      assinar: "",
      aposentadoria: "",
      beneficio: "",
      atividade: "",
      nomeempresa: "",
      admissao: "",
      telefoneempresa: "",
      comprovante: "",
      telefonefixo: "",
      celular: "",
      pai: "",
      mae: "",
    },
  }),
  computed: {
    newFinanciamento() {
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
    getFinanciamento() {
      let self = this;
      self.$api
        .get("financiamentos?populate=documentos")
        .then(({ data }) => {
          self.financiamento = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          // console.table(self.financiamento[0].id);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    getDocumento(item) {
      let self = this;
      self.model = Object.assign({}, item);
      self.$api
        .get("financiamentos/" + self.model.id + "?populate=documentos")
        .then((res) => {
          self.finanID = res.data.data;
          self.arquivo =
            self.finanID.attributes.documentos.data[0].attributes.name;
          console.log(self.arquivo);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    chooseFiles: function () {
      document.getElementById("file");
    },

    handleFileUpload() {
      let self = this;
      let form = self.$refs.form;
      self.$api.post("upload", new FormData(form)).then((res) => {
        self.documentos = res.data[0];
        // console.log(self.documentos);
      });
    },
    doSave() {
      let self = this;
      if (self.model && self.model.id && self.model.id > 0) self.save();
      else self.novoFinanciamento();
    },
    novoFinanciamento() {
      let self = this;
      self.model["cliente"] = self.clienteSelecionado;
      self.model["financiamento"] = self.financiamentoSelecionado;

      self.$api
        .post("financiamentos/email", {
          data: {
            email: self.model.email,
            additionalEmails: self.model.additionalEmails,
            conta: self.model.conta,
            renavam: self.model.renavam,
            valorentrada: self.model.valorentrada,
            abertura: self.model.abertura,
            placa: self.model.placa,
            chassi: self.model.chassi,
            documentos: self.documentos.id,
            valordecompra: self.model.valordecompra,
            marca: self.model.marca,
            versao: self.model.versao,
            cor: self.model.cor,
            fabricacao: self.model.fabricacao,
            parcelar: self.model.parcelar,
            outraseguradora: self.model.utraseguradora,
            seguro: self.model.seguro,
            banco: self.model.banco,
            agencia: self.model.agencia,
            numero: self.model.numero,
            expedicao: self.model.expedicao,
            Ativo: self.model.Ativo,
            endereco: self.model.endereco,
            oe: self.model.oe,
            uf: self.model.uf,
            nome: self.model.nome,
            cpf: self.model.cpf,
            rg: self.model.rg,
            datadenascimento: self.model.datadenascimento,
            estado: self.model.estado,
            cidade: self.model.cidade,
            renda: self.model.renda,
            profissao: self.model.profissao,
            cargo: self.model.cargo,
            cnpj2: self.model.cnpj2,
            razaosocial: self.model.razaosocial,
            cep2: self.model.cep2,
            telefone2: self.model.telefone2,
            data2: self.model.data2,
            faturamento: self.model.faturamento,
            assinar: self.model.assinar,
            aposentadoria: self.model.aposentadoria,
            beneficio: self.model.beneficio,
            atividade: self.model.atividade,
            nomeempresa: self.model.nomeempresa,
            admissao: self.model.admissao,
            telefoneempresa: self.model.telefoneempresa,
            comprovante: self.model.comprovante,
            telefonefixo: self.model.telefonefixo,
            celular: self.model.celular,
            pai: self.model.pai,
            mae: self.model.mae,
          },
        })
        .then(() => {
          // self.$api.post("email", {
          //   data: { email: self.email },
          //   res,
          // });
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getFinanciamento();
          }, 1000);
        });
    },
    save() {
      let self = this;
      self.model["financiamento"] = self.financiamentoSelecionado;
      self.model["cliente"] = self.clienteSelecionado;

      self.$api
        .put("financiamentos/" + self.finanID.id, {
          data: {
            email: self.model.email,
            additionalEmails: self.model.additionalEmails,
            conta: self.model.conta,
            renavam: self.model.renavam,
            valorentrada: self.model.valorentrada,
            abertura: self.model.abertura,
            placa: self.model.placa,
            chassi: self.model.chassi,
            documentos: self.documentos.id,
            valordecompra: self.model.valordecompra,
            marca: self.model.marca,
            versao: self.model.versao,
            cor: self.model.cor,
            fabricacao: self.model.fabricacao,
            parcelar: self.model.parcelar,
            outraseguradora: self.model.utraseguradora,
            seguro: self.model.seguro,
            banco: self.model.banco,
            agencia: self.model.agencia,
            numero: self.model.numero,
            expedicao: self.model.expedicao,
            Ativo: self.model.Ativo,
            endereco: self.model.endereco,
            oe: self.model.oe,
            uf: self.model.uf,
            nome: self.model.nome,
            cpf: self.model.cpf,
            rg: self.model.rg,
            datadenascimento: self.model.datadenascimento,
            estado: self.model.estado,
            cidade: self.model.cidade,
            renda: self.model.renda,
            profissao: self.model.profissao,
            cargo: self.model.cargo,
            cnpj2: self.model.cnpj2,
            razaosocial: self.model.razaosocial,
            cep2: self.model.cep2,
            telefone2: self.model.telefone2,
            data2: self.model.data2,
            faturamento: self.model.faturamento,
            assinar: self.model.assinar,
            aposentadoria: self.model.aposentadoria,
            beneficio: self.model.beneficio,
            atividade: self.model.atividade,
            nomeempresa: self.model.nomeempresa,
            admissao: self.model.admissao,
            telefoneempresa: self.model.telefoneempresa,
            comprovante: self.model.comprovante,
            telefonefixo: self.model.telefonefixo,
            celular: self.model.celular,
            pai: self.model.pai,
            mae: self.model.mae,
          },
        })
        .then(() => {
          if (self.editedIndex > -1)
            Object.assign(self.financiamento[self.editedIndex], self.model.id);
          else self.financiamento.push(self.model);
          self.loading = true;
          setTimeout(() => {
            self.loading = false;
            self.dialog = false;
            self.getFinanciamento();
          }, 1000);
        });
    },
    editItem(item) {
      let self = this;
      self.getDocumento(item);
      self.editedIndex = self.financiamento.indexOf((i) => i.id === item.id);
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
      self.$api.delete("financiamentos/" + self.model.id).then(() => {
        self.dialogDelete = false;
        self.model = Object.assign({}, self.defaultItem);
        self.getFinanciamento();
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
    getPlanos() {
      let self = this;
      self.$api
        .get("planos")
        .then(({ data }) => {
          self.planos = data.data.map((item) => {
            return { id: item.id, ...item.attributes };
          });
          // console.log(self.planos);
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
          // console.log(self.subscriptions);
        })
        .catch((erro) => {
          console.log(erro);
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
          // console.log(self.cliente);
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
          // console.log(self.cobrancas);
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
  },
  mounted() {
    let self = this;
    self.getFinanciamento();
    self.getCliente();
    self.getPlanos();
    self.getAssinaturas();
    self.getCobrancas();
  },
  components: {
    SideBar,
  },
};
</script>
 