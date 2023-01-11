<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">代理网限红</div>
    <div class="row m-3">
      <div class="row m-3">
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="recallLimitedRed()"
          >
            刷新
          </button>
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="addOpenCloseFun()"
          >
            新增
          </button>
        </div>
      </div>
    </div>

    <EasyDataTable
      :headers="headers"
      :items="limitedRedList"
      v-model:server-options="serverOptions"
      :server-items-length="serverItemsLength"
    >
      <template #item-operation="item">
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="editModal(item)"
          >
            修改
          </button>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <div
    v-if="addOpenClose"
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
            v-if="editing"
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            修改限红
          </h1>
          <h1
            v-else-if="!editing"
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            新增限红
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="row">
              <div class="col-3"></div>
              <div class="col-5">最低</div>
              <div class="col-4">最高</div>
            </div>

            <div class="row mt-1">
              <div class="col-2">庄/闲</div>
              <p class="col-sm-1">0</p>
              <div class="col-sm-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.banker_player_min"
                />
                <span class="col-sm-2 ms-5">~</span>
              </div>
              <div class="col-sm-4 ms-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.banker_player_max"
                />
              </div>
            </div>

            <div class="row mt-1">
              <div class="col-2">和</div>
              <p class="col-sm-1">0</p>
              <div class="col-sm-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.tie_min"
                />
                <span class="col-sm-2 ms-5">~</span>
              </div>
              <div class="col-sm-4 ms-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.tie_max"
                />
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-2">对子</div>
              <p class="col-sm-1">0</p>
              <div class="col-sm-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.pair_min"
                />
                <span class="col-sm-2 ms-5">~</span>
              </div>
              <div class="col-sm-4 ms-4">
                <input
                  class="col-sm-6"
                  type="number"
                  v-model="limitedRed.pair_max"
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
            v-if="editing"
            @click="updateLimitedRed"
          >
            确定
          </button>
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            v-else
            @click="addLimitedRed"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex text-center justify-content-center"
            type="button"
            @click="addOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { addLimitedRed, updateLimitedRed } from "../../network/api";
import { getLimitedRed } from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "AddAgentNetwork",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
    Multiselect,
  },
  props: {
    visible: Boolean,
  },

  data() {
    return {
      accChangeValue: null,
      addOpenClose: this.visible,
      limitedRedList: [],
      editing: false,

      limitedRed: {
        banker_player_min: "",
        banker_player_max: "",
        tie_min: "",
        tie_max: "",
        pair_min: "",
        pair_max: "",
        id: 0,
      },

      headers: [
        { text: "庄/闲", value: "banker_player", sortable: true },
        { text: "和", value: "tie", sortable: true },
        { text: "对子", value: "pair", sortable: true },
        { text: "", value: "operation", sortable: true },
      ],

      serverOptions:{page:1,rowsPerpage:10}
    };
  },

  async mounted() {
    this.recallLimitedRed();
  },

  methods: {
    addOpenCloseFun() {
    
      this.addOpenClose = !this.addOpenClose;
      this.editing  = false
      this.limitedRed.banker_player_min = "";
      this.limitedRed.banker_player_max = "";
      this.limitedRed.tie_min = "";
      this.limitedRed.tie_max = "";
      this.limitedRed.pair_min = "";
      this.limitedRed.pair_max = "";
      this.limitedRed.id = 0;
       
     
      
    },

    editModal(item) {
      console.log("item", item);
      this.editing = true;
      this.recallLimitedRed();
      this.limitedRed = item;
      this.addOpenClose = !this.addOpenClose;
      // this.updateLimitedRed(item.id);

      // getLimitedRed(id).then((res) => {
      //   const result = res.data.data;
      //   console.warn(result);
      //   this.limitedRed = result;
      // });
    
    },

    recallLimitedRed() {
      getLimitedRed().then((res) => {
        const result = res.data.data;
        console.warn(result);
        this.limitedRedList = result;
      });
    },

    async addLimitedRed() {

      addLimitedRed(
        this.limitedRed.banker_player_min,
        this.limitedRed.banker_player_max,
        this.limitedRed.tie_min,
        this.limitedRed.tie_max,
        this.limitedRed.pair_min,
        this.limitedRed.pair_max
      ).then((response) => {
        console.warn("response", response);
        console.warn(response.data.message);
        createToast(response.data.message);
      this.limitedRed.banker_player_min = "";
       this.limitedRed.banker_player_max = "";
       this.limitedRed.tie_min = "";
       this.limitedRed.tie_max = "";
       this.limitedRed.pair_min = "";
       this.limitedRed.pair_max = "";
      this.limitedRed.id = 0;
        this.recallLimitedRed();
        this.addOpenClose = !this.addOpenClose;
      });
    },
    
    
    async updateLimitedRed() {
      updateLimitedRed(
        this.limitedRed.banker_player_min,
        this.limitedRed.banker_player_max,
        this.limitedRed.tie_min,
        this.limitedRed.tie_max,
        this.limitedRed.pair_min,
        this.limitedRed.pair_max,
        this.limitedRed.id
      ).then((response) => {
        console.warn("response", response);
        this.recallLimitedRed();
        this.addOpenClose = !this.addOpenClose;
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
