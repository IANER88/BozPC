<template>
  <div class="info-box">
    <div class="avatar">
      <img :src="item.author.avatar" alt="" />
    </div>
    <div class="perform">
      <div class="comment-right">
        <div class="author-box">
          <div class="author">
            <a :href="`/space/${item.author.alias}`">{{ item.author.name }}</a>
            <span v-if="info.author.id === item.author.id">作者</span>
            <span v-if="item.author.top === 0">置顶</span>
          </div>
          <time>{{ item.time }}</time>
        </div>
        <div class="content">
          <a :href="`/space/${item.replier.alias}`" v-if="item.replier">@{{ item.replier.name }}</a>
          {{ item.content }}
        </div>
        <div class="like-box">
          <div class="left">
            <span :class="{
              like: true,
              active: $store.state.info.id && item.like && item.like.author === $store.state.info.id,
            }" @click="LikeComment(item.id)">
              <i v-html="Icon.Home.like" />
              {{ item.like.count !== 0 ? item.like.count : comment.like }}
            </span>
            <span class="comment" @click="NextComment(item.id)">
              <i v-html="Icon.Home.comment" />
              回复
            </span>
          </div>
          <el-dropdown class="right" trigger="click">
            <span class="el-dropdown-like">
              <i v-html="Icon.Home.more" />
            </span>
            <el-dropdown-menu>
              <el-dropdown-item>举报</el-dropdown-item>
              <el-dropdown-item v-if="top" @click.native="Comment({ id: item.id, method: 'put', top: 0 })">置顶
              </el-dropdown-item>
              <el-dropdown-item v-if="del" @click.native="DelComment({ id: item.id, author: item.author.id })">删除
              </el-dropdown-item>
              <el-dropdown-item v-if="cacelTop" @click.native="Comment({ id: item.id, top: 1, method: 'put' })">取消置顶
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-collapse-transition>
        <Release :perform="Release" :ait="`@${item.author.name} `" not="true" :id="item.id"
          v-if="item.id === subscript" />
      </el-collapse-transition>
      <Comment v-for="(item, index) of item.box" :key="index" :item="item" :info="info" :subscript="subscript"
        :time="time" @preform="preform" :switchComment="switchComment" />
    </div>
  </div>
</template>

<script>
import Release from "./Release";
export default {
  name: "Comment",
  data() {
    return {
      full: false,
      comment: {
        like: "点赞",
      },
      recursive: {
        id: "",
      },
    };
  },
  props: ["item", "info", "subscript", "preform", "time", "switchComment"],
  components: { Release, Comment },
  computed: {
    top() {
      const { one, top } = this.item.author
      const { id } = this.info.author
      if (id === this.$store.state.info.id && one && top !== 0) {
        return true
      } else {
        return false
      }
    },
    del() {
      const { id } = this.$store.state.info
      if (this.item.author.id === id || this.info.author.id == id) {
        return true
      } else {
        return false
      }
    },
    cacelTop() {
      const top = this.item.author.top
      const id = this.info.author.id
      if (top === 0 && id === this.$store.state.info.id) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    NextComment(index) {
      this.$emit("preform", index);
      this.recursive.id = index;
    },
    async Release(content, id) {
      this.Def.Home.Comment({
        content,
        id: this.info.id,
        pre_comment_id: id,
        fun: () => {
          this.switchComment(this.info.comments.time, false)
        }
      })
    },
    DelComment({ id, author }) {
      this.$confirm("确认删除该条评论吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.Comment({ id, author });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async Comment({ id, method = "delete", top, author }) {
      const res = await this.Fetch.Home.Comment({
        method,
        data: {
          id,
          top,
          author,
        },
      });
      this.Def.Home.Message({
        res: res.data,
        fun: () => {
          this.switchComment(this.time, false)
        }
      })
    },
    LikeComment(id) {
      this.Def.Home.Like({
        id,
        type: "comment_id",
        like: this.item.like,
      })
    },
    Preform(index) {
      this.recursive.id = index;
    },
  },
};
</script>

<style lang="less" scoped>
.info-box {
  width: 100%;
  display: flex;
  min-height: 130px;
  margin-bottom: 20px;

  .avatar {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    a {
      color: inherit;
    }
  }

  .perform {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .comment-right {
      width: 100%;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;

      +.info-box {
        border-bottom: 1px solid #eeeeee;

        .comment-right {
          border: none;
          margin-bottom: 0;
        }
      }
    }
  }

  .author-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40px;

    .author {
      >span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
        padding: 0 2px;
        font-size: 12px;
        font-weight: normal;
        color: #409eff;
        border: 1px solid #409eff;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }

    a {
      text-decoration: none;
      color: initial;
    }

    time {
      font-size: 12px;
      color: #969696;
    }
  }

  .content {
    padding: 15px 0;

    a {
      text-decoration: none;
      color: var(--main-color);
    }
  }

  .like-box {
    display: flex;
    justify-content: space-between;

    /deep/svg {
      fill: #b0b0b0;
      width: 17px;
      height: 17px;
      margin-right: 5px;
    }

    .left {
      display: flex;

      span {
        line-height: 25.6px;
        font-size: 15px;
        display: flex;
        cursor: pointer;
        color: #b0b0b0;
      }
    }

    i {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .right {
      /deep/svg {
        width: 20px;
        height: 20px;
        margin-right: 0;
        cursor: pointer;
      }
    }

    .like {
      margin-right: 20px;

      &:hover {
        color: #409eff;

        /deep/svg {
          fill: #409eff;
        }
      }
    }

    .like.active {
      color: #409eff !important;

      /deep/svg {
        fill: #409eff !important;
      }
    }
  }
}
</style>
