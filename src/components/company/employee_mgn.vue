<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">职员管理</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">账号</label>
      </div>
      <div class="col-auto">
        <input type="text" class="form-control w-75" v-model="account" />
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">姓名</label>
      </div>
      <div class="col-auto">
        <input type="text" class="form-control w-75" v-model="name" />
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">在职状态</label>
      </div>
      <div class="col-auto">
        <select
          class="form-select w-65"
          aria-label="Default"
          v-model="employedSelected"
        >
          <option
            v-for="option in employedOptions"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>
      <div class="col-2">
        <select class="form-select" aria-label="Default" v-model="vipSelected">
          <option
            v-for="option in roomList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary m-1"
          data-toggle="modal"
          @click="AddOpenCloseFun()"
        >
          新加职员
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="callEmployeeList()"
        >
          查询
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="employeeList" :key="tableKey" >
      <template #item-status="{status}">
        <span v-if="status==1"> 在职</span>
        <span v-else-if="status==2">不在职</span>
      </template>
    </EasyDataTable>

  </div>
  <!-- Modal -->

  <div
    v-if="AddOpenClose"
    class="modal fade show w-200"
    tabindex="-1"
    style="display: block"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
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
            新加职员
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputAccount">账号</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="账号"
                  v-model="aaccount"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputPassword ">密码</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  placeholder="密码"
                  v-model="password"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputFName">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputFName"
                  placeholder="姓名"
                  v-model="nname"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputLName ">别名</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputLName"
                  placeholder="别名"
                  v-model="nickname"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputhPhone">住家电话</label>
                <input
                  type="phone"
                  class="form-control"
                  id="inputhPhone"
                  placeholder="住家电话"
                  v-model="home_mobile"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputmPhone">行动电话</label>
                <input
                  type="phone"
                  class="form-control"
                  id="inputmPhone"
                  placeholder="行动电话"
                  v-model="mobile"
                />
              </div>
              <div class="form-group col-md-4">
                <label class="control-label">证件类型</label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="type_certificate"
                >
                  <option
                    v-for="option in certiList"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.certificate_zh }}
                  </option>
                </select>
              </div>

              <div class="col-md-2 p-2">
                <span
                  class="bi text-danger bi-dash-circle col-md-2"
                  style="font-size: 2rem"
                ></span>
                <span
                  class="bi text-success bi-plus-circle m-2 col-md-2"
                  style="font-size: 2rem"
                  data-toggle="modal"
                  @click="CertOpenCloseFun()"
                ></span>
              </div>

              <div class="form-group required col-md-6">
                <label class="control-label" for="inputmPhone">证件编号</label>
                <input
                  type="number"
                  class="form-control"
                  id="inputmPhone"
                  v-model="certificate_number"
                  placeholder="证件编号"
                />
              </div>

              <div class="form-group col-md-4">
                <label class="control-label">性别</label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="gender"
                >
                  <option
                    v-for="option in genderOptions"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>

              <div class="form-group ml-lg-4 col-md-4">
                <label class="control-label">国籍</label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="country"
                >
                  <option
                    v-for="option in citizenList"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.country_zh }}
                  </option>
                </select>
              </div>

              <div class="col-md-2 p-2">
                <span
                  class="bi text-danger bi-dash-circle col-md-2"
                  style="font-size: 2rem"
                ></span>
                <span
                  class="bi text-success bi-plus-circle m-2 col-md-2"
                  style="font-size: 2rem"
                  @click="CountryOpenCloseFun()"
                ></span>
              </div>

              <div class="form-group col-md-4">
                <label class="control-label">学历</label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="academic"
                >
                  <option
                    v-for="option in academicList"
                    :value="option.id"
                    :key="option.id"
                    selected
                  >
                    {{ option.academic_zh }}
                  </option>
                </select>
              </div>

              <div class="col-md-2 p-2">
                <span
                  class="bi text-danger bi-dash-circle col-md-2"
                  style="font-size: 2rem"
                ></span>
                <span
                  class="bi text-success bi-plus-circle m-2 col-md-2"
                  style="font-size: 2rem"
                  @click="AcademicOpenCloseFun()"
                ></span>
              </div>

              <div
                class="md-form md-outline input-with-post-icon datepicker col-md-4"
              >
                <label for="example">出生日期</label>
                <input
                  placeholder="Select date"
                  v-model="birthday"
                  type="date"
                  id="example"
                  class="form-control"
                />
              </div>

              <div
                class="md-form md-outline input-with-post-icon datepicker col-md-4"
              >
                <label for="example">入职日期</label>
                <input
                  placeholder="Select date"
                  v-model="onboarding"
                  type="date"
                  id="example"
                  class="form-control"
                />
              </div>

              <div
                class="md-form md-outline input-with-post-icon datepicker col-md-4"
                style="margin-left: 11rem"
              >
                <label for="example">离职日期</label>
                <input
                  placeholder="Select date"
                  v-model="resignation"
                  type="date"
                  id="example"
                  class="form-control"
                />
              </div>

              <div class="form-group col-md-6">
                <label class="control-label" for="inputmPhone">父亲姓名</label>
                <input
                  type="text"
                  v-model="father_name"
                  class="form-control"
                  id="inputmPhone"
                  placeholder="父亲姓名"
                />
              </div>

              <div class="form-group col-md-6">
                <label class="control-label" for="inputmPhone">母亲姓名</label>
                <input
                  type="text"
                  v-model="mother_name"
                  class="form-control"
                  id="inputmPhone"
                  placeholder="母亲姓名"
                />
              </div>

              <div class="form-group col-md-4">
                <label class="control-label">婚姻状态</label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="marital_status"
                >
                  <option
                    v-for="option in marriageOptions"
                    :value="option.id"
                    :key="option.id"
                    selected
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>

              <div class="form-group col-md-6" style="margin-left: 11rem">
                <label class="control-label" for="inputmPhone">配偶姓名</label>
                <input
                  type="phone"
                  v-model="mate_name"
                  class="form-control"
                  id="inputmPhone"
                  placeholder="配偶姓名"
                />
              </div>

              <div class="form-group col-md-4">
                <label class="control-label">贵宾厅管理</label>

                <!--Multi select box -->
                <div>
                  <!-- <Multiselect
                    v-model="value"
                    mode="multiple"
                    :close-on-select="false"
                    :options="[
                      { value: '1', label: 'SOLAIRE' },
                      { value: '2', label: 'SOLAIRE_FAST' },
                    ]"
                  /> -->

                  <select class="form-select w-65" aria-label="Default" v-model="room_ta_id">
                    <option
                      v-for="option in roomOptions"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.text }}
                    </option>
                  </select>

                </div>
              </div>
            </div>

            <div class="form-group col-md-4 mt-2">
                <label id="preview" for="file-upload">
                   <img class="mw-100" :key="previewImage" v-if="previewImage" :src="previewImage"/> 
                </label>
                 <div class="file-upload"> 
                    <label class="file-upload-button" for="file-upload">选择本人照片</label> 
                    <input type="file" id="file-upload" @change="uploadImageHandle"/>
                 </div>
                <div v-if="previewImage">
                  <button class="btn btn-outline-dark"  @click="removeImage()">删除图像</button>
                </div>

                
              <!-- <label class="control-label" for="inputmPhone">选择本人照片</label>
              <div>
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  class="uploading-image mw-100"
                />
                <input type="file" @change="uploadImageHandle" />
              </div> -->

              <!-- <div v-if="previewImage">
                <button class="btn btn-outline-dark" @click="removeImage()">
                  删除图像
                </button>
              </div> -->
            </div>

            <!-- <label for="inputAddress m-3">权限管理</label>

            <div class="form-row row m-3">
              <label class="col-2" for="inputAddress">公司</label>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    新增员工
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    修改员工
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    公司交收
                  </label>
                </div>
              </div>
            </div>

            <hr />

            <div class="form-row row m-3">
              <label class="col-2" for="inputAddress">客户管理</label>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    新增客户
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    修改客户
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    修改密码
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    查看资料
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 报表 </label>
                </div>
              </div>

              <div class="form-group col-2"></div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 户口 </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 换汇 </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    更改汇率
                  </label>
                </div>
              </div>
            </div>

            <hr />

            <div class="form-row row m-3">
              <label class="col-2" for="inputAddress">账房</label>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Marker
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 提案 </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 围数 </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 银头 </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck"> 交班 </label>
                </div>
              </div>

              <div class="form-group col-2"></div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    贵宾厅总计
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    小费修正
                  </label>
                </div>
              </div>

              <div class="form-group col-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    更改汇率
                  </label>
                </div>
              </div>
            </div> -->
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
            @click="addAdmin()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="AddOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="CertOpenClose"
    class="modal fade show w-10"
    tabindex="-1"
    style="display: block"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
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
            新增证件类型
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputAccount">中文</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="中文"
                  v-model="Certificate.ch_name"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputAccount">英文</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="英文"
                  v-model="Certificate.en_name"
                />
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
            @click="addCertificate()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="CertOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="CountryOpenClose"
    class="modal fade show w-10"
    tabindex="-1"
    style="display: block"
    id="exampleModal"
    aria-labelledby="exampleModalLabel"
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
            新增国籍
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputAccount">中文</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="中文"
                  v-model="Country.ch_name"
                />
              </div>
              <div class="form-group required col-md-6">
                <label class="control-label" for="inputAccount">英文</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="英文"
                  v-model="Country.en_name"
                />
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
            @click="addCountry()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="CountryOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
  v-if="AcademicOpenClose"
  class="modal fade show w-10"
  tabindex="-1"
  style="display: block"
  id="exampleModal"
  aria-labelledby="exampleModalLabel"
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
          新增学历
        </h1>
      </div>
      <div class="modal-body">
        <form class="p-4">
          <div class="form-row row">
            <div class="form-group required col-md-6">
              <label class="control-label" for="inputAccount">中文</label>
              <input
                type="email"
                class="form-control"
                id="inputAccount"
                placeholder="中文"
                v-model="Academic.ch_name"
              />
            </div>
            <div class="form-group required col-md-6">
              <label class="control-label" for="inputAccount">英文</label>
              <input
                type="email"
                class="form-control"
                id="inputAccount"
                placeholder="英文"
                v-model="Academic.en_name"
              />
            </div>
          </div>
        </form>
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary d-flex justify-content-center"
          type="button"
          @click="addAcademic()"
        >
          确定
        </button>
        <button
          class="btn btn-danger d-flex justify-content-center"
          type="button"
          @click="AcademicOpenCloseFun()"
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
import { getEmployeeList } from "../../network/api";
import { addAdmin, addCertificate,getCacList, addCountry, addAcademic,getCurRoomList, uploadImage} from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

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
      value: null,
      show: false,
      OpenClose: this.visible,
      AddOpenClose: this.visible,
      
      CertOpenClose: this.visible,
      CountryOpenClose: this.visible,
      AcademicOpenClose: this.visible,

      account: "",
      name: "",
      employeeList: [],
      
      certiList : [],
      citizenList: [],
      academicList:[],
  
      currencyList:[],
      roomList:[],
      
      employedSelected: 4,
      vipSelected: 0,
      tableKey: 0,

      aaccount: "",
      password: "",
      nname: "",
      nickname: "",
      home_mobile: "",
      mobile: "",
      type_certificate: "1",
      certificate_number: "",
      gender: "1",
      country: "1",
      academic: "1",
      birthday: new Date().toISOString().slice(0, 10),
      onboarding: new Date().toISOString().slice(0, 10),
      resignation: new Date().toISOString().slice(0, 10),
      father_name: "",
      mother_name: "",
      marital_status: "1",
      mate_name: "",
      pic: "",
      room_ta_id: "1",
      group: "1",

      previewImage:null,

      Certificate:{
        ch_name:"",
        en_name:"",
      },

      Country:{
        ch_name:"",
        en_name:"",
      },

      Academic:{
        ch_name:"",
        en_name:"",
      },

      employedOptions: [
        { text: "在职", id: 1 },
        { text: "不在职", id: 2 },
        { text: "全部", id: 4 },
      ],

      // certificateOptions:[
      //    {id:1, text:"中国护照"},
      //    {id:1, text:"菲律宾证件"}
      // ],

      vipOptions: [{ text: "全部", id: 0 }],

      genderOptions: [
        { text: "男", id: 1 },
        { text: "女", id: 2 },
      ],

      marriageOptions: [
        { text: "已婚", id: 1 },
        { text: "未婚", id: 2 },
      ],

      roomOptions: [
        { text: "SOLAIRE", id: "1" },
        { text: "SOLAIRE_FAST", id: "2" },
      ],

      headers: [
        { text: "编号", value: "id", sortable: true },
        { text: "姓名", value: "name", sortable: true },
        { text: "账号", value: "username", sortable: true },
        { text: "状态", value: "status", sortable: true },
      ],
    };
  },

  async mounted() {
      this.callEmployeeList();
      // console.log("token is here" + localStorage.getItem("token"))
      // console.log("form is mounting");
      this.callCacList();
      this.callCurRoomList();
  },

  methods: {
    // loadOnce(){
    //   location.reload();
    // },
    OpenCloseFun() {
      this.OpenClose = !this.OpenClose;
    },

    AddOpenCloseFun() {
      console.warn("it is clicked")
      this.AddOpenClose = !this.AddOpenClose;
      this.aaccount=""
        this.password=""
        this.nname= ""
        this.nickname=""
        this.home_mobile=""
        this.mobile=""
        this.type_certificate="1"
        this.certificate_number=""
        this.gender="1"
        this.country="1"
        this.academic="1"
        this.birthday=new Date().toISOString().slice(0, 10)
        this.onboarding=new Date().toISOString().slice(0, 10)
        this.resignation=new Date().toISOString().slice(0, 10)
        this. father_name=""
        this.mother_name=""
        this.marital_status="1"
        this.mate_name="",
        this.pic="",
        this.room_ta_id="1"
        this.group="1"
    },
    
    CertOpenCloseFun(){
      this.CertOpenClose =  !this.CertOpenClose;
    },

    CountryOpenCloseFun(){
      this.CountryOpenClose = !this.CountryOpenClose;
    },

    AcademicOpenCloseFun(){
      this.AcademicOpenClose = !this.AcademicOpenClose;
    },

    callEmployeeList() {
      getEmployeeList(
        this.name,
        this.account,
        this.employedSelected,
        this.vipSelected
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        // if ( res.data.data.data === null ||  res.data.data.data === undefined) {
        //   location.reload();
        // }
        this.employeeList = result;   
      });
    },

    callCacList(){
      getCacList().then((res) => {
        console.log(res);
        const certResult = res.data.data.certificate;
        this.certiList = certResult;
        const citizenResult = res.data.data.country;
        this.citizenList = citizenResult;
        const acadeResult = res.data.data.academic;
        this.academicList = acadeResult;
        // country and acedamic
      })
    },

    callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        this.roomList.push({id:0,name:"全部"})
      })
    },

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

    async addAdmin() {

      addAdmin(
        this.aaccount,
        this.nname,
        this.password,
        this.nickname,
        this.home_mobile,
        this.mobile,
        this.type_certificate,
        this.certificate_number,
        this.gender,
        this.country,
        this.academic,
        (new Date(this.birthday).getTime())/1000,
        (new Date(this.onboarding).getTime())/1000,
        (new Date(this.resignation).getTime())/1000,
        this.father_name,
        this.mother_name,
        this.marital_status,
        this.mate_name,
        this.pic,
        this.room_ta_id,
        this.group
      ).then((res) => {
        // console.log(res);

      if(res.data.code == 1000){
        createToast(res.data.message);
      
        this.AddOpenClose = !this.AddOpenClose;
      } else {
        createToast(res.data.message);
      }

       

      });
    },

    async addCertificate() {
        addCertificate(
          this.Certificate.ch_name,
          this.Certificate.en_name
        ).then((res) => {
          console.log(res);
          createToast(res.data.message);
          this.Certificate.ch_name=""
          this.Certificate.en_name=""
          this.callCacList();
          this.CertOpenClose  = !this.CertOpenClose; 
        })
    },

    async addCountry(){
      addCountry(
        this.Country.ch_name,
        this.Country.en_name,
      ).then((res) => {
          console.log(res);
          createToast(res.data.message);
          this.Country.ch_name="",
          this.Country.en_name="",
          this.callCacList();
          this.CountryOpenClose = !this.CountryOpenClose;
      })
    },

    async addAcademic(){
      addAcademic(
        this.Academic.name,
        this.Academic.en_name,
      ).then((res) => {
        console.log(res);
        createToast(res.data.message);
        this.Academic.ch_name="",
        this.Academic.en_name="",
        this.callCacList();
        this.AcademicOpenClose = !this.AcademicOpenClose;
      })
    }
  },
  watch: {
    visible: function (newVal, oldVal) {
      this.OpenClose = newVal;
      this.AddOpenClose = newVal;
      // console.log("new " + newVal + "==" + oldVal);
    },
  },
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}

.uploading-image {
  display: flex;
  width: 100px;
  height: 100px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
