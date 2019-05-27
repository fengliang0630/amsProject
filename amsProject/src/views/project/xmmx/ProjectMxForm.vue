<template>
	<section>

		<!--编辑界面-->
		<el-dialog :title="title" :visible.sync="show" :close-on-click-modal="false" :show-close="false" top="3vh">
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
				<el-form-item label="建筑功能" prop="serialFunct">
					<el-input v-model="formData.serialFunct" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地上建筑面积（平方米）" prop="aboveGroundArea">
					<el-input v-model="formData.aboveGroundArea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地下建筑面积（平方米）" prop="underGroundArea">
					<el-input v-model="formData.underGroundArea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="混合建筑面积（平方米）" prop="blendArea">
					<el-input v-model="formData.blendArea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地上建筑长度（米）" prop="aboveGroundLen">
					<el-input v-model="formData.aboveGroundLen" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类代码" prop="prjClasfiCode">
					<el-input v-model="formData.prjClasfiCode" auto-complete="off"></el-input>
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
	import {createOrUpdateXmmx} from '../../../api/api';

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
							createOrUpdateXmmx(para).then((resp) => {
								this.formLoading = false;
								const respMsg= {message: '', type: ''}
								

								if (resp.header.rspReturnCode !== '000000') {
									respMsg.type = 'error';
									respMsg.message = (typeof(this.formData.id) !== 'undefined') ? '修改项目明细信息失败' : '新增项目明细信息失败';
									this.$message(respMsg);
									return;
								}

								this.$refs['formData'].resetFields();
								respMsg.type = 'success';
								respMsg.message = (typeof(this.formData.id) !== 'undefined') ? '修改项目明细信息成功' : '新增项目明细信息成功';
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
			this.title = (typeof(this.formData.prjSN) !== 'undefined') ? '修改项目明细信息' : '新增项目明细信息';
		},
        props: ['formData', 'callback']
	}

</script>

<style scoped></style>