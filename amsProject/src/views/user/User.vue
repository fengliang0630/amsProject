<template>
	<section id="userPage">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUserListPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column width="60">
				<template slot-scope="scope">
					<span>{{scope.$index + 1 + (pageNum - 1) * pageSize}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="scope">
					<el-button size="small" @click="showRoleHandler(scope.$index, scope.row)">分配角色</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange"
				:page-size="pageSize" :total="total" :page-sizes="[20, 50, 100]" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<ams-user-edit v-if="editShow" :callback="callback" :editForm="editForm"></ams-user-edit>

		<!--新增界面-->
		<ams-user-add v-if="addShow" :callback="callback"></ams-user-add>

		<!-- 用户配置角色 -->
		<ams-user-add-role v-if="userSetRoleShow" :callback="callback" :currentUserId="currentUserId"></ams-user-add-role>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getUserListPage, removeUser, batchRemoveUser } from '../../api/api';
	import UserAdd from './UserAdd';
	import UserEdit from './UserEdit';
	import UserAddRole from './UserAddRole';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				userList: [],
				total: 0,
				pageNum: 1,
				pageSize: 20,
				listLoading: false,
				sels: [],//列表选中列

				editShow: false,
				editForm: {},
				addShow: false,

				userSetRoleShow: false,
				currentUserId: ''
			}
		},
		methods: {
			callback(respData) {
				this[respData.type + 'Show'] = false;
				if (respData.data) {
					this.$message(respData.data);
					this.getRoleListPage();
				}
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getUserListPage();
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum;
				this.getUserListPage();
			},
			//获取用户列表
			getUserListPage() {
				let para = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					name: this.filters.name
				};
				this.listLoading = true;
				getUserListPage(para).then((resp) => {
					this.total = resp.total;
					this.userList = resp.userList;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUserListPage();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editShow = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addShow = true;
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUserListPage();
					});
				}).catch(() => {

				});
			},
			showRoleHandler(index, row) {
				this.currentUserId = row.id;
				this.userSetRoleShow = true;
			}
		},
		mounted() {
			this.getUserListPage();
		},
		components: {
			'ams-user-add': UserAdd,
			'ams-user-edit': UserEdit,
			'ams-user-add-role': UserAddRole
		}
	}
</script>