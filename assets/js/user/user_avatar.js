// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#chooseImg').on('click', function () {
    $('#file').click()
})

$('#file').on('change', function (e) {
    const fileList = this.files
    if (fileList.length === 0) return layer.msg('请选择文件')
    const file = fileList[0]
    const imgUrl = URL.createObjectURL(file)
    $image
        .cropper('destroy')
        .attr('src', imgUrl)
        .cropper(options)
})

$('#upload').on('click', function () {
    const dataURL = $image
        .cropper('getCroppedCanvas', {
            width: 100,
            height: 100,
        })
        .toDataURL('image/png')
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL,
        },
        success(res) {
            if (res.status !== 0) return layer.msg('更换头像失败')
            layer.msg('更换头像成功！')
            window.parent.getUserInfo()
        }
    })
})