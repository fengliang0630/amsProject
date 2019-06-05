<template>
	<el-row class="container">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="uploadData">
				<el-form-item label="上传类型">
					<el-select v-model="uploadData.upLoadType" placeholder="请选择上传类型" >
						<el-option v-for="item in uploadTypeOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="许可证号">
					<el-input v-model="uploadData.prjSN" placeholder="许可证号"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-upload class="upload-demo" action="" :auto-upload="false" multiple  :on-change="fileChange" >
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
				</el-upload>
			</div>
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
				console.log(this.uploadData.files);
				debugger;
			},
			fileChange(file, fileList) {
				this.uploadData.files = fileList;
			}
		}
	}

</script>