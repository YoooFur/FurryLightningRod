
//首页 请求
const index = (req, res) => {
    res.render('index', {title: '避雷针 - 委托避雷辅助工具'});
};


//个人主页 请求
const profile = (req, res) => {
    res.render('profile', {title: '个人中心 - 避雷针'});
};

//查询 请求
const search = (req, res) => {
    res.render('search', {title: '查询 - 避雷针'});
};

//写完模块别忘导出
module.exports = {
    index,
    profile,
    search,
}