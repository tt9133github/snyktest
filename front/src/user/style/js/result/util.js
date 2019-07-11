//for testing
export function square(n) {
    return n * n;
}

//判断用户是否登录
export function ifAlreadyLogin() {　　
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
                this.$router.push({
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

//get data from server as list if it is not a list originaly
export function getTaskData(vm, url, target) {
    vm.$http.get(url).then(response => {
      target = response.data;
    });
}

//get data from server as list if it is originaly a list
export function getTaskDataList(url, list) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/api/task/' + url,
        cache: false,
        data: "",
        success: function (data) {
            var json = data;
            if (json.status == 0) {
                list.splice(0, list.length);
                for (let i = 0; i < json.info.length; i++) {
                    list.push(json.info[i]);
                }
            } else {
                console.log(json.msg);
            }
        },
        error: function (data) {}
    });
}
