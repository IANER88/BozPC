<template>
  <main id="main-box">
    <header>
      <div class="id">
        <span>ID</span>
        <el-input v-model="saerch.id" placeholder="请输入文章ID" />
      </div>
      <div class="author">
        <span>作者</span>
        <el-input v-model="saerch.author" placeholder="请输入作者ID或名称" />
      </div>
      <div class="state">
        <span>状态</span>
        <el-select v-model="saerch.audit" placeholder="请选择">
          <el-option v-for="item in options" :key="item.state" :label="item.audit" :value="item.state" />
        </el-select>
      </div>
      <el-button type="primary">查询</el-button>
    </header>
    <el-table :data="info" style="width: 100%" stripe border>
      <el-table-column prop="id" label="文章ID" width="120" />
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="author" label="文章作者" width="120">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="作者信息" width="200" trigger="hover">
            <div class="box">
              <el-avatar shape="square" :src="scope.row.author.avatar" />
              <div>
                <h5>ID：{{ scope.row.author.id }}</h5>
                <h6>名称：{{ scope.row.author.name }}</h6>
              </div>
            </div>
            <el-button slot="reference">{{ scope.row.author.name }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="audit" width="120" label="审核状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.audit === 0" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.audit === 1" type="danger">未审核</el-tag>
          <el-tag v-if="scope.row.audit === 2" type="warning">被打回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布时间" />
      <el-table-column prop="update_time" label="编辑时间" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="Audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>
<script>
export default {
  name: "Article",
  data() {
    return {
      title: [
        {
          width: 50,
          name: "id",
        },
        {
          width: 180,
          name: "标题",
        },
        {
          width: 180,
          name: "封面",
        },
        {
          width: 70,
          name: "作者",
        },
        {
          width: 180,
          name: "审核状态",
        },
        {
          width: 250,
          name: "内容",
        },
        {
          width: 90,
          name: "上传时间",
        },
        {
          width: 90,
          name: "编辑时间",
        },
        {
          width: 70,
          name: "浏览量",
        },
      ],
      saerch: {
        id: "",
        author: "",
        audit: "",
      },
      options: [
        {
          state: 0,
          audit: "已通过"
        },
        {
          state: 1,
          audit: "未审核"
        },
        {
          state: 2,
          audit: "被打回"
        },
      ],
      info: []
    };
  },
  async mounted() {
    this.Render()
  },
  methods: {
    Audit(obj) {
      this.Def.Home.Editor({ obj, options: this.options, render: this.Render })
    },
    async Render() {
      const page = this.$route.query.page || 1
      const { data } = await this.Fetch.Admin.Article({
        page,
      })
      this.info = data.article
    }
  }
};
</script>
<style scoped lang="less">
header {
  border: 1px solid var(--tint-solid);
  display: flex;
  height: 70px;
  padding: 15px;
  gap: 10px;

  >div {
    display: flex;
    gap: 10px;
    align-items: center;

    >span {
      width: 47px;
      text-align: center;
      font-weight: bold;
    }
  }
}

/deep/.cell {
  display: flex !important;
  justify-content: center;
}

.box {
  display: flex;
  gap: 10px;

  >div {
    justify-content: space-around;
  }
}
</style>
