$(function () {
  $('#reg_link').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#login_link').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为6到12位且不能出现空格'],
    // 校验两次密码
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可
      var pwd = $('.reg-box #form_reg input[name=password]').val()
      if (pwd != value) {
        console.log(pwd);
        console.log(value);
        return '两次输入密码不一致'
      }
    }
  });
  // 注册功能  监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.post('/api/reguser', {
      username: $('.reg-box #form_reg input[name=username]').val(),
      password: $('.reg-box #form_reg input[name=password]').val()
    }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message, {
          icon: 2,
          time: 2000
        }, function () {
          $('#form_reg')[0].reset()
        });
      } else {
        return layer.msg(res.message, {
          icon: 1,
          time: 2000
        }, function () {
          $('#login_link').click()
        });
      }
    })
  })
  $('#form_login').on('submit', function (e) {
    console.log($('#form_login input[name=password]').val());
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败', {
            icon: 2,
            time: 2000
          }, function () {
          });
        }else{
          return layer.msg('登录成功', {
            icon: 1,
            time: 2000
          }, function () {
            console.log(res.token);
            localStorage.setItem('token',res.token)
            location.href='/index.html'
          });
        }
      }
    })
  })
})