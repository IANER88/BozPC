<template>
  <el-dialog :title="title" :visible.sync="boolean" width="35%" :append-to-body="true">
    <div class="name">
      <span>课程名称</span>
      <el-input v-model="info.name" placeholder="请输入内容" />
    </div>
    <div class="name">
      <span>课程简介</span>
      <el-input v-model="info.introduce" placeholder="请输入内容" />
    </div>
    <div class="svgimg">
      <span>svg图标</span>
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="info.svgImg" />
    </div>
    <div class="select">
      <span>关联分类</span>
      <el-select v-model="info.ct_id" placeholder="请选择">
        <el-option v-for="item of options" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="box">
      <el-button type="primary" @click="confirm()">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'operate',
  data() {
    return {
      boolean: true,
      title: "提交课程",
      info: {
        name: "",
        svgImg: "",
        introduce: "",
        ct_id: "",
      },
      options: [],
      ensure: ""
    }
  },
  methods: {
    async confirm() {
      if (!this.info.name) {
        this.$message({
          type: "error",
          message: "请输入课程名称",
        })
      } else if (!this.info.introduce) {
        this.$message({
          type: "error",
          message: "请输入课程简介",
        })
      } else if (!this.info.svgImg) {
        this.$message({
          type: "error",
          message: "请输入课程图标",
        })
      } else if (!this.info.ct_id) {
        this.$message({
          type: "error",
          message: "请选择分类",
        })
      } else {
        this.info = await this.ensure(this.info)
        this.boolean = false
      }
    }
  }
}
</script>