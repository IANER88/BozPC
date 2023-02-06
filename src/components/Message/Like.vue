<template>
  <main id="like-box">
    <div class="title-box">收到的赞</div>
    <div class="main-box" v-if="info.array.length !== 0">
      <div class="line-box" v-for="(hove, home) of info.array" :key="home">
        <div class="avatar-box">
          <a :href="`/space/${item.alias}`" v-for="(item, index) of hove.list" :key="index">
            <img :src="item.avatar" alt="">
          </a>
        </div>
        <div class="content-box">
          <div class="head-box">
            <div class="name-box">
              <a :href="`/space/${item.alias}`" v-for="(item, index) of hove.list" :key="index">
                {{ item.name }}
              </a>
            </div>
            <p v-if="hove.count > 1">等总计 {{ hove.count }} 人{{ hove.message }}</p>
            <p v-else>{{ hove.message }}</p>
          </div>
          <div class="bottom-box">
            <time>{{ hove.time }}</time>
            <div></div>
          </div>
        </div>
        <div class="comment-box" @click="Link({
          id: hove.article.id,
          name: hove.article.author.alias,
          title: hove.article.title,
        })">
          {{ hove.title }}
        </div>
      </div>
    </div>
    <div class="main-box" v-else>
      <el-empty description="暂无消息" />
    </div>
  </main>
</template>
<script>
export default {
  name: 'Like',
  data() {
    return {
      info: {
        array: {

        }
      }
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Home.Notify({ method: "put", type: 4 })
    this.info = data
  },
  methods: {
    Link({ name, id}) {
      location.href = `/article/${name}/${id}`
    }
  }
}
</script>
<style scoped lang="less">
#like-box {
  .main-box {
    display: flex;

    .line-box {
      height: 65px;

      .avatar-box {
        width: 65px;
        position: relative;

        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }

        a {
          position: absolute;
          height: 100%;

          &:nth-child(1) {
            display: flex;
            align-items: center;
          }

          &:nth-child(2) {
            right: 0;
            top: 15px;
          }

          &:has(+a) {
            display: block !important;
          }
        }
      }

      .content-box {
        display: flex;
        flex-direction: column;
        grid-gap: 10px;
        justify-content: space-between;

        .head-box {
          display: flex;
          grid-gap: 5px;

          .name-box {
            display: flex;
            grid-gap: 5px;
          }

          a {
            text-decoration: none;
            font-weight: bold;
            color: var(--color);

            &:nth-child(2) {
              display: flex;
              grid-gap: 5px;

              &::before {
                content: "、";
                width: 5px;
                font-weight: bold;
                font-style: normal;
              }
            }

            &:hover {
              color: var(--main-color);
            }
          }

          p {
            cursor: pointer;
            line-height: normal !important;

            &:hover {
              color: var(--main-color);
            }
          }
        }

        .bottom-box {
          color: var(--headlines-color);

          time {
            font-size: 10px;
          }
        }
      }

      .comment-box {
        width: 376px;
        margin-left: auto;
        height: 36px;
        text-indent: 12px;
        font-size: 14px;
        line-height: 18px;
        display: -webkit-box;
        text-align: right;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        word-break: break-word !important;
        line-break: anywhere;
        -webkit-line-clamp: 2;
        color: var(--headlines-color);

        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>