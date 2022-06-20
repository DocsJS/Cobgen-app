import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
    

  },
  {
    path: '/planos', name: 'Planos', component: ()=>import('@/views/Produtos.vue')
  },
   {
    path: '/relatorios', name: 'Relatórios', component: ()=>import('@/views/Relatorios.vue')
  },
    {
    path: '/links', name: 'Links', component: ()=>import('@/views/Links.vue')
  },
    {
    path: '/seguros', name: 'Seguros', component: ()=>import('@/views/Seguros.vue')
  },
        {
    path: '/cobrancas', name: 'Cobrancas', component: ()=>import('@/views/Cobrancas.vue')
  },
          {
    path: '/conta', name: 'Conta', component: ()=>import('@/views/Conta.vue')
  },
                  {
    path: '/clientes', name: 'Clientes', component: ()=>import('@/views/Clientes.vue')
  },
                   {
    path: '/extrato', name: 'Extrato', component: ()=>import('@/views/Extrato.vue')
  },
                     {
    path: '/financiamentos', name: 'Financiamento', component: ()=>import('@/views/Financiamento.vue')
  },
               {
    path: '/login', name: 'Login', component: ()=>import('@/views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
