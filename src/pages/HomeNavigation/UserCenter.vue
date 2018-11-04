<template lang='html'>

	<!--内容-->
	<div id="main_content">
		<div id="main_title">个人中心</div>
		<div id="child_content">
			<!--内容左-->
			<div id="main_left">
				<ul id="main_title_list">
					<li @click="checkSubBar('main_personal')" :class="[subTabBar == 'main_personal' ? 'main_title_hover' : '']" v-show="true">
						个人信息
					</li>
					<li @click="checkSubBar('main_sub_accounts')" :class="[subTabBar == 'main_sub_accounts' ? 'main_title_hover' : '']" v-show="true">
						副账户管理
					</li>
					<li @click="checkSubBar('main_add')" :class="[subTabBar == 'main_add' ? 'main_title_hover' : '']" v-show="true">
						我的收藏
					</li>
					<li @click="checkSubBar('main_down_print')" :class="[subTabBar == 'main_down_print' ? 'main_title_hover' : '']" v-show="true">
						下载与打印记录
					</li>
					<li @click="checkSubBar('main_mess')" :class="[subTabBar == 'main_mess' ? 'main_title_hover' : '']" v-show="true">
						消息管理
					</li>
					<li @click="checkSubBar('main_merge_pwd')" :class="[subTabBar == 'main_merge_pwd' ? 'main_title_hover' : '']" v-show="true">
						修改密码
					</li>
					<li @click="showDialog_quit_account = true">退出登录</li>
				</ul>
			</div>
			<!--内容右-->
			<div id="main_right">
				<!--个人信息-->
				<div id="main_personal" v-show="subTabBar == 'main_personal'">
					<div id="main_personal_warn" v-show="wantToUpgrade">
						<span class="main_warn_icon"></span>
						<span>尊敬的用户，您已选择高级会员，请及时汇款到指定账户，本消息三日内有效。</span>
						<span class="main_warn_detail" @click="showDialog_checkDetail = true">查看详情</span>
					</div>
					<div class="main_content_title">
						<span class="mess_title_cont">个人资料</span>
						<div id="main_personal_cont">
							<ul id="main_personal_ul">
								<li>
									<span class="main_li_title">注册邮箱：</span>
									<span>{{ memberInfo.F_Email }}</span>
								</li>
								<li>
									<span class="main_li_title">注册日期：</span>
									<span>{{ memberInfo.F_CreatorTime.slice(0,10) }}日</span>
								</li>
								<li>
									<span class="main_li_title">会员级别：</span>
									<span>{{ memberInfo.F_HYTypeName }}</span>

									<!--测试用-->
									<!--<span class="main_personal_btn" v-show="true" @click="showDialog_upgrade = true">马上升级</span>
									<span class="main_personal_btn" v-show="true" @click="showDialog_upgrade = true">续费</span>-->

									<!--正式用=>普通会员升级=>高级会员续费-->
									<span class="main_personal_btn" v-show="memberInfo.F_HYType==0" @click="showDialog_upgrade = true">马上升级</span>
									<span class="main_personal_btn" v-show="memberInfo.F_HYType==1 || memberInfo.F_HYType==2" @click="showDialog_upgrade = true">续费</span>
								</li>
								<li>
									<span class="main_li_title">订阅状态：</span>
									<el-switch v-model="memberInfo.F_IsSubscription" active-text="开启订阅" inactive-text="取消订阅" @change="setMemberIsSubscription()"></el-switch>
								</li>
								<li v-show="memberInfo.F_HYType==1 || memberInfo.F_HYType==2">
									<!-- 高级会员 -->
									<span class="main_li_title marginLeft_2em">来自：</span>
									<span>{{ memberInfo.F_Country }}</span>
								</li>
								<li v-show="memberInfo.F_HYType==1 || memberInfo.F_HYType==2">
									<!-- 高级会员 -->
									<span class="main_li_title marginLeft_2em">电话：</span>
									<span>{{ memberInfo.F_Phone }}</span>
								</li>
								<li v-show="memberInfo.F_HYType==1 || memberInfo.F_HYType==2">
									<!-- 高级会员 -->
									<span class="main_li_title">有效期至：</span>
									<span>{{ memberInfo.F_EndDate }}</span>
								</li>
								<li v-show="memberInfo.F_HYType==1 || memberInfo.F_HYType==2">
									<!-- 高级会员 -->
									<span class="main_li_title">剩余点数：</span>
									<span class="dangerFont">{{ memberInfo.residueDownloadNum }}</span>
								</li>

							</ul>
						</div>
					</div>
				</div>

				<!-- 副账户管理 -->
				<div id="main_sub_accounts" v-show="subTabBar == 'main_sub_accounts'">
					<div class="main_content_title">
						<span class="mess_title_cont">副账户管理</span>
						<p class="sub_create_btn">
							<span>{{ memberInfo.F_Phone }}</span> 
							<!--系统允许您创建三个副账户-->
							<b class="sub_create_enable" @click="addOrModify_sub_account('')">创建</b>
						</p>
					</div>
					<div id="main_sub_table">
						<table>
							<thead>
								<tr>
									<th width="50">序号</th>
									<th>邮箱</th>
									<th>密码</th>
									<th>管理</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!DeputyMemberList.length || DeputyMemberList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您还没有添加任何副账户！</a></span></td>
								</tr>
								<tr v-show="DeputyMemberList.length || DeputyMemberList.length > 0" v-for="(item,index) in DeputyMemberList" :key="index">
									<td>{{ index}}</td>
									<td class="email_password_td" :title="item.Email">{{ item.Email }}</td>
									<td class="email_password_td" :title="item.Password">{{ item.Password }}</td>
									<td class="last_sub_table">
										<span><a href="javascript: void(0);" @click="addOrModify_sub_account(item.Id,item.Email,item.Password)">修改</a></span>
										<span><a href="javascript: void(0);" @click="delete_sub_account(item.Id)">删除</a></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				
				<!--我的收藏-->
				<div id="main_add" v-show="subTabBar == 'main_add'">
					<div class="main_content_title">
						<span class="mess_title_cont">我的收藏记录</span>
						<p class="sub_create_btn">
							<span></span>
						</p>
					</div>
					
					<div id="main_sub_table">
						<table>
							<thead>
								<tr>
									<th width="50">序号</th>
									<th>标准名称</th>
									<th>日期</th>
									<th>管理</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!myCollectList.length || myCollectList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您还没有添加任何收藏！</a></span></td>
								</tr>
								<tr v-show="myCollectList.length || myCollectList.length > 0" v-for="(item,index) in myCollectList" :key="index">
									<td>{{ index}}</td>
									<td class="email_password_td" :title="item.Title">{{ item.Title }}</td>
									<td class="email_password_td" :title="item.CreatorTime">{{ item.CreatorTime }}</td>
									<td class="last_sub_table">
										<span><a href="javascript: void(0);" @click="delete_collect(item.Id)">取消关注</a></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="block text-center" v-show="total != 0">
				    <el-pagination
				      @size-change="handleSizeChange_collect"
				      @current-change="handleCurrentChange_collect"
				      :current-page="page"
				      :page-sizes="[5, 10, 20, 30, 50, 100, 200]"
				      :page-size="rows"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
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
				<el-dialog :title="memberInfo.F_HYType==1 ? '升级为高级会员' : '立即续费'" :visible.sync="showDialog_upgrade" width="40%" left>
					<p class="upgrade_tips" v-show="memberInfo.F_HYType==1">您将获得：<span class="blueFont">搜索、查看全部文档、下载与打印、设置两名副用户</span></p>
					<p class="upgrade_tips">{{ memberInfo.F_HYType==1 ? '选择套餐' : '续费类型' }}：</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="1">季付 每月120元 共54次打印或下载机会</el-radio>
					</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="2">年付 每年450元 共220打印或下载机会</el-radio>
					</p>
					<p class="upgrade_tips mTop20" v-show="memberInfo.F_HYType==1">所在国家：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_country" placeholder="您的国家"></el-input>
					</p>
					<p class="upgrade_tips mTop20" v-show="memberInfo.F_HYType==1">你的电话：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_country" placeholder="您的电话"></el-input>
					</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_upgrade = false">取 消</el-button>
				    <el-button type="primary" @click="">确 定</el-button>
				  </span>
				</el-dialog>
				
				<!-- 添加或者修改副账户 -->
				<el-dialog :title="point_account_id=='' ? '添加副账户' : '修改副账户'" :visible.sync="showDialog_addOrmidify_account" width="40%" left>
					<p class="upgrade_tips mTop20">账户邮箱：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="point_account_email" placeholder="账户邮箱"></el-input>
					</p>
					<p class="upgrade_tips mTop20">账户密码：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="point_account_password" placeholder="账户密码"></el-input>
					</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_addOrmidify_account = false">取 消</el-button>
				    <el-button type="primary" @click="confirm_addOrModify_account()">确 定</el-button>
				  </span>
				</el-dialog>
				
				<!-- 退出登陆 => 跳转到登陆页面前提示 -->
				<el-dialog title="退出登陆" :visible.sync="showDialog_quit_account" width="400px" left>
					<p class="upgrade_tips dangerFont text-center">您 确 定 要 退 出 登 录 ？</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_quit_account = false">手 抖 了</el-button>
				    <el-button type="primary" @click="confirm_quit()">残忍退出</el-button>
				  </span>
				</el-dialog>
				
				<!-- 删除副账户弹窗 => 刷新列表 -->
				<el-dialog title="删除副账户" :visible.sync="showDialog_delete_account" width="400px" left>
					<p class="upgrade_tips dangerFont text-center">您 确 定 要 删 除 副 账 户 ？</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_delete_account = false">手 抖 了</el-button>
				    <el-button type="primary" @click="confirm_delete_account()">残忍删除</el-button>
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
				showDialog_addOrmidify_account: false,
				showDialog_quit_account: false,
				showDialog_delete_account: false,
				
				page: 1,											// 默认第一页
				rows: 10,											// 默认每页显示10条
				total: 100,										// 默认总数目
				
				point_account_id: "",					// 指定的 账户id (""=>添加 不是""=>修改)
				point_account_email: "",			// 指定的 账户email (""=>添加 不是""=>修改)
				point_account_password: "",		// 指定的 账户password (""=>添加 不是""=>修改)
				addOrModify_api_url:	"",			// 新增或者修改账户的接口地址
				
				upgrade_type: "", 						// 选择升级类型  1=>季付	2=>年付
				user_country: "", 						// 所在国家
				wantToUpgrade: false, 				// 默认为未提交(高级会员申请) => 判断个人信息栏提示付费显示隐藏
				// 个人信息
				memberInfo: {
					F_HYType: "", 							// 会员类型	1季付	2年付
					F_Phone: "", 								// 会员电话
					F_Email: "", 								// 会员邮箱
					F_CreatorTime: "", 					// 创建时间
					F_StartDate: "", 						// 开始时间
					F_EndDate: "", 							// 结束时间
					F_DownAndPrintCount: "", 		// 打印下载次数
					F_IsSubscription: false, 		// 是否订阅
					F_SubscriptionLanguage: "", // 订阅语言
					F_State: "", 								// 状态
					F_IsDeputy: "", 						// 是否是副账户
					F_SuperUId: "",
					F_Country: "", 							// 所在国家
					downAndPrintCount: "", 			// 总下载次数
					downloadCount: "", 					// 已下载次数
					residueDownloadNum: "" 			// 剩余下载次数
				},
				// 副账户列表
				DeputyMemberList: [],
				// 收藏列表
				myCollectList: [],
			}
		},
		mounted() {
			// 获取用户信息 => 判断用户权限 => 
			this.getMemberInfo();

		},
		methods: {
			// 获取用户信息 OtherService.asmx/GetMemberInfo => 判断用户权限 
			async getMemberInfo() {
				let url = 'OtherService.asmx/GetMemberInfo';
				//	        memberId:	this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId') 
				let params = {
					memberId: "18416e80-b937-497f-9c49-1b99bfcf93e2"
				}
				let data = await this.api.post(url, params);
				console.log(data);
				this.memberInfo = data;
				if(this.memberInfo.F_HYType == 0){
					this.memberInfo.F_HYTypeName = "普通会员";
				}else if(this.memberInfo.F_HYType == 1){
					this.memberInfo.F_HYTypeName = "高级会员 <span class='blueFont'>季付</span>";
				}else{
					this.memberInfo.F_HYTypeName = "高级会员 <span class='blueFont'>季付</span>";
				}
			},
			
			// 取消订阅 / 订阅 切换		OtherService.asmx/SetMemberIsSubscription
			async setMemberIsSubscription(){
				let url = 'OtherService.asmx/SetMemberIsSubscription';
				let params = {
					memberId: "18416e80-b937-497f-9c49-1b99bfcf93e2",
					isSubscription: this.memberInfo.F_IsSubscription
				}
				let data = await this.api.post(url, params);
				if(data.result == true){
					this.$message({
            showClose: true,
            message: this.memberInfo.F_IsSubscription ? '恭喜您，订阅成功！' : '您已取消订阅！',
            type: 'success',
            duration: 2000
          })
				}else{
					this.$message({
            showClose: true,
            message: data.result,
            type: 'success',
            duration: 2000
          });
				}
			},
			
			// 获取用户副账户列表 OtherService.asmx/GetDeputyMemberListByUserId 
			async getDeputyMemberListByUserId() {
				let url = 'OtherService.asmx/GetDeputyMemberListByUserId';
				//	        memberId:	this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId') 
				let params = {
					memberId: "18416e80-b937-497f-9c49-1b99bfcf93e2"
				}
				let data = await this.api.post(url, params);
				this.DeputyMemberList = data.memberList;
			},
			
			// 添加副账户和修改副账户
			addOrModify_sub_account(Id,Email,Password){
				if(Id == ""){
					if(this.memberInfo.F_HYType == 0){
						this.$message({
	            showClose: true,
	            message: "普通会员没有创建副账户权限，敬请升级为高级会员！",
	            type: 'warning',
	            duration: 5000
	          });
	          return;
					}else{
						this.point_account_id = this.memberInfo.F_SuperUId;		// 新增 id 为主账户id
						this.point_account_email = "";
						this.point_account_password = "";
						this.addOrModify_api_url = "OtherService.asmx/AddDeputyMember";
					}
				}else{
					this.point_account_id = Id;															// 修改 id 为副账户id
					this.point_account_email = Email;
					this.point_account_password = Password;
					this.addOrModify_api_url = "OtherService.asmx/UpdateDeputyMember";
				}
				this.showDialog_addOrmidify_account = true;
			},
			
			// 确认提交 添加副账户和修改副账户
		 	async	confirm_addOrModify_account (){
				let url = this.addOrModify_api_url;
				if(url == "OtherService.asmx/AddDeputyMember"){
					let params = {
						email: this.point_account_email,
			      userPassword: this.point_account_password,
			      superUId: this.point_account_id
					}
				}else{
					let params = {
						newEmail: this.point_account_email,
			      newPassword: this.point_account_password,
			      id: this.point_account_id
					}
				}
				let data = await this.api.post(url, params);
				console.log(data);
				// 成功回调 => 刷新列表
				if(data.result == true){
					this.getDeputyMemberListByUserId();
				}
			},
			
			// 删除副账户 => 打开弹窗
			delete_sub_account (id){
				this.showDialog_delete_account = true;
				this.point_account_id = id;
			},
			
			// 删除副账户 OtherService.asmx/DeleteDeputyMember keyValue
			async confirm_delete_account(){
				let url = "OtherService.asmx/DeleteDeputyMember";
				let params = {
					keyValue: this.point_account_id
				}
				let data = await this.api.post(url, params);
				console.log(data);
				// 成功回调 => 刷新列表
				if(data.result == true){
					this.getDeputyMemberListByUserId();
				}
			},
			
			// 获取收藏列表 OtherService.asmx/GetMyCollect
	    // 参数： int page, int rows, string userid,int languageType 1中文2英文
	    // 返回值： total,   myCollectList
	    // myCollectList 包含属性：
			// Id
	    // Title,
	    // CreatorTime ,
	    async getMyCollect(){
				let url = "OtherService.asmx/GetMyCollect";
				let params = {
					page: this.page,
					rows: this.rows,
					memberId: "18416e80-b937-497f-9c49-1b99bfcf93e2",
					languageType: 1
				}
				let data = await this.api.post(url, params);
				console.log(data);
				this.total = data.total;
				this.myCollectList = data.myCollectList;
			},
			
			// 收藏分页
			handleCurrentChange_collect(page){
				this.page = page;
				this.getMyCollect();
			},
			handleSizeChange_collect(rows){
				this.rows = rows;
				this.getMyCollect();
			},
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// 用户退出 => 跳转到登陆页面
			confirm_quit() {
				this.$router.push({
			    name: 'SignIn'
			  })
			},
			checkSubBar(SubBarName) {
				this.subTabBar = SubBarName;
				switch(SubBarName) {
					case "main_personal":
						this.getMemberInfo();
						break;
					case "main_sub_accounts":
						this.getDeputyMemberListByUserId();
						break;
					case "main_add":
						this.page = 1;
						this.rows = 10;
						this.getMyCollect();
						break;
				}
			}
		}
	}
</script>

<style lang=''>
	.views {
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
	.main_title_hover {
		background: #E7F7FF;
		color: #0C7DCF !important;
		border-right: 2px solid #0C7DCF;
	}
	#main_right {
		width: 76%;
		height: 80%;
		float: right;
		margin-right: 2%;
		padding: 10px 10px;
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
	
	
	/*副账户管理*/
	.sub_title_cont {
		display: inline-block;
		font-size: 18px;
		color: #545454;
		font-weight: bold;
	}
	.sub_create_btn {
		float: right;
		text-align: right;
		width: 100%;
		font-size: 14px;
		color: #6F6F6F;
	}
	.sub_create_btn>span {
		font-size: 16px;
		color: #545454;
		font-weight: bold;
		margin-right: 20px;
	}
	/*创建不可用时状态*/
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
	/*创建可用状态*/
	.sub_create_enable {
		display: inline-block;
		text-align: center;
		width: 50px;
		height: 25px;
		line-height: 25px;
		background: #1890FF;
		cursor: pointer;
		border-radius: 5px;
		color: #fff;
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
		margin-left: 10px;
	}
	#main_sub_table {
		width: 100%;
		color: #6F6F6F;
		margin-bottom: 50px;
	}
	#main_sub_table table {
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		border-radius: 10px;
		font-size: 14px;
		border: 1px solid #E8E8E8;
		table-layout: fixed !important;
	}
	#main_sub_table table th,
	#main_sub_table table td{
		height: 50px;
		border-right: 0;
		border-left: 0;
		text-align: center;
		border-bottom: 1px solid #E9E9E9;
	}
	/* 邮箱密码过长处理 */
	.email_password_td{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.last_sub_table a {
		color: #1992FF;
		margin: 0 10px;
	}
	/*偶数行设置背景*/
	#main_sub_table table tr:nth-child(even) {
		background: #FAFAFA;
	}
	/*奇数行设置背景*/
	#main_sub_table table thead tr:nth-child(odd){
		background: #FAFAFA;
	}
	#main_sub_table table tbody tr:hover {
		background: #E6F7FF;
	}
	.sub1 {
		margin-top: 20px;
		margin-right: 20px;
	}
	
	
	
	
	
	
	/*信息管理*/
	#main_mess {
		display: none;
	}
	
	#main_mess_title,
	.main_content_title {
		width: 100%;
		height: 50px;
		line-height: 50px;
	}
	
	.mess_title_cont {
		display: block;
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
	
	
	/* 升级会员 弹窗内提示语 */
	.upgrade_tips {
		color: #6F6F6F;
		padding-left: 30px;
		padding-right: 30px;
		font-weight: bold;
		letter-spacing: 1px;
		height: 40px;
		line-height: 40px;
	}
	
	.choice {
		margin-left: 6.5em;
		height: 25px;
		line-height: 25px;
	}
</style>