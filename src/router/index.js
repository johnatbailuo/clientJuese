import { createRouter, createWebHistory } from "vue-router";
import employeemgn from "../components/company/employee_mgn.vue";
import company_settle from "../components/company/company_settle.vue";
import customer_mgn from "../components/customer/customer_mgn.vue";
import report from "../components/customer/report.vue";
import marker from "../components/cashier/marker_mgn.vue";
import e_invest from "../components/cashier/e_invest_mgn.vue";
import proposal from "../components/cashier/proposal_mgn.vue";
import circle from "../components/cashier/circle.vue";
import sms from "../components/report/smsrecord.vue";
import exchange from "../components/report/exchangerecord.vue";
import shift from "../components/report/shiftreport.vue";
import settlement from "../components/report/settlement.vue";
import perimeter from "../components/report/perimeter.vue";
import bankstatement from "../components/report/bankstatement.vue";
import agentnetwork from "../components/system/agentnetwork.vue";
import exchangerate from "../components/system/exchangerate.vue";
import exchangeadjust from "../components/system/exchangeadjust.vue";
import log from "../components/log/log.vue";
import workshift from "../components/cashier/shift.vue";
import silverhead from "../components/cashier/silverhead.vue";
import Login from "../components/auth/login.vue";
import permission from '../components/system/permission.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      component: Login,
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: "/employee",
      name: "employee",
      component: employeemgn,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/companyst",
      name: "companyst",
      component: company_settle,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/cust_mgn",
      name: "cust_mgn",
      component: customer_mgn,
      meta: {
        requireAuth: true,
      },
      
    },
    {
      path: "/report",
      name: "report",
      component: report,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/marker",
      name: "marker",
      component: marker,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/workshift",
      name: "workshift",
      component: workshift,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/silverhead",
      name: "silverhead",
      component: silverhead,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/e_invest",
      name: "e_invest_mgn",
      component: e_invest,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/proposal",
      name: "proposal_mgn",
      component: proposal,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/circle",
      name: "circle",
      component: circle,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/sms",
      name: "sms",
      component: sms,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/exchange",
      name: "exchange",
      component: exchange,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/shift",
      name: "shift",
      component: shift,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/settlement",
      name: "settlement",
      component: settlement,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/perimeter",
      name: "perimeter",
      component: perimeter,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/bankstatement",
      name: "bankstatement",
      component: bankstatement,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/agentnetwork",
      name: "agentnetwork",
      component: agentnetwork,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/exchangerate",
      name: "exchangerate",
      component: exchangerate,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/exchangeadjust",
      name: "exchangeadjust",
      component: exchangeadjust,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/permission",
      name: "permission",
      component: permission,
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/log",
      name: "log",
      component: log,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    let token = localStorage.getItem('token');
    if(!token){
      next({name: 'login'})
    } 
    else {
      next()
    }
  } else {
    next()
  }
});

export default router;
