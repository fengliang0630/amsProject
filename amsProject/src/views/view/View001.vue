<template>
	<section id="view001">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjYear" multiple placeholder="请选择年份"  style="width:100%"
						collapse-tags :title="filters.prjYear">
						<el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjAdr" multiple filterable remote reserve-keyword placeholder="请选择建设位置" 
						:remote-method="filterPrjAdrMethod" collapse-tags :title="filters.prjAdr" style="width:100%">
						<el-option v-for="item in prjAdrOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjClasfiName1" multiple filterable remote reserve-keyword placeholder="请选择一级分类" 
						:remote-method="filterPrjClasfiName1Method" collapse-tags :title="filters.prjClasfiName1"  style="width:100%">
						<el-option v-for="item in prjClasfiName1Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjClasfiName2" multiple filterable remote reserve-keyword placeholder="请选择二级分类" 
						:remote-method="filterPrjClasfiName2Method" collapse-tags :title="filters.prjClasfiName2"  style="width:100%">
						<el-option v-for="item in prjClasfiName2Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjClasfiName3" multiple filterable remote reserve-keyword placeholder="请选择三级分类" 
						:remote-method="filterPrjClasfiName3Method" collapse-tags :title="filters.prjClasfiName3"  style="width:100%">
						<el-option v-for="item in prjClasfiName3Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjClasfiName4" multiple filterable remote reserve-keyword placeholder="请选择四级分类" 
						:remote-method="filterPrjClasfiName4Method" collapse-tags :title="filters.prjClasfiName4"  style="width:100%">
						<el-option v-for="item in prjClasfiName4Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">
					<el-select v-model="filters.prjClasfiName5" multiple filterable remote reserve-keyword placeholder="请选择五级分类" 
						:remote-method="filterPrjClasfiName5Method" collapse-tags :title="filters.prjClasfiName5"  style="width:100%">
						<el-option v-for="item in prjClasfiName5Options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="width:31%;">&nbsp;</el-form-item>
				<el-form-item style="width:31%;">
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
			<el-table-column prop="count" label="项目个数" width="120"></el-table-column>
			<el-table-column prop="sumArea" label="总建筑面积(平方米)" width="180"></el-table-column>
			<el-table-column prop="sumLen" label="总建筑长度(米)" width="180"></el-table-column>
			<el-table-column prop="aboveGroundSumArea" label="地上建筑面积(平方米)" width="180"></el-table-column>
			<el-table-column prop="underGroundSumArea" label="地下建筑面积(平方米)" width="180"></el-table-column>
			<el-table-column prop="buildings" label="栋数" width="80"></el-table-column>
			<el-table-column prop="housingStockNum" label="住房套数" width="120"></el-table-column>
			<el-table-column v-if="tableColShow.prjYear" prop="prjYear" label="年份" width="100"></el-table-column>
			<el-table-column v-if="tableColShow.prjAdr" prop="prjAdr" label="建设位置" width="150"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName1" prop="prjClasfiName1" label="一级分类" width="150"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName2" prop="prjClasfiName2" label="二级分类" width="150"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName3" prop="prjClasfiName3" label="三级分类" width="150"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName4" prop="prjClasfiName4" label="四级分类" width="150"></el-table-column>
			<el-table-column v-if="tableColShow.prjClasfiName5" prop="prjClasfiName5" label="五级分类" width="150"></el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange"
				:page-size="pageSize" :total="total" :page-sizes="paginationSize" style="float:right;">
			</el-pagination>
		</el-col>

		<table id="exportTable">
			<tr>
				<td>项目个数</td>
				<td>总建筑面积(平方米)</td>
				<td>总建筑长度(米)</td>
				<td>地上建筑面积(平方米)</td>
				<td>地下建筑面积(平方米)</td>
				<td>栋数</td>
				<td>住房套数</td>
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
				<td>{{item.housingStockNum}}</td>
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
	import { getView001, getPrjClasfiNames, queryDataByLike } from '../../api/api';
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
				prjClasfiName1Options: [],
				prjClasfiName2Options: [],
				prjClasfiName3Options: [],
				prjClasfiName4Options: [],
				prjClasfiName5Options: [],
				viewList: [],
				listLoading: false,
				total: 0,
				pageNum: 1,
				pageSize: util.paginationSize[0],
				paginationSize: util.paginationSize
			}
		},
		methods: {
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getView001();
			},
			handleCurrentChange(pageNum) {
				this.pageNum = pageNum;
				this.getView001();
			},
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

				getView001(param, this.pageSize, this.pageNum).then((resp) => {
					this.listLoading = false;
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询view001失败',
							type: 'error'
						});
						return;
					}
					
					this.showColumn();

					this.total = resp.header.rspPageCount;
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
				queryDataByLike({tab: 'xmjbxx', key: 'prjAdr', val: query}).then(resp => {

					if (resp.header.rspReturnCode !== '000000') {
						this.$message({message: '查询项目地址失败', type: 'error'});
						return;
					}
					this.prjAdrOptions = resp.list;
				});
				
			},

			queryPrjClasfiName(query, type) {
				if (!query) {
					this[`prjClasfiName${type}Options`] = [];
					return;
				}
				const param = {
					name: query,
					type: 'FJ',
					other: type
				};

				getPrjClasfiNames(param).then(resp => {
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询一级分类失败',
							type: 'error'
						});
						return;
					}

					this[`prjClasfiName${type}Options`] = resp.classifiDicList;
				});
			},
			filterPrjClasfiName1Method(query) {
				this.queryPrjClasfiName(query, '1');
			},

			filterPrjClasfiName2Method(query) {
				this.queryPrjClasfiName(query, '2');
			},

			filterPrjClasfiName3Method(query) {
				this.queryPrjClasfiName(query, '3');
			},

			filterPrjClasfiName4Method(query) {
				this.queryPrjClasfiName(query, '4');
			},

			filterPrjClasfiName5Method(query) {
				this.queryPrjClasfiName(query, '5');
			},
			exportExcel() {
				const table = document.getElementById('exportTable');
				util.exportExcel(table, '符合统计数据');
			}

		},
		mounted() {
			const y = new Date().getFullYear();
			for (let i = 0; i < 20; i++) {
				this.yearOptions.push(y - i);
			}
		}
	}
</script>

<style scope>
	#exportTable {display: none;}
	#view001 .el-form-item__content {width: 100%;}
</style>