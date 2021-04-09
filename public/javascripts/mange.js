// mange.js

// const api_uri = 'https://api.furrylightningrod.com:29999/api'
const api_uri = 'https://api.furrylightningrod.com:29999/api'
const token = $.cookie('token')
let page = 1
let pageCount = 0
let limit = 12
let itemCount = 0
let ldata // TODO: 建议初始化变量

// 页面载入 请求数据
window.onload = function() {
    localStorage.setItem('page',1)
    $.ajax({
        url: api_uri+'/list/all',
        type: 'GET',
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Bearer "+token); 
        },
        error: function(XHR,TS) {
            console.log(XHR)

        },
        success: function(datas) {
            ldata = datas.items
            user = datas.user
            watermark(user.nick,user.username,'避雷针FurryLightningRod')
            itemCount = ldata.length
            pageCount = Math.ceil(itemCount / limit)
            renderTables(1)
            // 加载页面导航
            let pageNav = ""
            for(i = 1; i<=pageCount; i++){
                pageNav += "<li class='page-item' id='"+ i +"'>"
                pageNav +=      "<a class='page-link' id='"+ i +"' onclick='toPage("+ i +")'>" + i + "</a>"
                pageNav += "</li>"
            }
            $('ul.pagination').html(pageNav)
            $('li#'+page).addClass('active')
        }
    })
}

// 装填表格数据
function renderTables(page) {
    count = limit * (page - 1)  // TODO: 不建议在函数中声明和使用全局变量
    let maxCount = 0
    if (page===pageCount){maxCount=itemCount}
    else {maxCount= limit * page}
    console.log(page)
    $(function () {
        let tableHtml = ""
        for(count; count<maxCount; count++){
            tableHtml += "<tr>"
            tableHtml +=    "<td id='QQ'>"+ ldata[count].QQ +"</td>"
            tableHtml +=    "<td id='name'>"+ ldata[count].name +"</td>"
            tableHtml +=    "<td id='level'>"+ ldata[count].level +"</td>"
            tableHtml +=    "<td id='reason'>"+ ldata[count].reason +"</td>"
            // tableHtml +=    "<td id='reason'>"+ ldata[count].reason +"</td>"
            tableHtml +=    "<td id='opreatorName'>"+ ldata[count].opreatorName +"</td>"
            // tableHtml +=    "<td id='_id'>"+ ldata[count]._id +"</td>"
            tableHtml += "</tr>"
        }
        $("#aj_data").html(tableHtml)
        count = limit * (page - 1)
    })
    $(function () {
        let tableHtml = ""
        for(count; count<maxCount; count++){
            tableHtml += "<tr>"
            tableHtml +=    "<td>"+ ldata[count].QQ +"</td>"
            tableHtml +=    "<td>"+ ldata[count].name +"</td>"
            tableHtml +=    "<td>"+ ldata[count].level +"</td>"
            tableHtml +=    "<td>"+ "<button class='btn btn-primary btn-xq' onclick='xq(" + count + ")'>详情</button>" + "</td>"
            tableHtml += "</tr>"
        }
        $("#ajm_data").html(tableHtml)
        count = limit * (page - 1)
    })
}

// 翻页
function toPage(page) {
    $('li.page-item').removeClass('active')
    renderTables(page)
    $('li#'+page).addClass('active')
}


// 刷新操作员信息
function updateOpreatorName() {
    $.ajax({
        url: api_uri+'/list/update/opreatorName',
        type: 'POST',
        data:{
            token: token
        },
        error: function(XHR,TS) {
            console.log(XHR)

        },
        success: function(data) {
            console.log(data)
            location.reload()
        }
    })
}

// 新增黑名单
function addOne(mode) {
    let QQ
    let name
    let level
    let reason
    if (mode==='m'){
        QQ = document.getElementById('mQQ-text').value
        name = document.getElementById('mname-text').value
        level = Number(document.getElementById('mlevel-select').value)
        reason = document.getElementById('mreason-text').value
    }else{
        QQ = document.getElementById('QQ-text').value
        name = document.getElementById('name-text').value
        level = Number(document.getElementById('level-select').value)
        reason = document.getElementById('reason-text').value
    }
    $.ajax({
        url: api_uri+'/list/add',
        type: 'POST',
        data:{
            token: token,
            QQ: QQ,
            name: name,
            level: level,
            reason: reason
        },
        error: function(XHR,TS) {
            $('div#returnMessage').removeClass('d-none')
            $('div#returnAlert').removeClass('alert-success')
            $('div#returnAlert').addClass('alert-danger')
            $('strong#returnAlertHeading').html(XHR.responseJSON.message)
        },
        success: function(data) {
            $('div#returnMessage').removeClass('d-none')
            $('div#returnAlert').removeClass('alert-danger')
            $('div#returnAlert').addClass('alert-success')
            $('strong#returnAlertHeading').html(data.message)
            setTimeout(location.reload(),1500)
        }
    })
}

// 查看详情（移动端
function xq(no) {
    console.log(ldata)
    alert("QQ：" + ldata[no].QQ + "\n" + "名字：" + ldata[no].name + "\n" + "等级：" + ldata[no].level + "\n" + "原因：" + ldata[no].reason + "\n" + "操作员：" + ldata[no].opreatorName)
}