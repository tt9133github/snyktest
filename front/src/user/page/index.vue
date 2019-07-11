<template>
    <div id="wrapper">
        <!-- Header -->
        <header id="header" class="alt">
            <span class="logo"><img src="../../../static/image/logo-2.png" alt="" /></span>
            <h1><b>Prism</b>Guard</h1>
            <p>为您提供专业的源代码安全评估与管理服务</p>
            <br>
            <ul class="actions">
                <li> <el-button  @click="ifAlreadyLogin()"  plain>开始检测</el-button></li>
            </ul>
        </header>
        <!-- Nav -->
        <nav id="nav" class="nav-style">
            <ul>
                <li><a href="#intro" class="active">系统简介</a></li>
                <li><a href="#first">系统功能</a></li>
                <li><a href="#second">数据统计</a></li>
                <li><a href="#cta">开始使用</a></li>
            </ul>
        </nav>
        <!-- Main -->
        <div id="main">
            <!-- Introduction -->
            <section id="intro" class="main special">
                <div class="spotlight">
                    <div class="content">
                        <header class="major">
                            <h2>系统简介</h2>
                        </header>
                        <p>PrismGuard软件源代码安全评估平台是中国信息安全测评中心推出的基于Devops内生安全主动防御理念的新型产品。该产品基于大数据、并行计算和最新的检测分析算法，为用户提供安全检测、智能运维、安全防护三位一体的供应链安全管理和防护，极大降低软件供应链安全风险。该系统通过对软件代码的各种安全性和开源许可证的合规性等方面进行检测、跟踪及管理，保障用户在研发、交付、运行等环节的信息安全和知识产权安全。同时，系统还可与用户研发运行环境结合，实现基于Devops的研发运行安全、智能运维和安全监测。
                        </p>
<!--                        <center> <span><img src="../../../static/index/images/system_info.png" alt="" /></span></center><br>-->
                        <ul class="actions">
                            <li><br><a href="#first" id="button-index">了解更多</a></li>
                        </ul>

                    </div>

                </div>
            </section>
            <!-- First Section -->
            <section id="first" class="main special">
                <header class="major">
                    <h2>系统功能</h2>
                </header>
                <ul class="features">
                    <li>
                        <span class="icon major style1 fa-code"></span>
                        <h3>引用组件检测</h3>
                        <p>检测源代码项目的基本成份构成和引用开源组件，分析组件的版本和多维度评价情况。</p>
                    </li>
                    <li>
                        <span class="icon major style3 fa-copy"></span>
                        <h3>克隆文件检测</h3>
                        <p>检测源代码项目中与开源项目代码相似的克隆文件，并进行溯源分析相应的开源软件。</p>
                    </li>
                    <li>
                        <span class="icon major style5 fa-bookmark"></span>
                        <h3>许可证检测</h3>
                        <p>检测源代码项目中引用开源组件或者克隆开源项目的开源许可证情况，识别开源许可证合规性。</p>
                    </li>
                    <br>
                    <li>
                        <span class="icon major style2 fa-bomb"></span>
                        <h3>漏洞检测与跟踪</h3>
                        <p>检测源代码项目中开源组件的安全漏洞情况，提出修复方案并可跟踪最新的漏洞情况。</p>
                    </li>
                    <li>
                        <span class="icon major style3 fa-exclamation-circle"></span>
                        <h3>恶意代码检测</h3>
                        <p>检测源代码项目中的恶意代码情况，包括后门木马、APT、黑客工具等恶意程序。</p>
                    </li>
                    <li>
                        <span class="icon major style4 fa-binoculars"></span>
                        <h3>潜在风险检测</h3>
                        <p>检测源代码项目中使用的加密算法、敏感行为以及代码缺陷情况，识别潜在安全风险。</p>
                    </li>
                </ul>
                <footer class="major">
                    <ul class="actions">
                        <li><a href="#second" id="button-index">了解更多</a></li>
                    </ul>
                </footer>
            </section>
            <!-- Second Section -->
            <section id="second" class="main special">
                <header class="major">
                    <h2>数据统计</h2>
                    <p>超过20种流行开发语言, 数百万个开源项目, 数万个安全风险，近百个主流开源许可证</p>
                </header>
                <ul class="statistics">
                    <li class="style1">
                        <span class="icon fa-code-fork"></span>
                        <strong>20 +</strong> 语言支持
                    </li>
                    <li class="style2">
                        <span class="icon fa-folder-open-o"></span>
                        <strong>2,436,000+</strong> 开源项目
                    </li>

                    <li class="style4">
                        <span class="icon fa-laptop"></span>
                        <strong>42,000 +</strong> 安全风险
                    </li>

                    <li class="style5">
                        <span class="icon fa-laptop"></span>
                        <strong>80 +</strong> 开源许可证
                    </li>

                </ul>
                <footer class="major">
                    <ul class="actions">
                        <li><a href="#cta" id="button-index">了解更多</a></li>
                    </ul>
                </footer>
            </section>

            <!-- Get Started -->
            <section id="cta" class="main special">
                <header class="major">
                    <h2>开始使用</h2>
                    <p>为您提供专业的软件源代码安全评估与管理服务</p>
                </header>
                <footer class="major">
                    <ul class="actions">

                        <li><a @click="ifAlreadyLogin()" id="button-index">登录</a></li>
                    </ul>
                </footer>
            </section>
        </div>
        <!-- Footer -->
        <footer id="footer">
            <section>
                <h2>典型使用场景</h2>
                <p>基于Devops的研发、运行、维护等全链条管理
                    <br /> 软件供应链安全检测与监测
                    <br /> 第三方代码安全性与合规性管控
                    <br /> 知识产权、软件工作量评估与审计
                </p>
            </section>
            <section>
                <h2>联系我们</h2>
                <dl class="alt">
                    <p><b>Address</b></p>
                    <dd>北京市海淀区上地西路8号院1号楼</dd>
                      <!--<p><b>Email</b></p>-->
                    <!--<dd><a href="#">7-cai@7-cai.com</a></dd>-->
                </dl>
            </section>
            <p class="copyright"><strong>Copyright &copy; 2017 <a href="about.html#!/" target = "_blank">中国信息安全测评中心</a>.</strong> All rights reserved.</p>
        </footer>
    </div>
    </template>
<script>
    export default {
        methods: {
            ifAlreadyLogin() {
                var vue = this;
              vue.$router.push({
                path: '/login'
              })
            },
        }
    }

</script>
