//for testing
export function square(n) {
    return n * n;
}

//判断用户是否登录
export function ifAlreadyLogin() {
    var vm = this;
    var result = {
        id: '',
        username: ''
    };
    $.ajax({
        type: 'get',
        dataType: "json",
        url: '/api/user/me',
        cache: false,
        data: null,
        success: function (data) {
            if (data.status == 0) {
                result.id = data.info.id;
                result.username = data.info.username;
            } else {
                vm.$router.push({
                    path: '/login'
                })
            }
            return result;
        },
        error: function (data) {
            console.log(data);
        }
    });
}
