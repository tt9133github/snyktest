
import Standard from '../page/others/standard.vue'
import Password from '../page/user/user_root.vue'
import Upload from '../page/detect/upload.vue'
import InterCompareTask from '../page/tool/pair_compare/pair_compare_upload.vue'
import PairTasks from '../page/tool/pair_compare/pair_tasks'
import PairClone from '../page/tool/pair_compare/pair_detect_index'
import MetaExtract from '../page/tool/meta_extract'
import Fortify_Tool from '../page/tool/fortify/fortify_tool'
import Fortify_Task from '../page/tool/fortify/fortify_tasks'
import Fortify_Uplaod from '../page/tool/fortify/fortify_upload'
import Userinfo from '../page/user/user_info.vue'
import Usermanage from '../page/user/user_manage.vue'
import Login from '../page/login.vue'
import Home from '../page/home.vue'
import SysLicense from '../page/system/license.vue'
import ServerInfo from '../page/system/server-info.vue'
import Fortify from '../page/detect/result/fortify'
import Usermail from '../page/system/user_email'
import Config from '../page/system/config'
import Update_Config from '../page/system/update_config'
import log from '../page/system/log.vue'
//detect
import Clone from '../page/detect/detect_index.vue'
import License from '../page/detect/result/license'
import Relies from '../page/detect/result/relies.vue'
import ComponentDetail from '../page/detect/result/common-component-detail.vue'
import VulDetail from '../page/common/vul-detail'

//es
import Search_Home from '../page/search/main_search'
import Search_Adv from '../page/search/high_Search'
import Search_Prj from '../page/search/result/result_project'
import Search_Code from '../page/search/result/result_code'
import Search_Vul from '../page/search/result/result_vul'
import Search_Version from '../page/search/result/result_version'
import Search_File from '../page/search/result/result_file'

//home
import Statics from '../page/admin-home'
import Charts from '../page/charts'
import Tasks from '../page/detect/tasks'

export default [

    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'statics',
          component: Statics
        },
        {
          path: '/charts',
          name: 'charts',
          component: Charts
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: Tasks,
        },
        {
          path: 'pairTasks',
          name: 'pairTasks',
          component: PairTasks,
        },
        {
          path: ':id/pair_clone',
          component: PairClone,
        },
        {
          path: '/upload',
          name: 'addTask',
          component: Upload,
        },
        {
          path: '/two_file',
          name: 'interCompareTask',
          component: InterCompareTask,
        },
        {
          path: '/extract',
          name: 'metaExtract',
          component: MetaExtract,
        },
        {
          path: ':id/fortify/result',
          name: 'fortify_tool',
          component: Fortify_Tool,
        },
        {
          path: ':id/fortify/task',
          name: 'fortify_task',
          component: Fortify_Task,
        },
        {
          path: '/fortify/upload',
          name: 'fortify_upload',
          component: Fortify_Uplaod,
        },
        {
          path: ':id/clone',
          component: Clone,
        },
        {
          path: '/user_email',
          name: 'email',
          component: Usermail,
        },
        {
          path: '/config',
          name: 'config',
          component: Config,
        },
        {
          path: '/update_config',
          name: 'update_config',
          component: Update_Config,
        },
        {
          path: '/server',
          name: 'server',
          component: ServerInfo,
        },
        {
          path: '/password',
          name: 'password',
          component: Password,
        },

        {
          path: '/user_info',
          name: 'profile',
          component: Userinfo,
        },
        {
          path: '/user_manage',
          name: 'all_user',
          component: Usermanage,
        },
        {
          path: '/sysLicense',
          name: 'license',
          component: SysLicense,
        },
        {
          path: '/log',
          name: 'log',
          component: log,
        },
        {
          path: '/search',
          name: 'search',
          component: Search_Home,
        },
        {
          path: '/search/adv',
          component: Search_Adv,
        },
        {
          path: '/search/prj',
          name: 'searchPrj',
          component: Search_Prj,
        },
        {
          path: '/search/version',
          component: Search_Version,
        },
        {
          path: '/search/file',
          component: Search_File,
        },
        {
          path: '/search/code',
          component: Search_Code,
        },
        {
          path: '/search/vul',
          component: Search_Vul,
        },
      ]
    },
    {
      path: '/home/:id/clone/common_component/:pid',
      component: ComponentDetail,
    },
    {
      path: '/relies/:pid',
      component: Relies,
      props: true
    },
    {
        path: '/',
        component: Login,
    }, {
        path: '/standard',
        component: Standard
    }, {
        path: '/login',
        name: 'login',
        component: Login
    },

  {
    path: '/license',
    component: License,
  },
  {
        path: '/vul_detail/:id',
        component: VulDetail,
 } , {
    path: '/task/:id/fortify',
    component: Fortify,
  },

]
