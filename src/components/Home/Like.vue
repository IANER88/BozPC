<template>
  <div class="blog-cont-up">
    <!-- 点赞 -->
    <div class="up-left-box">
      <div class="like">
        <div :class="{
          give: true,
          active: $store.state.info.id && item.like.author
        }" @click="LikeArticle(item.id)">
          <i v-html="item.like.author ? Icon.Like.like2 : Icon.Like.like" />
          <span>{{ item.like.count !== 0 ? item.like.count : "点赞" }}</span>
        </div>
        <div :class="{ collect: true, 'active-collect': $store.state.info.id && item.collect && item.collect.author }"
          @click="collect(item.id)">
          <i v-html="item.collect.author ? Icon.Like.collect2 : Icon.Like.collect" />
          <span>{{ item.collect && item.collect.count !== 0 ? item.collect.count : "收藏" }}</span>
        </div>
        <Share :title="item.title" :info="item">
          <div class="share">
            <i v-html="Icon.Like.share" />
            <span>分享</span>
          </div>
        </Share>
      </div>
      <div class="author" @click="LinkAuthor(item.author.alias)">{{ item.author.name }}</div>
      <el-dropdown class="right" trigger="click">
        <span class="el-dropdown-like">
          <i class="el-icon-more" />
        </span>
        <el-dropdown-menu>
          <el-dropdown-item v-if="isMe">内容质量差</el-dropdown-item>
          <el-dropdown-item v-if="isMe">不敢兴趣</el-dropdown-item>
          <el-dropdown-item v-if="isMe">不喜欢该作者</el-dropdown-item>
          <el-dropdown-item v-if="isMe">内容重复</el-dropdown-item>
          <el-dropdown-item v-if="!isMe" @click.native="Del()">删除文章</el-dropdown-item>
          <el-dropdown-item v-if="!isMe" @click.native="Editor()">编辑文章</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 日期 -->
    <div class="up-right-box">
      <el-tag class="tag" v-for="ianer in item.tag" :key="ianer.id" @click="Link({
        name: ianer.name,
        title: ianer.title,
      })">
        {{ ianer.text }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import Share from "./Parts/Share.vue";
export default {
  name: "Like",
  data() {
    return {};
  },
  computed: {
    isMe() {
      return this.item.author.id !== this.$store.state.info.id
    }
  },
  props: {
    item: {
      default: [
        {
          author: {

          },
          like: {
            author: {

            }
          }
        }
      ]
    },
    render: {

    },
    mount: {

    },
  },
  methods: {
    async LikeArticle(id) {
      this.Def.Home.Like({
        id,
        type: "article_id",
        like: this.item.like,
      })
    },
    Link({ name, title }) {
      window.location = `/nav/${title}/${name}`
    },
    LinkAuthor(alias) {
      window.location = `/space/${alias}`
    },
    async collect(id) {
      this.Def.Collect({
        id,
        collect: this.item.collect,
        fun: (collect) => {
          this.render && this.render()
          this.item.collect = collect
        }
      })
    },
    Del() {
      this.$confirm("确定删除吗? 删除后再也无法找回!", "提示", {
        type: "warning",
      }).then(async _ => {
        const res = await this.Fetch.Release.Article({
          method: "delete",
          data: {
            article: {
              id: this.item.id,
            },
          }
        })
        this.Def.Home.Message({
          res: res.data,
          fun: () => {
            this.mount()
          }
        })
      }).catch(_ => {
        this.$message({
          message: "已取消删除!"
        })
      })
    },
    Editor() {
      location.href = `/release/update?id=${this.item.id}`
    }
  },
  components: { Share },
};
</script>
<style lang="less">
.blog-news-box-img {
  .up-left-box {
    min-width: 30% !important;
  }

  .el-dropdown {
    height: 100%;

    .el-dropdown-like {
      display: flex;
      height: 100%;

      i {
        height: 100%;
        display: flex;
        align-items: flex-end;
        cursor: pointer;
      }
    }
  }

  .blog-cont-up {
    height: 38%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .right {
      align-self: center;

    }
  }



}

.blog-news-box {
  .blog-cont-up {
    height: 38%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right {
    align-self: center;
  }
}

.blog-cont-up {

  .up-left-box {
    width: 260px;

    >div {
      cursor: pointer;
    }

    .active {
      color: #409eff;

      svg,
      g,
      path {
        fill: #409eff;
      }
    }

    .active-collect {
      color: #ecaa04;

      svg {
        fill: #ecaa04;
      }
    }

    .give {
      &:hover {
        color: #409eff;

        svg {
          fill: #409eff;
        }
      }
    }

    .collect {
      &:hover {
        color: #ecaa04;

        svg {
          fill: #ecaa04;
        }
      }
    }

    .author {
      display: flex;
      align-items: center;
      font-size: 16px !important;

      &:hover {
        color: #999aaa;
      }
    }
  }

  .share {
    display: flex;
    cursor: pointer;
  }

  .up-right-box {
    display: flex;
    gap: 10px;
  }
}
</style>
