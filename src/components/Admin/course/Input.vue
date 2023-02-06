<template>
  <el-dialog :title="title" :visible.sync="dialog" :before-close="handleClose" width="30%">
    <el-input v-model="name" placeholder="请输入内容" />
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item of options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel()">取 消</el-button>
      <el-button type="primary" @click="Submit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'Input',
  data() {
    return {
      name: '',
      value: this.options.id
    }
  },
  props: ["options", "dialog", "title", "submit"],
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    Judge() {
      if (!this.name) {
        this.$message({
          type: "error",
          message: "内容不能为空!"
        })
        return true
      } else {
        return false
      }
    },
    Submit() {
      if (this.Judge()) return;
      this.submit({
        name: this.name,
        course_id: this.value
      })
    },
    Cancel() {
      this.$emit("cancel", false)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog__body {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  height: 65%;
}
</style>