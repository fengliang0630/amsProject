<template>
	<section id="userPage">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prjName" placeholder="项目名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getJbxxListPage">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="jbxxList" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
			<el-table-column fixed="left"  width="60">
				<template slot-scope="scope">
					<span>{{scope.$index + 1 + (pageNum - 1) * pageSize}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="prjSN" label="许可证号" width="120"></el-table-column>
			<el-table-column prop="prjUnit" label="建设单位" width="100"></el-table-column>
			<el-table-column prop="prjAdr" label="建设位置" width="150"></el-table-column>
			<el-table-column prop="prjName" label="工程名称" width="120"></el-table-column>
			<el-table-column prop="prjType" label="建设类型" min-width="100"></el-table-column>
			<el-table-column prop="contacts" label="联系人" min-width="80"></el-table-column>
			<el-table-column prop="contactInf" label="联系方式" min-width="180"></el-table-column>
			<el-table-column prop="prjTemSN" label="附带临建批号" min-width="180"></el-table-column>
			<el-table-column prop="specialNotifi" label="特别告知事项" min-width="180"></el-table-column>
			<el-table-column prop="noticeTime" label="发件日期" min-width="180"></el-table-column>
			<el-table-column prop="effectiveTime" label="有效时间" min-width="180"></el-table-column>
			<el-table-column prop="remark" label="备注" min-width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
	</section>
</template>

<script>
	import { getJbxxListPage , removeJbxx } from '../../../api/api';

	export default {
		data() {
			return {
				filters: {
					prjName: ''
				},
				jbxxList: [],
				total: 0,
				pageNum: 1,
				pageSize: 20,
				listLoading: false
			}
		},
		methods: {
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getJbxxListPage();
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum;
				this.getJbxxListPage();
			},
			// 获取项目基本信息列表
			getJbxxListPage() {
				let para = {
					prjName: this.filters.prjName
				};
				this.listLoading = true;
				getJbxxListPage(para, this.pageSize, this.pageNum).then((resp) => {
					this.listLoading = false;
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询项目基本信息失败',
							type: 'error'
						});
						return;
					}

					this.total = resp.header.rspPageCount;
					this.jbxxList = resp.xmjbxxList;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeJbxx(para).then((resp) => {
						this.listLoading = false;

						if (resp.header.rspReturnCode !== '000000') {
							this.$message({
								message: '删除项目基本信息失败',
								type: 'error'
							});
							return;
						}

						this.$message({
							message: '删除项目基本信息成功',
							type: 'success'
						});
						this.getJbxxListPage();
					});
				});
			}
		},
		mounted() {
			this.getJbxxListPage();
		}
	}
</script>