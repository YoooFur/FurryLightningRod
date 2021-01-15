// YoooFur+ JS v0.0.1~

// const { search } = require("../../app_server/controllers/search")

//小程序

function j2where(where) {
    window.location.href = where
}

function search(id) {
    const val = document.getElementById(id).value
    window.location.href = '/search?target=' + val
}

function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    location.reload()
}

function showEditAvatar() {
    $('form#editAvatar').removeClass('d-none')
    $('button#btn-avatar').addClass('d-none')
    $('button#btn-avatar').removeClass('d-xl-block')
}

function uploadAvatar() {
    /**
     * ajax 上传。
     */

    //用form 表单直接 构造formData 对象; 就不需要下面的append 方法来为表单进行赋值了。
    var formData = new FormData($("#editAvatar")[0]);
    var url = "http://api.furrylightningrod.com:3001/api/upload/avatar";
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
            $('img#profile-avatar').attr('src',responseStr.newPath)
        },
        error: function (responseStr) {

        }
    });
    
}

// function test() {
//     alert($.cookie("token"))
// }