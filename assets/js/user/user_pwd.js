$(function () {
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        confirmPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return '两次输入不一致'
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layui.layer.msg('更新密码失败！')
                layui.layer.msg('更新密码成功！')
                this.reset()
            }
        })
    })

})