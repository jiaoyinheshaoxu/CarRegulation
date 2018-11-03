<template lang='html'>

	<!--内容-->
	<div id="main_content">
		<div id="main_title">个人中心</div>
		<div id="child_content">
			<!--内容左-->
			<div id="main_left">
				<ul id="main_title_list">
					<li 
						@click="checkSubBar('main_personal')" 
						:class="[subTabBar == 'main_personal' ? 'main_title_hover' : '']" 
						v-show="true">
						个人信息
					</li>
					<li 
						@click="checkSubBar('main_sub_accounts')" 
						:class="[subTabBar == 'main_sub_accounts' ? 'main_title_hover' : '']" 
						v-show="true">
						副账户管理
					</li>
					<li 
						@click="checkSubBar('main_add')" 
						:class="[subTabBar == 'main_add' ? 'main_title_hover' : '']" 
						v-show="true">
						我的收藏
					</li>
					<li 
						@click="checkSubBar('main_down_print')" 
						:class="[subTabBar == 'main_down_print' ? 'main_title_hover' : '']" 
						v-show="true">
						下载与打印记录
					</li>
					<li 
						@click="checkSubBar('main_mess')" 
						:class="[subTabBar == 'main_mess' ? 'main_title_hover' : '']" 
						v-show="true">
						消息管理
					</li>
					<li 
						@click="checkSubBar('main_merge_pwd')" 
						:class="[subTabBar == 'main_merge_pwd' ? 'main_title_hover' : '']" 
						v-show="true">
						修改密码
					</li>
					<li 
						@click="user_quit()">退出登录</li>
				</ul>
			</div>
			<!--内容右-->
			<div id="main_right">
				<!--个人信息-->
				<div id="main_personal" v-show="subTabBar == 'main_personal'">
					<div id="main_personal_warn">
						<span class="main_warn_icon"></span>
						<span>尊敬的用户，您已选择高级会员，请及时汇款到指定账户，本消息三日内有效。</span>
						<span class="main_warn_detail" @click="showDialog_checkDetail = true">查看详情</span>
					</div>
					<div id="main_personal_title">
						<span class="mess_title_cont">个人资料</span>
						<div id="main_personal_cont">
							<ul id="main_personal_ul">
								<li>
									<span class="main_li_title">注册邮箱：</span>
									<span>157321519@qq.com</span>
								</li>
								<li>
									<span class="main_li_title">注册日期：</span>
									<span>2018-02-24</span>
								</li>
								<li>
									<span class="main_li_title">会员级别：</span>
									<span>普通会员</span>
									<span class="main_personal_btn" v-show="true" @click="showDialog_upgrade = true">马上升级</span>		<!-- 普通会员 -->
									<span class="main_personal_btn" v-show="false">续费</span> 		<!-- 高级会员 -->
								</li>
								
								<li v-show="true">																							<!-- 高级会员 -->
									<span class="main_li_title marginLeft_2em">来自：</span>
									<span>美国</span>
								</li>
								<li v-show="true">																							<!-- 高级会员 -->
									<span class="main_li_title marginLeft_2em">电话：</span>
									<span>+86 18410407088</span>
								</li>
								<li v-show="true">																							<!-- 高级会员 -->
									<span class="main_li_title">有效期至：</span>
									<span>2019-02-24</span>
								</li>
								<li v-show="true">																							<!-- 高级会员 -->
									<span class="main_li_title">下载点数：</span>
									<span class="dangerFont">3</span>
								</li>
								
							</ul>
						</div>
					</div>
				</div>
				<!--信息管理-->
				<div id="main_mess" v-show="subTabBar == 'main_mess'">
					<div id="main_mess_title">
						<span class="mess_title_cont">消息管理</span>
						<span class="mess_remove_btn">批量删除</span>
					</div>
					<div id="main_table">
						<table>
							<thead>
								<tr>
									<th class="first_total"></th>
									<th>标题</th>
									<th class="last_table">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="first_table"></td>
									<td>尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
										<span><a href="#">查看详情</a></span>
									</td>
								</tr>
								<tr>
									<td class="first_table"></td>
									<td>尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
										<span><a href="#">查看详情</a></span>
									</td>
								</tr>
								<tr>
									<td class="first_table"></td>
									<td>尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
										<span><a href="#">查看详情</a></span>
									</td>
								</tr>
								<tr>
									<td class="first_table"></td>
									<td>尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
										<span><a href="#">查看详情</a></span>
									</td>
								</tr>
								<tr>
									<td class="last_first_table"></td>
									<td>尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款 尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款 尊敬的用户：您已经申请开通vip会员服务，请根据汇款地址，及时汇款
									</td>
									<td class="last_table">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--模拟下拉框-->
					<div id="page_left">每页显示</div>
					<div id="page_center">
						<ul id="main_box">
							<li class="select_box">
								<span id="fisrt">10</span>
								<ul class="son_ul">
									<li><span>10</span></li>
									<li><span>15</span></li>
									<li><span>20</span></li>
								</ul>
							</li>
						</ul>
					</div>
					<div id="page_right">
						<ul id="main_result">
							<li>结果</li>
							<li>&nbsp;&nbsp;&nbsp;&nbsp;总共</li>
							<li>80</li>
							<li>/</li>
							<li>629</li>
							<li>结果</li>
						</ul>
						分页
						<ul id="main_page">
							<li>&lt;</li>
							<li class="magin_page_current">1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>&gt;</li>
						</ul>
					</div>
				</div>
				<!-- 副账户管理 -->
				<div id="main_sub_accounts" v-show="subTabBar == 'main_sub_accounts'">
					<div id="warn" class="main_sub_warn">
						<span id="icon" class="main_warn_icon"></span>
						<span class="create_failure">尊敬的用户，副账户创建额度已达到上限，无法继续创建。</span>
						<span class="create_success">恭喜您，副账户创建成功！如有问题请联系客服。</span>
						<span class="main_close_detail"></span>
					</div>
					<div id="main_sub_title">
						<span class="sub_title_cont">副账户管理</span>
						<p class="sub_create_btn">
							<span>BaBo建</span> 系统允许您创建三个副账户
							<b class="sub_create_enable">创建</b>
						</p>
					</div>
					<div id="main_sub_table">
						<table>
							<thead>
								<tr>
									<th width='10%' align="center">序号</th>
									<th width="25%">邮箱</th>
									<th width="25%">密码</th>
									<th width="40%" align="right" style="padding-right:60px">管理</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width='10%' align="center">1</td>
									<td width="25%" align="center">anna@gmail.com</td>
									<td width="25%" align="center">na9895659</td>
									<td width="40%" align="right" class="last_sub_table">
										<span><a href="#">修改</a></span>
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td width="10%" align="center">2</td>
									<td width="25%" align="center">anna@gmail.com</td>
									<td width="25%" align="center">na9895659</td>
									<td width="40%" align="right" class="last_sub_table">
										<span><a href="#">修改</a></span>
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td width="10%" align="center">3</td>
									<td width="25%" align="center">anna@gmail.com</td>
									<td width="25%" align="center">na9895659</td>
									<td width="40%" align="right" class="last_sub_table">
										<span><a href="#">修改</a></span>
										<span><a href="#">删除</a></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!--我的收藏-->
				<div id="main_add" v-show="subTabBar == 'main_add'">
					<div id="main_add_title">
						<span class="mess_title_cont">我的收藏记录</span>
					</div>
					<div id="main_add_table">
						<table>
							<thead>
								<tr>
									<th class="">序号</th>
									<th>标准名称</th>
									<th>日期</th>
									<th class="last_table">管理</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="">1</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">2</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">3</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">4</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">5</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">6</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="">7</td>
									<td>汽车和挂车后下部防护要求</td>
									<td>2018-09-29</td>
									<td class="last_table">
										<span><a href="#">删除</a></span>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
					<!--模拟下拉框-->
					<div id="page_left">每页显示</div>
					<div id="page_center">
						<ul id="main_box">
							<li class="select_box">
								<span id="fisrt">10</span>
								<ul class="son_ul">
									<li><span>10</span></li>
									<li><span>15</span></li>
									<li><span>20</span></li>
								</ul>
							</li>
						</ul>
					</div>
					<div id="page_right">
						<ul id="main_result">
							<li>结果</li>
							<li>&nbsp;&nbsp;&nbsp;&nbsp;总共</li>
							<li>80</li>
							<li>/</li>
							<li>629</li>
							<li>结果</li>
						</ul>
						<!--分页-->
						<ul id="main_page">
							<li>&lt;</li>
							<li class="magin_page_current">1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>&gt;</li>
						</ul>
					</div>
				</div>
				<!-- 下载与打印记录 -->
				<div id="main_down_print" v-show="subTabBar == 'main_down_print'">
					<div id="main_down_print_title">
						<span class="down_print_title">我的下载与打印记录</span>
						<p class="down_print_use">
							点数消耗：
							<span>80/120</span>
						</p>
					</div>
					<div id="main_down_table">
						<table>
							<thead>
								<tr height="50px;">
									<th width="15%" align="center">类别</th>
									<th width="45%" align="center">标准名称</th>
									<th width="10%" align="center">消耗</th>
									<th width="30%" align="center">
										日期
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="15%" align="center">下载</td>
									<td width="45%" align="center">汽车和挂车后下部防护要求</td>
									<td width="10%" align="center"> -1 </td>
									<td width="30%" align="center">2019-02-15</td>
								</tr>
								<tr>
									<td width="15%" align="center">打印</td>
									<td width="45%" align="center">汽车和挂车后下部防护要求</td>
									<td width="10%" align="center"> -1 </td>
									<td width="30%" align="center">2019-02-15</td>
								</tr>
								<tr>
									<td width="15%" align="center">下载</td>
									<td width="45%" align="center">汽车和挂车后下部防护要求</td>
									<td width="10%" align="center"> -1 </td>
									<td width="30%" align="center">2019-02-15</td>
								</tr>
								<tr>
									<td width="15%" align="center">按章节下载</td>
									<td width="45%" align="center">汽车和挂车后下部防护要求</td>
									<td width="10%" align="center"> -1 </td>
									<td width="30%" align="center">2019-02-15</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--模拟下拉框-->
					<div id="page_left">每页显示</div>
					<div id="page_center">
						<ul id="main_box">
							<li class="select_box">
								<span id="fisrt">10</span>
								<ul class="son_ul">
									<li><span>10</span></li>
									<li><span>15</span></li>
									<li><span>20</span></li>
								</ul>
							</li>
						</ul>
					</div>
					<div id="page_right">
						<ul id="main_result">
							<li>结果</li>
							<li>&nbsp;&nbsp;&nbsp;&nbsp;总共</li>
							<li>80</li>
							<li>/</li>
							<li>629</li>
							<li>结果</li>
						</ul>
						<!-- 分页 -->
						<ul id="main_page">
							<li>&lt;</li>
							<li class="magin_page_current">1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>&gt;</li>
						</ul>
					</div>
				</div>
				<!-- 修改密码 -->
				<div id="main_merge_pwd" v-show="subTabBar == 'main_merge_pwd'">
					<div class="main_success_msg">
						<span class="main_msg_icon"></span>
						<span>密码修改成功</span>
						<span class="main_close_pwd"></span>
					</div>
					<div id="main_pwd_title">
						<span class="merge_pwd_cont">修改密码</span>
					</div>
					<div id="main_pwd_form">
						<form action="#">
							<div class="pwd">
								<input type="password" placeholder="旧密码">
							</div>
							<div class="pwd">
								<input type="password" placeholder="新密码">
							</div>
							<div class="pwd">
								<input type="password" placeholder="确认密码">
							</div>
							<div class="submit_btn">
								<span id="sure_btn">确定</span>
							</div>
						</form>
					</div>
				</div>
				
				<!--查看详情弹窗-->
				<el-dialog title="温馨提示" :visible.sync="showDialog_checkDetail" width="40%" left>
					<p class="upgrade_tips">
						<span class="main_warn_icon"></span>
						<span>请尽快将 99 元 转账到以下账户以升级成高级会员：</span>
					</p>
					<p class="marginLeft_2em upgrade_tips dangerFont">中国银行：6226 6602 1888 6889 576</p>
					<p class="marginLeft_2em upgrade_tips dangerFont">收 款 人 ：Dai yong ming</p>
					
					
					<span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="showDialog_checkDetail = false">知 道 了</el-button>
				  </span>
				</el-dialog>
				
				
			  <!--升级为高级会员弹窗-->
				<el-dialog title="升级为高级会员" :visible.sync="showDialog_upgrade" width="40%" left>
					<p class="upgrade_tips">您将获得：<span class="blueFont">搜索、查看全部文档、下载与打印、设置两名副用户</span></p>
					<p class="upgrade_tips">选择套餐：</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="1">季付  每月120元  共54次打印或下载机会</el-radio>
					</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="2">年付  每年450元 共220打印或下载机会</el-radio>
					</p>
					<p class="upgrade_tips mTop20">所在国家：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_country" placeholder="您的国家"></el-input>
					</p>
					<p class="upgrade_tips mTop20">你的电话：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_country" placeholder="您的电话"></el-input>
					</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_upgrade = false">取 消</el-button>
				    <el-button type="primary" @click="">确 定</el-button>
				  </span>
				</el-dialog>
			  
			  
			</div>
		</div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
      	memberId: "",
      	subTabBar: "main_personal",
      	showDialog_upgrade: false,
      	showDialog_checkDetail: false,
      	labelPosition: 'right',
      	upgrade_type: "1",
      	user_country: ""
      }
		},
		mounted () {
			// 获取用户信息 => 判断用户权限 => 
			this.getMemberInfo();
			
			
			
		},
		methods: {
			// 获取用户信息 OtherService.asmx/GetMemberInfo => 判断用户权限 
			//this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
			async getMemberInfo(){
				let url = 'OtherService.asmx/GetMemberInfo';
	      let params = {
	        memberId:	'4c2053d1-a8fa-4ac4-9239-a3124c29e1e3' 
	      }
	      let data = await this.api.post(url,params)
	      console.log(data);
			},
			
			// 用户退出
			user_quit(){
				
			},
			checkSubBar(SubBarName){
				this.subTabBar = SubBarName;
				switch (SubBarName){
					case "main_personal":
						console.log('获取个人信息');
						break;
				}
			}
		}
	}
</script>

<style lang=''>
	.views{
		padding: 0 !important;
	}
	/*左侧菜单*/
	#main_content {
		width: 100%;
		height: 700px;
		background: #F1F1F1;
	}
	#child_content {
		width: 85%;
		margin: 0 auto;
		height: 100%;
		background: #ffffff;
	}
	#main_title {
		width: 85%;
		height: 100px;
		margin: 0 auto;
		line-height: 100px;
		font-size: 30px;
		color: #0C7DCF;
	}
	#main_left {
		width: 20%;
		height: 80%;
		float: left;
		border-right: 1px solid #EAEAEA;
	}
	#main_title_list li {
		list-style: none;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #6F6F6F;
		font-size: 14px;
		cursor: pointer;
	}
	.main_title_hover{
    background: #E7F7FF;
    color: #0C7DCF !important;
    border-right:2px solid #0C7DCF;
	}
	
	#main_right{
    width: 76%;
    height: 80%;
    float: right;
    padding:10px 10px;
	}
	
	
	
	/* 个人信息栏 */
	#main_personal_warn {
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
		left: -32px;
		top: -10px;
		background: #FFFBE7;
		border: 1px solid #FFF4CE;
		font-size: 14px;
	}
	.main_warn_icon {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-left: 20px;
		background: url(../../assets/images/total.png) -200px -300px #FFFBE7;
		position: relative;
		top: 2px;
	}
	.main_warn_detail {
		color: #0C7DCF;
		float: right;
		padding-right: 20px;
		cursor: pointer;
	}
	#main_personal_cont {
		margin-top: 20px;
		font-size: 14px;
	}
	#main_personal_ul li {
		list-style: none;
	}
	.main_li_title {
		color: #6F6F6F;
	}
	.main_personal_btn {
		display: inline-block;
		width: 75px;
		height: 25px;
		background: #1992FF;
		border-radius: 8px;
		color: #ffffff;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
		margin-top: 10px;
		margin-left: 20px;
		cursor: pointer;
	}
	
	/*信息管理*/
	#main_mess {
		display: none;
	}
	#main_mess_title,
	#main_personal_title {
		width: 96%;
		height: 50px;
		line-height: 50px;
	}
	.mess_title_cont {
		display: inline-block;
		font-size: 18px;
		color: #545454;
		font-weight: bold;
	}
	.mess_remove_btn {
		float: right;
		width: 75px;
		height: 30px;
		background: #1992FF;
		border-radius: 8px;
		color: #ffffff;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		margin-top: 10px;
	}
	#main_table {
		width: 100%;
		color: #6F6F6F;
		margin-bottom: 50px;
	}
	#main_table table {
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		border-radius: 10px;
		font-size: 14px;
	}
	#main_table thead {
		background: #FCFCFC;
	}
	#main_add_table tbody tr:hover {
		background: #f6fcff;
	}
	#main_add_table tbody tr:nth-child(even) {
		background: #FCFCFC;
	}
	#main_table th,
	#main_table td {
		height: 50px;
		border-bottom: 1px solid #EAEAEA;
	}
	#main_table th {
		border-top: 1px solid #EAEAEA;
	}
	.first_table,
	.first_total {
		width: 50px;
		border-left: 1px solid #EAEAEA;
		background-image: url('../../assets/images/total.png');
		background-position: -109px -329px;
	}
	.last_first_table {
		width: 50px;
		border-left: 1px solid #EAEAEA;
	}
	.last_table {
		width: 120px;
		border-right: 1px solid #EAEAEA;
	}
	.last_table a {
		color: #1992FF;
	}
	
	
	/*副账户管理*/
	/*#main_sub_accounts {
		display: none;
	}
	.sub_title_cont {
		display: inline-block;
		font-size: 18px;
		color: #545454;
		font-weight: bold;
	}
	.sub_create_btn {
		float: right;
		width: 320px;
		font-size: 14px;
		color: #6F6F6F;
	}
	.sub_create_btn>span {
		font-size: 16px;
		color: #545454;
		font-weight: bold;
		margin-right: 20px;
	}
	.sub_create_disable {
		display: inline-block;
		width: 50px;
		height: 25px;
		line-height: 25px;
		border: 1px dashed #ddd;
		background: #F5F5F5;
		cursor: pointer;
		border-radius: 5px;
		color: #C2C2C2;
		padding-left: 10px;
		box-sizing: border-box;
		margin-left: 10px;
	}
	.sub_create_enable {
		display: inline-block;
		width: 50px;
		height: 25px;
		line-height: 25px;
		background: #1890FF;
		cursor: pointer;
		border-radius: 5px;
		color: #fff;
		padding-left: 10px;
		box-sizing: border-box;
		margin-left: 10px;
	}
	#main_sub_table,
	#main_down_table {
		width: 100%;
		color: #6F6F6F;
		margin-bottom: 50px;
	}
	#main_sub_table table,
	#main_down_table table {
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		border-radius: 10px;
		font-size: 14px;
		border: 1px solid #E8E8E8;
	}
	#main_sub_table table th,
	#main_sub_table table td,
	#main_down_table talbe th,
	#main_down_table table td {
		height: 50px;
		border-right: 0;
		border-left: 0;
		border-bottom: 1px solid #E9E9E9;
	}
	.last_sub_table {
		padding-right: 40px;
	}
	.last_sub_table a {
		color: #1992FF;
	}
	#main_sub_table table tr:nth-child(even),
	#main_down_table table tr:nth-child(even) {
		background: #FAFAFA;
	}
	#main_sub_table table thead tr:nth-child(odd),
	#main_down_table table thead tr:nth-child(odd) {
		background: #FAFAFA;
	}
	#main_sub_table table tbody tr:hover,
	#main_down_table table tbody tr:hover {
		background: #E6F7FF;
	}
	.main_sub_warn {
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
		left: -32px;
		top: -10px;
		background: #FFFBE7;
		border: 1px solid #FFF4CE;
		font-size: 14px;
	}
	.main_sub_success {
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
		left: -32px;
		top: -10px;
		background: #F6FFED;
		border: 1px solid #B7EB8F;
		font-size: 14px;
	}
	.main_success_icon {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-left: 20px;
		background: url(../images/total.png) -80px -300px #FFFBE7;
		position: relative;
		top: 2px;
	}
	.main_close_detail {
		cursor: pointer;
		display: inline-block;
		width: 20px;
		height: 12px;
		background: url(../images/bg.png) -800px -140px;
		float: right;
		margin-top: 6px;
	}
	.sub1 {
		margin-top: 20px;
		margin-right: 20px;
	}*/
	
	
	
	
	/* 升级会员 弹窗内提示语 */
	.upgrade_tips{
		color: #6F6F6F;
    padding-left: 30px;
    padding-right: 30px;
    height: 40px;
    line-height: 40px;
	}
	.choice{
		margin-left: 6.5em;
		height: 25px;
		line-height: 25px;
	}
</style>