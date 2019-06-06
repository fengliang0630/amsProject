<template>
	<el-row id="uploadPage" class="container">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<div class="filter-item">
				<label>上传类型</label>
				<div>
					<el-select v-model="uploadData.upLoadType" placeholder="请选择上传类型" >
						<el-option v-for="item in uploadTypeOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</div>
			</div>
			<div class="filter-item" v-if="uploadData.upLoadType === 'SAVE'">
				<label>许可证号</label>
				<div>
					<el-input v-model="uploadData.prjSN" placeholder="许可证号"></el-input>
				</div>
			</div>
			<div class="filter-item" v-if="!!uploadData.upLoadType">
				<label>选择上传文件</label>
				<div>
					<el-upload ref="uploadComponent" class="upload-demo" action="" :auto-upload="false" multiple  :on-change="fileChange" >
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
						<div slot="tip" class="el-upload__tip">支持excel,dxf文档上传</div>
					</el-upload>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import { uploadFiles } from '../api/api';

	export default {
		data() {
			return {
				uploadTypeOptions: ['ANALYSIS', 'SAVE', 'DIC'],
				uploadData: {
					upLoadType: '',
					prjSN: '',
					files: []
				}
			}
		},
		methods: {
			submitUpload() {

				if (!this.uploadData.files.length) {
					this.$message({ message: '请您先选择需要上传的文件', type: 'error' });
					return;
				}

				for (let i = 0; i < this.uploadData.files.length; i++) {
					const fileName = this.uploadData.files[i].name;
					if (!fileName.endsWith('.dxf') && !fileName.endsWith('.xls') && !fileName.endsWith('.xlsx')) {
						this.$message({ message: '支持excel,dxf文档上传', type: 'error' });
						return;
					}
				}

				var formData = new FormData();	
				formData.append("files", this.uploadData.files);
				formData.append('upLoadType', this.uploadData.upLoadType);

				if (this.uploadData.upLoadType === 'SAVE') {
					if (!this.uploadData.prjSN) {
						this.$message({ message: '类型为save时，许可证号必传', type: 'error' });
					}

					formData.append('prjSN', this.uploadData.prjSN);
				}

				uploadFiles(formData).then(resp => {
					
					if (resp.header.rspReturnCode !== '000000') {
						this.$message({ message: '上传文件失败', type: 'error' });
						return;
					} 

					this.$message({ message: '恭喜您已经上传文件成功', type: 'success' });
					this.$refs.uploadComponent.clearFiles();
				});
			},
			fileChange(file, fileList) {
				this.uploadData.files = fileList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#uploadPage {
		
		.filter-item {
			padding: 8px 40px;
			label {
				float: left;
				display: inline-block;
				height: 19px;
				padding: 11px 10px;
				width: 100px;
			}

			> div {
				display: inline-block;
				.el-upload__tip {
					color: red;
				}
			}
		}
	}
</style>
