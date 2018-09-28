import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tech from '@/pages/Technical'
import Inspec from '@/pages/Inspection'
import Mate from '@/pages/materia'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home,
      redirect: '/Inspec',
      children:[
        {
        	 path: '/Tech',
           name: 'Tech',
           component: Tech,
        },
         {
        	 path: '/Inspec',
           name: 'Inspec',
           component:Inspec,
        },
        {
        	 path: '/Mate',
           name: 'Mate',
           component:Mate,
        }
      ]
    } 
  ]
})
