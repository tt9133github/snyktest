<template>
  <!--       <header class="main-header" style="background-color: white;border-bottom:1px solid grey;height:80px;">-->
  <header class="main-header" style="background: #575962;height:80px;text-align: right;position: fixed;width: 100%;z-index: 999999;display: flex">
    <!--        <div class="head-style">-->
    <div  style="display: flex;flex: 1 0 auto;">
      <router-link to="/home">
        <img src="../../../static/image/logo-2.png" style="height:55px;margin-top:10px;cursor:pointer">
      </router-link>
      <div class="hederMenu" @click="switchMenu">
        <span class="glyphicon glyphicon-menu-hamburger"></span>
      </div>
      <h2 style="color: white;float: bottom;padding-bottom: 0px;word-break:keep-all;white-space:nowrap;"><b>源代码处理与分析系统</b>
      </h2>
    </div>

    <div class="search-header" v-show="user.resources.indexOf(6) != -1">
      <input class="form-control form-control-navbar search-input" v-model="searchContent" @keyup.enter="goSearch" type="search" placeholder="搜索..." aria-label="Search" style="height: 34px; width: 200px;">
      <div class="input-group-append " style="margin-left: -1px">
        <button class="btn btn-navbar" type="submit" @click="goSearch" style="height: 34px;">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>


    <ul class="nav-name">
      <li class="nav-item">
        <a class="nav-link d-block" style="color: white;cursor: pointer" @click="logout">
          {{user.username}}, <b>注销</b>
        </a>
      </li>
    </ul>
  </header>
</template>
<script>
  export default {
    data: function () {
      return {
        user: {},

        searchContent: '',
        mySelect: {},
        placeHold: '',
        tableData: [],
        search_types: [],
      };
    },

    methods: {
      goSearch() {
        if (this.searchContent == "") {
          return;
        }
        this.$router.push({
          path: '/search/prj',
          query: {
            type: this.searchContent.toLowerCase().indexOf("cve-") == -1 ? "project_name" : "vul_list.cve_id",
            content: this.searchContent
          }
        })
      },
      switchMenu(){
        if($(".side-navbar").hasClass('shrinked')){
          $(".side-navbar").removeClass('shrinked');
          $('.content-inner').css({'margin-left':'250px'})
        }else{
          $(".side-navbar").addClass('shrinked');
          $('.content-inner').css({'margin-left':'100px'})
        }
      },
      logout() {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          localStorage.setItem('user', null);
          this.$router.push({
            path: '/login'
          })
        })

      }
    },

    created: function () {
      if (localStorage.getItem('user') == null) {
        this.logout;
      }

      this.user = JSON.parse(localStorage.getItem('user'));
    },
    mounted() {
      this.switchMenu()
    }
  }

</script>

<style>
  .search-header {

    display: flex;
    flex-flow: row wrap;
    padding-top: 20px;
    padding-left: 10px;
    flex: 1 1 100%;
  }

  .search-input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .hederMenu{
    color: #fff;
    font-size: 24px;
    padding: 12px;
    cursor: pointer;
  }
  .hederMenu span{
    border-radius: 50%;
    padding: 10px;
  }
  .hederMenu:hover span{
    border-radius: 50%;
    padding: 10px;
    background-color:rgba(0,0,0,0.5) ;
  }
  .nav-name{
    display: flex;
    flex: 0 0 auto;
    align-items: center;
  }
</style>
