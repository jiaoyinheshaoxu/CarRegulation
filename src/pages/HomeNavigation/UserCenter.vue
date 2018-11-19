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
									<span>{{ memberInfo.F_CreatorTime.length > 0 ? memberInfo.F_CreatorTime.slice(0,10) : "日期返回错误" }}日</span>
								</li>
								<li>
									<span class="main_li_title">会员级别：</span>
									<span v-html="memberInfo.F_HYTypeName"></span>
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
									<th width="100">管理</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!DeputyMemberList.length || DeputyMemberList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您 还 没 有 添 加 任 何 副 账 户 ！</a></span></td>
								</tr>
								<tr v-show="DeputyMemberList.length || DeputyMemberList.length > 0" v-for="(item,index) in DeputyMemberList" :key="index">
									<td>{{ index+1 }}</td>
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
									<th width="200">日期</th>
									<th width="100">管理</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!myCollectList.length || myCollectList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您 还 没 有 添 加 任 何 收 藏 ！</a></span></td>
								</tr>
								<tr v-show="myCollectList.length || myCollectList.length > 0" v-for="(item,index) in myCollectList" :key="index">
									<td>{{ index+1 }}</td>
									<td class="email_password_td" :title="item.Title">{{ item.Title }}</td>
									<td class="email_password_td" :title="item.CreatorTime">{{ item.CreatorTime.length>0 ? item.CreatorTime.slice(0,10)+"日 "+item.CreatorTime.slice(11,19) : "日期返回错误" }}</td>
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

				<!-- 下载与打印记录 -->
				<div id="main_down_print" v-show="subTabBar == 'main_down_print'">
					<div class="main_content_title">
						<span class="mess_title_cont">我的下载与打印记录</span>
						<p class="sub_create_btn">
							点数消耗：
							<span>{{ memberInfo.downloadCount }}/{{ memberInfo.downAndPrintCount }}</span>
						</p>
					</div>
					<div id="main_sub_table">
						<table>
							<thead>
								<tr>
									<th width="50">类别</th>
									<th>标准名称</th>
									<th width="50">消耗</th>
									<th width="200">日期</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!downloadInfoList.length || downloadInfoList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您 还 没 有 任 何 下 载 或 打 印 记 录 ！</a></span></td>
								</tr>
								<tr v-show="downloadInfoList.length || downloadInfoList.length > 0" v-for="(item,index) in downloadInfoList" :key="index">
									<td class="email_password_td" :title="item.Type">{{ item.Type == 1 ? "下载" : "打印" }}</td>
									<td class="email_password_td" :title="item.Title">{{ item.Title }}</td>
									<td>{{ item.Num }}</td>
									<td class="email_password_td" :title="item.CreatorTime">{{ item.CreatorTime.length>0 ? item.CreatorTime.slice(0,10)+"日 "+item.CreatorTime.slice(11,19) : "日期返回错误" }}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="block text-center" v-show="total != 0">
				    <el-pagination
				      @size-change="handleSizeChange_downLoad"
				      @current-change="handleCurrentChange_downLoad"
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
					<div class="main_content_title">
						<span class="mess_title_cont">消息管理</span>
						<p class="sub_create_btn">
							<span></span>
							<b class="sub_create_enable" @click="group_delete_message()">批量删除</b>
						</p>
					</div>

					<div id="main_sub_table">
						<table>
							<thead>
								<tr>
									<th width="50"><input type="checkbox" name="checkAllOrNot" id="checkAllOrNot" value="" /></th>
									<th>标题</th>
									<th width="200">留言日期</th>
									<th width="150">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-show="!sysMessageInfoEntityList.length || sysMessageInfoEntityList.length == 0">
									<td colspan="4" class="last_sub_table"><span><a href="javascript: void(0);">您 还 未 收 到 任 何 系 统 消 息 ！</a></span></td>
								</tr>
								<tr v-show="sysMessageInfoEntityList.length || sysMessageInfoEntityList.length > 0" v-for="(item,index) in sysMessageInfoEntityList" :key="index">
									<td><input type="checkbox" name="checkNode" class="checkNode" value="" :nodeId="item.Id" @change="sel_single()" /></td>
									<td class="email_password_td" :title="item.Title">{{ item.Title }}</td>
									<td class="email_password_td" :title="item.CreatorTime">{{ item.CreatorTime.length>0 ? item.CreatorTime.slice(0,10)+"日 "+item.CreatorTime.slice(11,19) : "日期返回错误" }}</td>
									<td class="last_sub_table">
										<span><a href="javascript: void(0);" @click="delete_system_message(item.Id)">删除</a></span>
										<span><a href="javascript: void(0);" @click="check_systemMsg_detail(item.Id,item.Title,item.CreatorTime)">查看详情</a></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="block text-center" v-show="total != 0">
				    <el-pagination
				      @size-change="handleSizeChange_message"
				      @current-change="handleCurrentChange_message"
				      :current-page="page"
				      :page-sizes="[5, 10, 20, 30, 50, 100, 200]"
				      :page-size="rows"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
				  </div>
				</div>

				<!-- 修改密码 -->
				<div id="main_merge_pwd" v-show="subTabBar == 'main_merge_pwd'">
					<div class="main_content_title">
						<span class="mess_title_cont">修改密码</span>
						<p class="sub_create_btn">
							<span></span>
						</p>
					</div>

					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="旧密码" prop="userOldPassword">
					    <el-input type="password" v-model="ruleForm2.userOldPassword" autoComplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="新密码" prop="userNewPassword">
					    <el-input type="password" v-model="ruleForm2.userNewPassword" autoComplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="确认密码" prop="newPasswordConfirm">
					    <el-input type="password" v-model="ruleForm2.newPasswordConfirm" autoComplete="off"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
					    <el-button @click="resetForm('ruleForm2')">重置</el-button>
					  </el-form-item>
					</el-form>

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
				<el-dialog :title="memberInfo.F_HYType==0 ? '升级为高级会员' : '立即续费'" :visible.sync="showDialog_upgrade" width="40%" left>
					<p class="upgrade_tips" v-show="memberInfo.F_HYType==0">您将获得：<span class="blueFont">搜索、查看全部文档、下载与打印、设置两名副用户</span></p>
					<p class="upgrade_tips">{{ memberInfo.F_HYType==0 ? '选择套餐' : '续费类型' }}：</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="1">季付 每月120元 共54次打印或下载机会</el-radio>
					</p>
					<p class="choice">
						<el-radio v-model="upgrade_type" label="2">年付 每年450元 共220打印或下载机会</el-radio>
					</p>
					<p class="upgrade_tips mTop20" v-show="memberInfo.F_HYType==0">所在国家：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_country" placeholder="您的国家"></el-input>
					</p>
					<p class="upgrade_tips mTop20" v-show="memberInfo.F_HYType==0">你的电话：
						<el-input class="fRight" style="width: 50%; left: -25%;" size="small" v-model="user_phone" placeholder="您的电话"></el-input>
					</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_upgrade = false">取 消</el-button>
				    <el-button type="primary" @click="confirm_upgradeOrRepay()">确 定</el-button>
				  </span>
				</el-dialog>

				<!-- 添加或者修改副账户 -->
				<el-dialog :title="point_account_email=='' ? '添加副账户' : '修改副账户'" :visible.sync="showDialog_addOrmidify_account" width="40%" left>
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

				<!-- 退出登录 => 跳转到登录页面前提示 -->
				<el-dialog title="退出登录" :visible.sync="showDialog_quit_account" width="400px" left>
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

				<!-- 删除系统消息弹窗 => 刷新列表 -->
				<el-dialog title="删除系统消息" :visible.sync="showDialog_delete_message" width="400px" left>
					<p class="upgrade_tips dangerFont text-center">{{ (messageIds && messageIds.indexOf(',') > -1) ? "您 确 定 要 批 量 删 除 这 些 系 统 消 息 ？" : "您 确 定 要 删 除 该 条 系 统 消 息 ？"}}</p>
					<span slot="footer" class="dialog-footer">
				    <el-button @click="showDialog_delete_message = false">手 抖 了</el-button>
				    <el-button type="primary" @click="confirm_delete_message()">残忍删除</el-button>
				  </span>
				</el-dialog>

				<!-- 查看消息详情弹窗 -->
				<el-dialog title="消息详情" :visible.sync="showDialog_checkMsg_detail" width="400px" left>
					<p class="upgrade_tips">消息详情：<span class="blueFont">{{ singleMessage.title }}</span></p>
					<p class="upgrade_tips">提醒时间：<span class="blueFont">{{ singleMessage.time.length>0 ? singleMessage.time.slice(0,10)+"日 "+singleMessage.time.slice(11,19) : "日期返回错误" }}</span></p>
					<span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="showDialog_checkMsg_detail = false">知 道 了</el-button>
				  </span>
				</el-dialog>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        }else if(!this.global.check_numberMixLetter(value)){
        	callback(new Error('6-12位密码，且只支持英文字母与数字的组合！'));
        } else {
          if (this.ruleForm2.userNewPassword !== '') {
            this.$refs.ruleForm2.validateField('userNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value == this.ruleForm2.userOldPassword) {
          callback(new Error('新密码不能与旧密码相同!'));
        }else if(!this.global.check_numberMixLetter(value)){
        	callback(new Error('6-12位密码，且只支持英文字母与数字的组合！'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次确认新密码'));
        } else if (value !== this.ruleForm2.userNewPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else if(!this.global.check_numberMixLetter(value)){
        	callback(new Error('6-12位密码，且只支持英文字母与数字的组合！'));
        }else {
          callback();
        }
      };

			return {
				ruleForm2: {
					userOldPassword: "",
					userNewPassword: "",
					newPasswordConfirm: ""
        },
        rules2: {
          userOldPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userNewPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          newPasswordConfirm: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        },

				memberId: "",
				subTabBar: "main_personal",
				showDialog_upgrade: false,
				showDialog_checkDetail: false,
				showDialog_addOrmidify_account: false,
				showDialog_quit_account: false,
				showDialog_delete_account: false,
				showDialog_delete_message: false,
				showDialog_checkMsg_detail: false,

				page: 1,											// 默认第一页
				rows: 10,											// 默认每页显示10条
				total: 100,										// 默认总数目

				point_account_id: "",					// 指定的 账户id (添加=>该值为主账户 	修改=>该值为分账户)
				point_account_email: "",			// 指定的 账户email (""=>添加 不是""=>修改)
				point_account_password: "",		// 指定的 账户password (""=>添加 不是""=>修改)
				addOrModify_api_url:	"",			// 新增或者修改账户的接口地址

				upgrade_type: "", 						// 选择升级类型  1=>季付	2=>年付
				user_country: "", 						// 所在国家
				user_phone:	"",								// 您的电话
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
					F_Country: "", 							// 所在国家
					downAndPrintCount: "", 			// 总下载次数
					downloadCount: "", 					// 已下载次数
					residueDownloadNum: "" 			// 剩余下载次数
				},
				// 副账户列表
				DeputyMemberList: [],
				// 收藏列表
				myCollectList: [],
				// 下载打印列表
				downloadInfoList: [],
				// 系统消息
				sysMessageInfoEntityList: [],
				messageIds: "",							// 放置消息ids
				singleMessage:{							// 单条消息
					time: '2018-11-06T21:50:18.5300000+08:00'
				}
			}
		},
		mounted() {
			// 获取用户信息 => 判断用户权限 =>
			this.getMemberInfo();
			var _this = this;
			// 全选非全选
			$("#checkAllOrNot").on("change",function() {
				var name=$(this).attr('name');
				var $subBox = $('input.checkNode');
	      $subBox.prop("checked",this.checked);
	      if(this.checked){
	      	// 全选
	      	var ids = "";
	      	for(var i=0; i<$('input.checkNode').length; i++){
	      		ids += $('input.checkNode').eq(i).attr('nodeid') + ",";
	      	}
	      	ids = ids.slice(0,ids.length-1);
	      	_this.messageIds = ids;
	      }else{
	      	var ids = "";
	      	_this.messageIds = ids;
	      }
	    });

		},
		methods: {
			 // 单个选择方法
	    sel_single(){
	    	$('#checkAllOrNot').prop("checked",$('.checkNode').length == $('.checkNode:checked').length ? true : false);
	    	var ids = "";
	      for(var i=0; i<$('input.checkNode:checked').length; i++){
	      	ids += $('input.checkNode:checked').eq(i).attr('nodeid') + ",";
	      }
	      ids = ids.slice(0,ids.length-1);
	      this.messageIds = ids;
	    },

			// 获取用户信息 OtherService.asmx/GetMemberInfo => 判断用户权限
			async getMemberInfo() {
				let url = 'OtherService.asmx/GetMemberInfo';
				//	        memberId:	this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
				let params = {
					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
				}
				let data = await this.api.post(url, params, { loading: true });
				this.memberInfo = data;
				if(this.memberInfo.F_HYType == 0){
					this.memberInfo.F_HYTypeName = "普通会员";
				}else if(this.memberInfo.F_HYType == 1){
					this.memberInfo.F_HYTypeName = "高级会员<span class='blueFont marginLeft_2em'>( 季付 )</span>";
				}else{
					this.memberInfo.F_HYTypeName = "高级会员<span class='blueFont marginLeft_2em'>( 年付 )</span>";
				}
			},

			// 升级或续费 		OtherService.asmx/AddSysMessageInfo
			async confirm_upgradeOrRepay (){
				let url = 'OtherService.asmx/AddSysMessageInfo';
				let params = {
					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId'),
					title: "只是一条信息"
				}
				let data = await this.api.post(url, params, { loading: true });
				if(data[0] == true){
					this.$message({
            showClose: true,
            message: "请查看消息管理...",
            type: 'success',
            duration: 2000
          })
					this.showDialog_upgrade = false;
					this.wantToUpgrade = true;
				}else{
					this.$message({
            showClose: true,
            message: data.result,
            type: 'success',
            duration: 2000
          });
				}
			},

			// 取消订阅 / 订阅 切换		OtherService.asmx/SetMemberIsSubscription
			async setMemberIsSubscription(){
				let url = 'OtherService.asmx/SetMemberIsSubscription';
				let params = {
					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId'),
					isSubscription: this.memberInfo.F_IsSubscription
				}
				let data = await this.api.post(url, params, { loading: true });
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
					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
				}
				let data = await this.api.post(url, params, { loading: true });
				this.DeputyMemberList = data.memberList;
			},

			// 添加副账户和修改副账户
			addOrModify_sub_account(Id,Email,Password){
				if( !Email && !Password ){
					if(this.memberInfo.F_HYType == 0){
						this.$message({
	            showClose: true,
	            message: "普通会员没有创建副账户权限，敬请升级为高级会员！",
	            type: 'warning',
	            duration: 5000
	          });
	          return;
					}else{
						this.point_account_id = this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId');		// 新增 id 为主账户id
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
					var params = {
						email: this.point_account_email,
			      userPassword: this.point_account_password,
			      superUId: this.point_account_id
					}
				}else{
					var params = {
						newEmail: this.point_account_email,
			      newPassword: this.point_account_password,
			      id: this.point_account_id
					}
				}
				let data = await this.api.post(url, params);
				// 成功回调 => 刷新列表
				if(data[0] == 1){
					this.$message({
            showClose: true,
            message: (url == "OtherService.asmx/AddDeputyMember") ? '成功添加副账户！' : '成功修改副账户！',
            type: 'success',
            duration: 2000
          })
					this.showDialog_addOrmidify_account = false;
					this.getDeputyMemberListByUserId();
				}else{
					this.$message({
            showClose: true,
            message: '返回错误' + data[0],
            type: 'warning',
            duration: 2000
          })
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
					id: this.point_account_id
				}
				let data = await this.api.post(url, params);
				// 成功回调 => 刷新列表
				if(data[0] == true){
					this.$message({
            showClose: true,
            message: '成功删除副账户！',
            type: 'success',
            duration: 2000
          })
					this.showDialog_delete_account = false;
					this.getDeputyMemberListByUserId();
				}
			},

			// 获取收藏列表 OtherService.asmx/GetMyCollect
	    async getMyCollect(){
	    	let num = Math.random();
				let url = "OtherService.asmx/GetMyCollect?num=" + num;
				let params = {
					page: this.page,
					rows: this.rows,
					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId'),
					languageType: 1
				}
				let data = await this.api.post(url, params, { loading: true });
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

			// 取消关注 OtherService.asmx/DelMyCollectById
			async delete_collect(id){
				let url = "OtherService.asmx/DelMyCollectById";
				let params = {
//					memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId'),
					id: id
				}
				let data = await this.api.post(url, params);
				if(data[0] == true){
					this.$message({
            showClose: true,
            message: '成功取消关注！',
            type: 'success',
            duration: 2000
          })
					// 刷新列表数据
					this.getMyCollect();
				}else{
					this.$message({
            showClose: true,
            message: data[0],
            type: 'success',
            duration: 2000
          });
				}
			},

			// 获取下载和打印记录 OtherService.asmx/GetDownloadInfoList
	    async getDownloadInfoList(){
	    	let url = "OtherService.asmx/GetDownloadInfoList";
	    	let params = {
	    		page: this.page,
	    		rows: this.rows,
	    		memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId'),
					languageType: 1
	    	}
	    	let data = await this.api.post(url, params, { loading: true });
				this.total = data.total;
				this.downloadInfoList = data.downloadInfoList;
	    },
			// 下载打印分页
			handleCurrentChange_downLoad(page){
				this.page = page;
				this.getDownloadInfoList();
			},
			handleSizeChange_downLoad(rows){
				this.rows = rows;
				this.getDownloadInfoList();
			},

			// 系统消息列表： OtherService.asmx/GetSysMessageInfo
    	async getSysMessageInfo(){
	    	let url = "OtherService.asmx/GetSysMessageInfo";
	    	let params = {
	    		page: this.page,
	    		rows: this.rows,
	    		memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
	    	}
	    	let data = await this.api.post(url, params, { loading: true });
				this.total = data.total;
				this.sysMessageInfoEntityList = data.sysMessageInfoEntityList;
	    },

			// 批量删除系统消息 OtherService.asmx/DelSysMessageInfo
    	// 参数：string ids 消息id集合，用 ','分割的id集合字符串
    	// 返回值：true 成功
			group_delete_message(){
				// 判断 选中的复选框个数
				if(this.messageIds == ""){
					this.$message({
            showClose: true,
            message: '请勾选您要删除的消息！',
            type: 'warning',
            duration: 2000
          })
					return;
				}else{
					this.showDialog_delete_message = true;
				}
			},
			// 单条信息删除
			delete_system_message(id){
				this.messageIds = String(id);
				this.showDialog_delete_message = true;
			},
			// 确认删除消息
			async confirm_delete_message(){
				let url = "OtherService.asmx/DelSysMessageInfo";
				let params = {
					ids: this.messageIds
				}
				let data = await this.api.post(url, params);
				if(data[0] == true){
					this.$message({
            showClose: true,
            message: '成功删除消息！',
            type: 'success',
            duration: 2000
          })
					this.showDialog_delete_message = false;
					this.getSysMessageInfo();
					let $subBox = $('input.checkNode');
	      	$subBox.prop("checked", false);
	      	$('#checkAllOrNot').prop("checked", false);
				}else{
					this.$message({
            showClose: true,
            message: data[0],
            type: 'warning',
            duration: 2000
          })
				}
			},
			//查看详情
			check_systemMsg_detail(id,title,time){
				this.singleMessage.id = id;
				this.singleMessage.title = title;
				this.singleMessage.time = time;
				this.showDialog_checkMsg_detail = true;
			},

			// 系统消息分页
			handleCurrentChange_message(page){
				this.page = page;
				this.getSysMessageInfo();
			},
			handleSizeChange_message(rows){
				this.rows = rows;
				this.getSysMessageInfo();
			},

			async getData(url,params){
				return await this.api.post(url, params);
			},

			// 修改密码
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = "OtherService.asmx/SubmitNewPassword";
            let params = {
            	userOldPassword: _this.ruleForm2.userOldPassword,
            	userNewPassword: _this.ruleForm2.userNewPassword,
            	memberId: this.global.memberId ? this.global.memberId : sessionStorage.getItem('memberId')
            }
            $.ajax({
							type: "POST",
							url: "http://www.chineseautoregs.com:8080/" + url,
							data: JSON.stringify(params),
							dataType: "json",
							contentType: "application/json;charset=utf-8",
							success: function(data) {
								// 1修改成功 2此用户不存在 3旧密码错误
								if(data[0] == 1){
									_this.$message({
				            showClose: true,
				            message: "密码修改成功，稍后将重新登录！",
				            type: 'success',
				            duration: 2000
				          })
									setTimeout(()=>{
										_this.$router.push({
			    						name: 'SignIn'
			  						})
									},2000)
								}else if (data[0] == 2){
									_this.$message({
				            showClose: true,
				            message: "此用户不存在！",
				            type: 'warning',
				            duration: 2000
				          })
								}else{
									_this.$message({
				            showClose: true,
				            message: "旧密码错误！",
				            type: 'warning',
				            duration: 2000
				          })
								}
							}
						});
          } else {
            this.$message({
	            showClose: true,
	            message: '修改密码格式不对，请修改后再次提交！',
	            type: 'warning',
	            duration: 2000
	          })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },












			// 用户退出 => 跳转到登录页面
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
						this.total = 0;
						this.getMyCollect();
						break;
					case "main_down_print":
						this.page = 1;
						this.rows = 10;
						this.total = 0;
						this.getDownloadInfoList();
						break;
					case "main_mess":
						this.page = 1;
						this.rows = 10;
						this.total = 0;
						this.getSysMessageInfo();
						break;
					case "main_merge_pwd":
						break;
					default:
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
		height: 70px;
		margin: 0px auto;
		margin-top: -30px;
		line-height: 60px;
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

	/* 修改密码 */
	.modify_password_box p{
		height: 50px;
		line-height: 50px;
	}

	/* 升级会员 弹窗内提示语 */
	.upgrade_tips {
		color: #6F6F6F;
		padding-left: 30px;
		padding-right: 30px;
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
