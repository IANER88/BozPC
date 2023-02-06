<template>
  <main id="editor-box">
    <Nav :title="init.title" :name="init.name" :submit="Submit" :init="submit" :del="Del" :author="false" />
    <div class="main-box">
      <div id="menu" />
      <!-- 工具栏 -->
      <div class="editor-box">
        <div id="text">
          <div class="title">
            <input type="text" placeholder="请输入文章标题（5～100个字）" @keypress.enter.prevent="" maxlength="100"
              v-model="title" />
            <span>{{ textars.len }}/100</span>
          </div>
          <div id="txt" />
          <!-- 内容区 -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "/src/assets/css/editor.less";
import "@wangeditor/editor/dist/css/style.css";
import config from "/src/assets/js/Editor";
import Nav from "../../Release/Nav.vue";
export default {
  name: "AdminEditor",
  data() {
    return {
      title: "",
      init: {
        title: this.$route.params.name,
        name: "添加课程",
      },
      textars: {
        len: 0,
      },
      submit: {
        len: 0,
        draft: "草稿已保存",
        time: "",
      },
      info: {},
      operat: "",
      editorText: "",
    };
  },
  components: { Nav },
  async mounted() {
    config.onChange = () => {
      this.editorText = this.Def.editor.getText();
    };
    setTimeout(async () => {
      const { params: { operat }, query: { id } } = this.$route;
      this.operat = operat;
      if (operat === "update") {
        this.init.name = "更新课程";
        const { data: { data } } = await this.Fetch.Admin.course.Content({ id })
        this.info = data;
        this.title = this.info.name;
        document.title = this.init.name;
        this.Def.creationEditor(this.info.content);
      } else {
        this.Def.creationEditor();
      }
    }, 100);
  },
  methods: {
    // 判断是否符合条件
    isConditions() {
      if (!this.title) {
        this.$message({
          message: "请输入标题",
          type: "error",
        });
      } else if (!this.editorText) {
        this.$message({
          message: "请输入课程内容",
          type: "error",
        });
      } else {
        return true;
      }
    },
    Submit() {
      this.init.name == "更新课程" ? this.Release("patch", this.$route.query.id) : this.Release("post")
    },
    async Release(method, id) {
      if (this.isConditions()) {
        const obj = {
          name: this.title,
          content: this.Def.editor.getHtml(),
          catalog: this.Def.editor.getCatalog(),
        }
        if (method === "post") obj.catalogue_id = this.$route.query.id
        const { data } = await this.Fetch.Admin.course.Content({
          method,
          id,
          data: obj,
        })
        this.Def.Home.Message({
          res: data,
          fun: () => {
            this.title = "";
            this.Def.editor.clear();
            if (this.operat === "update") this.$router.go(-1);
          }
        })
      }
    },
    Del() {
      this.$confirm("确定删除吗? 删除后再也无法找回!", "提示", {
        type: "warning",
      }).then(() => {
        this.Release("delete", this.$route.query.id)
      }).catch(() => {
        this.$message({
          message: "已取消删除!"
        })
      })
    }
  },
  watch: {
    editorText(news) {
      this.submit.len = news.length;
    },
    title(news) {
      this.textars.len = news.length;
    },
  },
};
</script>
