window.onload = function() {
    const token = document.cookie
    if(!token) {
        $('div.no-login-box').removeClass('d-none')
        $('div.login-box').addClass('d-none')
    } else {
        $('div.no-login-box').addClass('d-none')
        $('div.login-box').removeClass('d-none')
    }
}