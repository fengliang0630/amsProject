<template>
	<section id="userSetRolePage">
		<el-dialog title="用户配置角色" :visible.sync="show" :close-on-click-modal="false" :show-close="false">
			<el-transfer filterable filter-placeholder="请输入角色名称" :titles="['未选角色', '已选角色']" 
				v-model="hasRoleList" :data="roleList" :props="{key: 'id', label: 'roleName'}">	
			</el-transfer>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelHandle">取消</el-button>
				<el-button type="primary" @click.native="addRoleHandler" :loading="addRoleLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util';
	import { getRoleList, getHasRoleIdsByUserId, setRoleIdsByUserId } from '../../api/api';

	export default {
		data() {
			return {
				show: true,
				roleList: [],
				hasRoleList: [],
				addRoleLoading: false
			}
		},
		methods: {
			getHasRoleIdsByUserId() {
				getHasRoleIdsByUserId({userId: this.currentUserId}).then(res => {
					this.hasRoleList = res.hasRoleIds;
				});
			},
			addRoleHandler() {
				const param = {roleIds: this.hasRoleList, userId: this.currentUserId};
				this.addRoleLoading = true;
				setRoleIdsByUserId(param).then((res) => {
					this.addRoleLoading = false;
					this.callback({
						type: 'userSetRole',
						data: {message: '用户设置角色成功', type: 'success'}
					});
				});
				
			},
            cancelHandle() {
                this.callback({type: 'userSetRole'});
            }
		},
		mounted() {
			this.getHasRoleIdsByUserId();
			getRoleList().then(res => {
				this.roleList = res.roleList;
			});
		},
		props: ['callback', 'currentUserId']
	}

</script>

<style lang="scss">
	#userSetRolePage {
		.el-transfer-panel{
		width: 40%;
		height: 500px;
			.el-transfer-panel__body {
				height: 80%;
				.is-filterable.el-transfer-panel__list {
					height: 100%;	
				}
			}
		
		}
	}
</style>