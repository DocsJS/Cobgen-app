<template>
  <span class="bg">
    <v-container>
      <v-row>
        <v-col>
          <v-card class="elevation-6 mt-16">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-16">
                      <v-list-item-avatar
                        class="d-block text-center mx-auto mt-1"
                        width="300"
                        height="120"
                      >
                        <v-img
                          src="https://cdn.discordapp.com/attachments/855453874608930816/978688807148847134/cobgen.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="Email"
                            v-model="model.email"
                            outlined
                            dense
                            solo
                            flat
                            color="cyan"
                            autocomplete="false"
                          />
                          <v-text-field
                            outlined
                            flat
                            solo
                            dense
                            v-model="model.senha"
                            color="cyan"
                            background-color="transparent"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            :rules="[rules.requirida, rules.min]"
                            name="input-10-1"
                            label="Senha"
                            hint="Minimo 6 caracteres"
                            counter
                            @click:append="show1 = !show1"
                          />
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox
                                label="Lembrar-me"
                                class="mt-n1"
                                color="cyan"
                              >
                              </v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                              <a class="caption cyan--text" @click="step++"
                                >Esquesceu a senha?</a
                              >
                            </v-col>
                          </v-row>
                          <v-btn color="cyan" dark block tile @click="dologin"
                            >Entrar</v-btn
                          >
                          <h5 class="text-center grey--text mt-4 mb-3">
                            Ou entre usando
                          </h5>
                          <div
                            class="
                              d-flex
                              justify-space-between
                              align-center
                              mx-10
                              mb-16
                            "
                          >
                            <v-btn depressed outlined color="white" flat>
                              <v-icon color="red">fab fa-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="white" flat>
                              <v-icon color="cyan">fab fa-facebook-f</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="white" flat>
                              <v-icon color="blue ">fab fa-twitter</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="cyan rounded-bl-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h2 class="text-center">
                          Não possuí uma conta na CobGen?
                        </h2>
                        <h5 class="text-center">
                          Efetue o seu cadastro agora!<br />
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++"
                          >Cadastre-se</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="6" class="cyan rounded-br-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h2 class="text-center">
                          Já possuí uma conta na CobGen?
                        </h2>
                        <h5 class="text-center">
                          Efetue o seu login agora!<br />
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Entrar</v-btn>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-col>
                      <h3 class="text-center cyan--text">
                        Digite os seus dados
                      </h3>
                    </v-col>
                    <v-card-text>
                      <v-row align="center" justify="center">
                        <v-col cols="12">
                          <v-text-field
                            label="Nome completo"
                            v-model="model.username"
                            outlined
                            flat
                            solo
                            dense
                            color="cyan"
                            autocomplete="false"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Telefone"
                            v-model="model.celular"
                            outlined
                            flat
                            solo
                            dense
                            color="cyan"
                            autocomplete="false"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Email"
                            v-model="model.email"
                            outlined
                            flat
                            solo
                            dense
                            color="cyan"
                            autocomplete="false"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            outlined
                            background-color="transparent"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            :rules="[rules.requirida, rules.min]"
                            v-model="model.senha"
                            color="cyan"
                            flat
                            name="input-10-1"
                            label="Senha"
                            hint="Minimo 6 caracteres"
                            counter
                            solo
                            @click:append="show1 = !show1"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="model.password"
                            dense
                            flat
                            outlined
                            background-color="transparent"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            :rules="[rules.requirida, rules.min]"
                            color="cyan"
                            solo
                            name="input-10-1"
                            label="Confirmar Senha"
                            hint="Minimo 6 caracteres"
                            counter
                            @click:append="show2 = !show2"
                          />
                          <v-btn
                            color="cyan"
                            dark
                            block
                            tile
                            @click="doregister"
                            >Entrar</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    show1: false,
    show2: false,
    model: {
      email: "",
      senha: "",
      password: "",
      username: "",
      cpfcnpj: "",
      datadenascimento: "",
      celular: "",
      site: "",
      fone: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
    },
    rules: {
      requirida: (value) => !!value || "Requirida.",
      min: (v) => v.length >= 6 || "Mínimo 6 characteres",
    },
    step: 1,
  }),
  props: {
    source: String,
  },
  methods: {
    dologin() {
      let self = this;
      const login = {
        identifier: self.model.email,
        password: self.model.senha,
      };
      self.$api.post("auth/local", login).then((resp) => {
        self.$store.commit("app/setUser", resp.data.user);
        localStorage.setItem("jwt", resp.data.jwt);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        self.$api.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`;
        console.log(localStorage);
        if (resp.data.jwt) {
          self.$api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${resp.data.jwt.replace(/['"]+/g, "")}`;
        }
        self.$router.push("/");
      });
    },
    doregister() {
      let self = this;
      const register = {
        email: self.model.email,
        password: self.model.senha,
        passwordconfirmation: self.model.password,
        username: self.model.username,
        celular: self.model.celular,
      };
      self.$api.post("auth/local/register", register).then((data) => {
        self.register = data;
        const login = {
          identifier: register.email,
          password: register.password,
        };
        self.$api.post("auth/local", login).then((resp) => {
          self.$store.commit("app/setUser", resp.data.user);
          localStorage.setItem("jwt", resp.data.jwt);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          self.$api.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`;
          self.$router.push("/");
        });
      });
    },
    esqueciSenha() {
      let self = this;
      self.$api
        .post("auth/forgot-password", {
          email: self.email,
        })
        .then(() => {
          console.log(self.email);
        });
    },
  },
};
</script>
<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://cdn.discordapp.com/attachments/855453874608930816/978664413789835284/cyan.png")
    no-repeat center center;
  background-size: cover;
  transform: scale(1.1);
}
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
