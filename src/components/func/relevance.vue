<template>
  <el-dialog title="关联选择" :visible.sync="boolean" width="35%" :append-to-body="true">
    <div class="select">
      <span>关联分类</span>
      <el-select v-model="info" placeholder="请选择">
        <el-option v-for="item of options" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      info: [],
      boolean: true,
      options: []
    }
  },
}
</script>
<style lang="less">
.el-dialog__wrapper .el-dialog {
  height: 400px !important;

  .el-dialog__body {
    margin-top: 10px;
    padding: 0 20px 20px;
  }
}
</style>