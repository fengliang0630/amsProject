<template>
	<section id="view003Page">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prjSN" placeholder="许可证号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getView003">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<h3>{{prjClasfiName1}}:</h3>
		<div v-for="prjClasfiName2Obj in prjClasfiName2List">

			<p>{{prjClasfiName2Obj.title}}:</p>

			<el-table :data="prjClasfiName2Obj.list" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-table :data="scope.row.detailList" highlight-current-row v-loading="listLoading" stripe border>
							<el-table-column width="150">
								<template slot-scope="scope">
									{{ scope.row.detailName ||  scope.row.serialFunct}}
								</template>
							</el-table-column>
							
							<el-table-column label="总建筑面积(平方米)">
								<el-table-column prop="aboveGroundArea" label="地上" width="120"></el-table-column>
								<el-table-column prop="underGroundArea" label="地下" width="120"></el-table-column>
							</el-table-column>
							<el-table-column prop="aboveGroundArea" label="混合建筑面积" width="150"></el-table-column>
							<el-table-column prop="aboveGroundLen" label="地上建筑长度" width="150"></el-table-column>
							<el-table-column label="建筑类型" width="200">
								<template slot-scope="scope">
									<el-popover trigger="hover" placement="top">
										<p>{{ scope.row.buldType }}</p>
										<div slot="reference" class="name-wrapper">{{ scope.row.buldType }}</div>
									</el-popover>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column width="60" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="prjNature" label="项目性质" width="150"></el-table-column>
				<el-table-column prop="sumArea" label="总建筑面积(平方米)" width="150"></el-table-column>
				<el-table-column label="总建筑面积(平方米)">
					<el-table-column prop="aboveGroundSumArea" label="地上" width="120"></el-table-column>
					<el-table-column prop="underGroundSumArea" label="地下" width="120"></el-table-column>
				</el-table-column>
				<el-table-column prop="sumLen" label="总建筑长度(米)" width="150"></el-table-column>
				<el-table-column label="层数">
					<el-table-column prop="aboveGroundLev" label="地上" width="120"></el-table-column>
					<el-table-column prop="underGroundLev" label="地下" width="120"></el-table-column>
				</el-table-column>
				<el-table-column label="高度">
					<el-table-column prop="aboveGroundHet" label="地上" width="120"></el-table-column>
					<el-table-column prop="underGroundHet" label="地下" width="120"></el-table-column>
				</el-table-column>
				<el-table-column prop="buildings" label="栋数" width="150"></el-table-column>
				<el-table-column prop="housingStockNum" label="住房套数" width="150"></el-table-column>
				<el-table-column prop="buldStatus" label="工程状态" width="150"></el-table-column>
				<el-table-column prop="peacetimeUses" label="平时用途" width="150"></el-table-column>
				<el-table-column prop="strucType" label="结构类型" width="150"></el-table-column>
				<el-table-column prop="checkDocSN" label="验线文号" width="150"></el-table-column>
				<el-table-column prop="checkDocDate" label="验线时间" width="150"></el-table-column>
				<el-table-column prop="checkSN" label="验收文号" width="120"></el-table-column>
				<el-table-column prop="checkDate" label="验收日期" width="120"></el-table-column>
				<el-table-column prop="delaySN" label="延期文号" min-width="120"></el-table-column>
				<el-table-column prop="delayCountDay" label="延长期" min-width="120"></el-table-column>
				<el-table-column prop="cancelSN" label="撤（注）销证号" width="120"></el-table-column>
				<el-table-column prop="cancelDate" label="撤（注）销日期" width="120"></el-table-column>
				<el-table-column prop="correctionSN" label="补正证号" width="120"></el-table-column>
				<el-table-column prop="correctionDate" label="补正日期" width="120"></el-table-column>
				<el-table-column prop="imgJudgeRes" label="影像判读结果" width="120"></el-table-column>
				<el-table-column prop="exproprInfo" label="代征用地情况" width="120"></el-table-column>
				<el-table-column label="备注" width="120">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p>{{ scope.row.remark }}</p>
							<div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		
	</section>
</template>

<script>
	import { getView003 } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					prjSN: ''
				},
				prjClasfiName1: '',
				prjClasfiName2List: [],
				viewList: [{}],
				detailList: [
					{
						title: '经济适用房',
						aboveGroundSumArea: 100,
						underGroundSumArea: 200,
						sumArea: 20,
						sumLength: 50,
						buildType: 'asd'
					}
				],
				listLoading: false
			}
		},
		methods: {
			getView003() {
				if (!this.filters.prjSN) {
					this.$message({ message: '请您先选择过滤条件', type: 'error' });
					return;
				}

				getView003().then(resp => {
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({
							message: '查询view003失败',
							type: 'error'
						});
						return;
					}

					if (resp.viewList) {
						for (let prjClasfiName1 in resp.viewList) {
							this.prjClasfiName1 = prjClasfiName1;
							for (let prjClasfiName2Title in resp.viewList[prjClasfiName1]) {

								const prjClasfiName2List = [];

								for (let prjClasfiName2Obj in resp.viewList[prjClasfiName1][prjClasfiName2Title]) {
									const tj = resp.viewList[prjClasfiName1][prjClasfiName2Title][prjClasfiName2Obj].tongj;
									if (tj) {
										tj.detailList = [];
										for (let detailName in resp.viewList[prjClasfiName1][prjClasfiName2Title][prjClasfiName2Obj].detail) {
											tj.detailList.push({detailName: detailName});
		
											if (!!resp.viewList[prjClasfiName1][prjClasfiName2Title][prjClasfiName2Obj].detail[detailName]) {
												for (let i in resp.viewList[prjClasfiName1][prjClasfiName2Title][prjClasfiName2Obj].detail[detailName]) {
													tj.detailList.push(resp.viewList[prjClasfiName1][prjClasfiName2Title][prjClasfiName2Obj].detail[detailName][i]);
												}
											}
										}
										prjClasfiName2List.push(tj);
									}
								}

								this.prjClasfiName2List.push(
									{
										title: prjClasfiName2Title,
										list: prjClasfiName2List
									}
								);
							}
						}
					}

					
				});
			}
		}
	}
</script>


<style scope>
	#view003Page .el-table div.cell, #view003Page .el-table div.cell .name-wrapper {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>