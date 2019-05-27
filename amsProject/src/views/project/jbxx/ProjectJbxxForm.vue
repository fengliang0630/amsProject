<template>
	<section>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :show-close="false" top="3vh">
			<el-form :model="formData" label-width="100px" :rules="formRules" ref="formData">
				<el-form-item v-if="typeof formData.prjSN !== 'undefined'" label="许可证号" prop="prjSN">
					<el-input v-model="formData.prjSN" auto-complete="off" readOnly></el-input>
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
					<el-input v-model="formData.prjType" auto-complete="off"></el-input>
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
				<el-form-item label="特别告知事项" prop="specialNotifi">
					<el-input v-model="formData.specialNotifi" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发件日期" prop="noticeTime">
					<el-date-picker type="date" placeholder="发件日期" v-model="formData.noticeTime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="有效时间" prop="effectiveTime">
					<el-input v-model="formData.effectiveTime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="formData.remark" auto-complete="off"></el-input>
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

	import {createOrUpdateJbxx} from '../../../api/api';

	export default {
		data() {
			return {
				show: true,
				formLoading: false,
				title: 'aaaa',
				formRules: {
					prjUnit: [
						{ required: true, message: 'ddd', trigger: 'blur' }
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
							createOrUpdateJbxx(para).then((resp) => {
								this.formLoading = false;
								const respMsg= {message: '', type: ''}
								

								if (resp.header.rspReturnCode !== '000000') {
									respMsg.type = 'error';
									respMsg.message = (typeof(this.formData.prjSN) !== 'undefined') ? '修改项目基本信息失败' : '新增项目基本信息失败';
									this.$message(respMsg);
									return;
								}

								this.$refs['formData'].resetFields();
								respMsg.type = 'success';
								respMsg.message = (typeof(this.formData.prjSN) !== 'undefined') ? '修改项目基本信息成功' : '新增项目基本信息成功';
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
			console.log(typeof(this.formData.prjSN));
			this.title = (typeof(this.formData.prjSN) !== 'undefined') ? '修改项目基本信息' : '新增项目基本信息';
		},
        props: ['formData', 'callback']
	}

</script>

<style scoped></style>