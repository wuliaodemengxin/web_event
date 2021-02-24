$(function () {
    const { form, layer } = layui
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不能大于6位'
            }
        }
    })

    initUserInfo()
    function initUserInfo() {
        // 获取用户基本信息
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                console.log(res);
                form.val('userInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})