<template>
  <div>
    <div style="margin-top: 5px">
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
          prop="fDz"
          label="发货人地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fName"
          label="发货人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fNum"
          label="发货人电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sDz"
          label="收货人地址"
          width="100">
        </el-table-column>
                <el-table-column
          prop="sName"
          label="收货人姓名"
          width="100">
        </el-table-column>
                <el-table-column
          prop="sNum"
          label="收货人电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fp"
          label="所属分配点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="money"
          label="费用"
          width="90">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">添加费用</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <div style="padding-right: 77px;">
        <el-form ref="ddForm" label-width="80px" :model="dd">
          <el-form-item label="费用">
            <el-input v-model="money" prop="money" placeholder="输入费用"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改/添加费用信息'" @click="submitDdForm('ddForm', lessonId)">确 认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
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
      dd: {},
      money: ''
    };
  },
  created() {
    this.getFenPeiDian();
    this.getProfile();
  },
  methods: {
    getFenPeiDian() {
      this.$axios
        .get("/api/peisong")
        .then(res => {
          console.log(this.dd.fp);
          for (let i = 0; i < res.data.data.length; i++) {
            console.log(res.data.data[i].psName);
            this.dd.fp.push(res.data.data[i].psName);
          }
          console.log(this.dd.fp, "22");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProfile() {
      this.$axios
        .get("/api/dingdan",{params:{currentPage:this.currentPage,pageSize:this.pageSize}})
        .then(res => {
          console.log(res.data);
          this.total = res.data.sum;
          this.ddList = res.data.data;
          // console.log(this.trucksList.state);
          // this.pagination.total = res.data.length;
          // this.tableData = res.data.filter((item, index) => {
          //   return index < this.pagination.pageSize;
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAddDdView() {
      this.dialogTitle = "添加费用";
      this.dialogVisible = true;
      this.dd = {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: "",
        money: ""
      };
    },
    handleEdit(index, item) {
      this.dialogTitle = "修改/添加费用信息";
      this.dd = item;
      this.lessonId = item._id
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm(`即将删除该数据, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`api/dingdan/delete/${this.ddList[index]._id}`)
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
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   const length = this.multipleSelection.length;
    //   for (let i = 0; i < length; i++) {
    //     this.delArr.push(this.multipleSelection[i].truckid);
    //     console.log(this.delArr);
    //   }
    // },
    // 提交信息表单
    submitDdForm(formName, lessonId) {
      // console.log("1", this.truck);
      console.log(this.$refs.truckForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.dd.money = this.money
            console.log(this.money,this.dd)
            this.$axios
              .post(`/api/dingdan/edit/${this.lessonId}`, this.dd)
              .then(res => {
                this.$message({ message: "费用添加成功", type: "success" });
                this.dialogVisible = false;
                this.getProfile();
              })
              .catch(err => {
                this.$message({
                  message: `添加失败:${err}`,
                  type: "warning"
                });
              });
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
