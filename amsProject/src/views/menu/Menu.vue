<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.menuName" placeholder="菜单名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getMenuListPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="menuList" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column width="60">
				<template slot-scope="scope">
					<span>{{scope.$index + 1 + (pageNum - 1) * pageSize}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="menuName" label="菜单名称" sortable></el-table-column>
			<el-table-column prop="parentMenuName" label="父菜单名称" sortable></el-table-column>
			<el-table-column prop="parentMenuId" label="父菜单Id" sortable></el-table-column>
			<el-table-column prop="menuLink" label="跳转路径" sortable></el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
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

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="editForm.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="父菜单" prop="parentMenuId">
					<el-input v-model="editForm.parentMenuId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="跳转路径" prop="menuLink">
					<el-input v-model="editForm.menuLink" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="addForm.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="父菜单" prop="parentMenuId">
					<el-input v-model="addForm.parentMenuId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="跳转路径" prop="menuLink">
					<el-input v-model="addForm.menuLink" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getMenuListPage, removeMenu, batchRemoveMenu, editMenu, addMenu } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					menuName: ''
				},
				menuList: [],
				total: 0,
				pageNum: 1,
				listLoading: false,
				sels: [],//列表选中列
				pageSize: 20,

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					menuName: [
						{ required: true, message: '请输入菜单名称名称', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					menuName: '',
					parentMenuId: '',
					menuLink: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					menuName: [
						{ required: true, message: '请输入菜单名称', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					menuName: '',
					parentMenuId: '',
					menuLink: ''
				}

			}
		},
		methods: {
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getMenuListPage();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getMenuListPage();
			},
			//获取用户列表
			getMenuListPage() {
				let para = {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					menuName: this.filters.menuName
				};
				this.listLoading = true;
				getMenuListPage(para).then((resp) => {
					this.total = resp.total;
					this.menuList = resp.menuList;
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
					removeMenu(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getMenuListPage();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					roleName: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							editMenu(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getMenuListPage();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							addMenu(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getMenuListPage();
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
					batchRemoveMenu(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getMenuListPage();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getMenuListPage();
		}
	}

</script>

<style scoped></style>