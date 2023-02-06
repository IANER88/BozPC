<template>
  <div class="whole-full-box">
    <div class="content-box">
      <nav>
        <div class="box">
          <div class="navbar-box">
            <div class="navbar-box-left">
              <div class="dynamic-box">
                <div class="dynamic">
                  <i v-html="Icon.Home.dynamic" />
                </div>
                <span>动态</span>
              </div>
              <div class="hot-box">
                <div class="hot">
                  <i v-html="Icon.Home.hot" />
                </div>
                <span>热门</span>
              </div>
              <div class="topic-box" @click="Knowledge()">
                <div class="topic" v-html="Icon.Home.topic" />
                <span>知识库</span>
              </div>
            </div>
            <div class="navbar-box-center">
              <Sub v-for="(item, index) of nav" :key="index" :item="item" />
              <div class="item">
                <div class="name">
                  <span>{{ list.name }}</span> <i v-html="Icon.Home.arrow" />
                </div>
                <div class="list">
                  <main class="box">
                    <div class="sub" v-for="(hover, home) of lists" :key="home">
                      <a :href="`/nav/${item.englishName}`" v-for="(item, index) of hover" :key="index" class="item">
                        {{ item.name }}
                      </a>
                    </div>
                  </main>
                </div>
              </div>
            </div>
            <div class="navbar-box-right">
              <a class="item" v-for="(item, index) of channel" :key="index">
                <i v-html="item.icon"></i>
                <span>{{ item.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="content-main-box">
        <Carousel :carousel="char" />
        <Headlines :web="all.web" :entry="all.information" />
      </div>
    </div>
    <div class="whole-box-full">
      <div class="whole-box">
        <div class="content-box">
          <div class="left-box">
            <div class="blog-box">
              <div class="blog-type">
                <ul>
                  <li><a href="">推荐</a></li>
                  <li><a href="">资讯</a></li>
                  <li><a href="">热榜</a></li>
                  <li><a href="">掌柜推荐</a></li>
                </ul>
                <a href="">更多</a>
              </div>
              <Article v-for="(item, index) in article" :key="index" :item="item" :render="render" />
            </div>
          </div>
          <Other />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "./Like";
import Sub from "./Parts/Sub";
import Carousel from "./Parts/Carousel";
import Headlines from "./Parts/Headlines";
import Article from "./Parts/Article"
import Other from "./Parts/Other.vue";
export default {
  data() {
    return {
      char: [],
      article: [],
      nav: [],
      list: {},
      lists: [],
      show: false,
      channel: [
        {
          name: "文章",
          api: "/artile",
          icon: this.Icon.Home.article,
        },
        {
          name: "活动",
          api: "/activity",
          icon: this.Icon.Home.activity,
        },
        {
          name: "社区",
          api: "/community",
          icon: this.Icon.Home.community,
        },
        {
          name: "文章",
          api: "/artile",
          icon: this.Icon.Home.article,
        },
        {
          name: "活动",
          api: "/activity",
          icon: this.Icon.Home.activity,
        },
        {
          name: "社区",
          api: "/community",
          icon: this.Icon.Home.community,
        },
      ],
      entry: [],
      index: 1,
      boolean: true,
      all: [],
    };
  },
  async mounted() {
    const [
      home, article
    ] = await Promise.all([
      this.Fetch.Home.Home(),
      this.Article({})
    ])
    const { slideshow, tag, list } = home.data
    this.char = slideshow;
    this.nav = tag;
    this.list = list;
    this.lists = this.Def.Home.Reduce(list.list);
    this.all = home.data;
    this.article = article
    this.boolean = this.Def.ScrollBottom({
      boolean: this.boolean,
      render: async () => {
        this.index++
        const info = await this.Article({ id: this.index })
        if (info) this.article.push(...info)
      }
    })
  },
  props: ["render"],
  components: { Like, Carousel, Sub, Headlines, Article, Other },
  methods: {
    async Article({ name = "browse", id = 1 }) {
      const { data } = await this.Fetch.Home.Article({
        method: "put",
        name,
        id
      })
      if (data.code === 0) return data.article
    },
    Knowledge() {
      location.href = "/knowledge"
    }
  }
};
</script>
<style lang="less">
.el-carousel__container {
  width: 100%;
  height: 100%;
}

.el-carousel--horizontal {
  border-radius: 8px;
  height: 100%;
}

.whole-full-box {
  width: 100%;
  background: var(--tint-color);

  .whole-box-full {
    padding-top: 10px;

    .whole-box {
      margin-top: 0;
      padding-bottom: 0;
    }

    .left-box {
      width: 77% !important;
    }
  }

  .content-box {
    height: 530px;

    nav {
      height: 150px;
      display: flex;
      border-radius: 5px;
      flex-direction: column;
      padding: 20px 20px;

      >.box {
        width: 1380px;
        margin: 0 auto;

        .navbar-box {
          height: 110px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >div {
            height: 100%;
          }

          .navbar-box-left {
            width: 180px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            div {
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              cursor: pointer;

              >div {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 46px;
                height: 46px;

                i {
                  width: 30px;
                  height: 30px;

                  svg {
                    width: 100%;
                    height: 100%;
                  }
                }
              }

              span {
                margin-top: 5px;
                font-weight: bold;
                text-align: center;
              }
            }

            .dynamic-box {
              >div {
                background: linear-gradient(to top right, #ffd03e, #f6c344);
              }
            }

            .hot-box {
              >div {
                background: linear-gradient(to top right, #ff8b7e, #ff766e);
              }
            }

            .topic-box {
              >div {
                background: linear-gradient(to top right, #cb92ff, #ba77f7);
              }
            }
          }

          .navbar-box-center {
            height: 72px;
            width: calc(99% - 260px);
            padding: 0 20px;
            display: grid;
            grid-auto-flow: column;
            grid-column: span 4;
            grid-gap: 10px;
            grid-template-rows: repeat(2, 1fr);
            border-right: 1px solid var(--tint-two-background);

            .item,
            div.item {
              width: auto;
              position: relative;
              height: 30px;
              line-height: 30px;
              display: block;
              background: var(--item-background);
              text-align: center;
              transition: background-color 0.3s, color 0.3s;
              box-sizing: content-box;
              border: 1px solid var(--item-solid);
              border-radius: 5px;
              color: var(--color);
              font-size: 14px;
              text-decoration: none;
              cursor: pointer;

              &:hover {
                background: var(--item-hover);

                >div.list {
                  display: flex;
                }
              }

              @keyframes display {
                from {
                  transform: translateY(-2%);
                }
              }

              >div.list {
                height: auto;
                display: none;
                position: absolute;
                transition: transform .3s ease-out;
                left: -210%;
                // right: -220px;
                top: 25px;
                padding-top: 10px;
                z-index: 1000;
                animation: display .3s;

                .box {
                  width: auto;
                  height: auto;
                  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
                  background: var(--tint-color);
                  border: 1px solid var(--tint-solid);
                  padding: 8px 16px;
                  border-radius: 8px;
                  display: grid;
                  grid-auto-flow: column;
                  grid-template-columns: repeat(3, 1fr);
                  grid-column: span 4;
                  grid-gap: 10px;
                }

                .sub {
                  min-width: 77px;
                  display: flex;
                  flex-direction: column;
                }

                a {
                  text-decoration: none;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  word-break: break-all;
                  padding: 0 5px;

                  &:not(:first-child) {
                    margin-top: 10px;
                  }
                }

                &:hover {
                  display: flex;
                }
              }
            }

            div.item {
              text-align: center;

              .name {
                i {
                  svg {
                    transition: transform 0.3s;
                    transform: rotate(0);
                  }
                }
              }

              &:hover {
                svg {
                  transform: rotate(180deg) !important;
                }
              }
            }
          }

          .navbar-box-right {
            width: 180px;
            height: 72px;
            grid-column: span 1;
            grid-row-gap: 10px;
            grid-auto-flow: column;
            align-items: center;
            padding-left: 10px;
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            flex-shrink: 0;

            .item {
              display: flex;
              font-size: 14px;
              text-decoration: none;
              justify-content: center;
              align-items: center;
              cursor: pointer;

              i {
                margin-right: 3px;
                display: flex;

                svg {
                  width: 20px;
                  height: 20px;
                  fill: var(--item-svg);
                  transition: fill 0.3s;
                }
              }

              &:hover {
                color: var(--main-color);

                svg {
                  fill: var(--main-color);
                }
              }
            }
          }
        }
      }
    }

    .content-main-box {
      width: 1380px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }

  .whole-box {
    width: 1380px;
    margin: 0 auto;
    padding-bottom: 40px;

    .content-box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;

      .left-box {
        width: 500px;

        .blog-box {
          width: 100%;
          height: auto;

          .blog-type {
            height: 50px;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid var(--tint-solid);
            align-items: center;

            a {
              text-decoration: none;
              color: var(---headlines-color);
            }

            ul {
              list-style: none;
              display: flex;
            }
          }
        }
      }
    }
  }
}

.on {
  width: 20px !important;
}
</style>
