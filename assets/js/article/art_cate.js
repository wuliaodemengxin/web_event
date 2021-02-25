$(function () {
    initCateInfo();
    function initCateInfo() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0) return layer.msg(res.message);
                const htmlStr = template('tpl-table', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }
    let addIndex = null
    $('#btnAddCate').on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加类别',
            content: $('#dialog-add').html(),
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('添加分类成功')
                initCateInfo()
                layer.close(addIndex)
            }
        })
    })

    let editIndex = null
    $('tbody').on('click', '.btn-edit', function () {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '编辑类别',
            content: $('#dialog-edit').html(),
        })
        const id = $(this).attr('data-id')
        console.log(id);
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('更新分类数据失败')
                layer.msg('更新分类数据失更新分类数据成功！')
                layer.close(editIndex)
                initCateInfo()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initCateInfo()
            }
          })
        })
    })
})