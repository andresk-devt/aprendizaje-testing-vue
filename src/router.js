import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from './components/funcionalidad_1/RegisterForm.vue';
import RequestList from './components/funcionalidad_2/RequestList.vue';

const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: '/register',
    children: [
      {
        path: "register",
        name: "RegisterFunctionality",
        component: RegisterForm,
      },
      {
        path: "requests",
        name: "RequestFunctionality",
        component: RequestList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
