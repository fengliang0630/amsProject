<template>
	<section>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :show-close="false" top="3vh" >
			<el-form :model="formData" label-width="200px" :rules="formRules" ref="formData">
				<el-form-item v-if="typeof formData.id !== 'undefined'" label="id" prop="id">
					<el-input v-model="formData.id" auto-complete="off" readOnly ></el-input>
				</el-form-item>
				<el-form-item label="许可证号" prop="prjSN">
					<el-input v-model="formData.prjSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="建筑序号" prop="serialNumber">
					<el-input-number v-model="formData.serialNumber" :min="1" width="100%"></el-input-number>
				</el-form-item>
				<el-form-item label="项目性质" prop="prjNature">
					<el-input v-model="formData.prjNature" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="规划项目性质/人防工程情况" prop="prjAttr">
					<el-input v-model="formData.prjAttr" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="平时用途" prop="peacetimeUses">
					<el-input type="textarea" v-model="formData.peacetimeUses" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地上层数" prop="aboveGroundLev">
					<el-input-number v-model="formData.aboveGroundLev" :min="1" width="100%"></el-input-number>
				</el-form-item>
				<el-form-item label="地下层数" prop="underGroundLev">
					<el-input-number v-model="formData.underGroundLev" :min="1" width="100%"></el-input-number>
				</el-form-item>
				<el-form-item label="地上高度（米）" prop="aboveGroundHet">
					<el-input-number v-model="formData.aboveGroundHet" :precision="2" :step="0.1" :max="10"></el-input-number>
				</el-form-item>
				<el-form-item label="地下高度（米）" prop="underGroundHet">
					<el-input-number v-model="formData.underGroundHet" :precision="2" :step="0.1" :max="10"></el-input-number>
				</el-form-item>
				<el-form-item label="栋数" prop="buildings">
					<el-input-number v-model="formData.buildings" :min="1" width="100%"></el-input-number>
				</el-form-item>
				<el-form-item label="住房套数" prop="housingStockNum">
					<el-input-number v-model="formData.housingStockNum" :min="1" width="100%"></el-input-number>
				</el-form-item>
				<el-form-item label="结构类型" prop="strucType">
					<el-input v-model="formData.strucType" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="验线文号" prop="checkDocSN">
					<el-input v-model="formData.checkDocSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="验线日期" prop="checkDocDate">
					<el-date-picker v-model="formData.checkDocDate" align="right" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="验收文号" prop="checkSN">
					<el-input v-model="formData.checkSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="验收日期" prop="checkDate">
					<el-date-picker v-model="formData.checkDate" align="right" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="延期文号" prop="delaySN">
					<el-input v-model="formData.delaySN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="延长期" prop="delayCountDay">
					<el-input v-model="formData.delayCountDay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="撤（注）销证号" prop="cancelSN">
					<el-input type="textarea" v-model="formData.cancelSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="撤（注）销日期" prop="cancelDate">
					<el-input v-model="formData.cancelDate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="补正证号" prop="correctionSN">
					<el-input v-model="formData.correctionSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="补正日期" prop="correctionDate">
					<el-date-picker v-model="formData.correctionDate" align="right" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="影像判读结果" prop="imgJudgeRes">
					<el-input v-model="formData.imgJudgeRes" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="代征用地情况" prop="exproprInfo">
					<el-input v-model="formData.exproprInfo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="formData.remark" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelHandle">取消</el-button>
				<el-button type="primary" @click.native="submitHandler" :loading="formLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../../common/js/util';
	import { createOrUpdateProjectAttribute } from '../../../api/api';

	export default {
		data() {
			return {
				show: true,
				formLoading: false,
				title: 'aaaa',
				formRules: {
					prjSN: [
						{ required: true,  message: '不能为空', trigger: 'blur' }
					],
					serialNumber: [
						{ required: true,  message: '不能为空', trigger: 'blur' }
					],
					prjNature: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					prjAttr: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					peacetimeUses: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 2000, message: '最大长度2000', trigger: 'blur' }
					],
					aboveGroundLev: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					underGroundLev: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					aboveGroundHet: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					underGroundHet: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					buildings: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					housingStockNum: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					strucType: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					checkDocSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					checkDocDate: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					checkSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					checkDate: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					delaySN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					delayCountDay: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 50, message: '最大长度50', trigger: 'blur' }
					],
					cancelSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 2000, message: '最大长度2000', trigger: 'blur' }
					],
					cancelDate: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					correctionSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					correctionDate: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					imgJudgeRes: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 500, message: '最大长度50', trigger: 'blur' }
					],
					exproprInfo: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 2000, message: '最大长度2000', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			submitHandler: function () {
				this.$refs.formData.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.formLoading = true;
							let para = Object.assign({}, this.formData);
							createOrUpdateProjectAttribute(para).then((resp) => {
								this.formLoading = false;
								const respMsg= {message: '', type: ''}
								

								if (resp.header.rspReturnCode !== '000000') {
									respMsg.type = 'error';
									respMsg.message = (typeof(this.formData.id) !== 'undefined') ? '修改项目属性信息失败' : '新增项目属性信息失败';
									this.$message(respMsg);
									return;
								}

								this.$refs['formData'].resetFields();
								respMsg.type = 'success';
								respMsg.message = (typeof(this.formData.id) !== 'undefined') ? '修改项目属性信息成功' : '新增项目属性信息成功';
								this.callback(respMsg);
							});
						});
					}
				});
			},
            cancelHandle() {
                this.callback();
            }
		},
		mounted() {
			this.title = (typeof(this.formData.prjSN) !== 'undefined') ? '修改项目属性信息' : '新增项目属性信息';
		},
        props: ['formData', 'callback']
	}

</script>

<style scoped></style>