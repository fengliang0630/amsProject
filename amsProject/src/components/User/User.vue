<template>
  <div id="userDiv" class="model-root-div">
    <div class="filter-div">
      <el-form :inline="true" :model="userFilterData" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="userFilterData.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabler-div">
      <el-table :data="userInfoList" height="100%" border stripe :empty-text="tableEmptyText">
        <el-table-column fixed label="序号" align="center">
          <template slot-scope="scope"><span v-text="scope.$index"></span></template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="email" label="email" align="center"></el-table-column>
        <el-table-column prop="mobile" label="联系方式" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sex | codeValueFilter('sex')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="生日" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.birth | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag-class">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="prev, pager, next, jumper, sizes, total"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserPage',
  data () {
    return {
      tableEmptyText: '暂时没有数据',
      currentPage: 2,
      totalNum: 400,
      userFilterData: {
        userName: ''
      },
      userInfoList: []
    }
  },
  methods: {
    onSubmit() {
      console.log(this.userFilterData);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  beforeMount() {
    for(let i = 0; i < 100; i++) {
      this.userInfoList.push({
          userName: '张三',
          email: '111@qq.com',
          mobile: '18888888888',
          sex: 0,
          birth: 1396555445000
        });
    }
  }
}
</script>

<style scope>
  
</style>
