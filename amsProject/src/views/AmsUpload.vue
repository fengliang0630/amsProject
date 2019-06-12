<template>
	<el-row id="uploadPage" class="container">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<div class="filter-item">
				<label>上传类型</label>
				<div>
					<el-select v-model="uploadData.upLoadType" placeholder="请选择上传类型" @change="upLoadTypeChange">
						<el-option v-for="item in uploadTypeOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</div>
			</div>
			<div class="filter-item" v-if="uploadData.upLoadType === 'SAVE'">
				<label>许可证号</label>
				<div>
					<el-select v-model="uploadData.prjSN" filterable remote reserve-keyword placeholder="请选择许可证号" 
						:remote-method="filterPrjSNMethod" collapse-tags :title="uploadData.prjSN" style="width:100%">
						<el-option v-for="item in prjSNOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</div>
			</div>
			<div class="filter-item" v-if="!!uploadData.upLoadType">
				<label>选择上传文件</label>
				<div>
					<el-upload ref="uploadComponent" class="upload-demo" action="" :auto-upload="false" :on-change="fileChange" >
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
						<div slot="tip" class="el-upload__tip">{{uploadTypeMsg}}</div>
					</el-upload>
				</div>
			</div>
		</el-col>
		<el-col v-if="isShow" :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-progress :percentage="percentage" :status="progressStatus" style="width:80%;"></el-progress>
			<p style="width: 50%;color: red;line-height: 30px;">{{errorMsg}}</p>
		</el-col>
	</el-row>
</template>

<script>
	import { uploadFiles, queryDataByLike } from '../api/api';

	export default {
		data() {
			return {
				uploadTypeMsg: '',
				uploadTypeOptions: ['ANALYSIS', 'SAVE', 'DIC'],
				progressStatus: '',
				percentage: 0,
				errorMsg: '',
				isShow: false,
				isEnd: false,
				uploadData: {
					upLoadType: '',
					prjSN: '',
					files: []
				},
				time: null,
				prjSNOptions: []
			}
		},
		methods: {
			filterPrjSNMethod(query) {
				queryDataByLike({tab: 'xmjbxx', key: 'prjSN', val: query}).then(resp => {

					if (resp.header.rspReturnCode !== '000000') {
						this.$message({message: resp.header.rspReturnMsg, type: 'error'});
						return;
					}
					this.prjSNOptions = resp.list;
				});
			},
			upLoadTypeChange(val) {
				if (val === 'ANALYSIS') {
					this.uploadTypeMsg = '支持excel,dxf格式';
				} else if (val === 'SAVE') {
					this.uploadTypeMsg = '支持png格式';
				} else if (val === 'DIC') {
					this.uploadTypeMsg = '支持excel格式';
				}
			},
			startPercentage() {
				window.setTimeout(() => {
					this.percentage += Math.ceil(Math.random()*10);
					if (this.percentage >= 100) {
						this.percentage = 100;
					} else {
						this.startPercentage();
					}
				}, 2000);
			},
			submitUpload() {

				if (!this.uploadData.files.length) {
					this.$message({ message: '请您先选择需要上传的文件', type: 'error' });
					return;
				}

				for (let i = 0; i < this.uploadData.files.length; i++) {
					const fileName = this.uploadData.files[i].name;

					if (this.uploadData.upLoadType === 'ANALYSIS') {
						if (!fileName.endsWith('.dxf') && !fileName.endsWith('.xls') && !fileName.endsWith('.xlsx')) {
							this.$message({ message: '支持excel,dxf文档上传', type: 'error' });
							return;
						}
					} else if (this.uploadData.upLoadType === 'SAVE') {
						if (!fileName.endsWith('.png')) {
							this.$message({ message: '支持png文档上传', type: 'error' });
							return;
						}
					} else if (this.uploadData.upLoadType === 'DIC') {
						if (!fileName.endsWith('.xls') && !fileName.endsWith('.xlsx')) {
							this.$message({ message: '支持excel文档上传', type: 'error' });
							return;
						}
					}
				}				

				var formData = new FormData();
				formData.append("files", this.uploadData.files[0].raw);
				formData.append('upLoadType', this.uploadData.upLoadType);

				if (this.uploadData.upLoadType === 'SAVE') {
					if (!this.uploadData.prjSN) {
						this.$message({ message: '类型为save时，许可证号必传', type: 'error' });
					}

					formData.append('prjSN', this.uploadData.prjSN);
				}

				this.isShow = true;
				this.startPercentage();
				uploadFiles(formData).then(resp => {
					this.isEnd = true;
					this.percentage = 100;
					if (resp.header.rspReturnCode !== '000000') {
						this.errorMsg = resp.header.rspReturnMsg;
						this.progressStatus = 'exception';
						return;
					} 

					this.progressStatus = 'success';
					this.errorMsg = '';
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
