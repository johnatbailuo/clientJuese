<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">提案管理</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">开工时间</label>
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
            v-model="swork_start_time"
            @change="sworkChangeHandler"
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
            v-model="swork_end_time"
          />
        </div>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">收工时间</label>
      </div>
      <div class="col-md-4 row">
        <div
          class="md-form md-outline input-with-post-icon datepicker col-md-4"
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            v-model="ework_start_time"
            @change="eworkChangeHandler"
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
            v-model="ework_end_time"
            class="form-control"
          />


        </div>
        <p class="col-3">请选择其中一项</p>

      </div>


      <div class="col-auto ms-auto">

        <button
          type="button"
          class="btn btn-outline-secondary me-2"
          @click="opwOpenCloseFun()"
        >
          开工
        </button>
        <button type="button" class="btn btn-outline-secondary"
         @click="callProposalList()"
        >查询</button>
      </div>
    </div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>
      <div class="col-auto">
        <select class="form-select w-65" aria-label="Default" v-model="room_id">
          <option
            v-for="option in roomSearchList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">货币类型</label>
      </div>
      <div class="col-2">
        <select class="form-select" aria-label="Default" v-model="currency_id">
          <option
            v-for="option in currencySearchList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.currency_name }}
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">提案状态</label>
      </div>
      <div class="col-2">
        <select class="form-select" aria-label="Default" v-model="proposal_status">
          <option
            v-for="option in proposalStatusOptions"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

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
    </div>

    <EasyDataTable :headers="headers" :items="proposalList">
      <template #item-currency_id="{currency_id}">
        <span v-if="currency_id==1"> 人民币</span>
        <span v-else-if="currency_id==2">美元</span>
        <span v-else-if="currency==3">港币</span>
        <span v-else-if="currency==4">菲币</span>
      </template>
      <template #item-room_id="{room_id}">
        <span v-if="room_id==1"> suolaier</span>
        <span v-else-if="room_id==2">suolaier线上</span>
      </template>
      <template #item-type="{type}">
        <span v-if="type==1">现场</span>
        <span v-else-if="type==2">线上</span>
      </template>

      <template #item-swork_time="{swork_time}">
        <span>{{changeTimeToString(swork_time)}}</span>
      </template>

      <template #item-status="{status}">
        <span v-if="status==1"> 未开工</span>
        <span v-else-if="status==2">未收工</span>
        <span v-else-if="status==3">已手工</span>
        <span v-else-if="status==4">未结算</span>
        <span v-else-if="status==5">已结算</span>
      </template>
      <template #item-operation>
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="detailOpenCloseFun()"
          >
            明细
          </button>
        </div>
      </template>
      
    </EasyDataTable>
    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>

  <div
    v-if="opwOpenClose"
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
            开工
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <label class="control-label col-2" for="inputAccount"
                >客户账号</label
              >
              <div class="col-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputAccount"
                  placeholder="客户账号"
                  v-model="proposal.aaccount"
                />
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >客户密码</label
              >
              <div class="col-4">
                <input
                  type="password"
                  class="form-control"
                  id="inputAccount"
                  v-model="proposal.password"
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

            <!-- <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >客户名称</label
              >
              <div class="col-4"></div>
            </div> -->

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >开工贵宾厅</label
              >
              <div class="col-3">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="proposal.room_id"
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
              <label class="control-label col-2" for="inputAccount"
                >货币类型
                </label
              >
              <div class="col-3">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="proposal.room_id"
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
              <label class="control-label col-2" for="inputAccount"
                >开工类型</label
              >
              <div class="col-6">
                <div class="row">
                  <!-- <div class="form-check col-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisable"
                      v-model="proposal.type"
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDisabled"
                    >
                      现场
                    </label>
                  </div>
                  <div class="form-check col-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisable"
                      v-model="proposal.type"
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDisabled"
                    >
                      线上
                    </label>
                  </div> -->

                <div v-for="(index, type) in typeOptions"
                   :key="type.id"
                   class="form-check col-2"
                >
                 <label>
                  <input type="radio" name="type-radio" v-model="proposal.type"
                   class="form-check-input"
                   :value="type"
                  />  
                  {{ index }}
                 </label>
                </div>
              
              </div>
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
                  type="number"
                  class="form-control"
                  id="inputFName"
                  placeholder="占成"
                  v-model="proposal.gambling_proportion"
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
                  type="number"
                  class="form-control"
                  id="inputFName"
                  placeholder=""
                  v-model="proposal.commission_proportion"
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
                  <!-- <option
                    v-for="option in chipOptions"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.text }}
                  </option> -->
                  <option value="1"> 泥码 </option>
                </select>
              </div>
              <div class="col-2">
                <input type="number" class="form-control" id="inputFName" />
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
                <!-- <option
                v-for="option in chipOptions"
                :value="option.id"
                :key="option.id"
              >
                {{ option.text }}
              </option> -->

              <option value="1" > 现金码 </option>

                </select>
              </div>
              <div class="col-2">
                <input type="number" class="form-control" id="inputFName" />
              </div>
              <div class="col-2 mt-1">万</div>
            </div>
            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >现金额度</label
              >
              <div class="col-3">
                <input
                  type="number"
                  class="form-control"
                  id="inputAccount"
                  placeholder=""
                  v-model="proposal.cash_amount"
                />
              </div>
              <span class="col-1 mt-1">万</span>
            </div>

            <!-- <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >存款额度</label
              >
              <div class="col-3">
                <input
                  type="email"
                  class="form-control"
                  id="inputAccount"
                  placeholder=""
                />
              </div>
              <span class="col-1 mt-1">万</span>
            </div> -->

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount"
                >Marker 额度</label
              >
              <div class="col-3">
                <input
                  type="number"
                  class="form-control"
                  id="inputAccount"
                  placeholder=""
                  v-model="proposal.marker_id"
                />
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount">备注</label>
              <div class="col-5">
                <textarea
                  class="form-control"
                  rows="4"
                  v-model="proposal.remark"
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
            @click="addProposal()"
          >
            确定
          </button>
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="opwOpenCloseFun()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="detailOpenClose"
    class="modal fade show w-50"
    tabindex="-1"
    style="display: block; left: 25%; top: 10%"
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
            提案明细
          </h1>
        </div>

        <div class="modal-body">
          <form class="p-4">
            <div class="container">
              <div class="table-responsive-sm">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">提案编号</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">384</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">客户账号</p>
                        </div>
                      </td>

                      <td class="right">YQC003</td>

                      <td class="center">
                        <div>
                          <p class="m-0 p-0">客户名称</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">网投3</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">开工条件</p>
                        </div>
                      </td>

                      <td class="right"></td>
                    </tr>

                    <tr>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">开工本金</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">20 万</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">加菜</p>
                        </div>
                      </td>

                      <td class="right">7 万</td>

                      <td class="center">
                        <div>
                          <p class="m-0 p-0">总本金</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">27 万</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">开工币种</p>
                        </div>
                      </td>
                      <td class="right">菲币</td>
                    </tr>

                    <tr>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">中途存码</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">0</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">还码</p>
                        </div>
                      </td>

                      <td class="right">0</td>

                      <td class="center">
                        <div>
                          <p class="m-0 p-0">小费</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">0</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">有效泥码数</p>
                        </div>
                      </td>
                      <td class="right">7.05 万</td>
                    </tr>

                    <tr>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">收工台面</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">19.95 万</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">离台数</p>
                        </div>
                      </td>

                      <td class="right">19.95 万</td>

                      <td class="center">
                        <div>
                          <p class="m-0 p-0">上下数</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">-7.05 万</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">总转码</p>
                        </div>
                      </td>
                      <td class="right">7.01 万</td>
                    </tr>

                    <tr>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">泥码种类</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">泥码</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">现金码种类</p>
                        </div>
                      </td>

                      <td class="right">现金码</td>

                      <td class="center">
                        <div>
                          <p class="m-0 p-0">占成</p>
                        </div>
                      </td>
                      <td class="center strong text-center my-auto">
                        <p class="p-0 m-0">0</p>
                      </td>
                      <td class="center">
                        <div>
                          <p class="m-0 p-0">码粮</p>
                        </div>
                      </td>
                      <td class="right">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="row">
                <div class="col-4"></div>
                <div class="col-5"></div>
                <div class="col-3">
                  <button
                    class="btn btn-outline-dark"
                    type="button"
                    @click="tipOpenCloseFun()"
                  >
                    小费
                  </button>
                </div>
              </div>

              <EasyDataTable
                :headers="detailHeaders"
                :items="detailItems"
                class="mt-2"
              >
                <template #item-operation>
                  <div class="operation-wrapper">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="detailOpenCloseFun()"
                    >
                      打印
                    </button>
                  </div>
                </template>
              </EasyDataTable>
              <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="detailOpenCloseFun()"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="tipOpenClose"
    class="modal fade show w-50"
    tabindex="-1"
    style="display: block; left: 25%; top: 1%"
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
            小费
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >客户账号</label
              >
              <div class="col-4">
                <p>YQC003</p>
              </div>
            </div>
            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >客户名称</label
              >
              <div class="col-4">
                <p>网投3</p>
              </div>
            </div>
            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >开工贵宾厅</label
              >
              <div class="col-4">
                <p>SOLAIRE</p>
              </div>
            </div>

            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >货币类型</label
              >
              <div class="col-4">
                <p>菲币</p>
              </div>
            </div>

            <div class="form-row row">
              <label class="control-label col-3" for="inputAccount"
                >提案编号</label
              >
              <div class="col-4">
                <p>384</p>
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-4" for="inputAccount"
                >小费对象</label
              >
              <div class="col-6">
                <div class="row">
                  <div class="form-check col-5">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisable"
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDisabled"
                      checked
                    >
                      电投手
                    </label>
                  </div>
                  <div class="form-check col-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisable"
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDisabled"
                      disabled
                    >
                      荷官
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount"
                >泥码额度</label
              >
              <div class="col-3">
                <p>泥码</p>
              </div>

              <div class="col-6">
                <div class="row">
                  <input class="col-9" type="text" />
                  <span class="col-2">万</span>
                </div>
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-3" for="inputAccount"
                >现金码额度</label
              >
              <div class="col-3">
                <p>现金码</p>
              </div>

              <div class="col-6">
                <div class="row">
                  <input class="col-9" type="text" />
                  <span class="col-2">万</span>
                </div>
              </div>
            </div>

            <div class="form-row row mt-2">
              <label class="control-label col-2" for="inputAccount">备注</label>
              <div class="col-10">
                <textarea class="form-control col-6" rows="4"></textarea>
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
            @click="tipOpenCloseFun()"
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
import { getProposalList,getCurRoomList } from "../../network/api";
import { addProposal } from "../../network/api";
import moment from 'moment';
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
      accChangeValue: null,
      opwOpenClose: this.visible,
      detailOpenClose: this.visible,
      tipOpenClose: this.visible,

      swork_start_time: "",
      swork_end_time:  "",
      room_id: 0,
      account: "",
      currency_id: 0,
      proposal_status: 0,
      ework_start_time:  "",
      ework_end_time:  "",

      proposalList: [],

      typeOptions:{
          1:"现场",
          2:"线上"
      },

      proposal: {
        aaccount: "",
        password: "",
        room_id: "1",
        currency_id: "1",
        type: 1,
        gambling_proportion: "",
        commission_proportion: "",
        dead_chips: 0,
        regular_chips: 0,
        cash_amount: 0,
        remark: "",
        marker_id: "",
      },

      roomList: [],
      currencyList: [],

      roomSearchList:[],
      currencySearchList:[],

      proposalStatusOptions:[
        {id:0,text:"全部"},
        {id:1,text:"未开工"},
        {id:2,text:"未收工"},
        {id:3,text:"已手工"},
        {id:4,text:"未结算"},
        {id:5,text:" 已结算"}
      ],



      headers: [
        { text: "提案编号", value: "id", sortable: true },
        { text: "客户账号", value: "account", sortable: true },
        { text: "开工贵宾厅", value: "room_id", sortable: true },
        { text: "币别", value: "currency_id", sortable: true },
        { text: "开工本金", value: "cash_amount", sortable: true },
        { text: "离台数", value: "end_money", sortable: true },
        { text: "转码比", value: "transcod_proportion", sortable: true },
        { text: "占成", value: "gambling", sortable: true },
        { text: "码粮", value: "commission", sortable: true },
        { text: "转码量", value: "transcod", sortable: true },
        { text: "上下数", value: "profit", sortable: true },
        { text: "小费", value: "tip", sortable: true },
        { text: "开工时间", value: "swork_time", sortable: true },
        { text: "收工时间", value: "ework_time", sortable: true },
        { text: "类型", value: "type", sortable: true },
        { text: "状态", value: "status", sortable: true },
        { text: "", value: "operation", sortable: true },
      ],

      detailHeaders: [
        { text: "时间", value: "time", sortable: true },
        { text: "类型", value: "category", sortable: true },
        { text: "金额", value: "amount", sortable: true },
        { text: "转码", value: "transcode", sortable: true },
        { text: "", value: "operation", sortable: true },
        { text: "备注", value: "remark", sortable: true },
        { text: "详情", value: "detail", sortable: true },
      ],

      detailItems: [
        {
          time: "2022-12-01 02:54:19",
          category: "开工",
          amount: "20 万",
          transcode: "20 万",
          remark: "",
          detail: "20C/-20泥码",
        },
        {
          time: "2022-12-01 02:54:19",
          category: "开工",
          amount: "20 万",
          transcode: "20 万",
          remark: "",
          detail: "20C/-20泥码",
        },
        {
          time: "2022-12-01 02:54:19",
          category: "开工",
          amount: "20 万",
          transcode: "20 万",
          remark: "",
          detail: "20C/-20泥码",
        },
      ],
    };
  },

  async mounted() {
     this.callProposalList();
     this.callCurRoomList();
     this.callSearchCurRoomList();
  },

  methods: {
    opwOpenCloseFun() {
      this.opwOpenClose = !this.opwOpenClose;
      this.aaccount=""
      this.password=""
      this.gambling_proportion=""
      this.commission_proportion=""
      this.dead_chips=0,
      this.regular_chips= 0,
      this.cash_amount= 0,
      this.remark= "",
      this.marker_id= ""
    },

    changeTimeToString(time){
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
    },

    detailOpenCloseFun() {
      this.detailOpenClose = !this.detailOpenClose;
    },
    tipOpenCloseFun() {
      this.tipOpenClose = !this.tipOpenClose;
    },

    callProposalList() {
     

      getProposalList(
        (new Date( this.swork_start_time).getTime())/1000,
        (new Date( this.swork_end_time).getTime())/1000,
        this.page,
        this.pageNum,
        this.room_id,
        this.account,
        this.currency_id,
        this.proposal_status,
        (new Date( this.ework_start_time).getTime())/1000,
        (new Date( this.ework_end_time).getTime())/1000,
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.proposalList = result;
      });
    },

    addProposal() {
      addProposal(
        this.proposal.aaccount,
        this.proposal.password,
        this.proposal.room_id,
        this.proposal.currency_id,
        this.proposal.type,
        this.proposal.gambling_proportion,
        this.proposal.commission_proportion,
        this.proposal.dead_chips,
        this.proposal.regular_chips,
        this.proposal.cash_amount,
        this.proposal.remark,
        this.proposal.marker_id
      ).then((res) => {
        console.log(res);
        if(res.data.code == 1000){
           createToast(res.data.message);
           this.opwOpenClose = !this.opwOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    sworkChangeHandler(){
          if (this.swork_start_time ){
          this.ework_end_time = ""
          this.ework_start_time= ""
      }
     
    },

    eworkChangeHandler(){
       if (this.ework_start_time ){
        this.swork_start_time = ""
        this.swork_end_time =""
      } 
    },

    callSearchCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencySearchList = curResult;
        this.currencySearchList.push({id:0,currency_name:"全部"})
        const roomResult = res.data.data.room;
        this.roomSearchList = roomResult;
        this.roomSearchList.push({id:0,name:"全部"})
      })
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

  },
  watch: {},
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}
table tr td {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
}
table {
  background: #fff none repeat scroll 0 0;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
}
table tr:nth-child(even) {
  background: #ccc;
}
table tr:nth-child(odd) {
  background: #eee;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
