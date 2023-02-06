<template>
  <el-dialog :title="title" :visible.sync="boolean" width="30%" :append-to-body="true">
    <div class="name">
      <span>标签名称</span>
      <el-input v-model="info.tag.text" placeholder="请输入内容" />
    </div>
    <div class="name">
      <span>英文名称</span>
      <el-input v-model="info.tag.englishName" placeholder="请输入内容" />
    </div>
    <div class="select">
      <span>关联分类</span>
      <el-select v-model="info.type" placeholder="请选择" multiple>
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
  name: 'tag',
  data() {
    return {
      boolean: true,
      title: "添加标签",
      info: {
        tag: {
          text: "",
          englishName: "",
        },
        type: []
      },
      options: [],
      ensure: ""
    }
  },
  methods: {
    async confirm() {
      this.info = await this.ensure(this.info)
      // this.boolean = false
    }
  },
  watch: {
    "info.text": {
      handler(news) {
        if (/[^A-Za-z]/.test(news)) {
          const arr = news.split('')
          //使用循环遍历字符串
          news = arr.map((item) => {
            if (item.toUpperCase() === item) {
              return '-' + item.toLowerCase();
            } else {
              return item;
            }
          })
          this.info.englishName = news.join('')
        }

      }
    }
  }
}
</script>
<style lang="less" scoped>
  .name, .select{
    display: flex;
    align-items: center;
  }
</style>