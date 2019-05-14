<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.roleName" placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getRoleListPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="roleList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column width="60">
				<template slot-scope="scope">
					<span>{{scope.$index + 1 + (pageNum - 1) * pageSize}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="roleName" label="角色名称" sortable></el-table-column>
			<el-table-column label="操作" width="350">
				<template slot-scope="scope">
					<el-button size="small" @click="showSetMenu(scope.$index, scope.row)">分配菜单</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="sizes, prev, pager, next" :page-sizes="[20, 50, 100]" @size-change="handleSizeChange"
			 	@current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
		<!-- 新增角色-->
		<ams-role-add v-if="addShow" :callback="callback"></ams-role-add>

		<!-- 修改角色-->
		<ams-role-edit v-if="editShow" :callback="callback" :editForm="editForm"></ams-role-edit>

		<!-- 分配菜单-->
		<el-dialog title="分配菜单" :visible.sync="setMenuVisible" :close-on-click-modal="false">
			<div style="height:400px;overflow:auto;">
				<el-tree v-if="setMenuVisible" :props="{label: 'menuName'}" :data="menuTreeData" node-key="id" ref="menuTree"
					:default-checked-keys="selectMenuIds" show-checkbox @check-change="handleCheckChange">
				</el-tree>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="setMenuVisible = false">取消</el-button>
				<el-button type="primary" @click.native="setMenuHandler" :loading="setMenuLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getRoleListPage, removeRole, batchRemoveRole, getMenuTree, getMenuIdsByRoleId, setMenuIdsByRoleId } from '../../api/api';
	import RoleAdd from './RoleAdd';
	import RoleEdit from './RoleEdit';

	export default {
		data() {
			return {
				filters: {
					roleName: ''
				},
				roleList: [],
				total: 0,
				pageNum: 1,
				pageSize: 20,
				listLoading: false,
				sels: [],//列表选中列

				editShow: false,
				editForm: {},
				addShow: false,

				setMenuVisible: false,
				setMenuLoading: false,
				menuTreeData: [],
				selectMenuIds: []
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
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getRoleListPage();
			},
			handleCheckChange() {
				this.selectMenuIds = this.$refs.menuTree.getCheckedKeys();
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum;
				this.getRoleListPage();
			},
			//获取用户列表
			getRoleListPage() {
				let para = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					roleName: this.filters.roleName
				};
				this.listLoading = true;
				getRoleListPage(para).then((resp) => {
					this.total = resp.total;
					this.roleList = resp.roleList;
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
					removeRole(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getRoleListPage();
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
			showSetMenu(index, row) {
				getMenuIdsByRoleId({ roleId: row.id }).then(resp => {
					this.selectMenuIds = resp.selectMenuIds;
					this.setMenuVisible = true;
				});
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							editRole(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getRoleListPage();
							});
						});
					}
				});
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
					batchRemoveRole(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getRoleListPage();
					});
				}).catch(() => {

				});
			},
			setMenuHandler() {
				setMenuIdsByRoleId({selectMenuIds: this.selectMenuIds}).then(resp => {
					this.$message({
						message: '配置菜单成功',
						type: 'success'
					});
					this.setMenuVisible = false;
				}); 
				
			},
			getMenuTree() {
				getMenuTree().then(resp => {
					this.menuTreeData = resp.menuTree;
				});
			}
		},
		mounted() {
			this.getRoleListPage();
			this.getMenuTree();

		},
		components: {
			'ams-role-add': RoleAdd,
			'ams-role-edit': RoleEdit
		}
	}

</script>

<style scoped></style>