import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        user: {}
    },
    mutations: {
        LOGIN(state, data) {
            state.user.username = data.username;
            state.user.status = data.status;
            state.user.id = data.id;
        }
    },
    actions: {
        ifAlreadyLogin({
            commit
        }) {
            var result = {
                id: '',
                username: '',
                status: '',
            };
            $.ajax({
                type: 'get',
                dataType: "json",
                url: '/api/user/me',
                cache: false,
                data: null,
                success: function (data) {

                    result.id = data.info.id;
                    result.username = data.info.username;
                    result.status = data.status;
                    commit("LOGIN", result)

                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    },
})

export default store
