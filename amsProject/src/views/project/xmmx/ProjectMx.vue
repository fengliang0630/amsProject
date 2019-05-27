<template>
	<section id="userPage">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prjSN" placeholder="许可证号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getXmmxListPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showFormHandler(null, null)">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="xmmxList" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
			<el-table-column fixed="left"  width="60">
				<template slot-scope="scope">
					<span>{{scope.$index + 1 + (pageNum - 1) * pageSize}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="prjSN" label="许可证号" ></el-table-column>
			<el-table-column prop="serialNumber" label="建筑序号" ></el-table-column>
			<el-table-column prop="serialFunct" label="建筑功能" ></el-table-column>
			<el-table-column prop="aboveGroundArea" label="地上建筑面积（平方米）" width="200px"></el-table-column>
			<el-table-column prop="underGroundArea" label="地下建筑面积（平方米）" width="200px"></el-table-column>
			<el-table-column prop="blendArea" label="混合建筑面积（平方米）" width="200px"></el-table-column>
			<el-table-column prop="aboveGroundLen" label="地上建筑长度（米）" width="200px"></el-table-column>
			<el-table-column prop="prjClasfiCode" label="分类代码" ></el-table-column>
			<el-table-column label="操作" fixed="right" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="showFormHandler(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange"
				:page-size="pageSize" :total="total" :page-sizes="[20, 50, 100]" style="float:right;">
			</el-pagination>
		</el-col>


		<!-- 项目基本信息增加/修改 -->
		<ams-project-xmmx-form v-if="formParams.show" :formData="this.formParams.data" :callback="callback"></ams-project-xmmx-form>
	</section>
</template>

<script>
	import { getXmmxListPage , removeXmmx } from '../../../api/api';
	import ProjectMxForm from './ProjectMxForm';

	export default {
		data() {
			return {
				filters: {
					prjSN: ''
				},
				xmmxList: [],
				total: 0,
				pageNum: 1,
				pageSize: 20,
				listLoading: false,
				formParams: {
					show: false,
					data: null
				}
			}
		},
		methods: {
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getXmmxListPage();
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum;
				this.getXmmxListPage();
			},
			// 获取项目基本信息列表
			getXmmxListPage() {
				let para = {
					prjSN: this.filters.prjSN
				};
				this.listLoading = true;
				getXmmxListPage(para, this.pageSize, this.pageNum).then((resp) => {
					this.listLoading = false;
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询项目属性信息失败',
							type: 'error'
						});
						return;
					}
		
					this.total = resp.header.rspPageCount;
					this.xmmxList = resp.xmmxList;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeXmmx(para).then((resp) => {
						this.listLoading = false;

						if (resp.header.rspReturnCode !== '000000') {
							this.$message({
								message: '删除项目明细信息失败',
								type: 'error'
							});
							return;
						}

						this.$message({
							message: '删除项目明细信息成功',
							type: 'success'
						});
						this.getXmmxListPage();
					});
				});
			},
			// 新增 修改表单显示
			showFormHandler(index, row) {
				this.formParams.data = Object.assign({}, row);
				this.formParams.show = true;
			},
			callback(respData) {
				this.formParams.show = false;
				if (respData) {
					this.$message(respData);
					this.getXmmxListPage();
				}
				
			}
		},
		mounted() {
			this.getXmmxListPage();
		},
		components: {
			'ams-project-xmmx-form': ProjectMxForm,
		}
	}
</script>