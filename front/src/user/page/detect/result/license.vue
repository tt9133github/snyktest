<style>
  .license-label {
    width: 150px;
  }

  a:hover {
    cursor: pointer
  }

</style>
<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content">
        <div class="row">
          <div class="col-md-3">
            <!-- social buttons -->
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">NO.1--NO.5</h3></div>
              <div class="box-body">
                <a class="btn-block btn-social btn-google" v-show="1==licenseid">
                  <i class="fa fa-calendar-check-o"></i>MIT license
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;25%</span></a>
                <a class="btn btn-block btn-social btn-bitbucket" v-show="1!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>MIT license
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;25%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="2==licenseid">
                  <i class="fa fa-calendar-times-o "></i>GNU General Public
                  License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;22%</span></a>
                <a class="btn btn-block btn-social btn-dropbox" v-show="2!=licenseid">
                  <i class="fa fa-calendar-times-o "></i>GNU General Public
                  License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;22%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="3==licenseid">
                  <i class="fa fa-calendar-times-o "></i>Apache License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;16%</span></a>
                <a class="btn btn-block btn-social btn-facebook" v-show="3!=licenseid">
                  <i class="fa fa-calendar-times-o "></i>Apache License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;16%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="4==licenseid">
                  <i class="fa fa-calendar-times-o "></i>GNU General Public
                  License3.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;9%</span></a>
                <a class="btn btn-block btn-social btn-twitter" v-show="4!=licenseid">
                  <i class="fa fa-calendar-times-o "></i>GNU General Public
                  License3.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;9%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="5==licenseid">
                  <i class="fa fa-calendar-check-o"></i>BSD License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;6%</span></a>
                <a class="btn btn-block btn-social btn-vk" v-show="5!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>BSD License 2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;6%</span></a>
                <br>
              </div>
            </div>
            <!-- /.box -->
          </div>
          <div class="col-md-3">
            <!-- social buttons -->
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">NO.6--NO.10</h3></div>
              <div class="box-body">
                <a class="btn btn-block btn-social btn-google" v-show="6==licenseid">
                  <i class="fa fa-calendar-times-o"></i>LGPL license 2.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;4%</span></a>
                <a class="btn btn-block btn-social btn-bitbucket" v-show="6!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>LGPL license 2.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;4%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="7==licenseid">
                  <i class="fa fa-calendar-check-o"></i>Artistic License(Perl)
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;4%</span></a>
                <a class="btn btn-block btn-social btn-linkedin" v-show="7!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>Artistic License(Perl)
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;4%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="8==licenseid">
                  <i class="fa fa-calendar-times-o"></i>LGPL license 3.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <a class="btn btn-block btn-social btn-tumblr" v-show="8!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>LGPL license 3.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="9==licenseid">
                  <i class="fa fa-calendar-check-o"></i>Microsoft Public License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <a class="btn btn-block btn-social btn-twitter" v-show="9!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>Microsoft Public License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="10==licenseid">
                  <i class="fa fa-calendar-times-o"></i>Eclipse Public License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <a class="btn btn-block btn-social btn-vk" v-show="10!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>Eclipse Public License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;2%</span></a>
                <br/>
              </div>
            </div>
            <!-- /.box -->
          </div>
          <div class="col-md-3">
            <!-- social buttons -->
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">NO.11--NO.15</h3></div>
              <div class="box-body">
                <a class="btn btn-block btn-social btn-google" v-show="11==licenseid">
                  <i class="fa fa-calendar-check-o"></i>ISC License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;1%</span></a>
                <a class="btn btn-block btn-social btn-bitbucket" v-show="11!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>ISC License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="12==licenseid">
                  <i class="fa fa-calendar-check-o"></i>Code Project Open
                  License 1.02
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;1%</span></a>
                <a class="btn btn-block btn-social btn-dropbox" v-show="12!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>Code Project Open
                  License 1.02
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="13==licenseid">
                  <i class="fa fa-calendar-times-o"></i>Mozilla Public License
                  1.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-facebook" v-show="13!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>Mozilla Public License
                  1.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="14==licenseid">
                  <i class="fa fa-calendar-check-o"></i>The Simplified BSD
                  License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-twitter" v-show="14!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>The Simplified BSD
                  License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="15==licenseid">
                  <i class="fa fa-calendar-times-o"></i>CDDL License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-vk" v-show="15!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>CDDL License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <br/>
              </div>
            </div>
            <!-- /.box -->
          </div>
          <div class="col-md-3">
            <!-- social buttons -->
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">NO.16--NO.20</h3></div>
              <div class="box-body">
                <a class="btn btn-block btn-social btn-google" v-show="16==licenseid">
                  <i class="fa fa-calendar-times-o"></i>AGPL license
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-bitbucket" v-show="16!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>AGPL license
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="17==licenseid">
                  <i class="fa fa-calendar-times-o"></i>Microsoft Reciprocal
                  License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-linkedin" v-show="17!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>Microsoft Reciprocal
                  License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="18==licenseid">
                  <i class="fa fa-calendar-check-o"></i>Sun GPL With Classpath
                  Exception V2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-tumblr" v-show="18!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>Sun GPL With Classpath
                  Exception V2.0
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="19==licenseid">
                  <i class="fa fa-calendar-times-o"></i>CDDL-1.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-twitter" v-show="19!=licenseid">
                  <i class="fa fa-calendar-times-o"></i>CDDL-1.1
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-google" v-show="20==licenseid">
                  <i class="fa fa-calendar-check-o"></i>zlib License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <a class="btn btn-block btn-social btn-vk" v-show="20!=licenseid">
                  <i class="fa fa-calendar-check-o"></i>zlib License
                  <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&lt;1%</span></a>
                <br/>
              </div>
            </div>
            <!-- /.box -->
          </div>
          <div class="col-md-12">
            <!-- The time line -->
            <ul class="timeline">
              <!-- timeline time label -->
              <li class="time-label" id="MIT" v-show="1==licenseid">
                <span class="license-label bg-red">NO.1&nbsp;&nbsp;MIT License</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="1==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>The MIT License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;MIT
                      License是一个简短宽松的许可证协议，基本上只要你将原始的版权和许可证通知放在复制的源码(软件)中即可任意使用该源码(软件)。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/MIT" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="1==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>使用拥有MIT License的代码必须在所有复制品中放置版权说明.</p>
                    <p>使用拥有MIT License的代码必须在所有复制品中放置许可证通知</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="1==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>暂无规定</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="1==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" id="GPL-2" v-show="2==licenseid">
                <span class="license-label bg-red">NO.2&nbsp;&nbsp;GPL 2.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="2==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>GNU General Public License(GPL) 2.0</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;只要使用者在源文件中记录修改/时间，那么使用者可以复制、修改、分发拥有GPL2.0的软件。任何拥有GPL2.0的软件和对拥有GPL2.0的代码的修改都必须遵循GPL2.0协议开源，并必须全部使用GPL协议，并提供安装和编译说明书。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/GPL-2.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="2==licenseid">
                <i class="fa fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）原软件的副本和关于如何获取软件副本的说明书必须与软件一并分发。</p>
                    <p>
                      2）如果你以可执行文件的形式分发，那么你必须通过将你的源码一并分发或者列出提供源码的来源的方式使你的源码开源。</p>
                    <p>3）你必须包含原始版权和免责声明。</p>
                    <p>4）修改后的软件必须包含license的全文。</p>
                    <p>5）记录对软件所做的重要改动。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="2==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）GPL禁止从属许可证，每个获得软件的用户自动拥有复制、修改和分发软件的权利。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="2==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="3==licenseid">
                <span class="license-label bg-red">NO.3&nbsp;&nbsp;Apache 2.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="3==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Apache License 2.0</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;如果你要使用包含Apache
                      License 2.0的代码，你只要将将需要的说明性文档包含在你的代码中，然后你就可以任意使用该代码。Apache
                      License 2.0是一个宽松的许可证协议，它包含来自代码贡献者的专利许可证。</p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/Apache-2.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="3==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）修改后的软件必须包含license的全文。</p>
                    <p>3）记录对软件所做的重要改动。</p>
                    <p>
                      4）如果库中有带有属性说明的”NOTICE”文件，你必须在分发的时候包含该“NOTICE”文件。你可以将其衔接在现有“NOTICE”文件之后。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="3==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）不允许使用代码贡献者的姓名、商标或标识。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="3==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" :id="'anchor-'+index" v-show="4==licenseid">
                <span class="license-label bg-red">NO.4&nbsp;&nbsp;GPL 3.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="4==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>GNU General Public License 3.0</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;只要使用者在源文件中记录修改/时间，那么使用者可以复制、修改、分发拥有GPL3.0的软件。任何拥有GPL3.0的软件和对拥有GPL2.0的代码的修改都必须遵循GPL3.0协议开源，并必须全部使用GPL协议，并提供安装和编译说明书。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/GPL-3.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="4==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）原软件的副本和关于如何获取软件副本的说明书必须与软件一并分发。</p>
                    <p>2）任何链接GPL 3.0源码的代码都必须按照GPL3.0许可证协议开源。</p>
                    <p>3）你必须包含原始版权。</p>
                    <p>4）修改后的软件必须包含license的全文。</p>
                    <p>5）记录对软件所做的重要改动。</p>
                    <p>
                      6）如果含有GPL3.0许可证协议的软件是用户设备的一部分，那么该软件代码中必须包含对修改和重新安装软件必要的安装信息。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="4==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）GPL禁止从属许可证，每个获得软件的用户自动拥有复制、修改和分发软件的权利。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="4==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="5==licenseid">
                <span class="license-label bg-red">NO.5&nbsp;&nbsp;BSD License 2.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="5==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>BSD License 2.0(Revised, New or 3-Clause)</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;BSD
                      3-Clause
                      License也是一个非常宽松的协议。基本上只要你将BSD版权和许可证通知放在复制的源码(软件)中即可任意使用该源码(软件)。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/BSD-3-Clause" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="5==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权</p>
                    <p>必须在源代码或者目标码的拷贝中包含许可证全文</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="5==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）未经许可不得使用原作者或公司的名字做宣传。</p>
                    <p>2）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="5==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="6==licenseid">
                <span class="license-label bg-red">NO.6&nbsp;&nbsp;LGPL 2.1</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="6==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>GNU Lesser General Public License (LGPL) 2.1</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这个许可证主要应用于库。你可以复制，分发或者修改包含该许可证的软件，只要你说明了修改，并将他们放在LGPL-2.1许可证下面。任何静态链接在拥有LGPL-2.1许可证库的部分只能在LGPL下重新分发，但是使用这些库的应用则不必这么做。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/LGPL-2.1" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="6==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含源代码或者包含清楚的获取源码的链接。</p>
                    <p>2）必须包含原始版权。</p>
                    <p>3）修改后的软件必须包含license的全文。</p>
                    <p>
                      4）如果你的工程静态链接了拥有LGPL2.1许可证的软件，那么你必须发布目标码或者源码，以使用户可以修改库。如果是动态链接，你必须将库的源码开源。</p>
                    <p>5）记录对软件所做的重要改动。</p>
                    <p>6）对于每一份拥有LGPL2.1许可证的软件正在用的代码的拷贝，都必须给出详尽的说明。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="6==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）LGPL禁止从属许可证，每个获得软件的用户自动拥有复制、修改和分发软件的权利。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="6==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="7==licenseid">
                <span class="license-label bg-red">NO.7&nbsp;&nbsp;Perl</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="7==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Artistic License(perl)</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个用于软件包的许可证，它在保持开源的前提下，给予了原版权所有者一些对于其软件的一定程度的控制权。该许可证灵活性强，只要用户保留获取原软件的方法并发布改动，它允许用户分发或贩卖软件修改版。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/Artistic-Perl-1.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="7==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）如果修改或分发软件，必须修改软件的名字。</p>
                    <p>2）记录对软件所做的重要改动。</p>
                    <p>3）原软件的副本和关于如何获取软件副本的说明书必须与软件一并分发。</p>
                    <p>4）必须包含编译和安装的说明书。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="7==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不允许使用代码贡献者的姓名、商标或标识。</p>
                    <p>2）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="7==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="8==licenseid">
                <span class="license-label bg-red">NO.8&nbsp;&nbsp;LGPL 3.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="8==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>GNU Lesser General Public License (LGPL) 3.0</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这个许可证主要应用于库。你可以复制，分发或者修改包含该许可证的软件，只要你说明了修改，并将他们放在LGPL许可证下面。任何静态链接在拥有LGPL许可证库的部分只能在LGPL下重新分发，但是使用这些库的应用则不必这么做。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/LGPL-3.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="8==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）原软件的副本和关于如何获取软件副本的说明书必须与软件一并分发。</p>
                    <p>2）记录对软件所做的重要改动。</p>
                    <p>3）如果你以可执行文件的形式分发该许可证下的库，你必须保持开源3年。</p>
                    <p>4）修改后的软件必须包含license的全文。</p>
                    <p>5）必须包含原始版权。</p>
                    <p>
                      6）如果含有LGPL3.0许可证协议的软件是用户设备的一部分，那么该软件代码中必须包含对修改和重新安装软件必要的安装信息。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="8==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）LGPL禁止从属许可证，每个获得软件的用户自动拥有复制、修改和分发软件的权利。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="8==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="9==licenseid">
                <span class=" bg-red">NO.9&nbsp;&nbsp;Microsoft Public License</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="9==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Microsoft Public License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;只要你包含了许可证和版权所有，那么你可以任意使用拥有该许可证的软件。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/MS-PL" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="9==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）修改后的软件必须包含license的全文。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="9==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）不允许使用代码贡献者的姓名、商标或标识。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="9==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="10==licenseid">
                <span class="license-label bg-red">NO.10&nbsp;&nbsp;EPL License</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="10==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Eclipse Public License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;该许可证由Eclipse基金会制作并使用，其内容与GPL相似，但是它允许用户在该许可证下将代码链接到专利应用中。只要源码在EPL下是开源的，那么用户也可以在专利许可下分发二进制代码。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/EPL-1.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="10==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）修改后的软件必须包含licensCe的全文。</p>
                    <p>2）必须包含原始版权。</p>
                    <p>3）在分发拥有EPL许可证的软件时必须保持开源。</p>
                    <p>
                      4）如果用户将拥有EPL许可证的软件用于商用产品中，用户必须为EPL代码贡献者进行辩护并补偿因为商用给代码贡献者带来的诉讼和损害。</p>
                    <p>5）必须包含编译和安装的说明书。</p>
                    <p>6）原软件的副本和关于如何获取软件副本的说明书必须与软件一并分发。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="10==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>无</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="10==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="11==licenseid">
                <span class="license-label bg-red">NO.11&nbsp;&nbsp;ISC License</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="11==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>The ISC License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个简短宽松的许可证，基本上用户只要包含原始版权即可任意使用拥有ISC软件的代码。该许可证功能上与MIT/Expat和简化版BSD许可证相同。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/ISC" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="11==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）修改后的软件必须包含license的全文。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="11==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="11==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="12==licenseid">
                <span class="license-label bg-red">NO.12&nbsp;&nbsp;CPOL 1.02</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="12==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>The Code Project Open License (CPOL) 1.02</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;对代码作者提供了大量的保护，同时也让用户使用软件时基本不受限。但是，拥有CPOL许可证的软件不能用于非法、不道德和不适当的目的。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://tldrlegal.com/license/the-code-project-open-license-(cpol)-1.02#fulltext" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="12==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）记录对软件所做的重要改动。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="12==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）用户不允许对软件授予、扩展许可证。</p>
                    <p>2）用户可以免费重新声明许可证。</p>
                    <p>3）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>4）未经作者允许不得分发原文章（不包括源代码和可执行文件）。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="12==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="13==licenseid">
                <span class="license-label bg-red">NO.13&nbsp;&nbsp;MPL-1.1</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="13==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Mozilla Public License 1.1</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个程度较弱的非盈利版权，且与GPL不兼容。在每个源文件中都需包含一个声明（在原文中的Exhibit
                      A中详细说明）。只要源码在MPL下是开源的，那么用户也可以在专利许可下分发二进制代码。</p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/MPL-1.1" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="13==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）修改后的软件必须包含license的全文。</p>
                    <p>2）必须包含原始版权。</p>
                    <p>3）记录对软件所做的重要改动。</p>
                    <p>4）分发软件时必须保持开源。</p>
                    <p>
                      5）若遵守第三方知识产权，需在软件中包含一个最新的“LEGAL”文档来描述他们的联系方式信息和第三方知识产权声明。任何更新需向用户提供。</p>
                    <p>6）在每个源文件中都需包含一个声明（在原文中的Exhibit A中详细说明）。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="13==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）不允许使用代码贡献者的姓名、商标或标识。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="13==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="14==licenseid">
                <span class=" bg-red">NO.14&nbsp;&nbsp;BSD 2-Clause License</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="14==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>BSD 2-Clause License (FreeBSD/Simplified)</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;只要使用者在源文件中记录修改/时间，那么使用者可以复制、修改、分发拥有GPL3.0的软件。任何拥有GPL3.0的软件和对拥有GPL2.0的代码的修改都必须遵循GPL3.0协议开源，并必须全部使用GPL协议，并提供安装和编译说明书。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/BSD-2-Clause" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="14==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）修改后的软件必须包含license的全文。</p>
                    <p>2）必须包含原始版权。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="14==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="14==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="15==licenseid">
                <span class="license-label bg-red">NO.15&nbsp;&nbsp; CDDL-1.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="15==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Common Development and Distribution License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个由Sun
                      Microsystems使用的程度较弱的非盈利版权。与EPL和MPL相似。只要在CDDL下的原始和修改的源代码是开源的，用户也可以在专利许可下分发二进制代码。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/cddl1.txt" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="15==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）修改后的软件必须包含license的全文。</p>
                    <p>2）必须包含原始版权。</p>
                    <p>3）如果修改文件，必须将改动开源。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="15==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）不允许使用代码贡献者的姓名、商标或标识。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="15==licenseid">
                <i class="fa fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="16==licenseid">
                <span class="license-label bg-red">NO.16&nbsp;&nbsp;AGPL-3.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="16==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>GNU Affero General Public License v3</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;AGPL许可证与其它GNU许可证不同之处在于AGPL是用于网络软件的。：只要使用者在源文件中记录修改/时间，那么使用者可以分发修改版。像其它GNU许可证一样，衍生代码也必须使用AGPL许可证。它提供像GPL3.0一样的限制和自由，除了额外的一条：源代码必须和网络应用一起开源。因为网站和服务不像传统的意义上那样分发，所以AGPL是GPL的网络版。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/AGPL-3.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="16==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1) 必须包含编译和安装的说明书.</p>
                    <p>2）在分发、发布修改代码和衍生代码或者通过网络接口使用修改代码和衍生代码提供服务时需要开源。</p>
                    <p>3）你必须包含原始版权。</p>
                    <p>4）修改后的软件必须包含license的全文。</p>
                    <p>5）记录对软件所做的重要改动。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="16==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）禁止从属许可证，每个获得软件的用户自动拥有复制、修改和分发软件的权利。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="16==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="17==licenseid">
                <span class="license-label bg-red">NO.17&nbsp;&nbsp;Ms-RL</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="17==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Microsoft Reciprocal License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个微软的非盈利版权（版权属左）的许可证，拥有Ms-RL许可证的软件的从属许可证必须能与Ms-RL许可证兼容。完全是自己所完成的代码不会受影响，但是软件用户必须可以获取包含拥有Ms-RL许可证的代码的所有文件。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/MS-RL" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="17==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）修改后的软件必须包含license的全文。</p>
                    <p>3）如果修改文件，必须将改动开源。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="17==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                    <p>2）不允许使用代码贡献者的姓名、商标或标识。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="17==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="18==licenseid">
                <span class=" bg-red">NO.18&nbsp;&nbsp;Sun GPL With Classpath Exception V2.0</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="18==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Sun GPL With Classpath Exception V2.0</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;未收录相关介绍
                    </p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="19==licenseid">
                <span class="license-label bg-red">NO.19&nbsp;&nbsp;CDDL 1.1</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="19==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Microsoft Public License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;这是一个由Sun
                      Microsystems使用的程度较弱的非盈利版权。与EPL和MPL相似。只要在CDDL下的原始和修改的源代码是开源的，用户也可以在专利许可下分发二进制代码。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="http://directory.fsf.org/wiki/License:CDDLv1.0" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="19==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）修改后的软件必须包含license的全文。</p>
                    <p>3）如果修改文件，必须将改动开源。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="19==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>无</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="19==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:red">
                    <b>商用性：不友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline time label -->
              <li class="time-label" v-show="20==licenseid">
                <span class="license-label bg-red">NO.20&nbsp;&nbsp;Zlib</span>
              </li>
              <!-- /.timeline-label -->
              <!-- timeline item -->
              <li v-show="20==licenseid">
                <i class="fa fa-balance-scale bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header">
                    <a>
                      <b>Zlib-Libpng License</b>
                    </a>
                  </h3>
                  <div class="timeline-body">
                    <p>
                      <i class="glyphicon glyphicon-hand-right"></i>&nbsp;&nbsp;该许可证用于zlib库和一些其它开源的库或者包中。它非常简短宽松。软件改动后需要用户修改名字，并包含一句将软件作者免责的声明。
                    </p>
                  </div>
                  <div class="timeline-footer">
                    <a href="https://opensource.org/licenses/Zlib" class="btn btn-primary btn-xs" target="_blank">原文链接</a>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="20==licenseid">
                <i class="fa  fa-thumbs-up bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Rules must be followed</span>
                  <h3 class="timeline-header">
                    <a>MUST</a>
                  </h3>
                  <div class="timeline-body">
                    <p>1）必须包含原始版权。</p>
                    <p>2）为了不会将改动后的软件和原软件混淆，必须修改软件名字或者清楚标示版本。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="20==licenseid">
                <i class="fa fa-thumbs-down bg-blue"></i>
                <div class="timeline-item">
							<span class="time">
								<i class="fa fa-comments-o"></i>&nbsp;Cannot violate rule</span>
                  <h3 class="timeline-header">
                    <a>CANNOT</a>
                  </h3>
                  <div class="timeline-body">
                    <p>不对软件的适用性提供担保，如果软件使用造成了危害，不担保软件和许可证版权所有者提供赔偿。</p>
                  </div>
                </div>
              </li>
              <!-- END timeline item -->
              <!-- timeline item -->
              <li v-show="20==licenseid">
                <i class="fa  fa-users bg-blue"></i>
                <div class="timeline-item">
                  <h3 class="timeline-header no-border" style="color:#428bca">
                    <b>商用性：友好</b>
                  </h3>
                </div>
              </li>
              <!-- END timeline item -->
            </ul>
          </div>
        </div>
        <!-- /.row -->
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        licenseid: this.$route.params.licenseid
      }
    },
    created: function () {
      this.getLicenseid();
    },

    methods: {
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector);
        document.body.scrollTop = anchor.offsetTop;
      }, //获取参数project_id
      getLicenseid: function () {
        var url = window.location.href;
        if (url.indexOf("?")) {
          var args = url.split("?");
          var license = args[1].split("=");
          this.licenseid = license[0];
        }

      }
    }
  }

</script>
