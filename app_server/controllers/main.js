const index = (req, res) => {
    res.render('index', {title: '避雷针 - 委托避雷辅助工具'});
};



//写完模块别忘导出
module.exports = {
    index
}