<template>
  <div class="whole-full-box">
    <div class="content-box">
      <NavTag :list="list" :nav="nav" :lists="lists" />
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
import Carousel from "./Parts/Carousel";
import Headlines from "./Parts/Headlines";
import Article from "./Parts/Article"
import Other from "./Parts/Other.vue";
import NavTag from "./Parts/NavTag.vue";
export default {
  data() {
    return {
      char: [],
      article: [],
      nav: [],
      list: {},
      lists: [],
      show: false,
      entry: [],
      index: 1,
      boolean: true,
      all: [],
    };
  },
  async mounted() {
    const [
      home, article, nav
    ] = await Promise.all([
      this.Fetch.Home.Home(),
      this.Article({}),
      this.Fetch.Release.Tag({ method: "patch" }),
    ])
    const { slideshow } = home.data
    this.char = slideshow;
    this.all = home.data;
    this.article = article
    this.nav = nav.data.nav
    this.list = nav.data.list;
    this.lists = this.Def.Home.Reduce(nav.data.list.list);
    // 滚动底部刷新文章数据
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
  components: { Like, Carousel, Headlines, Article, Other, NavTag },
  methods: {
    async Article({ name = "browse", id = 1 }) {
      const { data } = await this.Fetch.Home.Article({
        method: "put",
        name,
        id
      })
      if (data.code === 0) return data.article
    },
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
