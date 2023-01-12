// import axios from "../axios/index";
import axios from "axios";

axios.defaults.baseURL = "http://cashieradminapi.com/super/";
axios.defaults.headers.post["Accept-language"] = "zh";
axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export function login(username, password) {
  return axios.post(
    "/auth/login",
    { username: username, password: password },
    {
      headers: {
        Authorization: "",
      },
    }
  );
}

export function getEmployeeList(name, account, status, room_id) {
  let token = localStorage.getItem("token");
  return axios.post(
    "/auth/admin/readAdmin",
    {
      page: 1,
      pageNum: 10,
      account: account,
      name: name,
      status: status,
      room_id: room_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getLogList(
  start_time,
  end_time,
  page,
  pageNum,
  account,
  room_id
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "/log/read",
    {
      start_time: start_time,
      end_time: end_time,
      type: 0,
      page: page,
      pageNum: pageNum,
      account: account,
      room_id: room_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getSmsList(
  start_time,
  end_time,
  page,
  pageNum,
  account,
  proposal_id,
  marker_order,
  status
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "message/log/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: page,
      pageNum: pageNum,
      account: account,
      proposal_id: proposal_id,
      marker_order: marker_order,
      status: status,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getExchangeList(
  start_time,
  end_time,
  page,
  pageNum,
  account,
  currency
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "exchange/log/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: page,
      pageNum: pageNum,
      account: account,
      currency: currency,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getSettleList(
  start_time,
  end_time,
  page,
  pageNum,
  room_id,
  currency,
  type,
  status
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "settlement/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: page,
      pageNum: pageNum,
      room_id: room_id,
      currency: currency,
      type: type,
      status: status,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getShiftList(start_time, end_time, page, pageNum, room_id) {
  let token = localStorage.getItem("token");
  return axios.post(
    "shift/report/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: page,
      pageNum: pageNum,
      room_id: 0,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getPerimeterList(start_time, end_time, room_id) {
  let token = localStorage.getItem("token");
  return axios.post(
    "perimeter/report/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: 1,
      pageNum: 10,
      room_id: room_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getBankList(
  start_time,
  end_time,
  page,
  pageNum,
  room_id,
  currency,
  type
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "silver/head/read",
    {
      start_time: start_time,
      end_time: end_time,
      page: page,
      pageNum: pageNum,
      room_id: room_id,
      currency: currency,
      type: type,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getMarkerList(
  start_time,
  end_time,
  repayment_start_time,
  repayment_end_time,
  page,
  pageNum,
  account,
  status
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "/marker/management/read",
    {
      start_time,
      end_time,
      repayment_start_time,
      repayment_end_time,
      page: page,
      pageNum: pageNum,
      account: account,
      status: status,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getProposalList(
  swork_start_time,
  swork_end_time,
  page,
  pageNum,
  room_id,
  account,
  currency_id,
  status,
  ework_start_time,
  ework_end_time
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "proposal/read",
    {
      swork_start_time: swork_start_time,
      swork_end_time: swork_end_time,
      page: 1,
      pageNum: 10,
      room_id: room_id,
      account: account,
      currency_id: currency_id,
      status: status,
      ework_start_time: ework_start_time,
      ework_end_time: ework_end_time,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getMarker(aaccount) {
  let token = localStorage.getItem("token");
  return axios.post(
    "marker/management/readMarker",
    {
      aaccount: aaccount,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getCompanySettle(
  room_id,
  currency,
  type,
  status,
  start_time,
  endDate
) {
  let token = localStorage.getItem("token");

  return axios.post(
    "/companys/read",
    {
      room_id: room_id,
      currency: currency,
      type: type,
      status: status,
      start_time: start_time,
      end_time: endDate,
      page: 1,
      pageNum: 10,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getUserList(user_account, user_name) {
  let token = localStorage.getItem("token");

  return axios.post(
    "/user/lists",
    {
      user_account: user_account,
      user_name: user_name,
      page: 1,
      pageNum: 100,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getLimitedRed(id) {
  console.log("dd", id);
  let token = localStorage.getItem("token");
  return axios.post(
    "/limitedRed/read",
    {
      id: id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function addLimitedRed(
  banker_player_min,
  banker_player_max,
  tie_min,
  tie_max,
  pair_min,
  pair_max
) {
  let token = localStorage.getItem("token");

  return axios.post(
    "/limitedRed/create",
    {
      banker_player_min: banker_player_min,
      banker_player_max: banker_player_max,
      tie_min: tie_min,
      tie_max: tie_max,
      pair_min: pair_min,
      pair_max: pair_max,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function updateLimitedRed(
  banker_player_min,
  banker_player_max,
  tie_min,
  tie_max,
  pair_min,
  pair_max,
  id
) {
  return axios.post("/limitedRed/update", {
    banker_player_min: banker_player_min,
    banker_player_max: banker_player_max,
    tie_min: tie_min,
    tie_max: tie_max,
    pair_min: pair_min,
    pair_max: pair_max,
    id: id,
  });
}

export function addAdmin(
  aaccount,
  nname,
  password,
  nickname,
  home_mobile,
  mobile,
  type_certificate,
  certificate_number,
  gender,
  country,
  academic,
  birthday,
  onboarding,
  resignation,
  father_name,
  mother_name,
  marital_status,
  mate_name,
  pic,
  room_id,
  groups
) {
  return axios.post("/auth/admin/createAdmin", {
    aaccount: aaccount,
    nname: nname,
    password: password,
    nickname: nickname,
    home_mobile: home_mobile,
    mobile: mobile,
    type_certificate: type_certificate,
    certificate_number: certificate_number,
    gender: gender,
    country: country,
    academic: academic,
    birthday: birthday,
    onboarding: onboarding,
    resignation: resignation,
    father_name: father_name,
    mother_name: mother_name,
    marital_status: marital_status,
    mate_name: mate_name,
    pic: pic,
    room_id: room_id,
    groups: groups,
  });
}

export function addCertificate(certificate_zh, certificate_en) {
  return axios.post("certificate/create", {
    certificate_zh: certificate_zh,
    certificate_en: certificate_en,
  });
}

export function addCountry(country_zh, country_en) {
  return axios.post("country/create", {
    country_zh: country_zh,
    country_en: country_en,
  });
}

export function addAcademic(academic_zh, academic_en) {
  return axios.post("academic/create", {
    academic_zh: academic_zh,
    academic_en: academic_en,
  });
}

export function getCacList() {
  let token = localStorage.getItem("token");
  return axios.post(
    "set/readCAC",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getCurRoomList() {
  let token = localStorage.getItem("token");
  return axios.post(
    "currency/read",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function updateAdmin(
  aaccount,
  nname,
  password,
  nickname,
  home_mobile,
  mobile,
  type_certificate,
  certificate_number,
  gender,
  country,
  academic,
  birthday,
  onboarding,
  resignation,
  father_name,
  mother_name,
  marital_status,
  mate_name,
  pic,
  room_id,
  groups
) {
  return axios.post("/auth/admin/update", {
    aaccount: aaccount,
    nname: nname,
    password: password,
    nickname: nickname,
    home_mobile: home_mobile,
    mobile: mobile,
    type_certificate: type_certificate,
    certificate_number: certificate_number,
    gender: gender,
    country: country,
    academic: academic,
    birthday: birthday,
    onboarding: onboarding,
    resignation: resignation,
    father_name: father_name,
    mother_name: mother_name,
    marital_status: marital_status,
    mate_name: mate_name,
    pic: pic,
    room_id: room_id,
    groups: groups,
  });
}
export function addUser(
  account,
  name,
  password,
  bet_against_per_max,
  commission_per_max,
  interest_per_min,
  gender,
  birthday,
  photo,
  nationality,
  id_type,
  id_num,
  id_photo,
  telephone,
  address,
  attach
) {
  return axios.post("/user/create", {
    account: account,
    name: name,
    password: password,
    bet_against_per_max: bet_against_per_max,
    commission_per_max: commission_per_max,
    interest_per_min: interest_per_min,
    gender: gender,
    birthday: birthday,
    photo: photo,
    nationality: nationality,
    id_type: id_type,
    id_num: id_num,
    id_photo: id_photo,
    telephone: telephone,
    address: address,
    attach: attach,
  });
}

export function updateUser(
  account,
  name,
  password,
  bet_against_per_max,
  commission_per_max,
  interest_per_min,
  gender,
  birthday,
  photo,
  nationality,
  id_type,
  id_num,
  id_photo,
  telephone,
  address,
  attach
) {
  return axios.post("/user/update", {
    account: account,
    name: name,
    password: password,
    bet_against_per_max: bet_against_per_max,
    commission_per_max: commission_per_max,
    interest_per_min: interest_per_min,
    gender: gender,
    birthday: birthday,
    photo: photo,
    nationality: nationality,
    id_type: id_type,
    id_num: id_num,
    id_photo: id_photo,
    telephone: telephone,
    address: address,
    attach: attach,
  });
}

export function addAgent(uid, currency_id, bet_against_per, commission_per) {
  return axios.post("/user/agent/add", {
    uid: uid,
    currency_id: currency_id,
    bet_against_per: bet_against_per,
    commission_per: commission_per,
  });
}

export function printMarker(aaccount, password, currency_id, money,deadline,interest_rate,remark) {
  return axios.post("marker/management/createM", {
    aaccount: aaccount,
    password: password,
    currency_id: currency_id,
    money: money,
    deadline:deadline,
    interest_rate:interest_rate,
    remark:remark
  });
}
export function updateAgentPassword(uid, password) {
  return axios.post("/user/agent/updatePwd", {
    uid: uid,
    password: password,
  });
}

export function bindAgent(uid, account, password) {
  return axios.post("/user/agent/bind", {
    uid: uid,
    account: account,
    password: password,
  });
}

export function deposit(uid, currency_id, room_id, money, remark) {
  return axios.post("/user/save", {
    uid: uid,
    currency_id: currency_id,
    room_id: room_id,
    money: money,
    remark: remark,
  });
}

export function withdraw(uid, currency_id, room_id, money, remark) {
  return axios.post("/user/withdraw", {
    uid: uid,
    currency_id: currency_id,
    room_id: room_id,
    money: money,
    remark: remark,
  });
}

export function transfer(
  uid,
  currency_id,
  room_id,
  money,
  remark,
  receive_account
) {
  return axios.post("/user/transfer", {
    uid: uid,
    currency_id: currency_id,
    room_id: room_id,
    money: money,
    remark: remark,
    receive_account: receive_account,
  });
}

export function exchange(
  uid,
  room_id,
  from_currency,
  from_amount,
  to_currency,
  to_amount,
  deviation_from,
  deviation_to,
  exchange_rate_from,
  exchange_rate_to,
  original_exchange_rate_from,
  original_exchange_rate_to,
  remark
) {
  return axios.post("/user/exchange", {
    uid: uid,
    room_id: room_id,
    from_currency: from_currency,
    from_amount: from_amount,
    to_currency: to_currency,
    to_amount: to_amount,
    deviation_from: deviation_from,
    deviation_to: deviation_to,
    exchange_rate_from: exchange_rate_from,
    exchange_rate_to: exchange_rate_to,
    original_exchange_rate_from: original_exchange_rate_from,
    original_exchange_rate_to: original_exchange_rate_to,
    remark: remark,
  });
}

export function accountChangeList(
  page,
  pageNum,
  account,
  currency_id,
  type,
  start_time,
  end_time
) {
  let token = localStorage.getItem("token");
  return axios.post(
    "coin/log/read",
    {
      page: page,
      pageNum: pageNum,
      account: account,
      currency_id: currency_id,
      type: 0,
      start_time: start_time,
      end_time: end_time,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getElectricList(room_id, account, enable) {
  let token = localStorage.getItem("token");
  return axios.post(
    "electric/pitcher/read",
    {
      page: 1,
      pageNum: 100,
      room_id: room_id,
      account: account,
      enable: enable,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getPermissionList() {
  let token = localStorage.getItem("token");
  return axios.post("auth/group/read", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getPerItemList() {
  let token = localStorage.getItem("token");
  return axios.post("auth/rule/read", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getSilverHead(room_id, currency_id) {
  let token = localStorage.getItem("token");
  return axios.post(
    "silverhead/read",
    {
      room_id: room_id,
      currency_id: currency_id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function updateSilverHead(id, cash, type) {
  return axios.post("silverhead/update", {
    id: id,
    cash: cash,
    type: type,
  });
}

export function addElectric(room_id, aaccount, password) {
  return axios.post("electric/pitcher/create", {
    room_id: room_id,
    aaccount: aaccount,
    password: password,
  });
}

export function addPermission(name, rule) {
  return axios.post("auth/group/create", {
    name: name,
    rule: rule,
  });
}

export function addCash(id, cash) {
  return axios.post("silverhead/update", {
    id: id,
    cash: cash,
    type: 1,
  });
}

export function reduceCash(id, cash) {
  return axios.post("silverhead/update", {
    id: id,
    cash: cash,
    type: 2,
  });
}

export function updateElectric(room_id, aaccount, password, id) {
  return axios.post("electric/pitcher/create", {
    room_id: room_id,
    aaccount: aaccount,
    password: password,
    id: id,
  });
}

export function uploadImage(files) {
  return axios.post("upload/create", files);
}

export function unableElectric(id, eenable) {
  return axios.post("electric/pitcher/stateEdit", {
    eenable: eenable,
    id: id,
  });
}

export function addMarker(
  aaccount,
  password,
  room_id,
  currency_id,
  money,
  deadline,
  interest_rate,
  remark,
  pic
) {
  return axios.post("marker/management/create", {
    aaccount: aaccount,
    password: password,
    room_id: room_id,
    currency_id: currency_id,
    money: money,
    deadline: deadline,
    interest_rate: interest_rate,
    remark: remark,
    pic: pic,
  });
}

export function addProposal(
  aaccount,
  password,
  room_id,
  currency_id,
  type,
  gambling_proportion,
  commission_proportion,
  dead_chips,
  regular_chips,
  cash_amount,
  remark,
  marker_id
) {
  return axios.post("proposal/create", {
    aaccount: aaccount,
    password: password,
    room_id: room_id,
    currency_id: currency_id,
    type: type,
    gambling_proportion: gambling_proportion,
    commission_proportion: commission_proportion,
    dead_chips: dead_chips,
    regular_chips: regular_chips,
    cash_amount: cash_amount,
    remark: remark,
    marker_id: marker_id,
  });
}

export function updateRedLimit(uid, game_limit, agent_limit) {
  return axios.post("user/agent/redLimit", {
    uid: uid,
    game_limit: game_limit,
    agent_limit: agent_limit,
  });
}

export function getSilverHeadList(room_id, currency_id) {
  return axios.post("silverhead/read", {
    room_id: room_id,
    currency_id: currency_id,
  });
}

export function updateSilverHeadList(id, cash, type) {
  return axios.post("silverhead/update", {
    id: id,
    cash: cash,
    type: type,
  });
}
