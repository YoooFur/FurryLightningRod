const api_uri = 'https://api.furrylightningrod.com:2999/api'

function showEditAvatar() {
    $('form#editAvatar').removeClass('d-none')
    $('button#btn-avatar').addClass('d-none')
}

//上传头像
function uploadAvatar() {
    //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
    var formData = new FormData($("#editAvatar")[0]);
    var url = api_uri + '/upload/avatar';
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        /**
         * 必须false才会避开jQuery对 formdata 的默认处理
         * XMLHttpRequest会对 formdata 进行正确的处理
         */
        processData: false,
        /**
         *必须false才会自动加上正确的Content-Type
         */
        contentType: false,
        success: function (responseStr) {
            localStorage.setItem('avatarPath',responseStr.avatarPath)
            $('img#profile-avatar').attr('src',responseStr.newPath)
            $('div.alert-danger').addClass('d-none')
            $('div.alert-info').removeClass('d-none')
        },
        error: function (responseStr) {
            $('div.alert-info').addClass('d-none')
            $('div.alert-danger').removeClass('d-none')
        }
    });
    
}

//保存对个人信息的更改
function saveProfile() {
    //jQuery取cookie中的token
    const token = $.cookie('token')
    const avatarPath = localStorage.getItem('avatarPath')
    const username = document.getElementById('profile-name-input').value
    const nick = document.getElementById('profile-nick-input').value
    const QQ = document.getElementById('profile-QQ-input').value
    //从本地取出avatarPath后清掉
    localStorage.removeItem('avatarPath')
    $.ajax({
        url: api_uri+'/profile/update',
        type: 'POST',
        data: 
        {
            token: token,
            username: username,
            nick: nick,
            QQ: QQ,
            avatarPath: avatarPath
        },
        dataType: 'json',
        success: function(data) {
            $('div.alert-danger').addClass('d-none')
            $('div.alert-success').removeClass('d-none')
        },
        error: function(XHR,TS) {
            $('div.alert-success').addClass('d-none')
            $('div.alert-danger').removeClass('d-none')
        }
    })
}