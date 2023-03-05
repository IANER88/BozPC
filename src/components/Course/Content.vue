<template>
  <div id="course" v-show="boolean">
    <Nav />
    <main class="course-box">
      <nav class="course-nav">
        <div class="catalog-box" v-for="item of catalog" :key="item.id">
          <span>{{ item.name }}</span>
          <div class="title-box" v-for="hove of item.title" :key="hove.id">
            <span
              @click="
                Content({
                  name: hove.name,
                  id: hove.id,
                })
              "
              :class="{ active: index === hove.id }"
            >
              {{ hove.name }}
            </span>
            <div
              class="hash-box"
              v-for="home of hove.title"
              :key="home.id"
              v-show="index === hove.id"
            >
              <span @click="hash(home.hash)">{{ home.hash }}</span>
              <span
                class="hash-next-box"
                v-for="bash of home.list"
                :key="bash.hash"
                @click="hash(bash.hash)"
              >
                {{ bash.hash }}
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div class="course-main-box">
        <div
          class="course-center-box"
          :style="`width:${int}%`"
          v-for="(item, index) of content"
          :key="index"
        >
          <h1 :id="item.name" :int="item.id">{{ item.name }}</h1>
          <main class="course-content-box" v-html="item.content" />
        </div>
        <p :style="`width:${int}%`" v-show="!decode">
          <span
            v-if="upper.name"
            class="upper"
            @click="
              Content({
                name: upper.name,
                id: upper.id,
              })
            "
          >
            <i class="el-icon-back" />
            {{ upper.name }}
          </span>
          <span
            @click="
              Content({
                name: next.name,
                id: next.id,
              })
            "
            class="next"
            v-if="next.name"
          >
            {{ next.name }}
            <i class="el-icon-right" />
          </span>
        </p>
      </div>
    </main>
    <div class="func-box">
      <el-tooltip
        class="item"
        effect="dark"
        content="演示:P"
        placement="bottom-start"
      >
        <div v-html="Icon.Course.slide" class="solid" @click.stop="Slide()" />
      </el-tooltip>
      <Fun :author="false">
        <div class="translation" @click="translater(translation.name)">
          <i v-html="Icon.Course.fanyi" />
          <span>{{ translation.title }}</span>
        </div>
        <div class="window">
          <div>
            <span>超屏模式</span>
            <em>适合超宽表格展示效果</em>
          </div>
          <el-switch
            v-model="value"
            @change="switc()"
            active-color="#13ce66"
            inactive-color="#bec0bf"
          />
        </div>
        <div class="window">
          <div>
            <span>连续阅读模式</span>
            <em>不需要点目录切换</em>
          </div>
          <el-switch
            v-model="decode"
            @change="read()"
            active-color="#13ce66"
            inactive-color="#bec0bf"
          />
        </div>
        <div class="span" @click="screen()">
          {{ screens.init }}
        </div>
        <div class="span" v-if="peport">举报</div>
      </Fun>
    </div>
    <Top />
  </div>
</template>
<script>
import "@/assets/css/prism.css";
import "@/assets/css/Articles.less";
import Top from "@/components/toTop";
import Nav from "../Home/Nav";
import Translater from "translater.js";
import Fun from "../func/Fun.vue";
const tran = new Translater({
  lang: "cn",
});
export default {
  name: "Content",
  data() {
    return {
      catalog: [],
      content: [],
      title: [],
      upper: {},
      next: {},
      catalog_id: "",
      index: "",
      show: false,
      value: false,
      decode: false,
      int: 66,
      solid: true,
      screens: {
        init: "全屏",
        bool: false,
      },
      fun: {
        nav: ".title-box .active ~ .hash-box span",
        active: "title-active",
        bool: false,
      },
      boolean: true,
      translation: {
        name: "default",
        title: "翻译",
        func: "",
      },
    };
  },
  async mounted() {
    const { data } = await this.Fetch.Course({
      method: "put",
      url: `/course?name=${this.$route.params.name}`,
    });
    this.catalog = data.catalog;
    this.Render({ name: this.$route.params.title, id: this.$route.query.id });
    this.Def.scrollSpy(this.fun);
    window.addEventListener("click", () => {
      this.show = false;
    });
  },
  updated() {
    if (this.decode) {
      // 清除掉上一个共同监听事件
      window.removeEventListener("scroll", () => {});
      this.fun.fun = ({ int, name }) => {
        console.log(int, name);
        this.index = int;
        this.$router.replace({
          name: "content",
          query: {
            id: int,
          },
          params: {
            name: this.$route.params.name,
            title: name,
          },
        });
      };
      this.Def.scrollSpy(this.fun);
    }
  },
  props: {
    peport: {
      default: true,
    },
  },
  methods: {
    switc(e) {
      this.value ? (this.int = 86) : (this.int = 66);
    },
    async read() {
      let time;
      let hash;
      clearTimeout(time);
      clearTimeout(hash);
      if (this.decode) {
        time = setTimeout(() => {
          this.Render({
            method: "post",
            url: `/course?name=${this.$route.params.name}`,
          });
          hash = setTimeout(this.hash, 100);
        }, 700);
      } else {
        this.Render({
          name: this.$route.params.title,
          id: this.$route.query.id,
        });
      }
    },
    hide(e) {
      this.show = !this.show;
    },
    async Slide() {
      this.boolean = false;
      const res = await this.Fetch.Course({
        method: "post",
        url: `/course?name=${this.$route.params.name}`,
      });
      this.Def.Slide({
        content: res.data,
        catalog: this.catalog,
        fun: () => {
          this.boolean = true;
        },
      });
    },
    screen() {
      this.Def.Screen({
        bool: this.screens.bool,
        fun: () => {
          this.screens = {
            init: "全屏",
            bool: false,
          };
        },
        def: () => {
          this.screens = {
            init: "取消全屏",
            bool: true,
          };
        },
      });
    },
    async Content({ name, id }) {
      const { params, query } = this.$route;
      // 相同目录不执行，除非是连读模式
      let time;
      clearTimeout(time);
      if (params.title != name || query.id !== id) {
        this.$router.push({
          name: "content",
          query: {
            id,
          },
          params: {
            name: this.$route.params.name,
            title: name,
          },
        });
        if (!this.decode) {
          this.Render({ name, id });
          return;
        }
      }
      this.INT();
      time = setTimeout(this.hash, 100);
    },
    async Render(obj) {
      const {
        id,
        name,
        method = "patch",
        url = `/course?name=${name}&id=${id}`,
      } = obj;
      const list = [];
      const { data } = await this.Fetch.Course({
        method,
        url,
      });
      if (!this.decode) {
        const {
          content,
          cataloguet: { upper, next },
        } = data;
        this.content = [];
        document.documentElement.scrollTop = 0;
        this.upper = upper;
        this.next = next;
        this.content = content;
        this.Def.Animation({
          box: ".course-center-box",
          actives: "course-active",
        });
      } else {
        for (const ts of data.slide) {
          list.push(...ts.course);
        }
        this.content = list;
      }
      this.INT();
      this.Def.PrismAll()
        .LastpDom({ select: ".course-content-box > .code-toolbar" })
        .Enlarge(".course-content-box");
    },
    hash(hash = this.$route.params.title) {
      return this.Def.toHash(`#${hash}`);
    },
    INT() {
      setTimeout(() => {
        if (!this.decode) this.index = Number(this.$route.query.id);
        document.title = `${this.$route.params.title} · ${this.$route.params.name}`;
      }, 100);
    },
    translater() {
      location.href = `?id=${this.$route.query.id}&lang=jp`;
    },
  },
  components: { Nav, Top, Fun },
};
</script>
<style scoped lang="less">
#course {
  main.course-box {
    display: flex;
    width: 100%;

    .course-main-box {
      width: 100%;
      margin: 0 auto 0 320px;
      padding: 4rem 2rem 0;

      h1 {
        width: 100%;
        font-size: 38px;
        border-bottom: solid var(--course-solid) 1px;
        padding-bottom: 4rem;
        display: flex;
      }

      /deep/h2 {
        padding-top: 1.8rem;
        padding-bottom: 10px;
        display: flex;

        &:not(:first-child) {
          border-top: solid var(--course-solid) 1px;
        }
      }

      .course-center-box {
        margin: 0 auto 50px;
        transition: 0.3s ease-in-out;

        &.course-active {
          animation: load 1s;
        }

        @keyframes load {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
        }

        + p {
          border-top: solid var(--course-solid) 1px;
          width: 65%;
          height: 65px;
          margin: 0 auto;
          line-height: 65px !important;

          span {
            text-decoration: none;
            color: #409eff;
            cursor: pointer;

            &.upper {
              float: left;
            }

            &.next {
              float: right;
            }
          }
        }
      }

      .course-content-box {
        padding-top: 2rem;
      }
    }
  }

  nav.course-nav {
    width: 320px;
    height: 100vh;
    box-shadow: none;
    overflow-y: scroll;
    top: 60px;
    position: fixed;
    z-index: 1;
    padding: 30px 0 90px 0;
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    @-moz-document url-prefix() {
      border-right: 10px solid var(--course-solid);
      scrollbar-width: none;
    }

    &::-webkit-scrollbar {
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 10px;
      background-color: var(--course-solid);
    }

    &::-webkit-scrollbar-thumb {
      height: 50%;
      background: #409eff;
    }

    .catalog-box {
      // padding: 10px;
      display: flex;
      flex-direction: column;
      // grid-gap: 10px;

      > span {
        font-size: 1.1rem;
        font-weight: bold;
        padding: 5px 32px;
      }

      .title-box {
        display: flex;
        flex-direction: column;

        > span {
          padding: 5px 0 5px 40px;
          font-size: 1rem;
          cursor: pointer;
          line-height: 1.4;
        }

        span {
          &:hover {
            color: var(--main-color);
          }
        }

        .hash-box {
          padding: 5px;
        }

        .active {
          font-weight: 600;
          color: #409eff !important;
          display: inline-block;
          padding: 5px 0 5px calc(40px - 5px);
          border-left: 5px solid var(--main-color);
        }

        .title-active {
          color: #409eff !important;
        }

        .hash-box {
          display: flex;
          flex-direction: column;

          > span {
            padding-left: 50px;
            cursor: pointer;
          }

          grid-gap: 10px;

          a {
            text-decoration: none;
            color: initial;
          }

          .hash-next-box {
            padding-left: 60px;
          }
        }
      }
    }
  }

  div.func-box {
    display: flex;
    position: fixed;
    top: 70px;
    right: 35px;

    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .system {
      position: relative;

      > div {
        .flex();
      }

      .content {
        > div {
          width: 100%;
          padding: 15px;
          .flex();

          &:not(:first-child) {
            border-top: 1px solid var(--tint-solid);
          }
        }

        .translation {
          flex-direction: column;
          color: var(--headlines-color);
        }

        .window {
          display: flex;
          justify-content: space-between;
          font-size: 14px;

          div:first-child {
            display: flex;
            justify-content: space-around;

            flex-direction: column;

            em {
              font-style: normal;
              font-size: 12px;
            }
          }
        }

        .span {
          justify-content: flex-start;
        }
      }
    }

    > div,
    > span {
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 3px;
      .flex();

      /deep/svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: var(--course-hover);
      }
    }
  }
}
</style>