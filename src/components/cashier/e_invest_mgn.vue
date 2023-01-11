<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">电投手管理</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>
      <div class="col-auto">
        <select class="form-select w-65" aria-label="Default" v-model="room_id">
          <option
            v-for="option in roomList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">电投手账号</label>
      </div>

      <div class="col-auto">
        <input
          type="text"
          class="form-control"
          id="inputAccount"
          v-model="account"
        />
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">状态</label>
      </div>
      <div class="col-2">
        <select
          class="form-select"
          aria-label="Default"
          v-model="enableSeleted"
        >
          <option
            v-for="option in enableOptions"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary me-1"
          @click="AddNewOpenCloseFun()"
        >
          新增
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="callElectricList()"
        >
          查询
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="electricPitchList">
      <template #item-room_id="{ room_id }">
        <span v-if="room_id == 1">suolaier</span>
        <span v-else-if="room_id == 2">suolaier线上</span>
      </template>
      <template #item-enable="{ enable }">
        <span v-if="enable == 1">启用</span>
        <span v-else-if="enable == 2">禁用</span>
      </template>
      <template #item-operation="item" >
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="EditOpenCloseFun(item)"
          >
            修改
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="BanOpenCloseFun(item)"
            
          >
            禁用/启用
          </button>
         
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="fastOpenCloseFun()"
          >
            快速开工
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
            新增电投手
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group col-md-auto">
                <label class="control-label text-danger" for="inputAccount"
                  >所属贵宾厅</label
                >
                <div class="col-auto">
                  <select
                    class="form-select w-65"
                    aria-label="Default"
                    v-model="electric.room_id"
                  >
                    <option
                      v-for="option in roomList"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-row row">
              <div class="form-group required col-md-auto">
                <label class="control-label" for="inputAccount">账号</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="账号"
                  v-model="electric.aaccount"
                />
              </div>
            </div>

            <div class="form-row row">
              <div class="form-group required col-md-auto">
                <label class="control-label" for="inputAccount">密码</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputAccount"
                  placeholder="密码"
                  v-model="electric.password"
                />
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
                  <label for="account" class="col-form-label text-danger">所属贵宾厅</label>
                </div>
                <div class="col-auto">
                  <select class="form-select w-65" aria-label="Default" v-model="ProxyData.room_id">
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
                  <p class="col-auto">{{ProxyData.account}}</p>
                </div>

                <div class="row m-auto p-auto"> 
                  <p class="col-auto ms-1">密码</p>
                  <input class="col-auto" type="password" v-model="edit.password"/>
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

  <div
  v-if="BanOpenClose"
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
        启用/禁用电投手
        </h1>
      </div>
      <div class="modal-body">
        <form class="p-4">
          <div class="form-row row">
            <div class="form-group col-md-auto">
              <span class="control-label" for="inputAccount"
                >确定启用或禁用电投手 {{ProxyData.account}}</span
              >
            </div>
          </div>
        </form>
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary d-flex text-center justify-content-center"
          type="button"
          @click="unable()"
        >
          确定
        </button>
        <button
          class="btn btn-danger d-flex text-center justify-content-center"
          type="button"
          @click="BanOpenCloseFun()"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</div>

  <!-- <div
  v-if="EnableOpenClose"
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
          启用/禁用电投手
        </h1>
      </div>
      <div class="modal-body">
        <form class="p-4">
          <div class="form-row row">
            <div class="form-group col-md-auto">
              <span class="control-label" for="inputAccount"
                >确定启用或禁用电投手 {{ProxyData.account}}</span
              >
            </div>
          </div>
        </form>
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary d-flex text-center justify-content-center"
          type="button"
          @click="unable()"
        >
          确定
        </button>
        <button
          class="btn btn-danger d-flex text-center justify-content-center"
          type="button"
          @click="EnableOpenCloseFun()"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</div> -->

  <div
    v-if="fastOpenClose"
    class="modal fade show w-150"
    tabindex="-1"
    style="display: block"
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
            快速电投开工
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >游戏系统账号</label
                >
                <div class="col-6">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>gamemaster</option>
                    <option value="1">英语</option>
                    <option value="2">韩语</option>
                  </select>
                </div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >开工贵宾厅</label
                >
                <div class="col-4">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>SOLAIRE</option>
                    <option value="1">英语</option>
                    <option value="2">韩语</option>
                  </select>
                </div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >货币类型</label
                >
                <div class="col-3">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>菲币</option>
                    <option value="1">英语</option>
                    <option value="2">韩语</option>
                  </select>
                </div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >开工条件</label
                >

                <div class="form-check col-2 mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    占成
                  </label>
                </div>

                <div class="col-2">
                  <input
                    type="email"
                    class="form-control"
                    id="inputFName"
                    placeholder=""
                  />
                </div>

                <div class="col-2 mt-1">% (Max 100%)</div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"></label>

                <div class="form-check col-2 mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    码佣
                  </label>
                </div>

                <div class="col-2">
                  <input
                    type="email"
                    class="form-control"
                    id="inputFName"
                    placeholder=""
                  />
                </div>

                <div class="col-2 mt-1">% (Max 1%)</div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >泥码数量</label
                >
                <div class="col-3">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>泥码</option>
                    <option value="1">英语</option>
                    <option value="2">韩语</option>
                  </select>
                </div>
                <div class="col-2">
                  <input type="email" class="form-control" id="inputFName" />
                </div>
                <div class="col-2 mt-1">万</div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >现金码数量</label
                >
                <div class="col-3">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>现金码</option>
                    <option value="1">英语</option>
                    <option value="2">韩语</option>
                  </select>
                </div>
                <div class="col-2">
                  <input type="email" class="form-control" id="inputFName" />
                </div>
                <div class="col-2 mt-1">万</div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >现金码数量</label
                >
                <div class="col-3">0 万</div>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >备注</label
                >
                <div class="col-5">
                  <textarea class="form-control" rows="4"></textarea>
                </div>
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="fastOpenCloseFun()"
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
} from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "AddEmployee",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  props: {
    visible: Boolean,
  },

  data() {
    return {
      AddNewOpenClose: this.visible,
      BanOpenClose: this.visible,
      EditOpenClose: this.visible,
      // EnableOpenClose: this.visible,
      fastOpenClose: this.visible,
      electricPitchList: [],

      room_id: 0,
      account: "",
      enableSeleted: 1,


      roomList: [],

      enableOptions: [
        { id: 1, text: "启用" },
        { id: 2, text: "禁用" },
      ],

      electric: {
        room_id: 0,
        aaccount: "",
        password: "",
      },

      edit:{
        password:""
      },

      headers: [
        { text: "编号", value: "id", sortable: true },
        { text: "账号", value: "account", sortable: true },
        { text: "所层贵宾厅", value: "room_id", sortable: true },
        { text: "状态", value: "enable", sortable: true },
        { text: "", value: "operation" },
      ],

      ProxyData: {},
   
    };
  },

  async mounted() {
    this.callElectricList();
    this.callCurRoomList();
  },

  methods: {
    AddNewOpenCloseFun() {
      this.AddNewOpenClose = !this.AddNewOpenClose;
      this.electric.aaccount = "", 
      this.electric.password = "";
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
    // EnableOpenCloseFun(data) {
    //   this.EnableOpenClose = !this.EnableOpenClose;
    //   this.ProxyData = data;
    //   console.log(data);
    // },


    fastOpenCloseFun() {
      this.fastOpenClose = !this.fastOpenClose;
    },
    async callElectricList() {
      getElectricList(this.room_id, this.account, this.enableSeleted).then(
        (res) => {
          console.log(res);
          const result = res.data.data[0].data;
          console.warn(res.data.data[0].data);
          this.electricPitchList = result;
        }
      );
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
           if(res.data.code==1000){
             createToast(res.data.message);
             console.log(res);
             this.EditOpenClose =!this.EditOpenClose;
           }
         })
    },

    async unable() {
      if (this.ProxyData.enable == 1) {
        this.ProxyData.enable = 2;
      } else if(this.ProxyData.enable == 2){
        this.ProxyData.enable = 1;
      }
      unableElectric(this.ProxyData.id,this.ProxyData.enable).then((res) => {
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
.form-group.required .control-label:after {
  content: "*";
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
