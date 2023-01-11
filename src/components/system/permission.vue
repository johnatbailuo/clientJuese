<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">角色列表</div>
    <div class="row m-3">
      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary me-1"
          @click="AddNewOpenCloseFun()"
        >
          添加角色
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="permissionList">
      <template #item-room_id="{ room_id }">
        <span v-if="room_id == 1">suolaier</span>
        <span v-else-if="room_id == 2">suolaier线上</span>
      </template>
      <template #item-enable="{ enable }">
        <span v-if="enable == 1">启用</span>
        <span v-else-if="enable == 2">禁用</span>
      </template>
      <template #item-operation="item">
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="EditOpenCloseFun(item)"
          >
            修改
          </button>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <div
    v-if="AddNewOpenClose"
    class="modal fade show w-auto"
    tabindex="-1"
    style="display: block; left: 35%; top: 3%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            添加角色
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group required col-md-auto">
                <label class="control-label" for="inputAccount"
                  >角色名称
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="角色名称"
                  v-model="ruleName"
                />
              </div>

              <div>
                <Tree v-model:nodes="perItemList" useCheckbox="true"  @nodeClick="onNodeClick"/>
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="addElectric()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="AddNewOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="EditOpenClose"
    class="modal fade show w-auto"
    tabindex="-1"
    style="display: block; left: 35%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            修改电投手
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group col-md-auto">
                <div class="col-auto">
                  <label for="account" class="col-form-label text-danger"
                    >所属贵宾厅</label
                  >
                </div>
                <div class="col-auto">
                  <select
                    class="form-select w-65"
                    aria-label="Default"
                    v-model="ProxyData.room_id"
                  >
                    <option
                      v-for="option in roomList"
                      :value="option.id"
                      :key="option.id"
                      disabled
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div>

                <div class="mt-3">
                  <div class="row m-auto p-auto">
                    <p class="col-auto">账号</p>
                    <p class="col-auto">{{ ProxyData.account }}</p>
                  </div>

                  <div class="row m-auto p-auto">
                    <p class="col-auto ms-1">密码</p>
                    <input
                      class="col-auto"
                      type="password"
                      v-model="edit.password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="editElectric()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="EditOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

 
 
</template>

<script>
import {
  addElectric,
  getElectricList,
  unableElectric,
  getCurRoomList,
  updateElectric,
  getPermissionList,
  getPerItemList
} from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import Tree from 'vue3-tree';


export default {
  name: "AddEmployee",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
    Tree
  },
  props: {
    visible: Boolean,
  },

  data() {
    return {
      AddNewOpenClose: this.visible,
      BanOpenClose: this.visible,
      EditOpenClose: this.visible,
      fastOpenClose: this.visible,
      electricPitchList: [],

      room_id: 0,
      account: "",
      enableSeleted: 1,

      roomList: [],
      permissionList: [],

      perItemList:[],

      

    
      

      electric: {
        room_id: 0,
        aaccount: "",
        password: "",
      },

      edit: {
        password: "",
      },

      headers: [
        { text: "ID", value: "id", sortable: true },
        { text: "名称", value: "name", sortable: true },
        { text: "状态", value: "status", sortable: true },
        { text: "创建时间", value: "create_time", sortable: true },
        { text: "更新时间", value: "update_time", sortable: true },
        { text: "操作", value: "operation" },
      ],

      ProxyData: {},
    };
  },
  async mounted() {
    this.callPermissionList();
    this.callCurRoomList();
    this.callPeritemList();
  },

  methods: {
    onNodeClick(node) {
      console.log(node)
    },
    AddNewOpenCloseFun() {
      this.AddNewOpenClose = !this.AddNewOpenClose;
      (this.electric.aaccount = ""), (this.electric.password = "");
    },
    BanOpenCloseFun(data) {
      this.BanOpenClose = !this.BanOpenClose;
      this.ProxyData = data;
      console.log(data);
    },

    EditOpenCloseFun(data) {
      this.EditOpenClose = !this.EditOpenClose;
      this.ProxyData = data;
      console.log(data);
    },
   
    fastOpenCloseFun() {
      this.fastOpenClose = !this.fastOpenClose;
    },

    async callPermissionList() {
      getPermissionList().then((res) => {
        console.log(res);
        const result = res.data.data;
        console.warn(result);
        this.permissionList = result;
      });
    },

    
    async callPeritemList() {
      getPerItemList().then((res) => {
        console.log(res);
        const result = res.data.data;
        console.log('result',result);
        this.perItemList = result;
        this.setData(result)
      });
    },
    setData(data) {
      if(data.length > 0 ){
        for(let i in data) {
          data[i].label = data[i].name
          data[i].nodes = data[i].children
          if(data[i].children.length > 0) {
             this.setData(data[i].children)
          }
        }
      }
    },

    callCurRoomList() {
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        this.roomList.push({ id: 0, name: "全部" });
      });
    },

    async addElectric() {
      addElectric(
        this.electric.room_id,
        this.electric.aaccount,
        this.electric.password
      ).then((res) => {
        if (res.data.code == 1000) {
          createToast(res.data.message);
          console.log(res);
          this.AddNewOpenClose = !this.AddNewOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async editElectric() {
      updateElectric(
        this.ProxyData.room_id,
        this.ProxyData.account,
        this.edit.password,
        this.ProxyData.id
      ).then((res) => {
        if (res.data.code == 1000) {
          createToast(res.data.message);
          console.log(res);
          this.EditOpenClose = !this.EditOpenClose;
        }
      });
    },

    async unable() {
      if (this.ProxyData.enable == 1) {
        this.ProxyData.enable = 2;
      } else if (this.ProxyData.enable == 2) {
        this.ProxyData.enable = 1;
      }
      unableElectric(this.ProxyData.id, this.ProxyData.enable).then((res) => {
        console.log(res);
        this.BanOpenClose = !this.BanOpenClose;
        this.callElectricList();
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.11/lib/theme-chalk/index.css");

.form-group.required .control-label:after {
  content: "*";
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>

