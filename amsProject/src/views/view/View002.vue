<template>
	<section id="view002">
	<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prjSN" placeholder="许可证号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.prjUnit" placeholder="建设位置"></el-input>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-button type="primary" v-on:click="getView002">查询</el-button>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="viewList" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" class="demo-table-expand">
					<el-form-item label="项目状态"><span>{{ props.row.prjStatus }}</span></el-form-item>
					<el-form-item label="建设单位"><span>{{ props.row.prjUnit }}</span></el-form-item>
					<el-form-item label="建设位置"><span>{{ props.row.prjAdr }}</span></el-form-item>
					<el-form-item label="工程名称"><span>{{ props.row.prjName }}</span></el-form-item>
					<el-form-item label="项目类型"><span>{{ props.row.prjType }}</span></el-form-item>
					<el-form-item label="项目性质"><span>{{ props.row.prjXz }}</span></el-form-item>
					<el-form-item label="联系人"><span>{{ props.row.contacts }}</span></el-form-item>
					<el-form-item label="联系方式"><span>{{ props.row.contactInf }}</span></el-form-item>
					<el-form-item label="特别告知事项"><span>{{ props.row.specialNotifi }}</span></el-form-item>
					<el-form-item label="附带临建批号"><span>{{ props.row.prjTemSN }}</span></el-form-item>
					<el-form-item label="影像"><span>{{ props.row.prjXz }}</span></el-form-item>
					<el-form-item label="备注"><span>{{ props.row.remark }}</span></el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="prjStatus" label="项目状态"></el-table-column>
			<el-table-column prop="prjUnit" label="建设单位"></el-table-column>
			<el-table-column prop="prjAdr" label="建设位置"></el-table-column>
			<el-table-column  label="工程名称">
				 <template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>{{ scope.row.prjName }}</p>
						<div slot="reference" class="name-wrapper">{{ scope.row.prjName }}</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="prjType" label="项目类型"></el-table-column>
			<el-table-column prop="prjXz" label="项目性质"></el-table-column>
			<el-table-column prop="contacts" label="联系人"></el-table-column>
			<el-table-column prop="contactInf" label="联系方式"></el-table-column>
			<el-table-column prop="specialNotifi" label="特别告知事项"></el-table-column>
			<el-table-column prop="prjTemSN" label="附带临建批号"></el-table-column>
			<el-table-column prop="prjXz" label="影像"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
		</el-table>

		<table id="exportTable">
			<tr>
				<td>项目状态</td>
				<td>建设单位</td>
				<td>建设位置</td>
				<td>工程名称</td>
				<td>项目类型</td>
				<td>项目性质</td>
				<td>联系人</td>
				<td>联系方式</td>
				<td>特别告知事项</td>
				<td>附带临建批号</td>
				<td>影像</td>
				<td>备注</td>
			</tr>
			<tr v-for="item in viewList">
				<td>{{item.prjStatus}}</td>
				<td>{{item.prjUnit}}</td>
				<td>{{item.prjAdr}}</td>
				<td>{{item.prjName}}</td>
				<td>{{item.prjType}}</td>
				<td>{{item.prjXz}}</td>
				<td>{{item.contacts}}</td>
				<td>{{item.contactInf}}</td>
				<td>{{item.specialNotifi}}</td>
				<td>{{item.prjTemSN}}</td>
				<td>{{item.prjXz}}</td>
				<td>{{item.remark}}</td>
			</tr>
		</table>

	</section>
</template>

<script>
	import { getView002 } from '../../api/api';
	import util from '../../common/js/util';

	export default {
		data() {
			return {
				filters: {
					prjSN: '',
					prjUnit: ''
				},
				viewList: [],
				listLoading: false
			}
		},
		methods: {
			getView002() {
				this.listLoading = true;
				const param = this.filters;
				getView002(param).then((resp) => {
					this.listLoading = false;
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询view002失败',
							type: 'error'
						});
						return;
					}

					this.viewList = resp.viewList;
				});
			},
			exportExcel() {
				const table = document.getElementById('exportTable');
				util.exportExcel(table, '项目信息统计数据');
			}
		},
		mounted() {
			this.getView002();
		}
	}
</script>

<style scope>
	#exportTable {display: none;}
	#view002 .el-table div.cell, #view002 .el-table div.cell .name-wrapper {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>