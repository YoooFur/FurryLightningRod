
//首页 请求
const index = (req, res) => {
    res.render('index', {
        title: '避雷针 - 委托避雷辅助工具',
        userInfo: {
            id: "0001",
            nick: "玖叁",
            idName: "colour93",
            group: "normal",
            email: "colour_93@furry.top",
            QQ: "1285419578",
        }

    });
};


//个人主页 请求
const profile = (req, res) => {
    res.render('profile', {
        title: '个人中心 - 避雷针',
        userInfo: {
            id: "0001",
            nick: "玖叁",
            idName: "colour93",
            group: "normal",
            email: "colour_93@furry.top",
            QQ: "1285419578",
        }
    });
};


//个人信息修改 请求
const space = (req, res) => {
    res.render('profile_space', {
        title: "玖叁" + " - 避雷针",
        userInfo: {
            id: "0001",
            nick: "玖叁",
            idName: "colour93",
            group: "mange-painter",
            email: "colour_93@furry.top",
            QQ: "1285419578",
        }
    });
};


//查询 请求
const search = (req, res) => {
    res.render('search', {title: '查询 - 避雷针'});
};

//写完模块别忘导出
module.exports = {
    index,
    space,
    profile,
    search,
}