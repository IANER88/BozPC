<template>
  <main id="collect-box">
    <nav>
      <div
        class="link-box"
        @click="Link(item.id)"
        v-for="item of nav"
        :key="item.id"
        :class="{ active: item.id == $route.query.id }"
      >
        <div class="nav-content-box">
          <span>{{ item.name }}</span>
          <i
            class="el-icon-plus"
            v-if="Live(item.name) && isLogin"
            @click="add()"
          />
          <el-dropdown
            class="right"
            trigger="click"
            v-if="!Live(item.name) && isLogin"
          >
            <i class="el-icon-more" />
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="!Live(item.name) && isLogin"
                @click.native="editor(item)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                v-if="!Live(item.name) && isLogin"
                @click.native="remove(item.id)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>{{ item.count }} 条内容</span>
      </div>
    </nav>
    <el-empty
      class="collect-empty"
      description="收藏夹为空"
      v-if="content.length === 0"
    />
    <div class="collect-main-box" v-else>
      <div class="collect-content-box">
        <div class="title-box">文章标题</div>
        <div class="author-box">作者</div>
        <div class="collect-icon-box" />
      </div>
      <div class="collect-content-box" v-for="item of content" :key="item.id">
        <div class="title-box" @click="LinkArticle(item)">
          <i v-html="Icon.YueQue.article" />
          {{ item.title }}
        </div>
        <div class="author-box" @click="LinkAuthor(item)">
          {{ item.author.name }}
        </div>
        <div
          class="collect-icon-box"
          v-html="Icon.Like.collect2"
          @click="collect(item)"
        />
      </div>
    </div>
    <Add
      :title="title"
      @close="close"
      v-if="boolean"
      :name="name"
      :id="id"
      :visible="state"
    />
  </main>
</template>
<script>
import Add from "./Add";
export default {
  name: "Collect",
  data() {
    return {
      nav: [],
      content: [],
      title: "添加收藏夹",
      boolean: false,
      name: "",
      id: "",
      state: "",
    };
  },
  components: { Add },
  async mounted() {
    this.Get();
  },
  computed: {
    isLogin() {
      return this.$store.state.info.alias == this.$route.params.name;
    },
  },
  methods: {
    async Link(id) {
      this.$router.push({
        path: this.$route.path,
        query: {
          id,
        },
      });
      const { data } = await this.Fetch.Home.Collect({
        method: "patch",
        alias: this.$route.params.name,
        id,
      });
      this.content = data.content;
    },
    Live(value) {
      return value === "默认收藏夹";
    },
    LinkArticle(item) {
      location.href = `/article/${item.author.alias}/${item.id}`;
    },
    LinkAuthor(item) {
      location.href = `/space/${item.author.alias}`;
    },
    add() {
      this.boolean = true;
    },
    editor(item) {
      this.title = "编辑收藏夹";
      this.boolean = true;
      this.name = item.name;
      this.id = item.id;
      this.state = item.state;
    },
    remove(id) {
      this.$confirm("确认删除收藏夹吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await this.Fetch.Home.Collect({
            method: "delete",
            data: {
              id,
            },
          });
          this.Def.Home.Message({
            res: data,
            fun: () => {
              this.Get();
              this.close();
            },
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async Get() {
      const { data } = await this.Fetch.Home.Collect({
        alias: this.$route.params.name,
      });
      this.nav = data.list;
      this.Link(this.nav[0].id);
    },
    collect(item) {
      this.Def.Collect({
        id: item.id,
        collect: item.collect,
        fun: () => {
          this.Get();
        },
      });
    },
    close(value) {
      this.boolean = value;
      this.Link(this.$route.query.id)
    },
  },
};
</script>
<style scoped lang="less">
#collect-box {
  display: flex;

  nav {
    width: 186px;
    padding: 10px;
    border-right: 1px solid var(--tint-solid);

    .link-box {
      width: 100%;
      height: 74px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
      transition: 0.2s;

      &.active {
        background: var(--collect-nav);

        span {
          font-weight: 500;
        }
      }

      .nav-content-box {
        display: flex;
        justify-content: space-between;

        i {
          cursor: pointer;
          display: flex;
          align-items: center;

          &.el-icon-plus {
            font-weight: bold;
          }
        }
      }

      > span {
        font-size: 13px;
      }
    }
  }
  .collect-empty{
    width: 100%;
    height: 100%;
    align-self: center;
  }
  .collect-main-box {
    padding: 0 10px;
    width: 100%;

    .collect-content-box {
      width: 100%;
      display: grid;
      justify-content: space-between;
      grid-template-columns: 3fr 1fr 1fr;
      height: 48px;
      padding: 0 5px;
      border-bottom: 1px solid var(--tint-solid);

      &:not(:first-child) {
        &:hover {
          background: var(--topic-hover);
        }
      }

      > div {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:first-child {
          gap: 5px;

          i {
            display: flex;
            align-items: center;
          }
        }

        &:last-child {
          flex-direction: row-reverse;

          /deep/svg,
          /deep/path {
            fill: #ecaa04;
          }
        }
      }
    }
  }
}
</style>