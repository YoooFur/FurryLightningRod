// 建议在每条Javascript语句后面加分号，可以提高程序运行效率。
window.onload = function() {
    
    //TODO: 可能会出现BUG的地方 -- 多次对同一个全局变量赋值，可能会出现值被覆盖的问题
    // BUG解决：
    let old_load = window.onload;
    if (old_load)
        old_load();
    
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