<template>
  <div>
    <div style="margin-top: 5px;display: flex;justify-content:flex-start;">
      <div>
        <el-button icon="el-icon-circle-plus" @click="showAddDdView" type="primary" plain>添加订单信息</el-button>
      </div>
      <!-- <div style="margin-left: 8px">
        <el-input placeholder="请输入您要查询的内容">
          <el-select v-model="filed" slot="prepend" placeholder="请选择" style="width: 100px">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="车牌编号" value="truckid"></el-option>
            <el-option label="车牌号码" value="chePaiHao"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </div>-->
    </div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable"
        :data="ddList"
        stripe
        border
        style="width: 100%"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
      >
        <el-table-column prop="ddId" label="订单编号" width="80"></el-table-column>
        <el-table-column prop="fDz" label="发货人地址" width="120"></el-table-column>
        <el-table-column prop="fName" label="发货人姓名" width="100"></el-table-column>
        <el-table-column prop="fNum" label="发货人电话" width="100"></el-table-column>
        <el-table-column prop="sDz" label="收货人地址" width="100"></el-table-column>
        <el-table-column prop="sName" label="收货人姓名" width="100"></el-table-column>
        <el-table-column prop="sNum" label="收货人电话" width="100"></el-table-column>
        <el-table-column prop="fp" label="所属分配点" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEditQRD(scope.$index, scope.row)"
            >确认分配点</el-button>
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
          <el-form-item label="订单编号">
            <el-input v-model="dd.ddId" prop="ddId" placeholder="输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="发货人地址">
            <el-input v-model="dd.fDz" prop="fDz" placeholder="输入收货人地址"></el-input>
          </el-form-item>
          <el-form-item label="发货人姓名">
            <el-input v-model="dd.fName" prop="fName" placeholder="请输入发货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="发货人电话">
            <el-input v-model="dd.fNum" prop="fNum" placeholder="输入发货人电话"></el-input>
          </el-form-item>
          <el-form-item label="收货人地址">
            <el-input v-model="dd.sDz" prop="sDz" placeholder="输入收货人地址"></el-input>
          </el-form-item>
          <el-form-item label="收货人姓名">
            <el-input v-model="dd.sName" prop="sName" placeholder="输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话">
            <el-input v-model="dd.sNum" prop="sNum" placeholder="输入收货人电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请选择分配点" v-model="dd.fp" style="width: 200px">
              <!-- <el-option label="请选择" value="请选择"></el-option> -->
              <el-option v-for="(item,index) in fpd" :label="item" :value="item" :key="index"></el-option>
              <!-- <el-option label="上海" value=""></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改订单信息'" @click="submitDdForm('ddForm')">修改</el-button>
            <el-button
              type="primary"
              v-if="dialogTitle=='添加订单信息'"
              @click="submitDdForm('ddForm', Id)"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible2" width="30%">
      <div style="padding-right: 77px;">
        <el-form ref="ddForm" label-width="80px" :model="dd">
          <el-form-item>
            <el-select placeholder="请选择分配点" v-model="dd.fp" style="width: 200px">
              <!-- <el-option label="请选择" value="请选择"></el-option> -->
              <el-option v-for="(item,index) in fpd" :label="item" :value="item" :key="index"></el-option>
              <!-- <el-option label="上海" value=""></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button
              type="primary"
              v-if="dialogTitle=='确认分配点信息'"
              @click="submitDdForm('ddForm', Id)"
            >确 认</el-button>
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
      Id: "",
      dialogTitle: "",
      dds: [],
      ddList: [],
      fpd: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      dialogVisible2: false,
      filed: "请选择",
      dd: {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: "",
        fp: []
      }
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
            this.fpd.push(res.data.data[i].psName);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProfile() {
      this.$axios
        .get("/api/dingdan", {
          params: { currentPage: this.currentPage, pageSize: this.pageSize }
        })
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
      this.dialogTitle = "添加订单信息";
      console.log;
      this.dialogVisible = true;
      this.dd = {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: "",
        fp: ""
      };
    },
    handleEditQRD(index, item) {
      this.dialogTitle = "确认分配点信息";
      this.dd = item;
      console.log(item);
      this.dialogVisible2 = true;
      this.Id = item._id;
    },
    handleEdit(index, item) {
      this.dialogTitle = "修改订单信息";
      this.dd = item;
      this.Id = item._id;
      console.log(item);
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
    submitDdForm(formName, Id) {
      // console.log("1", this.truck);
      console.log(this.$refs.ddForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.Id) {
            this.$axios
              .post("/api/dingdan/add", this.dd)
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
              .post(`/api/dingdan/edit/${this.Id}`, this.dd)
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
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getProfile();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProfile();
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
  width: 40%;
}
</style>
