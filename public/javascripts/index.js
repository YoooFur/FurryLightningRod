window.onload = function() {
    const token = document.cookie
    if(!token) {
        $('div.no-login-box').removeClass('d-none')
        $('div.login-box').addClass('d-none')
        $('button#btn-report').addClass('disabled')
        $('button#btn-j2report').addClass('disabled')
    } else {
        $('div.no-login-box').addClass('d-none')
        $('div.login-box').removeClass('d-none')
        $('button#btn-report').removeClass('disabled')
        $('button#btn-j2report').removeClass('disabled')
        $('button#btn-report').attr('onclick',"report('userQQInput1')")
        $('button#btn-j2report').attr('onclick',"j2where('/rep')")
    }
}