const api_uri = 'http://api.furrylightningrod.com:3001/api'

function uploadAvatar() {
    /**
     * ajax 上传。
     */

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
            alert(responseStr.newPath)
            localStorage.setItem('avatarPath',responseStr.avatarPath)
            $('img#profile-avatar').attr('src',responseStr.newPath)
        },
        error: function (responseStr) {

        }
    });
    
}

function saveProfile() {
    //jQuery取cookie中的token
    const token = $.cookie('token')
    console.log(token)
    const avatarPath = localStorage.getItem('avatarPath')
    const username = document.getElementById('profile-name-input').value
    const nick = document.getElementById('profile-nick-input').value
    const QQ = document.getElementById('profile-QQ-input').value
    localStorage.removeItem('avatarPath')
    if(avatarPath){
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
            error: function(XHR,TS) {
            },
            success: function(data) {
                console.log(data)

            }
    })}else{
        $.ajax({
            url: api_uri+'/profile/update',
            type: 'POST',
            data: 
            {
                token: token,
                username: username,
                nick: nick,
                QQ: QQ
            },
            dataType: 'json',
            error: function(XHR,TS) {
            },
            success: function(data) {
                console.log(data)
            }
    })}
}