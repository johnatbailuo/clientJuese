<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">银头管理</div>

    <div class="row">
      <div class="col-2">
        <div class="row m-3">
          <div class="col-auto">
            <label for="account" class="col-form-label">贵宾厅</label>
          </div>
          <div class="col-auto">
            <select class="form-select w-65" @change="onchange()" aria-label="Default"  v-model="vipSelected"
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

        <div class="row m-3">
          <div class="col-auto">
            <label for="account" class="col-form-label">币别</label>
          </div>
          <div class="col-auto">
            <select class="form-select w-65" @change="onchange()"  aria-label="Default" v-model="currency_id"
            >
            <option
            v-for="option in currencyList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.currency_name }}
          </option>
            </select>
          </div>
        </div>
      </div>


      <div class="col-5">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">现金</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.cash}}</p>
          </div>
          <div class="col-auto">
            <button
              class="m-1 btn btn-outline-secondary"
              @click="addmOpenCloseFun()"
            >
              现金增加
            </button>
            <button
              class="m-1 btn btn-outline-secondary"
              @click="reducOpenCloseFun()"
            >
              现金抽离
            </button>
            <button
              class="m-1 btn btn-outline-secondary"
              @click="bigMBuyOpenCloseFun()"
            >
              大场买码
            </button>
            <button class="m-1 btn btn-outline-secondary" @click="bigMBuyOpenCloseFun()">大场还码</button>
            <button class="m-1 btn btn-outline-secondary" @click="tranOpenCloseFun()">转码</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">存款</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.deposit}}</p>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-secondary">清仓</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">Marker</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.marker}}</p>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-secondary">清仓</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">码粮</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.commission}}</p>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-secondary">清仓</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">占成</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.gambling}}</p>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-secondary">清仓</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-1">
            <label for="account" class="col-form-label">换汇</label>
          </div>
          <div class="col-2 m-1">
            <p class="">{{silverHead.exchange}}</p>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-secondary">清仓</button>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <label for="account" class="col-form-label">泥码总数</label>
          </div>
          <div class="col-2 m-1">
            <p class=""> {{ silverHead.dead_chips}}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <label for="account" class="col-form-label">现金码总数</label>
          </div>
          <div class="col-2 m-1">
            <p class=""> {{ silverHead.regular_chips}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- <div class="col-1 text-center my-auto">现金码总数</div> -->
      <div class="col-4">
        <!-- <EasyDataTable :headers="headers" :items="items">
          <template #item-operation>
            <div class="operation-wrapper">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="fixOpenCloseFun()"
              >
                编辑
              </button>
            </div>
          </template>
        </EasyDataTable> -->
        <!-- <EasyDataTable class="mt-2" :headers="headers" :items="items">
          <template #item-operation>
            <div class="operation-wrapper">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="fixOpenCloseFun()"
              >
                编辑
              </button>
            </div>
          </template>
        </EasyDataTable> -->
      </div>
    </div>
  </div>

  <div
    v-if="fixOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-l">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            修改泥码筹码种类名称
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">名称</label>
              </div>
              <div class="col-5">
                <input type="email" class="form-control" id="inputAccount" />
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="fixOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="addmOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-l">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            曾资
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-3 mb-2">
                <label for="account" class="col-form-label text-danger"
                  >货币类型</label
                >
                <div v-for="currency in currencyList" :key="currency.id"> 
                  <p  v-if="currency.id == this.currency_id" > {{currency.currency_name}}</p>
                </div>
              </div>
              <div class="col-9"></div>
              <div class="col-2">
                <label for="account" class="col-form-label text-danger"
                  >金额</label
                >
              </div>
              <div class="col-5">
                <input type="number" class="form-control" id="inputAccount" v-model="add.cash" />
              </div>
              <div class="col-1"><p>万</p></div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="addCash()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="addmOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="reducOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-l">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            减资
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label text-danger"
                  >金额</label
                >
              </div>
              <div class="col-5">
                <input type="number" class="form-control" id="inputAccount" v-model="reduce.cash" />
              </div>
              <div class="col-1"><p>万</p></div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="reduceCash()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="reducOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="bigMBuyOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-l">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            大场买码
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-3">
                <label for="account" class="col-form-label">货币类型</label>
              </div>
              <div class="col-4 m-1">
                <p>菲币</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-3">
                <label for="account" class="col-form-label">泥码数量</label>
              </div>
              <div class="col-5">
                <input type="email" class="form-control" id="inputAccount" />
              </div>
              <div class="col-1"><p>万</p></div>
            </div>

            <div class="form-row row mt-1">
              <div class="col-3"></div>
              <div class="col-3">
                <select class="form-select" aria-label="Default">
                  <option selected>全部</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-5">
                <button
                  class="btn btn-outline-dark"
                  type="button"
                  @click="myselfOpenCloseFun()"
                >
                  自定义筹码类型
                </button>
              </div>
            </div>

            <div class="form-row row mt-1">
              <div class="col-3">
                <label for="account" class="col-form-label">泥码数量</label>
              </div>
              <div class="col-5">
                <input type="email" class="form-control" id="inputAccount" />
              </div>
              <div class="col-1"><p>万</p></div>
            </div>

            <div class="form-row row mt-1">
              <div class="col-3"></div>
              <div class="col-3">
                <select class="form-select" aria-label="Default">
                  <option selected>全部</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-5">
                <button class="btn btn-outline-dark">自定义筹码类型</button>
              </div>
            </div>

            <div class="form-row row mt-1">
              <div class="col-3">
                <label for="account" class="col-form-label">泥码数量</label>
              </div>
              <div class="col-1 m-1"><p>万</p></div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="bigMBuyOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
  v-if="tranOpenClose"
  class="modal fade show"
  tabindex="-1"
  style="display: block; left: 3%; top: 20%"
  aria-hidden="true"
  role="dialog"
>
  <div class="modal-dialog modal-l">
    <div class="modal-content">
      <div class="modal-header">
        <h1
          class="modal-title fs-5 w-100 p2 text-center"
          id="exampleModalLabel"
          style="background-color: #91bad6"
        >
          转码
        </h1>
      </div>
      <div class="modal-body">
        <form class="p-4">
          <div class="form-row row">
            <div class="col-3">
              <label for="account" class="col-form-label">货币类型</label>
            </div>
            <div class="col-4 m-1">
              <p>菲币</p>
            </div>
          </div>

          <div class="form-row row">
            <div class="col-3">
              <label for="account" class="col-form-label">泥码数量</label>
            </div>
            <div class="col-5">
              <input type="email" class="form-control" id="inputAccount" />
            </div>
            <div class="col-1"><p>万</p></div>
          </div>

          <div class="form-row row mt-1">
            <div class="col-3"></div>
            <div class="col-3">
              <select class="form-select" aria-label="Default">
                <option selected>全部</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="col-5">
              <button
                class="btn btn-outline-dark"
                type="button"
                @click="myselfOpenCloseFun()"
              >
                自定义筹码类型
              </button>
            </div>
          </div>

          <div class="form-row row mt-1">
            <div class="col-3"></div>
            <div class="col-3">
              <select class="form-select" aria-label="Default">
                <option selected>全部</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="col-5">
              <button class="btn btn-outline-dark">自定义筹码类型</button>
            </div>
          </div>

        </form>
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary d-flex text-center justify-content-center"
          type="button"
        >
          确定
        </button>
        <button
          class="btn btn-danger d-flex text-center justify-content-center"
          type="button"
          @click="tranOpenCloseFun()"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</div>

  <div
    v-if="myselfOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 20%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-l">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            修改泥码筹码种类名称
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">名称</label>
              </div>
              <div class="col-5">
                <input type="email" class="form-control" id="inputAccount" />
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="myselfOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getSilverList } from "../../network/api";
import { getCurRoomList,getSilverHead,addCash,reduceCash } from "../../network/api";
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
      fixOpenClose: this.visible,
      addmOpenClose: this.visible,
      reducOpenClose: this.visible,
      bigMBuyOpenClose: this.visible,
      myselfOpenClose:this.visible,
      tranOpenClose:this.visible,

      accChangeValue: null,
      vipSelected: 1,
      currency_id:1,
      timeSelected: "",
      start_time: "",
      end_time: "",
      bankList: [],
      currencyList:[],
      roomList:[],
      silverHead:[],
      // ProxyData: {},

      add:{
        cash: ''
      },

      reduce:{
        cash:''
      },

      headers: [
        { text: "筹码种类", value: "player", sortable: true },
        { text: "额度", value: "team", sortable: true },
        { text: "", value: "operation" },
      ],
      items: [
        {
          player: "Stephen Curry",
          team: "GSW",
          number: 30,
          position: "G",
          indicator: { height: "6-2", weight: 185 },
          lastAttended: "Davidson",
          country: "USA",
        },
        {
          player: "Lebron James",
          team: "LAL",
          number: 6,
          position: "F",
          indicator: { height: "6-9", weight: 250 },
          lastAttended: "St. Vincent-St. Mary HS (OH)",
          country: "USA",
        },
        {
          player: "Kevin Durant",
          team: "BKN",
          number: 7,
          position: "F",
          indicator: { height: "6-10", weight: 240 },
          lastAttended: "Texas-Austin",
          country: "USA",
        },
        {
          player: "Giannis Antetokounmpo",
          team: "MIL",
          number: 34,
          position: "F",
          indicator: { height: "6-11", weight: 242 },
          lastAttended: "Filathlitikos",
          country: "Greece",
        },
      ],
      proposalHeaders: [
        { text: "提案编号", value: "name", sortable: true },
        { text: "贵宾厅", value: "account", sortable: true },
        { text: "币别", value: "pesoBalance", sortable: true },
        { text: "总转码", value: "rmbBalance", sortable: true },
        { text: "上下数", value: "hkdBalance", sortable: true },
        { text: "开工条件", value: "usdBalance", sortable: true },
        { text: "占成", value: "usdBalance", sortable: true },
        { text: "码粮", value: "usdBalance", sortable: true },
        { text: "结算金额", value: "usdBalance", sortable: true },
        { text: "开工时间", value: "usdBalance", sortable: true },
        { text: "收工时间", value: "usdBalance", sortable: true },
      ],
      proposalItems: [
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
      ],
    };
  },

  async mounted() {
   this.callCurRoomList();
   this.callSilverHead();
  },
  
  methods: {
    fixOpenCloseFun() {
      this.fixOpenClose = !this.fixOpenClose;
    },
    addmOpenCloseFun(data) {
      this.addmOpenClose = !this.addmOpenClose;
      this.add.cash = ""
      this.ProxyData = data;
    },
    reducOpenCloseFun() {
      this.reducOpenClose = !this.reducOpenClose;
      this.reduce.cash=""
    },
    bigMBuyOpenCloseFun() {
      this.bigMBuyOpenClose = !this.bigMBuyOpenClose;
    },
    myselfOpenCloseFun(){
      this.myselfOpenClose = !this.myselfOpenClose;
    },
    tranOpenCloseFun(){
      this.tranOpenClose = !this.tranOpenClose;
    },

    onchange(){
       this.callSilverHead();
    },

    callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;

        const roomResult = res.data.data.room;
        this.roomList = roomResult;
      })
    },

    addCash(){
      addCash(this.silverHead.id,this.add.cash).then((res) => {
        if (res.data.code == 1000) {
          createToast(res.data.message);
          console.log(res);
          this.addmOpenClose = !this.addmOpenClose;
        } else {
          createToast(res.data.message);
        }
      })
    },

    reduceCash(){
      reduceCash(this.silverHead.id,this.reduce.cash).then((res) => {
        if (res.data.code == 1000) {
          createToast(res.data.message);
          console.log(res);
          this.reducOpenClose = !this.reducOpenClose;
        } else {
          createToast(res.data.message);
        }
      })
    },


    callSilverHead(){
      getSilverHead(this.vipSelected, this.currency_id).then((res) => {
        const result = res.data.data;
        console.log(res);
         this.silverHead = result;
      })
    }
  },

 


  watch: {
    visible: function (newVal, oldVal) {
      this.fixOpenClose = newVal;
    },
  },
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
