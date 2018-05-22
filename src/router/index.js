import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/Home')
const Create = () => import('@/pages/Create')
const Preview = () => import('@/pages/Preview')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Create',
          component: Create
        },
        {
          path: 'preview',
          name: 'Preview',
          component: Preview
        }
      ]
    }
  ]
})
