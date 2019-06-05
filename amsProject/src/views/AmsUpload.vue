<template>
	<el-row class="container">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="uploadData">
				<el-form-item label="上传类型">
					<el-input v-model="uploadData.upLoadType" placeholder="上传类型"></el-input>
				</el-form-item>
				<el-form-item label="许可证号">
					<el-input v-model="uploadData.prjSN" placeholder="许可证号"></el-input>
				</el-form-item>
				<el-form-item label="长传文件">
					<el-upload class="upload-demo" ref="upload" :file-list="files" :auto-upload="false"
					:on-preview="handlePreview" :on-remove="handleRemove" >
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>

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
				debugger;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		}
	}

</script>