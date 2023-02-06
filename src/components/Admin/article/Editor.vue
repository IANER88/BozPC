<template>
  <main class="v-model" v-show="boolean" @click.self="cacel()">
    <div class="box">
      <div class="title-box">
        <h3>审核文章</h3>
      </div>
      <div class="title">
        <span>文章标题</span>
        <el-input v-model="obj.title" placeholder="请输入内容" />
      </div>
      <div class="state">
        <div class="left">
          <span>审核状态</span>
          <el-tag v-if="obj.audit === 0" type="success">已通过</el-tag>
          <el-tag v-if="obj.audit === 1" type="danger">未审核</el-tag>
          <el-tag v-if="obj.audit === 2" type="warning">被打回</el-tag>
          <el-select v-model="article.audit" placeholder="请选择">
            <el-option v-for="item in options" :key="item.state" :label="item.audit" :value="item.state">
              {{ item.audit }}
            </el-option>
          </el-select>
          <div class="note">
            <span class="note-span">备注</span>
            <el-autocomplete class="inline-input" v-model="article.message" :fetch-suggestions="querySearch"
              placeholder="请输入内容" @select="select" />
          </div>
        </div>
        <div class="right">
          <el-button type="success" @click="submit()">确定</el-button>
        </div>
      </div>
      <div class="content">
        <div id="menu" />
        <div id="txt" />
      </div>
    </div>
    <div class="cacel" @click.stop="cacel()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px"
        viewBox="0 0 48 48" version="1.1">
        <g id="close-hover" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect id="矩形" fill="#8C8C8C" opacity="0.5" x="0" y="0" width="48" height="48" rx="4" />
          <rect id="矩形" x="10" y="10" width="28" height="28" />
          <rect id="矩形" fill="#FFFFFF"
            transform="translate(24.049858, 24.059517) rotate(45.000000) translate(-24.049858, -24.059517) "
            x="22.956108" y="9.51264205" width="2.1875" height="29.09375" rx="1.09375" />
          <rect id="矩形" fill="#FFFFFF"
            transform="translate(24.049858, 24.059517) scale(-1, 1) rotate(45.000000) translate(-24.049858, -24.059517) "
            x="22.956108" y="9.51264205" width="2.1875" height="29.09375" rx="1.09375" />
        </g>
      </svg>
    </div>
  </main>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css";
export default {
  name: 'Editor',
  data() {
    return {
      boolean: true,
      options: [
        {
          state: 0,
          audit: "通过"
        },
        {
          state: 2,
          audit: "打回"
        },
      ],
      render: {},
      obj: {

      },
      article: {
        audit: "",
        message: "",
      },
      restaurants: [
        {
          value: "文章审核成功！",
        },
        {
          value: "文中有违禁词！",
        },
        {
          value: "内容脱离主题！",
        },
        {
          value: "图片包含暴力色情！",
        },
        {
          value: "文中包含暴力色情字段！",
        }
      ]
    }
  },
  methods: {
    cacel() {
      document.body.removeChild(document.querySelector(".v-model"))
    },
    querySearch(queryString, cb) {
      let results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    async submit() {
      if (this.article.audit != "") {
        this.$message({
          type: "error",
          message: "你还没有选择呢！"
        })
        return
      }
      const { data } = await this.Fetch.Admin.Article({
        method: "patch",
        data: {
          id: this.obj.id,
          message: this.article.message,
          audit: this.article.audit,
          author: this.obj.author.id,
        },
      })
      this.Def.Home.Message({
        res: data,
        fun: () => {
          this.cacel()
          this.render()
        }
      })
    },
    select(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.Def.creationEditor(this.obj.content)
    })
  }
}
</script>
<style scoped lang="less">
@keyframes opacity {
  from {
    opacity: 0;
  }
}


.v-model {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: opacity .3s;

  .box {
    width: 50%;
    min-height: 300px;
    border-radius: 5px;
    background: #fff;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    >div:not(.title-box) {
      display: flex;
      gap: 5px;
      align-items: center;

      span:not(.el-tag, .note) {
        width: 90px;
      }

    }

    .note {
      span {
        width: auto !important;
      }

      display: flex;
      gap: 10px;
      align-items: center;
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;

      #menu,
      #txt {
        border: 1px solid var(--tint-solid);
      }

      #txt {
        height: 400px;
        width: 100%;
        overflow-y: auto;

        &::-webkit-scrollbar {
          /*高宽分别对应横竖滚动条的尺寸*/
          width: 10px;
          background-color: var(--course-solid);
        }

        &::-webkit-scrollbar-thumb {
          background: #409eff;
        }
      }
    }
  }

  .state {
    span:not(.el-tag, .note-span) {
      width: 77px !important;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;

    >div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  .cacel {
    top: 50px;
    position: fixed;
    right: 50px;
    cursor: pointer;
  }
}
</style>