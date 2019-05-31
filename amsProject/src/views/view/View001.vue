<template>
	<section id="view001">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjYear" multiple placeholder="请选择年份">
						<el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjAdr" multiple filterable remote reserve-keyword placeholder="请选择建设位置" 
						:remote-method="filterPrjAdrMethod">
						<el-option v-for="item in prjAdrOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjClasfiName1" multiple filterable remote reserve-keyword placeholder="请选择一级分类" 
						:remote-method="filterPrjClasfiName1Method">
						<el-option v-for="item in prjClasfiName1Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjClasfiName2" multiple filterable remote reserve-keyword placeholder="请选择二级分类" 
						:remote-method="filterPrjClasfiName2Method">
						<el-option v-for="item in prjClasfiName2Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjClasfiName3" multiple filterable remote reserve-keyword placeholder="请选择三级分类" 
						:remote-method="filterPrjClasfiName3Method">
						<el-option v-for="item in prjClasfiName3Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjClasfiName4" multiple filterable remote reserve-keyword placeholder="请选择四级分类" 
						:remote-method="filterPrjClasfiName4Method">
						<el-option v-for="item in prjClasfiName4Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-select v-model="filters.prjClasfiName5" multiple filterable remote reserve-keyword placeholder="请选择五级分类" 
						:remote-method="filterPrjClasfiName5Method">
						<el-option v-for="item in prjClasfiName5Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:23%;">
					<el-button type="primary" v-on:click="getView001">查询</el-button>
					<el-button type="primary" v-on:click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="viewList" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
			<el-table-column width="60" label="序号">
				<template slot-scope="scope">
					<span>{{scope.$index + 1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="count" label="项目个数"></el-table-column>
			<el-table-column prop="sumArea" label="总建筑面积(平方米)"></el-table-column>
			<el-table-column prop="sumLen" label="总建筑长度(米)"></el-table-column>
			<el-table-column prop="aboveGroundSumArea" label="地上建筑面积(平方米)"></el-table-column>
			<el-table-column prop="underGroundSumArea" label="地下建筑面积(平方米)"></el-table-column>
			<el-table-column prop="buildings" label="栋数"></el-table-column>
			<el-table-column prop="buildings" label="住房套数(返回字段没有)"></el-table-column>
			<el-table-column v-if="tableColShow.prjYear" prop="prjYear" label="年份"></el-table-column>
			<el-table-column v-if="tableColShow.prjAdr" prop="prjAdr" label="建设位置"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName1" prop="prjClasfiName1" label="一级分类"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName2" prop="prjClasfiName2" label="二级分类"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName3" prop="prjClasfiName3" label="三级分类"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName4" prop="prjClasfiName4" label="四级分类"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName5" prop="prjClasfiName5" label="五级分类"></el-table-column>
		</el-table>

		<table id="exportTable">
			<tr>
				<td>项目个数</td>
				<td>总建筑面积(平方米)</td>
				<td>总建筑长度(米)</td>
				<td>地上建筑面积(平方米)</td>
				<td>地下建筑面积(平方米)</td>
				<td>栋数</td>
				<td>住房套数(返回字段没有)</td>
				<td v-if="tableColShow.prjYear">年份</td>
				<td v-if="tableColShow.prjAdr">建设位置</td>
				<td v-if="tableColShow.prjClasfiName1">一级分类</td>
				<td v-if="tableColShow.prjClasfiName2">二级分类</td>
				<td v-if="tableColShow.prjClasfiName3">三级分类</td>
				<td v-if="tableColShow.prjClasfiName4">四级分类</td>
				<td v-if="tableColShow.prjClasfiName5">五级分类</td>
			</tr>
			<tr v-for="item in viewList">
				<td>{{item.count}}</td>
				<td>{{item.sumArea}}</td>
				<td>{{item.sumLen}}</td>
				<td>{{item.aboveGroundSumArea}}</td>
				<td>{{item.underGroundSumArea}}</td>
				<td>{{item.buildings}}</td>
				<td>{{item.buildings}}</td>
				<td v-if="tableColShow.prjYear">{{item.prjYear}}</td>
				<td v-if="tableColShow.prjAdr">{{item.prjAdr}}</td>
				<td v-if="tableColShow.prjClasfiName1">{{item.prjClasfiName1}}</td>
				<td v-if="tableColShow.prjClasfiName2">{{item.prjClasfiName2}}</td>
				<td v-if="tableColShow.prjClasfiName3">{{item.prjClasfiName3}}</td>
				<td v-if="tableColShow.prjClasfiName4">{{item.prjClasfiName4}}</td>
				<td v-if="tableColShow.prjClasfiName5">{{item.prjClasfiName5}}</td>
			</tr>
		</table>

	</section>
</template>

<script>
	import { getView001 } from '../../api/api';
	import util from '../../common/js/util';

	export default {
		data() {
			return {
				filters: {
					prjYear: [],
					prjAdr: [],
					prjClasfiName1: [],
					prjClasfiName2: [],
					prjClasfiName3: [],
					prjClasfiName4: [],
					prjClasfiName5: []
				},
				tableColShow: {
					prjYear: false,
					prjAdr: false,
					prjClasfiName1: false,
					prjClasfiName2: false,
					prjClasfiName3: false,
					prjClasfiName4: false,
					prjClasfiName5: false
				},
				yearOptions: [],
				prjAdrOptions: [],
				prjAdrAllOptions: [],
				prjClasfiName1Options: [],
				prjClasfiName2Options: [],
				prjClasfiName3Options: [],
				prjClasfiName4Options: [],
				prjClasfiName5Options: [],
				prjClasfiName1AllOptions: [],
				prjClasfiName2AllOptions: [],
				prjClasfiName3AllOptions: [],
				prjClasfiName4AllOptions: [],
				prjClasfiName5AllOptions: [],
				viewList: [],
				listLoading: false
			}
		},
		methods: {
			getView001() {
				const param = {};
				let isQuery = false;
				for (let key in this.filters) {
					if (this.filters[key].length) {
						isQuery = true;
						param[key] = this.filters[key];
					}
				}

				if (!isQuery) {
					this.$message({ message: '请您先选择过滤条件', type: 'error' });
					return;
				}
				this.listLoading = true;

				getView001(param).then((resp) => {
					this.listLoading = false;
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询view001失败',
							type: 'error'
						});
						return;
					}
					
					this.showColumn();

					this.viewList = resp.viewList;
				});
			},

			showColumn() {
				for (let key in this.filters) {
					this.tableColShow[key] = false;
					if (this.filters[key].length) {
						this.tableColShow[key] = true;
					}
				}
			},

			filterPrjAdrMethod(query) {
				this.prjAdrOptions = this.prjAdrAllOptions.filter(item => {
						return item.indexOf(query) > -1;
					});
				
			},

			filterPrjClasfiName1Method(query) {
				this.prjClasfiName1Options = this.prjClasfiName1AllOptions.filter(item => {
					return item.indexOf(query) > -1;
				});
			},

			filterPrjClasfiName2Method(query) {
				this.prjClasfiName2Options = this.prjClasfiName2AllOptions.filter(item => {
					return item.indexOf(query) > -1;
				});
			},

			filterPrjClasfiName3Method(query) {
				this.prjClasfiName3Options = this.prjClasfiName3AllOptions.filter(item => {
					return item.indexOf(query) > -1;
				});
			},

			filterPrjClasfiName4Method(query) {
				this.prjClasfiName4Options = this.prjClasfiName4AllOptions.filter(item => {
					return item.indexOf(query) > -1;
				});
			},

			filterPrjClasfiName5Method(query) {
				this.prjClasfiName5Options = this.prjClasfiName5AllOptions.filter(item => {
					return item.indexOf(query) > -1;
				});
			},

			queryAllOptionsValue() {
				this.yearOptions = ['2001', '2002', '2003', '2004', '2005', '2006'];
				this.prjAdrOptions = ['和平街街道', '黑庄户乡', '香河园街道', '小关街道'];
				this.prjAdrAllOptions = ['和平街街道', '黑庄户乡', '香河园街道', '小关街道'];
				this.prjClasfiName1AllOptions = ['居住类项目', '非居住类项目'];
				this.prjClasfiName1Options = ['居住类项目', '非居住类项目'];
				this.prjClasfiName2AllOptions = ['住房项目', '配套公共服务设施', '城乡建设项目'];
				this.prjClasfiName2Options = ['住房项目', '配套公共服务设施', '城乡建设项目'];
				this.prjClasfiName3AllOptions = ['城镇住房项目', '乡村住房项目', '配套公共服务设施'];
				this.prjClasfiName3Options = ['城镇住房项目', '乡村住房项目', '配套公共服务设施'];
				this.prjClasfiName4AllOptions = ['商品房', '定向安置房', '经济适用房', '限价商品房'];
				this.prjClasfiName4Options = ['商品房', '定向安置房', '经济适用房', '限价商品房'];
				this.prjClasfiName5AllOptions = ['商品房', '定向安置房', '经济适用房', '限价商品房'];
				this.prjClasfiName5Options = ['商品房', '定向安置房', '经济适用房', '限价商品房'];
			},

			exportExcel() {
				const table = document.getElementById('exportTable');
				util.exportExcel(table, '符合统计数据');
			}

		},
		mounted() {
			this.queryAllOptionsValue();
		}
	}
</script>

<style scope>
	#exportTable {display: none;}
</style>