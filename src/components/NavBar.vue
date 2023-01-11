<template>

  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <!-- Brand -->

    <!-- Links -->
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-home" style="color: #fa2224"></i>公司
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <RouterLink class="dropdown-item" to="/employee"
              >职员管理</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/companyst"
              >公司交收</RouterLink
            >
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-user-circle-o" style="color: #fa2224"></i>客户
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <RouterLink class="dropdown-item" to="/cust_mgn"
              >客户管理</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/report">报表</RouterLink>
          </li>
        </ul>
      </li>

      <!-- Dropdown -->
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-university" style="color: #fa2224"></i>账房
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><RouterLink class="dropdown-item" to="/silverhead">银头管理</RouterLink></li>
          <li>
            <RouterLink class="dropdown-item" to="/proposal"
              >提案管理</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/e_invest"
              >电投手管理</RouterLink
            >
          </li>
          <li><RouterLink class="dropdown-item"  to="/workshift">交班</RouterLink></li>
          <li>
            <RouterLink class="dropdown-item" to="/marker"
              >Marker管理</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/circle">围数</RouterLink>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-pencil" style="color: #fa2224"></i>报表
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <RouterLink class="dropdown-item" to="/bankstatement"
              >银头报表</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/perimeter"
              >围数报表</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/shift">交班报表</RouterLink>
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/settlement">结算</RouterLink>
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/sms"
              >短息发送记录</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/exchange"
              >换汇记录</RouterLink
            >
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-file" style="color: #fa2224"></i>系统管理
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <RouterLink class="dropdown-item" to="/exchangerate"
              >汇率查询</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/exchangeadjust"
              >汇率调整</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/agentnetwork"
              >代理网限红</RouterLink
            >
          </li>
          <li>
            <RouterLink class="dropdown-item" to="/permission"
              >角色列表</RouterLink
            >
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-file" style="color: #fa2224"></i>日志
        </a>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <RouterLink class="dropdown-item" to="/log">操作日志</RouterLink>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link">
          <i class="fa fa-fw fa-power-off" style="color: #fa2224" @click="logout()"></i>登出
        </a>
      </li>
    </ul>
    <div class="ms-auto">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fa fa-fw fa-bell fa-2x"></i>当前操作人员 manager</a
          >
        </li>
        <!-- <li class="nav-item">
                <a class="nav-link" href="#">manager</a>
            </li> -->
      </ul>
    </div>
  </nav>
  <div class="w-auto p-1" style="background-color: #fa2224"></div>
</template>

<script>

import { RouterLink, RouterView } from "vue-router";
import axios from "axios";

export default {
  name: "NavBar",
  components: {
    RouterLink,
    RouterView,
  },
 
   
  data() {
  },
  methods: {
   logout(){
      localStorage.clear();
      localStorage.removeItem('token');
      console.warn("storage cleared")
      this.$router.push({name:"login"})
   },
   
  },

  
};
</script>

<style scoped>
.tab-close {
  float: right;
}

.tab-close:hover {
  transform: rotate(7deg);
}
</style>
