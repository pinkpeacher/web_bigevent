
// 每次调用$.get或者$.post()或$.ajax()的时候会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给Ajax提供的配置之对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url); 
})