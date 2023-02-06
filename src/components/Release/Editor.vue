<template>
  <main id="editor-box">
    <div class="editor">
      <div class="navs">
        <div class="nav">
          <Logo title="Bozhan" />
          <div class="title">
            <h4>{{ init.title }}</h4>
            <div class="box">
              <a href="">
                <span>{{ $store.state.info.name }}</span>
              </a>
              <time>保存于{{ menu.update_time }}</time>
              <i v-html="Icon.Release.cloud" />
            </div>
          </div>
        </div>
        <div class="create">
          <Fun size="220" :name="menu.author && menu.author.name" :len="submit.len" :create="menu.create_time"
            :update="menu.update_time">
            <div class="setting" @click.stop="Ensure('full')">
              <i v-html="Icon.Release.setting" />
              文档设置
            </div>
            <div class="delete" @click="Del()" v-if="$route.params.type === 'update'">
              <i v-html="Icon.Release.delete" />删除
            </div>
          </Fun>
          <el-button size="small" :loading="loading" :autofocus="false" @click.stop="Release({})" :disabled="loading">
            {{ init.init }}
          </el-button>
          <el-button type="primary" size="small" @click.stop="Draft()">保存草稿</el-button>
          <el-tooltip class="item" effect="dark" content="草稿" placement="bottom">
            <div class="draft-box" v-html="Icon.Release.draft" @click="Ensure('draft')" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="main-box">
      <div id="menu" />
      <!-- 工具栏 -->
      <div class="editor-box">
        <div id="text">
          <div class="title">
            <input type="text" placeholder="请输入标题" @keypress.enter.prevent="" maxlength="100"
              v-model.trim="menu.title" />
            <span>{{ textars.len }}/100</span>
          </div>
          <div id="txt" />
          <!-- 内容区 -->
        </div>
      </div>
    </div>
    <System :Ensure="Ensure" :full="full" :menu="menu" :teuple="teuple" @fun="fun" />
    <Catalog :catalog="menu.catalog" sticky="flex" />
    <Draft :full="draft" :fun="Ensure" />
  </main>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css";
import "@/assets/css/editor.less";
import config from "@/assets/js/Editor";
import Logo from "../Logo";
import Fun from "@/components/func/Fun";
import Synergy from "@/components/Release/Synergy"
import Catalog from "../func/Catalog";
import Draft from "@/components/func/Draft"
import System from "./System"
export default {
  name: "Editor",
  data() {
    return {
      init: {
        title: "添加文章",
        name: "",
        init: "发布",
      },
      loading: false,
      menu: {
        title: "",
        abridged: "",
        id: "",
        image: "",
        create_time: "",
        update_time: "",
        catalog: '',
        author: {
          name: "",
          alias: ""
        },
        state: 0
      },
      teuple: [],
      full: false,
      draft: false,
      textars: {
        len: 0,
      },
      label: {
        add: [],
        remove: []
      },
      submit: {
        len: 0,
        time: "",
        boolean: true
      },
      textarea: "",
      onActiva: "",
      arrlen: 0,
      editorText: "",
    };
  },
  components: { Logo, Fun, Synergy, Catalog, Draft, System },
  async mounted() {
    document.title = this.init.title;
    const { type } = this.$route.params;
    config.onChange = () => {
      this.editorText = this.Def.editor.getText();
    };
    window.addEventListener("beforeunload", (e) => {
      const event = e || window.event
      if (event && this.menu.title || this.editorText) {
        event.returnValue = "提示信息"
      }
    })
    switch (type) {
      case "add":
        this.Def.creationEditor();
        break
      case "update":
        this.$route.hash === "#draft" ? this.Get({
          name: "Draft",
          title: "编辑草稿",
          init: "发布",
          method: "patch"
        }) : this.Get({})
    }
  },
  methods: {
    Ensure(bian) {
      this[bian] = !this[bian]
      this.Def.scroll()
    },
    fun(value) {
      this.label = value
    },
    async Get({ name = "Article", title = "编辑文章", init = "修改", method = "get" }) {
      this.init.title = title;
      this.init.init = init;
      const { id } = this.$route.query;
      const { data } = await this.Fetch.Release[name]({
        id,
        method
      });
      this.Def.Home.Message({
        res: data,
        def() {
          location = "/notAuth"
        }
      })
      this.menu = data.content
      this.teuple = data.tag.box;
      this.Def.creationEditor(data.content.content);
      this.menu.catalog = this.Def.editor.getCatalog(true)
    },
    Abstract(text) {
      this.editor.textarea = text;
    },
    show(data) {
      this.drawer = data;
    },
    Drawer(show) {
      // 子传父
      this.drawer = show;
    },
    isName(boolean) {
      if (this.textars.len < 5 && boolean) {
        this.$message({
          message: "标题不能少于五个字",
          type: "error",
        });
        return true
      } else if (this.submit.len < 200 && boolean) {
        this.$message({
          message: "内容不能少于200字",
          type: "error",
        });
        return true
      } else if (this.teuple.length <= 0 && boolean) {
        this.Ensure("full")
        this.$message({
          message: " 请选择文章标签",
          type: "error",
        });
        return true
      } else {
        return false;
      }
    },
    Data(title = this.menu.title) {
      return {
        title,
        content: this.Def.editor.getHtml(),
        abridged: this.Def.editor.getText().substring(0, 256).trim(),
        state: this.menu.state,
        image: this.menu.image,
        update_time: new Date().toLocaleString().replaceAll("/", "-"),
        catalog: this.Def.editor.getCatalog(),
        author_id: this.$store.state.info.id,
      }
    },
    async Release() {
      if (this.isName(this.submit.boolean)) return;
      const data = {
        article: this.Data(),
        tag: {
          add: this.label.add,
          remove: this.label.remove,
        },
      };
      switch (this.$route.params.type) {
        case "update":
          if (!this.$route.hash) {
            data.article["id"] = this.menu.id
            return this.Article({
              method: "put",
              data,
            })
          }
          data["id"] = this.menu.id
          this.Article({ data })
        case "add":
          return this.Article({ data })
      }
    },
    async Article({ method = 'post', data }) {
      const res = await this.Fetch.Release.Article({
        method,
        data,
      });
      const { id } = res.data
      this.Def.Home.Message({
        res: res.data,
        fun: method === "delete" ? () => {
          this.Empty()
          setTimeout(() => {
            location.href = "/"
          }, 100)
        } : () => {
          this.Empty()
          setTimeout(() => {
            location.href = `/audit/${this.$store.state.info.alias}/${id}`
          }, 100)

        }
      })

      return res
    },
    async Del() {
      this.$confirm("确定删除吗? 删除后再也无法找回!", "提示", {
        type: "warning",
      }).then(async _ => {
        if (this.$route.hash === "#draft") {
          const res = await this.Fetch.Release.Draft({
            method: "delete",
            id: this.menu.id,
          })
          this.Def.Home.Message({
            res: res.data,
            fun: () => {
              this.Empty()
              location.href = "/"
            }
          })
        } else {
          this.Article({
            method: "delete",
            data: {
              article: {
                id: this.menu.id,
              },
            }
          })
        }
      }).catch(_ => {
        this.$message({
          message: "已取消删除!"
        })
      })
    },
    Empty() {
      // 清空 menu
      const func = (obj = this.menu) => {
        Object.keys(obj).forEach(item => {
          if (obj[item] instanceof Object) {
            func(obj[item])
          } else {
            switch (typeof obj[item]) {
              case "string":
                obj[item] = ""
                break
              case "number":
                obj[item] = 0
                break
            }
          }
        })
      }
      // 清空编辑器内容
      this.Def.editor.clear()
      func()
      func(this.label)
    },
    async Draft() {
      // 判断内容是否为空
      if (!this.editorText) {
        this.$message({
          type: "error",
          message: "内容不为空才可以保存为草稿"
        })
        return
      }
      const data = this.menu.title ? this.Data() : this.Data("无标题文章")
      data.tag = this.label.box ? JSON.stringify(this.label.box) : "[]"
      const res = await this.Fetch.Release.Draft({
        method: this.$route.params.type === "add" ? "post" : "put",
        id: this.menu.id,
        data: {
          draft: data,
        }
      })
      this.Def.Home.Message({
        res: res.data,
        fun: this.$route.params.type === "add" ? () => {
          this.Empty()
          this.Ensure('draft')
        } : () => {
          this.Empty()
          setTimeout(() => {
            location.href = "/"
          }, 100)
        }
      })
    }
  },
  watch: {
    editorText(news, olds) {
      this.submit.len = news.length;
    },
    "menu.title"(news) {
      this.textars.len = news.length;
    },
  },
};
</script>

<style lang="less" scoped>
.editor-box {
  margin-bottom: 20px;
}

.editor {
  height: 60px;
  background: #ffffff;
  box-shadow: 0 1px 12px 0 rgba(1, 39, 78, 0.12);
  padding: 10px 30px;
  box-sizing: border-box;
  z-index: 1000;
  position: sticky;
  top: 0;

  .navs {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }


  .nav {
    // width: 24%;
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .title {
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--tint-solid);
      padding: 0 10px;
      justify-content: space-between;

      .box {
        display: flex;
        align-items: center;

        a {
          color: #8a8f8d;
          text-decoration: none;
          display: flex;

          &:first-child {
            &::after {
              content: "/";
              font-size: 12px;
              margin: 0 5px;
            }
          }
        }

        span,
        time {
          font-size: 13px;
          color: #8a8f8d;
          display: flex;
          align-items: center;
          height: 100%;
        }

        i {
          display: flex;
          align-items: center;
          margin-left: 5px;
        }

        /deep/svg {
          color: #8a8f8d;
        }
      }
    }
  }

  .create {
    width: 30%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 15px;

    .content {
      >div {
        cursor: pointer;
        padding: 15px;
        display: flex;
        align-items: center;

        &:not(:first-child) {
          border-top: 1px solid var(--tint-solid);
        }
      }

      .delete,
      .setting {
        gap: 5px;
      }
    }

    .draft-box {
      display: flex;
      align-items: center;
      cursor: pointer;

      /deep/svg {
        width: 20px;
        height: 20px;
        fill: var(--color);

        path {
          fill: var(--color);
        }
      }
    }
  }
}

/deep/.el-drawer__body {
  padding: 20px;
  color: #409eff;
  overflow: hidden;
}
</style>
