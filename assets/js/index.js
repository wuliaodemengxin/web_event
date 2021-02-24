$(function () {
    getUserInfo()
    // 点击按钮，实现退出功能
    $('#btnLogOut').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
});
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        
        success(res) {
            if (res.status !== 0) return layer.msg(res.message)
            renderAvatar(res.data)
        },
        error() { },
        
    })
}
function renderAvatar(user) {
    // 渲染欢迎文本
    const username = user.nickname || user.username
    $('#welcome').html(username)
    // 渲染文本头像和图片头像
    if (user.user_pic) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        const firstName = username[0].toUpperCase()
        // 文字头像内容互换
        $('.text-avatar').html(firstName).show()
    }
}