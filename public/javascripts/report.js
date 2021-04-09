//举报申诉
const api_uri = 'https://api.furrylightningrod.com:29999/api'
const token = $.cookie('token')
let imgPath = {}

//举报
function addOne() {
    let QQ = document.getElementById('QQ').value
    let name = document.getElementById('name').value
    let tag = document.getElementById('tag').value
    let reason = document.getElementById('reason').value
    $('button#fileUploadAll').click()
    $.ajax({
        url: api_uri+'/report/add',
        type: 'POST',
        data:{
            token: token,
            QQ: QQ,
            name: name,
            tag: tag,
            imgPath: imgPath,
            reason: reason
        },
        error: function(XHR,TS) {
            msgAlert('error',XHR.responseJSON.message)
        },
        success: function(data) {
            msgAlert('success',data.message)
        
        }
    })
}

