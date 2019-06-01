<template>
	<section>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :show-close="false" top="3vh">
			<el-form :model="formData" label-width="150px" :rules="formRules" ref="formData" size="medium">
				<el-form-item label="许可证号" prop="prjSN">
					<el-input v-if="!!formData.id" v-model="formData.prjSN" auto-complete="off" readOnly></el-input>
					<el-input v-if="!formData.id" v-model="formData.prjSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="建设单位" prop="prjUnit">
					<el-input v-model="formData.prjUnit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="建设位置" prop="prjAdr">
					<el-input v-model="formData.prjAdr" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="工程名称" prop="prjName">
					<el-input v-model="formData.prjName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="建设类型" prop="prjType">
					<el-select v-model="formData.prjType" multiple placeholder="请选择建设类型" style="width: 100%;">
						<el-option v-for="item in prjTypeOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人" prop="contacts">
					<el-input v-model="formData.contacts" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="contactInf">
					<el-input v-model="formData.contactInf" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="附带临建批号" prop="prjTemSN">
					<el-input v-model="formData.prjTemSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发件日期" prop="noticeTime">
					<el-date-picker type="date" placeholder="发件日期" v-model="formData.noticeTime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="有效时间" prop="effectiveTime">
					<el-input v-model="formData.effectiveTime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="许可证类型" prop="prjSNType">
					<el-input v-model="formData.prjSNType" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="项目状态" prop="prjStatus">
					<el-input v-model="formData.prjStatus" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="延期文号" prop="delaySN">
					<el-input v-model="formData.delaySN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="延长期" prop="delayCountDay">
					<el-input v-model="formData.delayCountDay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="补正证号" prop="correctionSN">
					<el-input v-model="formData.correctionSN" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="补正日期" prop="correctionDate">
					<el-date-picker type="date" placeholder="补正日期" v-model="formData.correctionDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="特别告知事项" prop="specialNotifi">
					<el-input type="textarea" v-model="formData.specialNotifi" auto-complete="off"></el-input>
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
	import util from '../../common/js/util';
	import {createOrUpdateProject} from '../../api/api';

	export default {
		data() {
			return {
				show: true,
				formLoading: false,
				title: '',
				prjTypeOptions: ['新建', '改扩建'],
				formRules: {
					prjSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 50, message: '最大长度50', trigger: 'blur' }
					],
					prjUnit: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					prjAdr: [	// 未处理
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 800, message: '最大长度800', trigger: 'blur' }
					],
					prjName: [
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 500, message: '最大长度500', trigger: 'blur' }
					],
					prjType: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					contacts: [
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 10, message: '最大长度10', trigger: 'blur' }
					],
					contactInf: [
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 100, message: '最大长度100', trigger: 'blur' }
					],
					prjTemSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					specialNotifi: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 1500, message: '最大长度1500', trigger: 'blur' }
					],
					noticeTime: [
						{ required: true,  message: '不能为空', trigger: 'blur' }
					],
					effectiveTime: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 900, message: '最大长度900', trigger: 'blur' }
					],
					prjSNType: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					prjStatus: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
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
					correctionSN: [
						{ required: true, message: '不能为空', trigger: 'blur' },
						{ validator: util.validatorUtils.checkSpecialChar, trigger: 'blur' },
						{ max: 200, message: '最大长度200', trigger: 'blur' }
					],
					correctionDate: [
						{ required: true,  message: '不能为空', trigger: 'blur' }
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
							createOrUpdateProject(para).then((resp) => {
								this.formLoading = false;
								const respMsg= {message: '', type: ''}
								

								if (resp.header.rspReturnCode !== '000000') {
									respMsg.type = 'error';
									respMsg.message = (!!this.formData.id) ? '修改项目基本信息失败' : '新增项目基本信息失败';
									this.$message(respMsg);
									return;
								}

								this.$refs['formData'].resetFields();
								respMsg.type = 'success';
								respMsg.message = (!!this.formData.id) ? '修改项目基本信息成功' : '新增项目基本信息成功';
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
			this.title = (!!this.formData.id) ? '修改项目基本信息' : '新增项目基本信息';
		},
        props: ['formData', 'callback']
	}

</script>

<style scoped></style>