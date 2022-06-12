
// 每次调用$.get或者$.post()或$.ajax()的时候会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给Ajax提供的配置之对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    if(options.url.indexOf(/my/!==-1)){
        options.headers={
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete=function (res) {
        if (res.responseJSON.status==1 && res.responseJSON.message=='身份认证失败！') {
            localStorage.removeItem("token")
            location.href = '../../login.html'
        }
    }
})