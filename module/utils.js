// 生成随机下标
function random(length) {
  return Math.floor(Math.random() * length);
}

// 批量改变对象value值
function allInOne(key, value) {
  return dataList.map((item) => (item[key] = value));
}

module.exports={
    random,
    allInOne
}