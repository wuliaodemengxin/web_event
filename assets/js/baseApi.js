$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url

    if (option.url.includes('/my')) {
        option.headers = {
            Authorization: localStorage.token || '',
        }
        
        // 面对切片编程
        // const successFunction = option.success.bind(this)
        // option.success = function (res) {
        //     successFunction(res)

        //     const { message, status } = res
        //     if (message === '身份认证失败！' && status === 1) {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }


        option.complete = function (response) {
            // console.log(response);
            const { message, status } = response.responseJSON;
            if (message === '身份认证失败！' && status === 1) {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }
    }
})