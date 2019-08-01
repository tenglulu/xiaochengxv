<template>
  <div>
    <div style="margin-top: 5px;display: flex;justify-content:flex-start;">
      <div>
        <el-button icon="el-icon-circle-plus" @click="showAddTruckView" type="primary" plain >添加车辆信息</el-button>
      </div>
      <!-- <div style="margin-left: 8px">
        <el-button icon="el-icon-error"  type="danger" plain>批量删除</el-button>
      </div> -->
      <!-- <div style="margin-left: 8px">
        <el-input placeholder="请输入您要查询的内容"  v-model="searchForm.title">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </div> -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="车牌号">
        <el-input v-model="searchForm.chePaiHao" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchDate">搜索</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable" 
        :data="trucksList"
        stripe
        border
        style="width: 100%" :title="dialogTitle" :visible.sync="dialogVisible">
        <el-table-column
          prop="truckid"
          label="车辆编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="chePaiHao"
          label="车牌号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="车辆类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="吨位"
          width="80">
        </el-table-column>
        <el-table-column
          label="车辆状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="trucksList.state==2">空闲中</el-tag>
            <el-tag type="danger" v-else>承运中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end;margin-top: 5px;margin-right: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" :layout="pagination.layout" :total="pagination.total">
      </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <div style="padding-right: 77px;">
        <el-form ref="truckForm" label-width="80px" :model="truck">
          <el-form-item label="车牌号" >
            <el-input v-model="truck.chePaiHao" prop="chePaiHao" placeholder="输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-input v-model="truck.type" prop="type" placeholder="输入车辆类型"></el-input>
          </el-form-item>
          <el-form-item label="吨位">
            <el-input v-model="truck.describe" prop="describe" placeholder="输入吨位"></el-input>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-switch
              v-model="truck.state"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="承运中"
              inactive-text="空闲中"
              active-value="1"
              inactive-value="2">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改车辆信息'" @click="submitTruckForm('truckForm')">修 改</el-button>
            <el-button type="primary" v-if="dialogTitle=='添加车辆信息'" @click="submitTruckForm('truckForm')">添 加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TruckMana",
  data() {
    return {
      Id: "",
      dialogTitle: "",
      trucks: [],
      trucksList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      filed: "请选择",
      truckTypes: "全部车辆类型",
      truck: {
        // truckid: "",
        chePaiHao: "",
        type: "",
        describe: "",
        state: 0
      },
      pagination: {
        currentPage: 1,
        pageSize: 2,
        pageSizes: [2, 5, 10, 15, 30],
        total: 0,
        layout: "total, sizes, prev, pager, next, jumper"
      },
      searchForm: {
        chePaiHao: null
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.searchForm.pageSize = this.pagination.pageSize;
      this.searchForm.currentPage = this.pagination.currentPage;
      this.$axios
        .get("/api/profiles/", { params: this.searchForm })
        .then(res => {
          console.log(res);
          this.trucksList = res.data.data;
          this.pagination.total = res.data.sum;
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.searchForm.chePaiHao = "";
    },
    showAddTruckView() {
      this.dialogTitle = "添加车辆信息";
      this.dialogVisible = true;
      this.Id = "";
      this.truck = {};
    },
    handleEdit(index, item) {
      console.log(item);
      this.dialogTitle = "修改车辆信息";
      this.truck = item;
      this.dialogVisible = true;
      this.Id = item._id;
    },
    handleDelete(index) {
      console.log(this.trucksList[index]._id);
      this.$confirm(`即将删除该数据, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`api/profiles/delete/${this.trucksList[index]._id}`)
            .then(res => {
              this.$message({ message: "已删除", type: "info" });
              this.getProfile();
            })
            .catch(err => {
              this.$message({ message: "删除失败", type: "warning" });
            });
        })
        .catch(() => {});
    },
    // 搜索
    searchDate: function() {
      this.pagination.currentPage = 1;
      for (let i in this.searchForm) {
        if (this.searchForm[i] === "" || this.searchForm[i] === undefined) {
          this.searchForm[i] = null;
        }
      }
      this.getProfile();
    },
    // 分页
    handleSizeChange(val) {
      this.pagination.currentPage = 1;
      this.pagination.pageSize = val;
      this.getProfile();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getProfile();
    },

    // 提交信息表单
    submitTruckForm(formName) {
      // console.log("1", this.truck);
      console.log(this.Id);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.Id) {
            this.$axios
              .post("/api/profiles/add", this.truck)
              .then(res => {
                this.$message({ message: "信息添加成功", type: "success" });
                this.dialogVisible = false;
                this.getProfile();
              })
              .catch(err => {
                this.$message({
                  message: `添加失败:${err}`,
                  type: "warning"
                });
              });
          } else {
            this.$axios
              .post(`/api/profiles/edit/${this.Id}`, this.truck)
              .then(res => {
                this.$message({ message: "信息已更新", type: "success" });
                this.dialogVisible = false;
                this.getProfile();
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  message: `信息更新失败:${err}`,
                  type: "warning"
                });
              });
          }
        }
      });
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
</style>
