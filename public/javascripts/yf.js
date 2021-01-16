// YoooFur+ JS v0.0.1~

//小程序

function j2where(where) {
    window.location.href = where
}

function search(id) {
    const val = document.getElementById(id).value
    window.location.href = '/search?target=' + val
}

function report(id) {
    const val = document.getElementById(id).value
    window.location.href = '/report?target=' + val
}

function logout() {
    $.cookie('token','',{ expires: 0, domain: '.furrylightningrod.com', path: '/' })
    location.reload()
}



// function test() {
//     alert($.cookie("token"))
// }