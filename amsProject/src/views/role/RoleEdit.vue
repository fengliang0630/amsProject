<template>
	<section>

		<!--编辑界面-->
		<el-dialog title="编辑角色" :visible.sync="show" :close-on-click-modal="false" :show-close="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelHandle">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import { editRole } from '../../api/api';

	export default {
		data() {
			return {
                show: true,
				editLoading: false,
				editFormRules: {
					roleName: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							editRole(para).then((res) => {
								this.editLoading = false;
								this.$refs['editForm'].resetFields();
								this.callback({
                                    type: 'edit',
                                    data: {message: '修改成功', type: 'success'}
                                });
							});
						});
					}
				});
			},
            cancelHandle() {
                this.callback({
                    type: 'edit'
                });
            }
		},
        props: ['editForm', 'callback']
	}
</script>