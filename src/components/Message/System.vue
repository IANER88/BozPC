<template>
  <main id="system-box">
    <div class="title-box">系统消息</div>
    <div class="main-box">
      <div class="box" v-for="item of info" :key="item.id">
        <Manager />
        <div class="system-main-box">
          <div class="name">
            <header>
              <div class="title">
                <span>掌柜</span>
                <span>通知类型:</span>
                <p>{{ item.message }}</p>
              </div>
              <el-popover placement="bottom" title="查看" width="180" trigger="hover" v-if="item.article">
                <div class="primary">
                  <el-link type="success" @click="view(item.article)">查看文章</el-link>
                  <el-link type="primary" @click="editor(item.article)">修改文章</el-link>
                </div>
                <p slot="reference">{{ item.article.title }}</p>
              </el-popover>
            </header>
            <div class="content">
              <div class="message">
                <span>备注:</span>
                <p class="success" v-if="item.target === 0">
                  {{ item.message }}
                </p>
                <p class="danger" v-else>
                  {{ item.message }}
                </p>
              </div>
              <el-tag v-if="item.target === 0" type="success">已通过</el-tag>
              <el-tag v-else type="danger">被打回</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Manager from '../Manager.vue';
export default {
  name: 'System',
  data() {
    return {
      info: []
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Home.Notify({ method: "patch", type: 1 })
    this.info = data.system
  },
  components: { Manager },
  methods: {
    view(article) {
      location.href = `/article/${this.$store.state.info.alias}/${article.id}`
    },
    editor(article) {
      location.href = `/release/update?id=${article.id}`
    }
  }
}
</script>
<style lang="less" scoped>
.primary {
  display: flex;
  gap: 10px;
}

/deep/.el-popover__reference {
  cursor: pointer;
}

#system-box {
  .box {
    display: flex;
    gap: 10px;
    // &:not(:last-child){
    border-bottom: 1px solid var(--tint-solid);
    padding: 10px 20px;

    // }
    .system-main-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    /deep/.el-tag {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .name {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      header {
        width: 100%;
        display: flex;
        gap: 7px;
        justify-content: space-between;

        .title {
          display: flex;
          gap: 10px;
        }
      }

      .content,
      .message {
        display: flex;
        font-size: 13px;
        gap: 10px;
      }

      .content {
        justify-content: space-between;
      }

      .message p {
        &.danger {
          color: #F56C6C;
        }

        &.success {
          color: #67C23A;
        }
      }

      .title {
        display: flex;
        align-items: center;
      }

      p {
        font-size: 13px;
        line-height: normal !important;
      }

      span {
        &:first-child {
          font-weight: bold;

        }
      }
    }
  }
}
</style>