<template>
	<section id="view003">
		<el-table :data="viewList" highlight-current-row v-loading="listLoading" style="width: 100%;"  stripe border>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table :data="detailList" highlight-current-row v-loading="listLoading" stripe border>
						<el-table-column prop="title" label="规划项目性质包括" width="150"></el-table-column>
						<el-table-column label="总建筑面积(平方米)">
							<el-table-column prop="aboveGroundSumArea" label="地上" width="120"></el-table-column>
							<el-table-column prop="underGroundSumArea" label="地下" width="120"></el-table-column>
						</el-table-column>
						<el-table-column prop="sumArea" label="混合建筑面积" width="150"></el-table-column>
						<el-table-column prop="sumLength" label="地上建筑长度" width="150"></el-table-column>
						<el-table-column prop="buildType" label="建筑类型" width="150"></el-table-column>
					</el-table>
				</template>
			</el-table-column>

			<el-table-column width="60" label="序号">
				<template slot-scope="scope">
					<span>{{scope.$index + 1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="prjXz" label="项目性质" width="150"></el-table-column>
			<el-table-column prop="sumArea" label="总建筑面积(平方米)" width="150"></el-table-column>
			<el-table-column label="总建筑面积(平方米)">
				<el-table-column prop="aboveGroundSumArea" label="地上" width="120"></el-table-column>
				<el-table-column prop="underGroundSumArea" label="地下" width="120"></el-table-column>
			</el-table-column>
			<el-table-column prop="sumLen" label="总建筑长度(米)" width="150"></el-table-column>
			<el-table-column label="层数">
				<el-table-column prop="aboveGroundSumArea" label="地上" width="120"></el-table-column>
				<el-table-column prop="underGroundSumArea" label="地下" width="120"></el-table-column>
			</el-table-column>
			<el-table-column label="高度">
				<el-table-column prop="aboveGroundSumArea" label="地上" width="120"></el-table-column>
				<el-table-column prop="underGroundSumArea" label="地下" width="120"></el-table-column>
			</el-table-column>
			<el-table-column prop="buildings" label="栋数" width="150"></el-table-column>
			<el-table-column prop="buildings" label="住房套数" width="150"></el-table-column>
			<el-table-column prop="prjStatus" label="工程状态" width="150"></el-table-column>
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
			<el-table-column prop="remark" label="备注" width="120"></el-table-column>
		</el-table>
	</section>
</template>

<script>

	export default {
		data() {
			return {
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
			
		},
		mounted() {
			
		}
	}
</script>