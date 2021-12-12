const isEmpty = require("lodash/isEmpty");
const every = require("lodash/every");
const question_list = require("./question.js");
const utils=require("./utils.js")
let dataList = [];

function dataStorage(data) {
  console.log(dataList, "----------------服务端的原数据-------------------");
  if (!isEmpty(data) && dataList.length !== 0) {
    compareData(data);
    return dataList;
  } else if (dataList.length === 0) {
    dataList.push(data);
    return dataList;
  } else {
  }
}

// 保存数据对象的时候，需要对比现有dataList中是否存在一样的数据项，
// 相同则不保存、不相同则保存并广播给所有用户

// 对比数据
function compareData(data) {
  let flag = false;
  // 筛选后原有数据和传入的数据是否具有相同的userId
  try {
    dataList.forEach((element, index) => {
      if (element.userId === data.userId) {
        throw index;
      }
    });
  } catch (e) {
    console.log(e, "------------------获取相同userId数据下标，覆盖之前数据------------------");
    flag = true;
    dataList[e] = data;
    // checkStart();
  }
  if (!flag) {
    console.log("--------------------未找到相同userId数据，直接将数据push进去---------------------");
    dataList.push(data);
    // checkStart();
  }
}

// 检验是否开始
function checkStart() {
  if (every(dataList, { isPreparation: true, round: 0, isUndercover: 0 })) {
    // dataList中的所有项都准备、回合为1、身份未分配
    console.log('----------------准备开始----------------')
    allocatedIdentity();
  } else {
    // 已经开始
    console.log('已开始')
  }
}

// 分配身份
function allocatedIdentity() {
  // 随机为其中一个数据设为卧底
  dataList = utils.allInOne("isUndercover", 1); // 先给所有人分配平民身份
  const index = utils.random(dataList.length);
  dataList[index].isUndercover = 2; // 随机生成一名卧底
  question(index);
}

// 分配题目
function question(index) {
  const key = utils.random(question_list.question.length); // 随机生成一个题目下标
  dataList = utils.allInOne("topic", question_list.question[key].one);
  dataList[index].topic = question_list.question[key].two; // 为卧底派送题目
}

// 同时需要去判断用户的身份、状态（dead or alive）、准备、重要的投票结果（疑问：这些逻辑是否可放在前端处理，后端只负责数据中转）

module.exports = {
  dataStorage,
  dataList,
};
