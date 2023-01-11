<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">Marker 管理</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">借款时间</label>
      </div>
      <div class="col-md-4 row">
        <div
          class="md-form md-outline input-with-post-icon datepicker col-md-4"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            class="form-control"
            v-model="repayment_start_time"
          />
        </div>
        <span class="col-1">~</span>
        <div
          class="md-form md-outline input-with-post-icon datepicker col-md-4"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            class="form-control"
            v-model="repayment_end_time"
          />
        </div>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">状态</label>
      </div>
      <div class="col-2">
        <!-- <Multiselect
          v-model="status"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: '0', label: '全部' },
            { value: '1', label: '未还' },
            { value: '2', label: '已还' },
            { value: '3', label: '到期末还' },
          ]"
        /> -->

        <select class="form-select w-65" aria-label="Default" v-model="status">
          <option
            v-for="option in statusOptions"
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
          class="btn btn-outline-secondary"
          @click="nmkOpenCloseFun()"
        >
          新增 Marker
        </button>
      </div>
    </div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">坏款时间</label>
      </div>
      <div class="col-md-4 row">
        <div
          class="md-form md-outline input-with-post-icon datepicker col-md-4"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            v-model="start_time"
            class="form-control"
          />
        </div>
        <span class="col-1">~</span>
        <div
          class="md-form md-outline input-with-post-icon datepicker col-md-4"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            v-model="end_time"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-auto"></div>

      <div class="col-auto">
        <label for="account" class="col-form-label">客户账号</label>
      </div>

      <div class="col-auto">
        <input
          type="email"
          class="form-control"
          id="inputAccount"
          v-model="account"
        />
      </div>

      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="callMarkerList()"
        >
          查询
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="markerList" >
      <template #item-create_time="{create_time}">
        <span> {{changeTimeToString(create_time)}}</span>
      </template>
    </EasyDataTable>


    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>

  <div
    v-if="nmkOpenClose"
    class="modal fade show w-50"
    tabindex="-1"
    style="display: block; left: 25%; top: 1%"
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
            新增 Marker
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >客户账号</label
              >
              <div class="col-4">
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="客户账号"
                  v-model="aaccount"
                />
              </div>
            </div>

            <!-- <div class="form-row row mt-1">
              <label class="control-label col-3" for="inputAccount"
                >客户名称</label
              >
              <div class="col-4">
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="客户名称"
                />
              </div>
            </div> -->

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >客户密码</label
              >
              <div class="col-4">
                <input
                  type="email"
                  class="form-control"
                  id="inputAccount"
                  v-model="password"
                  placeholder="客户密码"
                />
              </div>
              <button type="button" class="btn btn-outline-dark col-2">
                电话验证
              </button>
              <button type="button" class="btn btn-outline-dark col-2">
                短息验证
              </button>
              <button type="button" class="btn btn-outline-dark col-2">
                APP验证
              </button>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount"
                >开工贵宾厅</label
              >
              <div class="col-6">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="room_id"
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

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount"
                >货币类型</label
              >
              <div class="col-6">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="currency_id"
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

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount"
                >Marker 额度</label
              >
              <div class="col-4">
                <input
                  type="email"
                  class="form-control"
                  id="inputAccount"
                  v-model="money"
                  placeholder="Marker 额度"
                />
              </div>
              <span class="col-1 mt-1">万</span>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="example">到期日</label>
              <div class="col-4">
                <input
                  placeholder="Select date"
                  type="date"
                  id="example"
                  v-model="deadline"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount">利息</label>
              <div class="col-4">
                <input
                  type="number"
                  class="form-control"
                  id="inputAccount"
                  v-model="interest_rate"
                  placeholder="利息"
                />
              </div>
              <span class="col-1 mt-1">%</span>
            </div>



            <div class="form-group col-md-4 mt-2">
              <label id="preview" for="file-upload">
                <img class="mw-100" :key="previewImage" v-if="previewImage" :src="previewImage"/>
              </label>
              <div class="file-upload"> 
                <label class="file-upload-button" for="file-upload">选择Marker 签单照图档</label> 
                <input type="file" id="file-upload" @change="uploadImageHandle"/>
             </div>
             <div v-if="previewImage">
              <button class="btn btn-outline-dark"  @click="removeImage()">删除图像</button>
            </div>
            </div>

            


            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount">备注</label>
              <div class="col-6">
                <textarea
                  class="form-control col-6"
                  rows="4"
                  v-model="remark"
                ></textarea>
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
            @click="addMarker()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="nmkOpenCloseFun()"
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
import { addMarker, getMarkerList, getCurRoomList,uploadImage } from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import moment from "moment";

export default {
  name: "AddEmployee",
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
      nmkOpenClose: this.visible,
      vipSelected: "",
      timeSelected: "",

      start_time: new Date().toISOString().slice(0, 10),
      end_time: new Date().toISOString().slice(0, 10),
      repayment_start_time: new Date().toISOString().slice(0, 10),
      repayment_end_time: new Date().toISOString().slice(0, 10),
      account: "",
      status: [0],
      markerList: [],

      aaccount: "",
      password: "",
      room_id: "1",
      currency_id: "1",
      money: "",
      deadline: new Date().toISOString().slice(0, 10),
      interest_rate: "",
      remark: "",
      status:0,
      pic:"",

      previewImage: "",

      roomList: [],
      currencyList: [],

      statusOptions: [
        { id: 0, text: "全部" },
        { id: 1, text: "未还" },
        { id: 2, text: "已还" },
        { id: 3, text: "到期末还" },
      ],

      headers: [
        { text: "时间", value: "create_time", sortable: true },
        { text: "客户账号", value: "account", sortable: true },
        { text: "货币类型", value: "currency_name", sortable: true },
        { text: "提案编号", value: "proposal_id", sortable: true },
        { text: "Marker 单号", value: "marker_num", sortable: true },
        { text: "备注", value: "remark", sortable: true },
      ],
    };
  },

  async mounted() {
    this.callMarkerList();
    this.callCurRoomList();
  },

  methods: {
    nmkOpenCloseFun() {
      this.nmkOpenClose = !this.nmkOpenClose;
    },
    callMarkerList() {
      getMarkerList(
        (new Date(this.start_time).getTime())/1000,
        (new Date(this.end_time).getTime())/1000,
        (new Date(this.repayment_start_time).getTime())/1000,
        (new Date( this.repayment_end_time).getTime())/1000,
        1,
        10,
        this.account,
        this.status
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.markerList = result;
      });
    },

    changeTimeToString(time){
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
    },

    // uploadMarkerImage(e) {
    //   const image = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onload = (e) => {
    //     this.markerPhoto = e.target.result;
    //     console.log(this.markerPhoto);
    //   };
    // },

    uploadImageHandle(e) {
      // console.log('this.previewImage',e.target.files[0]);
      var data = new FormData()
      data.append('file',e.target.files[0])
      uploadImage(data).then((res) => {
        console.warn(res);
        console.warn(res.data.data.url);
        this.pic = res.data.data.url;
      })

      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        // uploadImage()
      };
    },

    removeImage() {
      this.previewImage = null;
      this.pic= ""
    },

    callCurRoomList() {
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        this.currencyList.push({id:0,currency_name:"全部"})

        const roomResult = res.data.data.room;
        this.roomList = roomResult;
      });
    },

    async addMarker() {
      addMarker(
        this.aaccount,
        this.password,
        this.room_id,
        this.currency_id,
        this.money,
        this.deadline,
        this.interest_rate,
        this.remark,
        this.markerPhoto
      ).then((res) => {
        console.log(res);
        createToast(res.data.message);
        this.aaccount = "";
        this.password = "";
        this.room_id = "1";
        this.currency_id = "1";
        (this.money = "0"), (this.deadline = "1672426983");
        this.interest_rate = "1";
        this.remark = "";
        this.markerPhoto = "";
        this.nmkOpenClose = !this.nmkOpenClose;
      });
    },
  },
  watch: {
    visible: function (newVal, oldVal) {
      this.nmkOpenClose = newVal;
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
