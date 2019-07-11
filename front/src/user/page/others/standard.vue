<template>
 <div class="wrapper">
    <Header></Header>
    <Seadbar></Seadbar>
	<!-- Content Header (Page header) -->
           <div class="content-wrapper" style="background-color:white;">
	<section class="content-header">
		<h1>术语说明
			<i class="fa fa-indent"></i>
			<small></small>
		</h1>
		<ol class="breadcrumb">
			<li>

					<i class="fa fa-dashboard"></i> 术语说明
			</li>
		</ol>
	</section>
	<!-- Main content -->
	<section class="content">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title  text-blue">

							<i class="fa fa-fw fa-copy"></i>克隆分析粒度
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn  btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools -->
                    </div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
							</small>系统进行克隆代码检测时进行代码切割的代码行数。</p>
					</div>
				</div>
				<!-- /.box -->
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title text-blue">
							<i class="fa fa-fw fa-columns"></i>代码文件相似度
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn btn-default btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools --></div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
							</small>两个代码文件所含相同代码特征值的数量占总特征值数量的比值。</p>
					</div>
				</div>
				<!-- /.box -->
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title text-blue">
							<i class="fa fa-fw fa-bar-chart"></i>克隆文件匹配阈值
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools -->
                    </div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
							</small>判断被检测文件是否克隆的代码文件相似度阈值。</p>

					</div>
				</div>
				<!-- /.box -->
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title text-blue">
							<i class="fa fa-fw fa-plus-square"></i>主体语言
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools -->
                    </div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
							</small>指项目中编程语言文件数最多的编程语言。</p>

					</div>
				</div>
				<!-- /.box -->
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title text-blue">
							<i class="fa fa-fw  fa-font"></i>克隆检测语言
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools --></div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
                            </small>克隆分析时所针对的编程语言。</p>
                    </div>
				</div>
				<!-- /.box -->
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title text-blue">
							<i class="fa fa-fw fa-server"></i>有效克隆检测文件
							<small></small></h3>
						<!-- tools box -->
						<div class="pull-right box-tools">
							<button type="button" class="btn btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse">
								<i class="fa fa-minus"></i>
							</button>
						</div>
						<!-- /. tools --></div>
					<!-- /.box-header -->
					<div class="box-body pad">
						<p>
							<small>
								<i class="fa fa-circle-o text-blue"></i>
                            </small>代码行数超过克隆分析粒度的克隆检测语言文件。</p>
                    </div>
				</div>
				<!-- /.box -->
            </div>
			<!-- /.col-->
        </div>
		<!-- ./row -->
    </section>
    </div>
     <Footer></Footer>
    </div>
</template>
<script>
    import Header from '../../components/Header.vue';
    import Seadbar from '../../components/Seadbar.vue';
    import Footer from '../../components/Footer.vue';
    export default {
        components: {
            Header,
            Seadbar,
            Footer

        },
    }

</script>
