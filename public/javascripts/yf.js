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