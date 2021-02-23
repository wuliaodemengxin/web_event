$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    const form = layui.form

    // 定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd: function (value) {
            const password = $('.reg-box [name=password]').val()
            if (password !== value) return "两次密码不一致"
        },
    })

    // 注册功能
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录！');
                $('#link_login').click()
            }
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})