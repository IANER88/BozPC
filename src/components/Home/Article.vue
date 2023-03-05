<template>
  <article id="articles">
    <Nav :hide="show" @render="render" :boolean="!show">
      <transition name="el-fade-in">
        <div :class="{ 'title-box': true, bottom: show }" v-show="show">
          <div class="title">
            <h1>{{ info.title }}</h1>
          </div>
          <div class="avatar">
            <a :href="`/space/${info.author.alias}`">
              <img :src="info.author.avatar" alt="" />
              <span>{{ info.author.name }}</span>
            </a>
            <div class="button">
              <button :class="info.attention.boolean ? 'but-active' : 'but'" @click="Attention({
                follower_id: info.author.id
              })" />
            </div>
          </div>
        </div>
      </transition>
    </Nav>
    <div class="head">
      <div class="box">
        <div class="left">
          <div class="tag-box">
            <el-tag v-for="item in info.tag" :key="item.id">
              <a :href="`/nav/${item.title}/${item.name}`">{{ item.tag }}</a>
            </el-tag>
          </div>
          <div class="title">
            <h1>{{ info.title }}</h1>
          </div>
          <div class="click">
            <div class="button">
              <button :class="info.attention.boolean ? 'first-active' : 'first'"
                v-if="info.author.id !== $store.state.info.id" @click="Attention({
                  follower_id: info.author.id
                })" />
              <button class="last" @click="Compile()" v-if="info.author.id === $store.state.info.id">
                <i v-html="Icon.Article.one" />
                编辑
              </button>
              <button @click="Direct()">
                <i v-html="Icon.Article.shaiw" />
                私信
              </button>
            </div>
            <div class="span">
              <span :class="{ active: info.like.author }" @click="LikeArticle(info.id)">
                <i v-html="Icon.Article.two" />
                {{ info.like.count === 0 ? "点赞" : info.like.count }}
              </span>
              <span>
                <Share :title="info.title">
                  <span class="el-dropdown-like">
                    <i v-html="Icon.Article.therr" />分享
                  </span>
                </Share>
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="Reading">
              <span>浏览量</span>
              <strong>{{ info.browse | unit }}</strong>
            </div>
            <div class="Attention" @click="Follower()">
              <span>关注者</span>
              <strong>{{ info.follower }}</strong>
            </div>
          </div>
          <div class="time-box">
            <div class="tag-green" tag>
              发布时间<span>·</span>{{ info.create_time }}
            </div>
            <div class="tag-cyan" tag>
              编辑时间<span>·</span>{{ info.update_time }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="article-box">
      <div class="article-main-box">
        <article class="article" v-html="info.content" />
        <div class="comments-box">
          <Release :perform="Release" not="false" />
          <div class="comments">
            <div class="tip-box">
              <div class="title">
                <span>全部评论</span>
                <span>{{ info.comments.count }}</span>
                <span @click="switchComment(2)" :class="{ active: info.comments.time === 2 }">只看作者</span>
              </div>
              <div class="filter">
                <span :class="{ time: info.comments.time === 1 }" @click="switchComment(1)">按时间倒序</span>
                <span :class="{ time: info.comments.time === 3 }" @click="switchComment(3)">按时间正序</span>
              </div>
            </div>
            <div class="box">
              <el-skeleton :rows="6" animated v-if="rows" :throttle="500" />
              <Comment v-for="item of info.comments.comment" :key="item.id" :item="item" :info="info"
                :subscript="subscript" @preform="preform" :preform="preform" :switchComment="switchComment"
                :time="info.comments.time" />
            </div>
          </div>
        </div>
      </div>
      <Catalog :catalog="info.catalog" v-if="info.catalog.length" />
      <Other v-else :info="info.hot" height="120" :Link="Link" />
    </main>
    <toTOP />
  </article>
</template>

<script>
import Nav from "../Home/Nav";
import Release from "./Release";
import Comment from "./Comment";
import Share from "./Parts/Share";
import toTOP from "@/components/toTop"
import "@/assets/css/prism.css"
import "@/assets/css/Articles.less";
import Catalog from "../func/Catalog";
import Other from "./Parts/Other.vue";
export default {
  name: "Article",
  data() {
    return {
      info: {
        like: {
          count: "",
          name: {}
        },
        catalog: [],
        answer: "",
        article: "",
        follower: "",
        attention: {
          id: "",
          name: "",
          boolean: ""
        },
        author: {
          id: "",
          avatar: "",
          name: ""
        },
        comments: {
          comment: []
        }
      },
      fun: "",
      show: false,
      full: false,
      hide: false,
      id: "",
      subscript: "",
      rows: false,
      fetch: true,
      fun: ""
    };
  },
  components: { Nav, Release, Comment, Share, toTOP, Catalog, Other },
  async mounted() {
    const { id, name } = this.$route.params;
    const { data } = await this.Fetch.Home.Article({
      name,
      id,
    });
    const { comments } = data
    this.Def.Home.Message({
      res: data,
      fun: () => {
        this.info = data;
        this.info.comments.comment = this.Def.Article.topComment(comments.comment);
        document.title = `${this.info.title} · boz`;
      },
      def: () => {
        location.href = "/"
      }
    })
    this.Def.PrismAll()
      .LastpDom({ select: ".article > .code-toolbar", boolean: false, bool: false })
      .Enlarge(".article")
    this.Def.scrollSpy({
      main: ".article",
      active: "active",
      bool: false,
      boolean: false,
      nav: ".catalog-box span, .catalog-box li",
    })
    window.addEventListener("scroll", () => {
      const scoll = document.documentElement.scrollTop;
      if (scoll > 163) {
        this.hide = true;
        this.show = true;
      } else {
        this.hide = false;
        this.show = false;
      }
    })
  },
  filters: {
    unit(val) {
      if (val === undefined) return;
      const numberArray = (val) => {
        const nun = String(val).split('')
        /*
          长度大过 4 往前推移 1 位 保留一位小数
          即 1000 -> 1K to 10000 -> 10K to 10001 -> 1.1w
        */
        const tuiyi = ({ val, num = 2, unit = "k" }) => {
          const str = str => str.toString().replaceAll(',', "")
          const to = val.slice(0, val.length - num)
          const len = to.length - 1
          const first = str(to.slice(0, len))
          const last = str(to.slice(len, to.length))
          return `${first}.${last}${unit}`
        }
        if (nun.length == 4) {
          return tuiyi({ val: nun })
        } else if (nun.length >= 5) {
          return tuiyi({ val: nun, num: 3, unit: "w" })
        } else {
          return val
        }
      }
      return numberArray(val)
    }
  },
  methods: {
    render(render) {
      this.fun = render
    },
    async Release(content, id, ait) {
      return this.Def.Home.Comment({
        content,
        id: this.info.id,
        ait,
        fun: () => {
          this.switchComment(this.info.comments.time, false)
        }
      })
    },
    async LikeArticle(id) {
      this.Def.Home.Like({
        id,
        type: "article_id",
        like: this.info.like,
      })
    },
    async switchComment(type, bool = true) {
      if (bool) {
        this.rows = true
        this.info.comments.comment = [];
      }
      const { data: { comment, time, count } } = await this.Fetch.Home.Comment({
        article: this.info.id,
        type
      });
      const func = () => {
        this.rows = false;
        this.info.comments.time = time;
        this.info.comments.count = count
        this.info.comments.comment = this.Def.Article.topComment(comment);
      }
      bool ? setTimeout(func, 1000) : setTimeout(func, 500)
    },
    Compile() {
      window.location = `/release/update?id=${this.info.id}`;
    },
    Direct() {
      this.Def.Decorator(
        this.Def.Home.Direct,
        {
          obj: this.info.author
        }
      )
    },
    preform(index) {
      this.subscript = index;
    },
    Attention({ follower_id }) {
      const Attention = async (method) => {
        this.Def.Attention({
          method,
          data: {
            follower_id,
          },
          fun: () => {
            this.fun()
            this.info.attention.boolean = !boolean
          }
        })
      }
      const boolean = this.info.attention.boolean
      boolean ? Attention("delete") : Attention("post")
    },
    Link(item) {
      location.href = `/article/${item.author.alias}/${item.id}`
    },
    Follower() {
      location.href = `/space/${this.info.author.alias}/fan`
    }
  },
};
</script>

<style lang="less" scoped>
span.time {
  color: var(--main-color) !important;
}

.flex {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#articles {
  padding-bottom: 10px;

  .active {
    color: var(--main-color) !important;

    /deep/svg {
      fill: var(--main-color) !important;
    }
  }

  .head {
    width: 100%;
    height: 160px;
    background: var(--tint-color);
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
    padding: 15px 0;

    .box {
      max-width: 1100px;
      height: 100%;
      margin: 0 auto;
      justify-content: center;
      display: flex;

      .left {
        width: 655px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .tag-box {
          display: flex;
          gap: 10px;
          font-size: 14px;

          a {
            text-decoration: none;
            color: inherit;
          }

          // span {
          //   background: #e6f0fd;
          //   margin: 3px 5px 3px 0;
          //   padding: 5px 7px;
          //   border-radius: 30px;
          //   display: flex;

          //   a {
          //     height: 100%;
          //     text-decoration: none;
          //     color: #409eff;
          //     font-size: 14px;
          //   }
          // }
        }

        .click {
          display: flex;
          height: 32px;

          .button {
            display: flex;
            justify-content: center;

            button {
              display: flex;
              justify-content: center;
            }

            .first {
              background: #409eff;
              color: #fff;
              fill: #fff;
              margin-left: 0;
              border: none;

              &::before {
                content: "关注作者";
              }

              &:hover {
                background: #2885e5;
              }
            }

            .first-active {
              color: #fff;
              fill: #fff;
              margin-left: 0;
              border: none;
              background: #8590a6;
              color: #fff;
              transition: all .2s;

              &::before {
                content: "已关注";
              }

              &:hover {
                &::before {
                  content: "取消关注";
                }
              }

            }

            .last {
              border-color: #409eff;
              color: #409eff;
              fill: #409eff;
            }
          }

          .span {
            display: flex;

            span {
              display: flex;
              height: 100%;
              color: #8590a6;
              font-size: 14px;
              cursor: pointer;
              margin-right: 8px;
              justify-content: center;
              align-items: center;

              i {
                .flex();
              }

              /deep/svg {
                width: 17px;
                height: 17px;
                fill: #8590a6;
                margin-right: 4px;
              }

              &:hover {
                color: #76839b;

                /deep/svg {
                  fill: #76839b;
                }
              }
            }
          }

          button {
            width: 90px;
            margin-right: 8px;
            display: flex;
            padding: 0 16px;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            background: none;
            border: 1px solid;
            border-radius: 3px;

            i {
              .flex();
              margin-right: 5px;
            }

            &:last-child {
              color: #8590a6;
              border-color: #8590a6;
              margin-right: 16px;

              /deep/svg {
                fill: #8590a6;
              }
            }
          }
        }

        .title {
          h1 {
            font-size: 25px;
            font-weight: 600;
          }
        }
      }

      .right {
        width: 445px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
          display: flex;
          flex-direction: row-reverse;

          div {
            width: 100px;
            display: flex;
            flex-direction: column;
            text-align: center;

            span {
              // color: #8590a6;
              font-size: 14px;
            }

            strong {
              font-size: 22px;
              margin-top: 7px;
            }
          }
        }

        .time-box {
          display: flex;
          justify-content: right;
          display: flex;
          gap: 20px;

          span {
            margin: 0 5px;
          }
        }

        .Reading {
          position: relative;

          &::after {
            content: " ";
            background: var(--article-solid);
            width: 1px;
            height: 100%;
            position: absolute;
            top: 0;
          }
        }

        .Attention {
          cursor: pointer;
        }
      }
    }
  }

  .article-box {
    max-width: 1100px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 70px;
    gap: 20px;

    .article-main-box {
      display: flex;
      flex-direction: column;
      width: 77%;

      .article {
        height: auto;
      }

      .comments-box {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        border-top: 1px solid var(--tint-solid);
        padding-top: 20px;

        .comments {
          margin-top: 20px;
          display: flex;
          flex-direction: column;

          .tip-box {
            display: flex;
            justify-content: space-between;
            border-left: 7px solid #409eff;

            .title {
              margin-left: 10px;
              display: flex;

              span.active {
                border: 1px solid #409eff !important;
                color: #409eff !important;
              }

              span {
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: center;

                &:first-child {
                  margin-right: 10px;
                  font-size: 18px;
                }

                &:nth-child(2) {
                  font-size: 14px;
                  font-weight: normal;
                }

                &:last-child {
                  font-size: 12px;
                  font-weight: normal;
                  color: var(--color);
                  margin-left: 12px;
                  padding: 2px 8px;
                  border: 1px solid #eee;
                  border-radius: 16px;
                  cursor: pointer;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
              }
            }

            .filter {
              span {
                font-size: 14px;
                font-weight: normal;
                color: var(--color);
                margin-left: 12px;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
            }
          }

          .box {
            display: flex;
            flex-direction: column;
            margin-top: 35px;
          }
        }
      }
    }
  }

  .title-box {
    max-width: 1100px;
    margin: 0 auto;
    height: 100%;
    justify-content: space-between;
    transition: all .1s;
    position: relative;
    top: 15px;
    display: flex;

    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: 25px;
      }
    }

    .avatar {
      display: flex;
      align-items: center;

      a {
        display: flex;
        text-decoration: none;
        align-items: center;
        color: var(--color);

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        span {
          margin: 0 10px;
        }
      }

      button {
        padding: 4px 12px;
        border-radius: 30px;
        border: 1px solid #409eff;
        background: none;
        color: #409eff;
        cursor: pointer;
        display: block;
        width: 70px;

        &.but {
          &::before {
            content: "关注";
          }
        }

        &.but-active {
          &::before {
            content: "已关注";
          }

          &:hover {
            &::before {
              content: "取关";
            }
          }
        }
      }
    }
  }

  .bottom {
    top: -40px;
  }

  /deep/p.nullcss {
    line-height: 0 !important;
    margin: 0;
  }

}
</style>
