<template>
  <div>
    <div style="margin-top: 5px">
      <div style="margin-left: 8px">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.ddId" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchDate">搜索</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
      </div>
      <el-table
        ref="multipleTable" 
        :data="ddList"
        stripe
        border
        style="width: 100%" :title="dialogTitle" :visible.sync="dialogVisible">
        <el-table-column
          prop="ddId"
          label="订单编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="money"
          label="订单费用"
          width="120">
        </el-table-column>
        <!-- <el-table-column
          prop="state"
          label="订单状态"
          width="100">
        </el-table-column> -->
      </el-table>
      <div style="display: flex;justify-content: flex-end;margin-top: 5px;margin-right: 10px">
        <el-pagination
          :page-sizes="[3,10,20,40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dingdan",
  data() {
    return {
      lessonId: "",
      dialogTitle: "",
      dds: [],
      ddList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      filed: "请选择",
      dd: {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: "",
        fp: [],
        money: ""
      },
      searchForm: {
        ddId: null
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.searchForm.pageSize = this.pageSize
      this.searchForm.currentPage = this.currentPage
      this.$axios
        .get("/api/dingdan/", {
          params: this.searchForm
        })
        .then(res => {
          console.log(res.data);
          this.ddList = res.data.data;
          this.total = res.data.sum;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索
    searchDate: function() {
      for (let i in this.searchForm) {
        this.currentPage = 1;
        if (this.searchForm[i] === "" || this.searchForm[i] === undefined) {
          this.searchForm[i] = null;
        }
      }
      this.getProfile();
    },
    reset() {
      this.searchForm.ddId = "";
      
    },
    // 提交信息表单
    submitDdForm(formName, lessonId) {
      // console.log("1", this.truck);
      console.log(this.$refs.truckForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.lessonId) {
            this.$axios
              .post("/api/dingdan/add", this.dd)
              .then(res => {
                this.$message({ message: "信息添加成功", type: "success" });
                this.dialogVisible = false;
                // this.getProfile();
              })
              .catch(err => {
                this.$message({
                  message: `添加失败:${err}`,
                  type: "warning"
                });
              });
          } else {
            this.$axios
              .post(`/api/profiles/edit/${this.lessonId}`, this.dialogForm)
              .then(res => {
                this.$message({ message: "课程信息已更新", type: "success" });
                this.dialogFormVisible = false;
                this.getProfile();
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  message: `课程信息更新失败:${err}`,
                  type: "warning"
                });
              });
          }
        }
      });
    },
    delAll() {
      if (this.delArr.length == 0) {
        this.$message({
          message: "警告，请选择要批量删除的记录",
          type: "warning"
        });
      } else {
        console.log(this.delArr);
        this.$confirm("此操作将永久批量删除该记录, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.postRequest("/truck/deleteAll", this.delArr).then(resp => {
              if (resp) {
                this.delArr = [];
                this.initTrucks();
              }
              this.delArr = [];
            });
          })
          .catch(() => {
            this.delArr = [];
            this.$refs.multipleTable.clearSelection();
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    updateTruck() {
      this.putRequest("/truck/", this.truck).then(resp => {
        if (resp) {
          this.initTrucks();
          this.dialogVisible = false;
          this.truck = {
            truckid: "",
            chePaiHao: "",
            buydate: null,
            type: "",
            length: "",
            describe: 0,
            fkTeamid: null,
            state: -1,
            remark: "",
            checkintime: null,
            isdelete: -1,
            altertime: null
          };
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getProfile()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProfile()
    },
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
  width: 40%;
}
</style>
