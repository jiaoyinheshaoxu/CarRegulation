<template lang='html'>

	<!--内容-->
	<div id="main_content">
		<div id="main_title">个人中心</div>
		<div id="child_content">
			<!--内容左-->
			<div id="main_left">
				<ul id="main_title_list">
					<li class="main_title_hover" href="main_personal">个人信息</li>
					<li href="main_sub_accounts">副账户管理</li>
					<li href="main_add">我的收藏</li>
					<li href="main_down_print">下载与打印记录</li>
					<li href="main_mess">消息管理</li>
					<li href="main_merge_pwd">修改密码</li>
					<li>退出登录</li>
				</ul>
			</div>
			<!--内容右-->
			<div id="main_right">
				<!--个人信息-->
				<div id="main_personal">
					<div id="main_personal_warn">
						<span class="main_warn_icon"></span>
						<span>尊敬的用户，您已选择高级会员，请及时汇款到指定账户，本消息三日内有效。</span>
						<span class="main_warn_detail">查看详情</span>
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
									<span class="main_personal_btn">马上升级</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--信息管理-->
				<div id="main_mess">
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
				<div id="main_sub_accounts">
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
				<div id="main_add">
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
				<div id="main_down_print">
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
				<div id="main_merge_pwd">
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
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style lang=''>

</style>