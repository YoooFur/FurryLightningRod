// 渲染页面对数据进行的操作
const env = require('../../config').env
const renderPage = (req, res, page, data) => {
    data.env = env
    res.render(page, data)
}


module.exports = {
    renderPage
}