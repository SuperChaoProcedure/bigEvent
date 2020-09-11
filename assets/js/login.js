$(function() {
    $('#link_reg').on('click', function() {
        //当点击注册按钮时让登录框隐藏注册框显示
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function() {
        //当点击注册按钮时让登录框显示注册框隐藏
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //配置自定义规则
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码长度必须是6-12位,且不能为空!'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致!'
            }
        }
    });
    //监听注册提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止表单默认提交事件
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type: "POST",
            url: 'api/reguser',
            data: { username: $(this[name = "username"]).val(), password: $(this[name = "password"]).val() },
            success(response) {
                console.log(response);
                if (response.status !== 0) return layer.msg('用户名被占用，请更换其他用户名！!', { icon: 2, time: 1000 });
                // else {
                //     $('#form_reg')[0].reset()
                //     return layer.open({ title: '注册成功', content: '欢迎加入!快去登录吧!' });
                // }
                layer.open({ title: '注册成功', content: '欢迎加入!快去登录吧!', time: 1000 });
                $('#link_login').click();
            }
        })

    });
    // 监听登录提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'api/login',
            data,
            success(response) {
                console.log(response);
                if (response.status !== 0) {
                    return layer.msg("登录失败!", { time: 1000 })
                }
                //成功提示小弹框
                layer.open({ title: ' 欢迎!', content: '登录成功!', icon: 1, time: 1000 })
                    // 由于有些接口需要提供访问权限所以要将token保存在本地
                localStorage.setItem('token', response.token)
                    //页面跳转
                location.href = "/index.html"

            }
        })
    })
})