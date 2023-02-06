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
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="title" label="原由" width="180" />
      <el-table-column prop="author" label="用户" width="120">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="用户信息" width="200" trigger="hover">
            <div class="box">
              <el-avatar shape="square" :src="scope.row.user.avatar" />
              <div>
                <h5>ID：{{ scope.row.id }}</h5>
                <h6>名称：{{ scope.row.user.name }}</h6>
              </div>
            </div>
            <el-button slot="reference">{{ scope.row.user.name }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="audit" width="120" label="审核状态">
        <template slot-scope="scope">
          <el-tag type="danger">未审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="修改时间" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="Audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Audit :info="list" v-if="boolean" @hide="hide" />
  </main>
</template>
<script>
import Audit from './audit.vue';
export default {
  name: "User",
  data() {
    return {
      saerch: {
        id: "",
        author: "",
        audit: "",
      },
      list: {},
      boolean: false,
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
    this.Render();
  },
  methods: {
    Audit(row) {
      this.list = row
      this.boolean = true
    },
    async Render() {
      const { data } = await this.Fetch.Account({
        method: "post"
      });
      console.log(data);
      this.info = data.info;
    },
    hide(value) {
      this.boolean = value
    }
  },
  components: { Audit }
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
