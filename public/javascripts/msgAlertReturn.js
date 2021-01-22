// 统一处理返回信息

function msgAlert(mode, message){
    if(mode==='success'){
        $('div#returnMessage').removeClass('d-none')
        $('div#returnAlert').removeClass('alert-danger')
        $('div#returnAlert').addClass('alert-success')
        $('strong#returnAlertHeading').html(message)
    }
    if(mode==='error'){
        $('div#returnMessage').removeClass('d-none')
        $('div#returnAlert').removeClass('alert-success')
        $('div#returnAlert').addClass('alert-danger')
        $('strong#returnAlertHeading').html(message)
    }
}