//举报申诉
const api_uri = 'https://api.furrylightningrod.com:29998/api'
const token = $.cookie('token')
let imgPath = {}

//举报
function addOne() {
    let QQ
    let name
    let tag
    let reason
    QQ = document.getElementById('QQ').value
    name = document.getElementById('name').value
    tag = document.getElementById('tag').value
    reason = document.getElementById('reason').value
    $.ajax({
        url: api_uri+'/report/add',
        type: 'POST',
        data:{
            token: token,
            QQ: QQ,
            name: name,
            tag: tag,
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

