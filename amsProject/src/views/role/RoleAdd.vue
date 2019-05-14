<template>
	<section>

		<!--新增界面-->
		<el-dialog title="新增角色" :visible.sync="show" :close-on-click-modal="false" :show-close="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="addForm.roleName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button  @click.native="cancelHandle">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import { addRole } from '../../api/api';

	export default {
		data() {
			return {
                show: true,
				addLoading: false,
				addFormRules: {
					roleName: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					roleName: ''
				}
			}
		},
		methods: {
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							addRole(para).then((res) => {
								this.addLoading = false;
								this.$refs['addForm'].resetFields();
								this.callback({
                                    type: 'add',
                                    data: {message: '新增角色成功', type: 'success'}
                                });
							});
						});
					}
				});
			},
            cancelHandle() {
                this.callback({type: 'add'});
            }
		},
        props: ['callback']
	}

</script>