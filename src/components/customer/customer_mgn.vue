<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">客户管理</div>
    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">账号</label>
      </div>
      <div class="col-auto">
        <input type="text" class="form-control w-75" v-model="useraccount" />
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">姓名</label>
      </div>
      <div class="col-auto">
        <input type="text" class="form-control w-75" v-model="username" />
      </div>

      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-toggle="modal"
          @click="ncOpenCloseFun()"
        >
          新增客户
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary ms-2"
          @click="callUserList()"
        >
          查询
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="userList">
      <template #item-operation="item">
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            v-if="item.BindStatus == 0"
            @click="ProxyBindOpenCloseFun(item)"
          >
            绑定代理网
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            v-if="item.BindStatus == 1"
            @click="ProxyOpenCloseFun(item)"
          >
            配置代理网
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="ResetOpenCloseFun(item)"
          >
            重置 App
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="AccountOpenCloseFun(item)"
          >
            户头管理
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="ProposalOpenCloseFun(item.id)"
          >
            提案结果
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            @click="prePrintOpenCloseFun(item)"
          >
            打印marker单
          </button>
        </div>
      </template>
    </EasyDataTable>

    <div
      v-if="ProxyOpenClose"
      class="modal fade show w-auto"
      tabindex="-1"
      style="display: block; left: 35%; top: 30%"
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
              配置代理网
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <div class="form-group">
                  <button
                    class="control-label btn btn-outline-secondary px-5 me-5"
                    type="button"
                    @click="cpOpenCloseFun()"
                  >
                    更改密码
                  </button>
                  <button
                    class="control-label btn btn-outline-secondary px-5 ms-5"
                    type="button"
                    @click="lrOpenCloseFun()"
                  >
                    限红设置
                  </button>
                </div>
              </div>
              <div class="form-row row mt-3">
                <div class="form-group">
                  <button
                    class="control-label btn btn-outline-secondary px-5 me-5"
                    type="button"
                    @click="aglOpenCloseFun()"
                  >
                    代理线设置
                  </button>
                  <button
                    class="control-label btn btn-outline-secondary px-5 ms-5"
                    type="button"
                    @click="tmOpenCloseFun()"
                  >
                    转帐
                  </button>
                </div>
              </div>
            </form>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary d-flex text-center justify-content-center"
              type="button"
              @click="ProxyOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="ResetOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 30%"
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
              重置 App
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >账号 :</label
                >
                <p class="col-2 font-weight-bold" style="width: 8rem">
                  {{ ProxyData.account }}
                </p>
              </div>

              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount">密码</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码"
                  />
                </div>
              </div>

              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >密码确认</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码确认"
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
              @click="AddResetPass()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="ResetOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="proxyBindOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 30%"
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
              绑定代理网
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >代理网账号</label
                  >
                  <!-- <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.account }}
                  </p> -->
                  <input
                    type="text"
                    class="form-control"
                    id="inputAccount"
                    placeholder="代理网账号"
                    v-model="bind_agent.account"
                  />
                </div>
              </div>

              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >代理网密码</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="inputAccount"
                    placeholder="代理网密码"
                    v-model="bind_agent.password"
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
              @click="bindAgent()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="ProxyBindOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="ResetOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 30%"
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
              重置 App
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >账号 :</label
                >
                <p class="col-2 font-weight-bold" style="width: 8rem">
                  {{ProxyData.account}}
                </p>
              </div>

              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount">密码</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码"
                  />
                </div>
              </div>

              <div class="form-row row">
                <div class="form-group required col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >密码确认</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码确认"
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
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="ResetOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <div
      v-if="AccountOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 30%"
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
              户头管理
            </h1>
          </div>
          <div class="modal-body">
            <div class="p-4 form-row row">
              <div class="col-6">
                <div class="form-row row">
                  <label class="control-label col-4" for="inputAccount"
                    >货币类型 :</label
                  >
                  <div class="col-auto">
                    <select
                      class="form-select w-65"
                      aria-label="Default"
                      v-model="currencySelected"
                    >
                      <option
                        v-for="option in currencyList"
                        :value="{ id: option.id, text: option.currency_name }"
                        :key="option.id"
                      >
                        {{ option.currency_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-row row">
                  <label class="control-label col-2" for="inputAccount"
                    >账号 :</label
                  >
                  <p class="col-auto font-weight-bold" style="width: 8rem">
                    {{ ProxyData.cny_balance }}
                  </p>
                </div>
              </div>

              <div class="col-auto">
                <div class="form-row row">
                  <div class="form-group">
                    <button
                      class="control-label btn btn-outline-secondary px-3 me-2"
                      type="button"
                      @click="DpOpenCloseFun()"
                    >
                      存款
                    </button>
                    <button
                      class="control-label btn btn-outline-secondary px-3 ms-2"
                      type="button"
                      @click="WdOpenCloseFun()"
                    >
                      提款
                    </button>
                  </div>
                </div>
                <div class="form-row row mt-2">
                  <div class="form-group">
                    <button
                      class="control-label btn btn-outline-secondary px-3 me-2"
                      type="button"
                      @click="TfOpenCloseFun()"
                    >
                      转帐
                    </button>
                    <button
                      class="control-label btn btn-outline-secondary px-3 ms-2"
                      type="button"
                      @click="exOpenCloseFun()"
                    >
                      换汇
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="AccountOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="prePrintOpenClose"
      class="modal fade show w-full"
      tabindex="-1"
      style="display: block; left: 0%; top: 3%"
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
              打印 Marker 单
            </h1>
          </div>

          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row col-md-auto">
                <div class=" border-secondary row rounded">
                  <label class="col-auto mt-2">名称</label>
                  <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.name }}
                  </p>
                </div>

                <div class=" border-secondary row rounded">
                  <label class="col-auto mt-2">账号</label>
                  <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.account }}
                  </p>
                </div>

                <div
                  class=" border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">货币类型</p>
                    <div class="col-4 ms-4 mt-1">
                      <select
                        class="form-select"
                        aria-label="Default"
                        v-model="preprint.currency_id"
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

                <div
                  class=" border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">金额</p>
                    <div class="col-auto mt-1">
                      <input
                        type="number"
                        class="form-control"
                        id="inputAccount"
                        v-model="preprint.money"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class=" border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">利息</p>
                    <div class="col-auto mt-1">
                      <input
                        type="number"
                        class="form-control"
                        id="inputAccount"
                        v-model="preprint.interest_rate"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class=" border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">备注</p>
                    <div class="col-auto mt-1">
                      <input
                        type="email"
                        class="form-control"
                        id="inputAccount"
                        v-model="preprint.remark"
                      />
                    </div>
                  </div>
                  <div
                    class="md-form md-outline input-with-post-icon datepicker"
                  >
                  <div class="row col-12">
                    <label class="col-auto mt-2" for="example">还款日期</label>
                    <div class="col-auto mt-1">

                    <input
                      placeholder="Select date"
                      v-model="preprint.deadline"
                      type="date"
                      id="example"
                      class="form-control"
                    />
                  </div>

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
              @click="printMarker()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex text-center justify-content-center"
              type="button"
              @click="prePrintOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="PrintOpenClose"
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
              打印marker单
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="container">
                <div class="card">
                  <div class="card-header">
                    日期 Date:2022-12-09 15:15
                    <strong>01/01/01/2018</strong>
                    <span class="float-right ms-5">
                      <strong>编号 No:</strong> 1981620</span
                    >
                  </div>
                  <div class="card-body">
                    <div class="row mb-0">
                      <div class="col-sm-12">
                        <div class="text-center">
                          <strong>借款单 I.O.U RECEIPT</strong>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive-sm">
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">借款人</p>
                                <p class="m-0 p-0">Borrower</p>
                              </div>
                            </td>
                            <td class="center strong text-center my-auto">
                              <p class="p-0 m-0">1111111</p>
                            </td>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">借款户口</p>
                                <p class="m-0 p-0">Loan Account</p>
                              </div>
                            </td>

                            <td class="right">YQ13579</td>
                          </tr>
                          <tr>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">借款金额</p>
                                <p class="m-0 p-0">Loan Account</p>
                              </div>
                            </td>
                            <td class="center text-center">1 万</td>
                            <td class="left">
                              <div>
                                <p class="m-0 p-0">借款币种</p>
                                <p class="m-0 p-0">Loan Currency</p>
                              </div>
                            </td>

                            <td class="right">菲币</td>
                          </tr>
                          <tr>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">借款金额（大写）</p>
                                <p class="m-0 p-0">Loan amount</p>
                              </div>
                            </td>
                            <td class="left text-center">壹万元整</td>

                            <td class="center"></td>
                            <td class="right"></td>
                          </tr>
                          <tr>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">还款日期·</p>
                                <p class="m-0 p-0">Repayment date</p>
                              </div>
                            </td>
                            <td class="left text-center">2023-01-08</td>
                            <td class="left">
                              <p class="m-0 p-0">违约利息</p>
                              <p class="m-0 p-0">Default interest</p>
                            </td>

                            <td class="right">1%</td>
                          </tr>

                          <tr>
                            <td class="center">
                              <div>
                                <p class="m-0 p-0">备注</p>
                                <p class="m-0 p-0">Remark</p>
                              </div>
                            </td>
                            <td class="left text-center">132</td>

                            <td class="center"></td>
                            <td class="right"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center text-danger">
                      notice: some long text some long text some long text long
                      text some long text
                    </div>

                    <div class="row">
                      <div class="col-4">
                        <p class="m-0 p-0">经办人签章</p>
                        <hr class="divider m-1 p-0 text-black" />
                        <hr class="divider m-0 p-0 text-black" />
                      </div>
                      <div class="col-4">
                        <p class="m-0 p-0">出纳签章</p>
                        <hr class="divider m-1 p-0 text-black" />
                        <hr class="divider m-0 p-0 text-black" />
                      </div>
                      <div class="col-4">
                        <p class="m-0 p-0">借款人签章</p>
                        <hr class="divider m-1 p-0 text-black" />
                        <hr class="divider m-0 p-0 text-black" />
                      </div>
                    </div>

                    <div class="text-center">
                      notice: some long text some long text some long text long
                      text some long text
                    </div>

                    <!-- <div class="row">
                      <div class="col-lg-4 col-sm-5"></div>

                      <div class="col-lg-4 col-sm-5 ml-auto">
                        <table class="table table-clear">
                          <tbody>
                            <tr>
                              <td class="left">
                                <strong>Subtotal</strong>
                              </td>
                              <td class="right">$8.497,00</td>
                            </tr>
                            <tr>
                              <td class="left">
                                <strong>Discount (20%)</strong>
                              </td>
                              <td class="right">$1,699,40</td>
                            </tr>
                            <tr>
                              <td class="left">
                                <strong>VAT (10%)</strong>
                              </td>
                              <td class="right">$679,76</td>
                            </tr>
                            <tr>
                              <td class="left">
                                <strong>Total</strong>
                              </td>
                              <td class="right">
                                <strong>$7.477,36</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </form>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="PrintOpenCloseFun()"
            >
              关闭
            </button>
            <button
              class="btn btn-primary d-flex justify-content-center"
              type="button"
            >
              纯文字
            </button>
            <button
              class="btn btn-primary d-flex justify-content-center"
              type="button"
            >
              文字+底稿
            </button>
            <button
              class="btn btn-primary d-flex justify-content-center"
              type="button"
            >
              纯底稿
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="ProposalOpenClose"
      class="modal fade show"
      tabindex="-1"
      style="display: block; left: 3%; top: 3%"
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
              提案结算
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <div class="col-auto">
                  <label for="account" class="col-form-label">借款时间</label>
                </div>
                <div class="col-md-auto row">
                  <div
                    class="md-form md-outline input-with-post-icon datepicker col-md-auto"
                  >
                    <input
                      placeholder="Select date"
                      type="date"
                      id="example"
                      class="form-control"
                    />
                  </div>
                  <span class="col-1">~</span>
                  <div
                    class="md-form md-outline input-with-post-icon datepicker col-md-auto"
                  >
                    <input
                      placeholder="Select date"
                      type="date"
                      id="example"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-auto">
                  <label for="account" class="col-form-label">收工时间</label>
                </div>
                <div class="col-md-auto row">
                  <div
                    class="md-form md-outline input-with-post-icon datepicker col-md-auto"
                  >
                    <input
                      placeholder="Select date"
                      type="date"
                      id="example"
                      class="form-control"
                    />
                  </div>
                  <span class="col-1">~</span>
                  <div
                    class="md-form md-outline input-with-post-icon datepicker col-md-auto me-2"
                  >
                    <input
                      placeholder="Select date"
                      type="date"
                      id="example"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-auto my-2">
                  <button type="button" class="btn btn-outline-secondary">
                    批量結算
                  </button>
                  <button type="button" class="btn btn-outline-secondary ms-1">
                    查询
                  </button>
                </div>
                <EasyDataTable
                  :headers="proposalHeaders"
                  :items="proposalItems"
                />
              </div>
            </form>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary d-flex text-center justify-content-center"
              type="button"
              @click="ProposalOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="cpOpenClose"
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
              更改代理网密码
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <div class="form-group col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >代理网账号</label
                  >
                  <p>{{ ProxyData.account }}</p>
                </div>
              </div>

              <div class="form-row row">
                <div class="form-group col-md-auto">
                  <label class="control-label" for="inputAccount"
                    >代理网密码</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="inputAccount"
                    placeholder="代理网密码"
                    v-model="proxyPassword"
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
              @click="updateAgentPassword()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex text-center justify-content-center"
              type="button"
              @click="cpOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="lrOpenClose"
      class="modal fade show w-full"
      tabindex="-1"
      style="display: block; left: 0%; top: 3%"
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
              更改个人限红
            </h1>
          </div>

          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row col-md-auto">
                <div class="border border-secondary row rounded">
                  <label class="col-auto mt-2">代理网账号</label>
                  <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.account }}
                  </p>
                </div>
              </div>

              <div class="form-row row col-md-auto">
                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <p class="col-auto mt-2 m-auto">游戏限红</p>
                </div>
                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <p class="col-auto mt-2 mx-auto">代理限红</p>
                </div>
              </div>

              <div class="form-row row col-md-auto">
                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <div class="row">
                    <p class="col-4 mt-2">庄/闲</p>
                    <p class="col-4 mt-2">和</p>
                    <p class="col-3 mt-2">对子</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <div class="row">
                    <input
                      class="form-check-input p-2 m-auto mt-3"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <p class="col-4 mt-2">庄/闲</p>
                    <p class="col-4 mt-2">和</p>
                    <p class="col-3 mt-2">对子</p>
                  </div>
                </div>
              </div>

              <div class="form-row row col-md-auto">
                <virtual-list
                  class="col-6 mt-2 row list"
                  style="height: 360px; overflow-y: auto"
                  :data-key="'id'"
                  :data-sources="listitems"
                  :data-component="itemComponent"
                  :estimate-size="50"
                />

                <virtual-list
                  class="col-6 mt-2 row list"
                  style="height: 360px; overflow-y: auto"
                  :data-key="'id'"
                  :data-sources="listitems"
                  :data-component="itemComponent"
                  :estimate-size="50"
                />
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
              @click="lrOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="aglOpenClose"
      class="modal fade show w-full"
      tabindex="-1"
      style="display: block; left: 0%; top: 3%"
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
              设置代理线
            </h1>
          </div>

          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row col-md-auto">
                <div class="border border-secondary row rounded">
                  <label class="col-auto mt-2">代理网账号</label>
                  <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.account }}
                  </p>
                </div>
              </div>

              <div class="form-row row col-md-auto">
                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <p class="col-auto mt-2 m-auto">代理线</p>
                </div>
                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <p class="col-auto mt-2 mx-auto">代理线新增</p>
                </div>
              </div>

              <div class="form-row row col-md-auto">
                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <div class="row">
                    <p class="col-4 mt-2">币别</p>
                    <p class="col-4 mt-2">占成</p>
                    <p class="col-3 mt-2">码佣</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <div class="row col-12">
                    <p class="col-2 mt-2">币别</p>
                    <div class="col-6 mt-1">
                      <select
                        class="form-select"
                        aria-label="Default"
                        v-model="agent.currency_id"
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

                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <div class="row">
                    <p class="col-4 mt-2">人民币</p>
                    <p class="col-4 mt-2">0%</p>
                    <p class="col-3 mt-2">0%</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <div class="row col-12">
                    <p class="col-2 mt-2">占成</p>
                    <div class="col-6 mt-1">
                      <div class="col-auto">
                        <input
                          type="number"
                          class="form-control"
                          id="inputAccount"
                          v-model="agent.bet_against_per"
                        />
                      </div>
                    </div>
                    <span class="col-auto my-auto">%</span>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row col-6 mt-2 text-center"
                >
                  <div class="row">
                    <p class="col-4 mt-2">菲币</p>
                    <p class="col-4 mt-2">0%</p>
                    <p class="col-3 mt-2">0%</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row col-md-6 mt-2 text-center ms-3"
                >
                  <div class="row col-12">
                    <p class="col-2 mt-2">码佣</p>
                    <div class="col-6 mt-1">
                      <div class="col-auto">
                        <input
                          type="number"
                          class="form-control"
                          id="inputAccount"
                          v-model="agent.commission_per"
                        />
                      </div>
                    </div>
                    <span class="col-auto my-auto">%</span>
                  </div>
                </div>
              </div>
            </form>
            <slot></slot>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="col-auto mt-2 btn btn-outline-dark rounded"
              @click="addAgent()"
            >
              新增
            </button>
            <button
              class="btn btn-danger d-flex text-center justify-content-center"
              type="button"
              @click="aglOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="tmOpenClose"
      class="modal fade show w-full"
      tabindex="-1"
      style="display: block; left: 0%; top: 3%"
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
              代理网转账
            </h1>
          </div>

          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row col-md-auto">
                <div class="border border-secondary row rounded">
                  <label class="col-auto mt-2">代理网账号</label>
                  <p class="col-auto mt-2 font-weight-bold">
                    {{ ProxyData.account }}
                  </p>
                </div>

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">操作贵宾厅</p>
                    <div class="col-4 ms-4 mt-1">
                      <select
                        class="form-select"
                        aria-label="Default"
                        v-model="aglNetTran.room_id"
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

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">货币类型</p>
                    <div class="col-4 ms-4 mt-1">
                      <select
                        class="form-select"
                        aria-label="Default"
                        v-model="aglNetTran.currency_id"
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

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">转帐类型</p>
                    <div class="col-4 ms-4 mt-1">
                      <select
                        class="form-select"
                        aria-label="Default"
                        v-model="aglNetTran.transfer_type"
                      >
                        <option
                          v-for="option in transferList"
                          :value="option.id"
                          :key="option.id"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">帐房当前额度</p>
                    <p class="col-4 mt-2">0</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">代理网当前额度</p>
                    <p class="col-4 mt-2">0</p>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">客户密码</p>
                    <div class="col-auto mt-1">
                      <input
                        type="email"
                        class="form-control"
                        id="inputAccount"
                        v-model="aglNetTran.cust_password"
                      />
                    </div>
                    <div class="col-auto">
                      <button class="mt-2 border border-secondary rounded me-1">
                        电话脸证
                      </button>
                      <button class="mt-2 border border-secondary rounded me-1">
                        短信脸证
                      </button>
                      <button class="mt-2 border border-secondary rounded">
                        APP 脸证
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  class="border border-secondary rounded row mt-2 text-center"
                >
                  <div class="row col-12">
                    <p class="col-auto mt-2">转帐额度</p>
                    <div class="col-auto mt-1">
                      <input
                        type="email"
                        class="form-control"
                        id="inputAccount"
                        v-model="aglNetTran.tran_money"
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
              @click="addAgentTranfer()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex text-center justify-content-center"
              type="button"
              @click="tmOpenCloseFun()"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="DpOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 30%"
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
              存款
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <label class="control-label col-4" for="inputAccount"
                  >货币类型</label
                >
                <p class="col-6 font-weight-bold" style="width: 8rem">
                  {{ currencySelected.text }}
                </p>
              </div>

              <div class="form-row row">
                <label class="control-label col-4" for="inputAccount"
                  >贵宾厅</label
                >
                <div class="col-6">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    v-model="Deposit.roomSelected"
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
                <label class="control-label col-4" for="inputAccount"
                  >金额</label
                >
                <div class="col-6">
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="金额"
                    v-model="Deposit.money"
                  />
                </div>
                <span class="col-1 mt-1">万</span>
              </div>

              <div class="form-row row mt-2">
                <label class="control-label col-4" for="inputAccount"
                  >备注</label
                >
                <div class="col-6">
                  <textarea
                    class="form-control col-6"
                    rows="4"
                    v-model="Deposit.remark"
                  ></textarea>
                </div>

                <!-- <div class="row">
                  <div class="col-5"></div>
                  <div class="form-check col-6">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      电汇
                    </label>
                  </div>
                </div> -->
              </div>
            </form>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary d-flex justify-content-center"
              type="button"
              @click="deposit()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="DpOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="WdOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 20%"
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
              提款
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >货币类型</label
                >
                <p class="col-6 font-weight-bold" style="width: 8rem">
                  {{ currencySelected.text }}
                </p>
              </div>

              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >贵宾厅</label
                >
                <div class="col-6">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    v-model="Withdraw.room_id"
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
                  >金额</label
                >
                <div class="col-4">
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="金额"
                    v-model="Withdraw.money"
                  />
                </div>
                <span class="col-1 mt-1">万</span>
              </div>

              <!-- <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >接收帐户</label
                >
                <div class="col-4">
                  <input
                    type="number"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码确认"
                    v-model="Withdraw.receive_account"
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
              </div> -->

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >备注</label
                >
                <div class="col-6">
                  <textarea
                    class="form-control col-6"
                    rows="4"
                    v-model="Withdraw.remark"
                  ></textarea>
                </div>

                <div class="row">
                  <div class="col-3"></div>
                  <div class="form-check col-6">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      电汇
                    </label>
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
              @click="withdraw()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="WdOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="TfOpenClose"
      class="modal fade show w-50"
      tabindex="-1"
      style="display: block; left: 25%; top: 20%"
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
              转账
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >货币类型</label
                >
                <p class="col-6 font-weight-bold" style="width: 8rem">
                  {{ currencySelected.text }}
                </p>
              </div>

              <div class="form-row row">
                <label class="control-label col-2" for="inputAccount"
                  >贵宾厅</label
                >
                <div class="col-6">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    v-model="Transfer.room_id"
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
                  >收款方账号</label
                >
                <div class="col-4">
                  <input
                    type="text"
                    class="form-control"
                    id="inputAccount"
                    v-model="Transfer.receive_account"
                    placeholder="收款方账号"
                  />
                </div>
              </div>

              <!-- <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >收款方型姓名</label
                >
                <div class="col-4">
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="密码确认"
                  />
                </div>
              </div> -->

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >金额</label
                >
                <div class="col-4">
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    v-model="Transfer.money"
                    placeholder="金额"
                  />
                </div>
                <span class="col-1 mt-1">万</span>
              </div>

              <!-- <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >金额</label
                >
                <div class="col-4">
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="金额"
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
              </div> -->

              <div class="form-row row mt-2">
                <label class="control-label col-2" for="inputAccount"
                  >备注</label
                >
                <div class="col-6">
                  <textarea
                    class="form-control col-6"
                    rows="4"
                    v-model="Transfer.remark"
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
              @click="transfer()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="TfOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="ncOpenClose"
      class="modal fade show w-200"
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
              新加客户
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
                    v-model="account"
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
                    v-model="name"
                  />
                </div>
                <!-- <div class="form-group col-md-6"></div> -->
                <!-- <div class="form-group required col-md-6 mt-4">
                  <input
                    type="email"
                    class="form-control"
                    id="inputhPhone"
                    placeholder=""
                  />
                </div> -->

                <!-- <div
                  class="md-form md-outline input-with-post-icon datepicker col-md-6 mt-4"
                >
                  <label for="example">出生日期</label>
                  <input
                    placeholder="Select date"
                    v-model="birthday"
                    type="date"
                    id="example"
                    class="form-control"
                  />
                </div> -->

                <div class="form-group col-md-6 m-auto p-auto mt-4">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >主要联络电话</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >短信</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option
                        v-for="option in idOptions"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label class="control-label" for="inputFName">联络电话</label>
                  <input
                    type="phone"
                    class="form-control"
                    id="inputFName"
                    placeholder="联络电话"
                    v-model="telephone"
                  />
                </div>

                <div class="form-group col-md-6 m-auto p-auto mt-4">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >主要联络电话</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >短信</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option
                        v-for="option in idOptions"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- <div class="form-group col-md-4 mt-2">
                  <label class="control-label" for="uploading-image"
                    >选择个人照片</label
                  >
                  <div>
                    <img
                      v-if="personalPhoto"
                      :src="personalPhoto"
                      class="uploading-image mw-100"
                    />
                    <input
                      type="file"
                      accept="image/jpeg"
                      @change="uploadPersonalImage"
                    />
                  </div>
                  <div v-if="personalPhoto">
                    <button class="btn btn-outline-dark" @click="removeImage()">
                      删除图像
                    </button>
                  </div>
                </div> -->

                <div class="form-group col-md-4 mt-2">
                  <label id="preview" for="file-upload">
                    <img
                      class="mw-100"
                      :key="personalPhoto"
                      v-if="personalPhoto"
                      :src="personalPhoto"
                    />
                  </label>
                  <div class="file-upload">
                    <label class="file-upload-button" for="file-upload"
                      >选择个人照片</label
                    >
                    <input
                      type="file"
                      id="file-upload"
                      @change="uploadPersonalImageHandle"
                    />
                  </div>
                  <div v-if="personalPhoto">
                    <button class="btn btn-outline-dark" @click="removeImage()">
                      删除图像
                    </button>
                  </div>
                </div>

                <div class="form-group col-md-6 m-auto p-auto mt-4">
                  <!-- <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >主要联络电话</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >短信</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>中文</option>
                      <option value="1">英语</option>
                      <option value="2">韩语</option>
                    </select>
                  </div> -->
                </div>

                <div class="form-group col-md-4">
                  <label class="control-label">证件类型</label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    v-model="id_type"
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
                  <label class="control-label" for="inputmPhone"
                    >证件编号</label
                  >
                  <input
                    type="phone"
                    class="form-control"
                    id="inputmPhone"
                    placeholder="证件编号"
                    v-model="id_num"
                  />
                </div>

                <!-- <div class="form-group col-md-4 mt-2">
                  <label class="control-label" for="inputmPhone"
                    >证件照片</label
                  >
                  <div>
                    <img
                      v-if="previewImage"
                      :src="previewImage"
                      class="uploading-image mw-100"
                    />
                    <input
                      type="file"
                      accept="image/jpeg"
                      @change="uploadImage"
                    />
                  </div>
                  <div v-if="previewImage">
                    <button class="btn btn-outline-dark" @click="removeImage()">
                      删除图像
                    </button>
                  </div>
                </div> -->

                <div class="form-group col-md-4 mt-2">
                  <label id="id-preview" for="file-id-upload">
                    <img
                      class="mw-100"
                      :key="idPhoto"
                      v-if="idPhoto"
                      :src="idPhoto"
                    />
                  </label>
                  <div class="file-id-upload">
                    <label class="file-upload-button" for="file-id-upload"
                      >选择证件照片</label
                    >
                    <input
                      type="file"
                      id="file-id-upload"
                      @change="uploadIdImageHandle"
                    />
                  </div>
                  <div v-if="idPhoto">
                    <button
                      class="btn btn-outline-dark"
                      @click="removeIdImage()"
                    >
                      删除图像
                    </button>
                  </div>
                </div>

                <div class="form-group ml-lg-4 col-md-6"></div>

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
                    data-toggle="modal"
                    @click="CountryOpenCloseFun()"
                  ></span>
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
                      selected
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>

                <div class="form-group col-md-4">
                  <label class="control-label" for="inputFName"
                    >占成比上限</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="inputFName"
                    placeholder="占成比上限"
                    v-model="bet_against_per_max"
                  />
                </div>
                <span class="col-md-1 my-auto mt-4">%</span>

                <div class="form-group col-md-4" style="margin-left: 5rem">
                  <label class="control-label" for="inputFName">码粮上限</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputFName"
                    placeholder="码粮上限"
                    v-model="commission_per_max"
                  />
                </div>
                <span class="col-md-1 my-auto mt-4">%</span>

                <div class="form-group col-md-4">
                  <label class="control-label" for="inputFName">利息下限</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputFName"
                    placeholder="利息下限"
                    v-model="interest_per_max"
                  />
                </div>
                <span class="col-md-1 my-auto mt-4">%</span>

                <div
                  class="md-form md-outline input-with-post-icon datepicker col-md-4"
                  style="margin-left: 5rem"
                >
                  <label for="example">出生日期</label>
                  <input
                    placeholder="Select date"
                    type="date"
                    id="example"
                    class="form-control"
                    v-model="birthday"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label class="control-label" for="inputmPhone"
                    >联络地址</label
                  >
                  <input
                    type="phone"
                    class="form-control"
                    id="inputmPhone"
                    placeholder="联络地址"
                    v-model="address"
                  />
                </div>

                <div class="form-group col-md-4"></div>

                <div class="form-group col-md-6">
                  <label class="control-label" for="inputmPhone">备注</label>
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="attach"
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
              @click="addUser()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="ncOpenCloseFun()"
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
      v-if="AddOpenClose"
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
                  <label class="control-label" for="inputAccount">名称</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputAccount"
                    placeholder="名称"
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
      v-if="exOpenClose"
      class="modal fade show w-200"
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
              换汇
            </h1>
          </div>
          <div class="modal-body">
            <form class="p-4">
              <div class="form-row row">
                <div class="form-group col-md-5">
                  <label class="control-label" for="inputAccount"
                    >换汇贵宾厅</label
                  >
                  <div class="form-check form-check-inline col-6">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      v-model="Exchange.room_id"
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

                <div class="col-auto">
                  <label>馀额</label>
                  <span class="ms-4">0</span>
                </div>

                <div class="form-group col-md-6 text-center">
                  <label class="control-label" for="inputAccount"
                    >卖出数量</label
                  >
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="number"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.from_amount"
                    />
                  </div>
                </div>

                <div class="form-group col-md-5">
                  <label class="control-label" for="inputAccount"
                    >卖出币种</label
                  >
                  <div class="form-check form-check-inline col-6">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      v-model="Exchange.to_currency"
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

                <div class="col-1"></div>

                <div class="form-group col-md-6 text-center my-auto">
                  <label class="control-label" for="inputAccount">误差值</label>
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.deviation_from"
                    />
                  </div>
                </div>

                <div class="col-6"></div>

                <div class="form-group col-md-5 text-center my-auto">
                  <label class="control-label" for="inputAccount">总额</label>
                  <div class="form-check form-check-inline col-6">0</div>
                </div>

                <div class="form-group col-md-5">
                  <label class="control-label" for="inputAccount">汇率</label>
                  <span class="">(卖出)</span>
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.exchange_rate_from"
                    />
                  </div>
                  <span>1</span>
                </div>

                <div class="col-auto">
                  <label>(买入)</label>
                  <span class="ms-4">25</span>
                </div>

                <div class="form-group col-md-auto text-center">
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="number"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.exchange_rate_to"
                    />
                  </div>
                  <label>实际汇率</label>
                  <span>1:25</span>
                </div>

                <div class="form-group col-md-5 mt-2">
                  <label class="control-label" for="inputAccount"
                    >卖出币种</label
                  >
                  <div class="form-check form-check-inline col-6">
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      v-model="Exchange.to_currency"
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

                <div class="col-auto mt-2">
                  <label>馀额</label>
                  <span class="ms-4">0</span>
                </div>

                <div class="form-group col-md-6 text-center mt-1">
                  <label class="control-label" for="inputAccount"
                    >买入数量</label
                  >
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="number"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.from_amount"
                    />
                  </div>
                </div>

                <div class="col-6"></div>

                <div class="form-group col-md-6 text-center my-auto">
                  <label class="control-label" for="inputAccount">误差值</label>
                  <div class="form-check form-check-inline col-6">
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword"
                      v-model="Exchange.deviation_to"
                    />
                  </div>
                </div>

                <div class="col-6"></div>

                <div class="form-group col-md-5 text-center my-auto">
                  <label class="control-label" for="inputAccount">总额</label>
                  <div class="form-check form-check-inline col-6">0</div>
                </div>

                <div class="form-group col-md-4">
                  <label class="control-label" for="inputFName">客户密码</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputFName"
                    placeholder=""
                  />
                </div>

                <div class="form-group col-md-6 mt-4">
                  <div class="form-check form-check-inline">
                    <button class="btn btn-outline-dark">电话验证</button>
                  </div>
                  <div class="form-check form-check-inline">
                    <button class="btn btn-outline-dark">短息验证</button>
                  </div>
                  <div class="form-check form-check-inline">
                    <button class="btn btn-outline-dark">APP验证</button>
                  </div>
                </div>

                <div class="form-group col-md-12">
                  <label class="control-label" for="inputmPhone">备注</label>
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="Exchange.remark"
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
              @click="exchange()"
            >
              确定
            </button>
            <button
              class="btn btn-danger d-flex justify-content-center"
              type="button"
              @click="exOpenCloseFun()"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import VirtualList from "vue3-virtual-scroll-list";
import { getData } from "./data";
import {
  exchange,
  getCacList,
  getUserList,
  getCurRoomList,
} from "../../network/api";
import { addAgent } from "../../network/api";
import { bindAgent } from "../../network/api";
import { deposit } from "../../network/api";
import { withdraw } from "../../network/api";
import { transfer } from "../../network/api";
import {
  updateAgentPassword,
  addCertificate,
  uploadImage,
  printMarker
} from "../../network/api";
import { addUser } from "../../network/api";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "AddCustomer",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  props: {
    visible: Boolean,
  },

  data() {
    return {
      ProxyOpenClose: this.visible,
      AddOpenClose: this.visible,
      proxyBindOpenClose: this.proxyBindOpenClose,
      ResetOpenClose: this.visible,
      AccountOpenClose: this.visible,
      PrintOpenClose: this.visible,
      prePrintOpenClose: this.visible,
      ProposalOpenClose: this.visible,
      cpOpenClose: this.visible,
      lrOpenClose: this.visible,
      aglOpenClose: this.visible,
      tmOpenClose: this.visible,
      ncOpenClose: this.visible,
      DpOpenClose: this.visible,
      WdOpenClose: this.visible,
      TfOpenClose: this.visible,
      exOpenClose: this.visible,
      CertOpenClose: this.visible,
      CountryOpenClose: this.visible,

      userList: [],
      currencyList: [],
      roomList: [],
      certiList: [],
      citizenList: [],

      username: "",
      useraccount: "",
      userid: "",
      currencySelected: 1,
      account_currency: 1,

      uid: "1",

      genderOptions: [
        { id: 1, text: "男" },
        { id: 2, text: "女" },
      ],

      // add agent
      agent: {
        currency_id: 1,
        bet_against_per: "",
        commission_per: "",
      },

      // 绑定代理网账户
      bind_agent: {
        account: "",
        password: "",
      },

      // 存款
      Deposit: {
        // currencySelected:"1",
        roomSelected: 1,
        money: "",
        remark: "",
      },

      // 提现
      Withdraw: {
        room_id: 1,
        money: "",
        remark: "",
      },

      // 转账
      Transfer: {
        currency_id: 1,
        room_id: 1,
        money: "",
        remark: "",
        receive_account: "",
      },

      aglNetTran: {
        room_id: 1,
        currency_id: 1,
      },

      preprint: {
        currency_id: 1,
        money: "",
        interest_rate: "",
        remark: "",
        deadline: new Date().toISOString().slice(0, 10),
      },

      // 换汇
      Exchange: {
        room_id: 1,
        from_currency: "",
        from_amount: "1",
        to_currency: "1",
        to_amount: "",
        deviation_from: "",
        deviation_to: "",
        exchange_rate_from: "",
        exchange_rate_to: "",
        original_exchange_rate_from: "",
        original_exchange_rate_to: "",
        remark: "",
      },

      // 新加客户
      account: "",
      password: "",
      name: "",
      bet_against_per_max: "",
      commission_per_max: "",
      interest_per_max: "",
      gender: 1,
      birthday: new Date().toISOString().slice(0, 10),
      personalPhoto: "",
      country: 1,
      id_type: 1,
      id_num: "",
      id_photo: "",
      telephone: "",
      address: "",
      attach: "",

      proxyPassword: "",
      idPhoto: "",

      Certificate: {
        ch_name: "",
        en_name: "",
      },

      Country: {
        ch_name: "",
        en_name: "",
      },

      itemComponent: Item,
      listitems: getData(1000),

      headers: [
        { text: "姓名", value: "name", sortable: true },
        { text: "账号", value: "account", sortable: true },
        { text: "菲币馀额", value: "php_balance", sortable: true },
        { text: "人民币馀额", value: "cny_balance", sortable: true },
        { text: "港币馀额", value: "hkd_balance", sortable: true },
        { text: "美金馀额", value: "usd_balance", sortable: true },
        { text: "", value: "operation" },
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
      ProxyData: {},
    };
  },

  components: { "virtual-list": VirtualList },
  methods: {
    AddOpenCloseFun() {
      this.AddOpenClose = !this.AddOpenClose;
    },
    ProxyOpenCloseFun(data) {
      this.ProxyOpenClose = !this.ProxyOpenClose;
      this.ProxyData = data;
    },
    ProxyBindOpenCloseFun(data) {
      console.log(data);
      this.bind_agent.password = "";
      this.proxyBindOpenClose = !this.proxyBindOpenClose;
      this.ProxyData = data;

      // this.uid = id;
      // getUserListbyid()
    },

    CountryOpenCloseFun() {
      this.CountryOpenClose = !this.CountryOpenClose;
    },

    ResetOpenCloseFun(data) {
      this.ProxyData = data;
      this.ResetOpenClose = !this.ResetOpenClose;
    },
    AccountOpenCloseFun(data) {
      this.AccountOpenClose = !this.AccountOpenClose;
      this.ProxyData = data;
    },

    CertOpenCloseFun() {
      this.CertOpenClose = !this.CertOpenClose;
    },

    PrintOpenCloseFun(data) {
      this.PrintOpenClose = !this.PrintOpenClose;
    },

    prePrintOpenCloseFun(data) {
      this.prePrintOpenClose = !this.prePrintOpenClose;
      this.ProxyData = data;
      this.preprint.password ="";
      this.preprint.money="";
      this.preprint.interest_rate="";
      this.preprint.remark="";
    },

    ProposalOpenCloseFun(data) {
      this.ProposalOpenClose = !this.ProposalOpenClose;
    },
    cpOpenCloseFun() {
      this.proxyPassword = "";
      this.cpOpenClose = !this.cpOpenClose;
    },
    lrOpenCloseFun() {
      this.lrOpenClose = !this.lrOpenClose;
    },
    aglOpenCloseFun() {
      this.aglOpenClose = !this.aglOpenClose;
      this.agent.bet_against_per = "";
      this.agent.commission_per = "";
    },
    tmOpenCloseFun() {
      this.tmOpenClose = !this.tmOpenClose;
    },
    ncOpenCloseFun() {
      this.ncOpenClose = !this.ncOpenClose;
      this.account = "";
      this.name = "";
      this.password = "";
      this.bet_against_per_max = "";
      this.commission_per_max = "";
      this.interest_per_max = "";
      this.birthday = new Date().toISOString().slice(0, 10);
      this.photo = "";
      this.id_num = "";
      this.id_photo = "";
      this.telephone = "";
      this.address = "";
      this.attach = "";
    },
    DpOpenCloseFun() {
      this.DpOpenClose = !this.DpOpenClose;
      this.Deposit.money = "";
      this.Deposit.remark = "";
    },
    WdOpenCloseFun() {
      this.WdOpenClose = !this.WdOpenClose;
      this.Withdraw.money = "";
      this.Withdraw.remark = "";
    },
    TfOpenCloseFun() {
      this.TfOpenClose = !this.TfOpenClose;
      this.Transfer.money = "";
      this.Transfer.remark = "";
      this.Transfer.receive_account = "";
    },
    exOpenCloseFun() {
      this.exOpenClose = !this.exOpenClose;
      this.Exchange.from_currency = "";
      this.Exchange.to_amount = "";
      this.Exchange.deviation_from = "";
      this.Exchange.deviation_to = "";
      this.Exchange.exchange_rate_from = "";
      this.Exchange.exchange_rate_to = "";
      this.Exchange.original_exchange_rate_from = "";
      this.Exchange.original_exchange_rate_to = "";
      this.Exchange.remark = "";
    },
    callUserList() {
      getUserList(this.useraccount, this.username).then((res) => {
        if (res.data.code == 1000) {
          const result = res.data.data.data;
          this.userList = result;
          console.warn(result);
        } else {
          createToast(res.data.message);
        }
      });
    },

    // uploadPersonalImage(e) {
    //   const image = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onload = (e) => {
    //     this.personalPhoto = e.target.result;
    //     console.log(this.personalPhoto);
    //   };
    // },

    removeImage() {
      this.personalPhoto = null;
      this.photo = "";
    },

    removeIdImage() {
      this.idPhoto = null;
      this.id_photo = "";
    },

    async addCertificate() {
      addCertificate(this.Certificate.ch_name, this.Certificate.en_name).then(
        (res) => {
          console.log(res);
          createToast(res.data.message);
          this.Certificate.ch_name = "";
          this.Certificate.en_name = "";
          this.callCacList();
          this.CertOpenClose = !this.CertOpenClose;
        }
      );
    },

    async addCountry() {
      addCountry(this.Country.ch_name, this.Country.en_name).then((res) => {
        console.log(res);
        createToast(res.data.message);
        (this.Country.ch_name = ""),
          (this.Country.en_name = ""),
          this.callCacList();
        this.CountryOpenClose = !this.CountryOpenClose;
      });
    },

    async addAgent() {
      addAgent(
        this.ProxyData.id,
        this.agent.currency_id,
        this.agent.bet_against_per,
        this.agent.commission_per
      ).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          this.agent.bet_against_per = "";
          this.agent.commission_per = "";
          this.aglOpenClose = !this.aglOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async printMarker() {
      printMarker(
        this.ProxyData.account,
        this.ProxyData.password,
        this.preprint.currency_id,
        this.preprint.money,
        new Date( this.preprint.deadline).getTime() / 1000,
        this.preprint.interest_rate,
        this.preprint.remark
      ).then((res) => {
        if (res.data.code == 1000) {
          createToast(res.data.message);
          this.prePrintOpenClose = !this.prePrintOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async bindAgent() {
      bindAgent(
        this.ProxyData.id,
        this.ProxyData.account,
        this.bind_agent.password
      ).then((res) => {
        //  console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          this.bind_agent.account = "";
          this.bind_agent.password = "";
          this.proxyBindOpenClose = !this.proxyBindOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async deposit() {
      deposit(
        this.uid,
        this.currencySelected.id,
        this.Deposit.roomSelected,
        this.Deposit.money,
        this.Deposit.remark
      ).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          (this.Deposit.roomSelected = ""),
            (this.Deposit.money = ""),
            (this.Deposit.remark = ""),
            (this.DpOpenClose = !this.DpOpenClose);
        } else {
          createToast(res.data.message);
        }
      });
    },

    async withdraw() {
      withdraw(
        this.uid,
        this.currencySelected.id,
        this.Withdraw.room_id,
        this.Withdraw.money,
        this.Withdraw.remark
      ).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          (this.Withdraw.room_id = ""),
            (this.Withdraw.money = ""),
            (this.Withdraw.remark = ""),
            (this.WdOpenClose = !this.WdOpenClose);
        } else {
          createToast(res.data.message);
        }
      });
    },

    async transfer() {
      transfer(
        this.uid,
        this.currencySelected.id,
        this.Transfer.room_id,
        this.Transfer.money,
        this.Transfer.remark,
        this.Transfer.receive_account
      ).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          (this.Transfer.room_id = ""),
            (this.Transfer.money = ""),
            (this.Transfer.remark = ""),
            (this.Transfer.receive_account = ""),
            (this.TfOpenClose = !this.TfOpenClose);
        } else {
          createToast(res.data.message);
        }
      });
    },

    async exchange() {
      exchange(
        this.uid,
        this.Exchange.room_id,
        this.Exchange.from_currency,
        this.Exchange.from_amount,
        this.Exchange.to_currency,
        this.Exchange.to_amount,
        this.Exchange.deviation_from,
        this.Exchange.deviation_to,
        this.Exchange.exchange_rate_from,
        this.Exchange.exchange_rate_to,
        this.Exchange.original_exchange_rate_from,
        this.Exchange.original_exchange_rate_to,
        this.Exchange.remark
      ).then((res) => {
        if (res.data.code == 1000) {
          console.log(res);
          createToast(res.data.message);
          this.Exchange.room_id = "0";
          this.Exchange.from_currency = "";
          this.Exchange.from_amount = "1";
          this.Exchange.to_currency = "0";
          this.Exchange.to_amount = "";
          this.Exchange.deviation_from = "";
          this.Exchange.deviation_to = "";
          this.Exchange.exchange_rate_from = "";
          this.Exchange.exchange_rate_to = "";
          this.Exchange.original_exchange_rate_from = "";
          this.Exchange.original_exchange_rate_to = "";
          this.Exchange.remark = "";
          this.exOpenClose = !this.exOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async updateAgentPassword() {
      updateAgentPassword(this.ProxyData.id, this.proxyPassword).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          this.proxyPassword = "";
          this.cpOpenClose = !this.cpOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    async addUser() {
      addUser(
        this.account,
        this.name,
        this.password,
        this.bet_against_per_max,
        this.commission_per_max,
        this.interest_per_max,
        this.gender,
        new Date(this.birthday).getTime() / 1000,
        this.photo,
        this.country,
        this.id_type,
        this.id_num,
        this.id_photo,
        this.telephone,
        this.address,
        this.attach
      ).then((res) => {
        console.log(res);
        if (res.data.code == 1000) {
          createToast(res.data.message);
          this.ncOpenClose = !this.ncOpenClose;
        } else {
          createToast(res.data.message);
        }
      });
    },

    callCacList() {
      getCacList().then((res) => {
        console.log(res);
        const certResult = res.data.data.certificate;
        this.certiList = certResult;
        const citizenResult = res.data.data.country;
        this.citizenList = citizenResult;
        const acadeResult = res.data.data.academic;
        this.academicList = acadeResult;
        // country and acedamic
      });
    },

    callCurRoomList() {
      getCurRoomList().then((res) => {
        console.log(res);

        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        // this.currencyList.push({ id: 0, currency_name: "全部" });

        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        // this.roomList.push({ id: 0, name: "全部" });
      });
    },

    uploadPersonalImageHandle(e) {
      var data = new FormData();
      data.append("file", e.target.files[0]);
      uploadImage(data).then((res) => {
        console.warn(res);
        console.warn(res.data.data.url);
        this.photo = res.data.data.url;
      });

      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.personalPhoto = e.target.result;
        // uploadImage()
      };
    },

    uploadIdImageHandle(e) {
      var data = new FormData();
      data.append("file", e.target.files[0]);
      uploadImage(data).then((res) => {
        console.warn(res);
        console.warn(res.data.data.url);
        this.id_photo = res.data.data.url;
      });

      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.idPhoto = e.target.result;
        // uploadImage()
      };
    },
  },

  async mounted() {
    this.callCacList();
    this.callUserList();
    this.callCurRoomList();
  },

  watch: {
    visible: function (newVal, oldVal) {
      this.ResetOpenClose = newVal;
    },
  },
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}

.list {
  border-radius: 3px;
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
