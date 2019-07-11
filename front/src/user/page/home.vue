<template>
  <div class="main">
    <Header></Header>
    <div class="d-flex">

      <nav class="side-navbar">
        <div class="sidebar-header align-items-center" style="display: flex">
          <div><img src="../../../static/image/man_user.png" class="img-circle userImg" alt="User Image"></div>
          <div class="title">
            <h4>{{user.username}}</h4>
          </div>
        </div>
        <hr style="margin: 10px">
        <!-- Sidebar Navidation Menus-->
        <ul class="list-unstyled">
          <li id="home" @click="goPage('statics',$event)" v-show="user.resources.indexOf(3) != -1"> <a><i class="fa fa-home"></i>首页</a></li>
          <li><a href="#apps" aria-expanded="false" data-toggle="collapse" v-show="user.resources.indexOf(2) != -1"><i class="fa fa-copy"></i>检测 </a>
            <ul id="apps" class="list-unstyled collapse" >
              <li @click="goPage('addTask',$event)"><a>新建检测任务</a></li>
              <li @click="goPage('tasks',$event)"><a>我的历史任务</a></li>
            </ul>
          </li>
          <li v-show="user.resources.indexOf(6) != -1" @click="goPage('search',$event)"> <a> <i class="fa fa-search"></i>搜索 </a></li>
          <!--<li @click="goPage('charts',$event)"> <a> <i class="fa fa-bar-chart-o"></i>统计 </a></li>-->
          <li><a href="#tools" aria-expanded="false" data-toggle="collapse"><i class="fa fa-wrench"></i>工具 </a>
            <ul id="tools" class="list-unstyled collapse" >
              <ul class="list-unstyled">
                <li><a href="#compare" aria-expanded="false" data-toggle="collapse"><i class="fa fa-copy"></i>两文件对比 </a>
                  <ul id="compare" class="list-unstyled collapse" style="padding-left: 20px">
                    <li @click="goPage('interCompareTask',$event)"><a>新建任务</a></li>
                    <li @click="goPage('pairTasks',$event)"><a>我的历史任务</a></li>
                  </ul>
                </li>
              </ul>
              <li @click="goPage('metaExtract',$event)"><a>元信息提取</a></li>
              <ul class="list-unstyled">
                <li><a href="#fortify" aria-expanded="false" data-toggle="collapse"><i class="fa fa-copy"></i>Fortify </a>
                  <ul id="fortify" class="list-unstyled collapse" style="padding-left: 20px">
                    <li @click="goPage('fortify_upload',$event)"><a>新建任务</a></li>
                    <li @click="goPage('fortify_task',$event)"><a>我的历史任务</a></li>
                  </ul>
                </li>
              </ul>
            </ul>
          </li>
          <li><a href="#users" aria-expanded="false" data-toggle="collapse"> <i class="fa fa-user-circle"></i>用户 </a>
            <ul id="users" class="collapse list-unstyled">
              <li @click="goPage('all_user',$event)" v-show="user.resources.indexOf(4) != -1"><a>查看所有用户</a></li>
              <li @click="goPage('profile',$event)"><a>我的账户</a></li>
              <li @click="goPage('password',$event)" v-show="user.resources.indexOf(4) != -1"><a>权限分配</a></li>
            </ul>
          </li>
          <li v-show="user.resources.indexOf(5) != -1"><a href="#pages" aria-expanded="false" data-toggle="collapse"> <i class="fa fa-gear"></i>系统 </a>
            <ul id="pages" class="collapse list-unstyled">
              <!--<li @click="goPage('email',$event)"><a>设置邮件</a></li>-->
              <li @click="goPage('log',$event)"><a>系统日志</a></li>
              <li @click="goPage('server',$event)"><a>资源信息</a></li>
              <li @click="goPage('config',$event)"><a>系统配置</a></li>
              <li @click="goPage('update_config',$event)"><a>数据更新</a></li>
            </ul>
          </li>
        </ul ><span class="heading" v-show="user.resources.indexOf(5) != -1">外链</span>
        <ul class="list-unstyled" v-show="user.resources.indexOf(5) != -1">
          <li> <a href="http://10.10.201.13:8866/" target="_blank"> <i class="fa fa-globe"></i>爬虫管理 </a></li>
          <li> <a href="http://10.10.201.7:8080" target="_blank"> <i class="fa fa-globe"></i>Ambari </a></li>
        </ul>
      </nav>

      <div class="content-inner">
        <router-view @smallSideBar="smallSideBar"></router-view>
      </div>

    </div>

  </div>
</template>

<script>
  import Header from '../components/Header.vue';

  export default {
    data() {
      return {
        currentView:'Statistics',
        user: { resources : ""},
      }
    },
    components: {
      Header
    },

    mounted: function () {
      if(localStorage.getItem('user') == null || localStorage.getItem('user') == "")
      {
        this.$router.push({name: 'login'});
      }
      //this.user = JSON.parse(localStorage.getItem('user'));
      this.user = JSON.parse(localStorage.getItem('user'));
    },

    methods: {
      goPage(val, event) {
        $(".side-navbar").removeClass('shrinked');
        $('.content-inner').css({'margin-left':'250px'})
        this.$router.push({name: val})
        $('.list-unstyled .active').removeClass('active');
        $('.list-unstyled  .default').removeClass('default');
        $(event.currentTarget).addClass('active');
      },

      smallSideBar() {
        $(".side-navbar").addClass('shrinked');
        $('.content-inner').css({'margin-left':'100px'})
      }

    }

  }
</script>

<style>
  .main {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: #EEF5F9;
  }

  .userImg {
    width: 75px;
    height: 75px;
  }

  .list-unstyled li {
    cursor: pointer;
  }

  .default {
    background: #EEF5F9;
  }
</style>


