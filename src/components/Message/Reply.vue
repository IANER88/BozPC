<template>
  <main id="reply">
    <div class="title-box">回复我的</div>
    <div class="main-box" v-if="info.length !== 0">
      <div class="line-box" v-for="item of info" :key="item.id" @click="Link({
        id: item.article.id,
        name: item.article.alias,
      })">
        <div class="avatar-box">
          <img :src="item.actor.avatar">
        </div>
        <div class="content-box">
          <div class="head-box">
            <a :href="`/space/${item.actor.alias}`">{{ item.actor.name }}</a>
            <span>回复了我的评论</span>
          </div>
          <div class="he-box">
            <span>回复</span>
            <a :href="`/space/${item.recipien.alias}`">@{{ item.recipien.name }}</a>
            <i>:</i>
            <p>{{ item.actor.content }}</p>
          </div>
          <div class="my-box">
            <p>{{ item.recipien.name }} : {{ item.recipien.content }}</p>
          </div>
          <div class="bottom-box">
            <time>{{ item.actor.time }}</time>
            <div>
              <span class="like" :class="{ active: item.actor.like.author }" @click.stop="Like({
                id: item.actor.id,
                like: item.actor.like
              })">
                <i v-html="Icon.Home.like" />
                {{ item.actor.like.count === 0 ? "点赞" : item.actor.like.count }}
              </span>
              <span class="comment" @click.stop="show(item.id)">
                <i v-html="Icon.Home.comment" />
                回复
              </span>
              <span class="delete">
                <i class="el-icon-delete" />
                删除该条通知
              </span>
            </div>
          </div>
          <el-collapse-transition>
            <div class="comment-box" v-show="hide === item.id">
              <textarea placeholder="禁止发表违禁言论" v-model="content" />
              <el-button type="primary" @click="Release(item.article.id, item.actor.id)">回复评论</el-button>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
    <div class="main-box" v-else>
      <el-empty description="暂无回复消息" />
    </div>
  </main>
</template>
<script>
export default {
  name: "Reply",
  data() {
    return {
      hide: "",
      info: [
        {
          id: "",
          actor: {
            name: "",
            alias: "",
            avatar: "",
            time: "",
            content: "",
            like: {
              author: "",
              count: ""
            }
          },
          recipien: {
            name: "",
          }
        }
      ],
      content: ""
    };
  },
  async mounted() {
    const { data } = await this.Fetch.Home.Notify({ method: "post", type: 3 })
    this.info = data.comment
  },
  methods: {
    show(val) {
      this.hide = val
    },
    Link({ id, name }) {
      location.href = `/article/${name}/${id}`
    },
    Like({ id, like }) {
      this.Def.Home.Like({
        id,
        type: "comment_id",
        like,
      })
    },
    Release(index, id) {
      this.Def.Home.Comment({
        content: this.content,
        id: index,
        pre_comment_id: id,
        fun: () => {
          this.hide = false
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
#reply {

  .align {
    display: flex;
    align-items: center;
  }

  .main-box {

    .line-box {

      .avatar-box {
        width: 50px;
        height: 100%;

        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
      }

      .like {
        &.active {
          color: var(--main-color);

          /deep/svg,
          /deep/path {
            fill: var(--main-color);
          }
        }
      }

      .content-box {
        width: 70%;
        display: flex;
        flex-direction: column;
        grid-gap: 5px;

        .head-box {
          display: flex;
          grid-gap: 10px;

          a {
            text-decoration: none;
            font-weight: bold;
            color: var(--color);
          }
        }

        .he-box {
          display: flex;
          grid-gap: 10px;
          font-size: 14px;

          p {
            line-height: normal !important;
          }

          a {
            text-decoration: none;
            color: var(--main-color);
          }

          i {
            font-style: normal;
          }
        }

        .my-box {
          font-size: 13px;
          color: var(--headlines-color);
          display: flex;
          grid-gap: 5px;
          align-items: center;

          &::before {
            content: "";
            width: 2px;
            height: 70%;
            display: block;
            background: var(--headlines-color);
          }
        }

        .bottom-box {
          time {
            font-size: 10px;
          }

          .align();
          height: 20px;
          color: var(--headlines-color);
          grid-gap: 10px;

          >div {
            display: flex;
            grid-gap: 10px;

            span {
              .align();
              grid-gap: 5px;
              font-size: 14px;
              cursor: pointer;

              i {
                .align();

                /deep/svg {
                  width: 16px;
                  height: 16px;
                  fill: var(--headlines-color);
                }
              }

              &:hover {
                color: var(--main-color);

                /deep/svg {
                  fill: var(--main-color);
                }
              }
            }

            .delete {
              display: none;
            }
          }
        }

        .comment-box {
          display: flex;
          grid-gap: 10px;

          textarea {
            padding: 12px 16px;
            width: 100%;
            height: 67px;
            font-size: 13px;
            border: 1px solid #eee;
            border-radius: 4px;
            background-color: #fafafa;
            resize: none;
            display: inline-block;
            vertical-align: top;
            outline-style: none;
            font-family: inherit
          }
        }
      }
    }
  }
}
</style>
