<template>
  <main id="space-box">
    <Nav />
    <main class="space-main-box">
      <div class="space-background-box" />
      <div class="space-content-box">
        <div class="space-center-box">
          <div class="space-content-top-box">
            <img :src="info.avatar" :alt="info.name">
            <div class="space-content-top-main-box">
              <span>{{ info.name }}</span>
              <p>{{ info.introduce }}</p>
              <div class="top-tag-box">
                <el-tag v-for="item of filed" :key="item.id">{{ item.name }}</el-tag>
              </div>
            </div>
          </div>
          <div class="space-content-center-box">
            <nav>
              <div class="link-box" v-for="item of nav" :key="item.id">
                <router-link class="center-nav-item-box" :to="`/space/${$route.params.name}/${item.url}`"
                  active-class="active" v-if="item.boolean">
                  {{ item.name }}
                </router-link>
              </div>
            </nav>
            <router-view />
          </div>
        </div>
        <div class="space-other-box">
          <el-card shadow="hover">
            <div class="space-follow-box">
              <div v-for="(item, index) of box" :key="index" :class="item.title" @click="Fan(item.name)">
                <span>{{ item.name }}</span>
                <span>{{ item.count }}</span>
              </div>
            </div>
          </el-card>
          <el-button type="primary" @click="Editor()"
            v-if="$store.state.info.alias === $route.params.name">编辑资料</el-button>
          <div class="primary" v-else>
            <el-button :type="fan ? 'info' : 'primary'" @click="Follower(info.id)" :class="{ fan }" class="follower" />
            <el-button @click="Direct()">私信</el-button>
          </div>
        </div>
      </div>
    </main>
    <Account v-if="show" @hide="hide" :item="info" :teuple="filed" :Get="Get" />
  </main>
</template>
<script>
import Nav from '../Home/Nav';
import Logo from '../Logo';
import Fun from '../func/Fun';
import Account from '../func/Account';
export default {
  name: 'Space',
  data() {
    return {
      nav: [
        {
          id: 1,
          name: "文章",
          url: "article",
          boolean: true
        },
        {
          id: 2,
          name: "知识库",
          url: "knowledge",
          boolean: true
        },
        {
          id: 3,
          name: "收藏",
          url: "collect",
          boolean: true
        },
        {
          id: 4,
          name: "关注",
          url: "follower",
          boolean: true
        },
        {
          id: 5,
          name: "粉丝",
          url: "fan",
          boolean: true
        },
        {
          id: 6,
          name: "动态",
          url: "dynamic",
          boolean: this.$store.state.info.alias === this.$route.params.name
        },
        {
          id: 7,
          name: "历史",
          url: "history",
          boolean: this.$store.state.info.alias === this.$route.params.name
        },
      ],
      box: [
        {
          title: "follow",
          name: "关注数",
        },
        {
          title: "fan",
          name: "粉丝数",
        }, {
          title: "like",
          name: "获赞数",
        }, {
          title: "browse",
          name: "阅读数",
        },
      ],
      show: false,
      info: {},
      filed: {},
      email: false,
      fan: false
    }
  },
  async mounted() {
    this.Get()
  },

  components: {
    Nav,
    Logo,
    Fun,
    Account,
  },
  methods: {
    async Get() {
      const res = await this.Fetch.Space.Space({ alias: this.$route.params.name })
      for (const i of this.box) {
        for (const h in res.data.follow) {
          if (i.title === h) {
            i.count = res.data.follow[h]
          }
        }
      }
      this.info = res.data.info
      this.filed = res.data.filed
      this.fan = res.data.fan
      this.$forceUpdate()
    },
    Editor() {
      this.show = !this.show
      this.Def.scroll()
    },
    Follower(follower_id) {
      this.Def.Attention({
        method: this.fan ? "delete" : "post",
        data: {
          follower_id,
        },
        fun: this.Get
      })
    },
    Fan(name) {
      switch (name) {
        case "关注数":
          this.$router.push(`/space/${this.$route.params.name}/follower`)
          break
        case "粉丝数":
          this.$router.push(`/space/${this.$route.params.name}/fan`)
          break
      }
    },
    hide(boolean) {
      this.show = boolean
    },
  }
}
</script>
<style scoped lang="less">
#space-box{
  .base{
    position: fixed !important;
    left: 0;
    right: 0;
  }
}
main.space-main-box {
  width: 100%;
  position: relative;
  margin-top: 60px;
  .space-background-box {
    height: 120px;
    width: 100%;
    background: linear-gradient(to right, #c1e4de, #409eff);
  }

  .space-content-box {
    width: 1380px;
    margin: 0 auto;
    height: 70vh;
    background: var(--tint-color);
    position: absolute;
    top: 30px;
    padding: 20px;
    border-radius: 5px;
    left: 5%;
    right: 5%;
    display: flex;
    gap: 15px;

    .space-center-box {
      width: 80%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .space-content-top-box {
        display: flex;
        gap: 20px;

        >img {
          width: 124px;
          height: 124px;
          border-radius: 5px;
        }

        .space-content-top-main-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          >span {
            font-size: 24px;
            font-weight: 600;
          }

          .top-tag-box {
            display: flex;
            gap: 10px;
          }
        }
      }

      .space-content-center-box {
        display: flex;
        flex-direction: column;
        width: 100%;

        nav {
          width: 100%;
          height: 50px;
          display: flex;
          gap: 20px;
          border-top: 1px solid var(--tint-solid);
          border-bottom: 1px solid var(--tint-solid);
          align-items: center;

          .center-nav-item-box {
            cursor: pointer;
            text-decoration: none;
            color: var(--color);

            &.active {
              color: var(--main-color);
            }
          }
        }
      }
    }

    .space-other-box {
      width: 20%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      button.follower {
        &::after {
          content: "关注";
        }
      }

      button.fan {
        &::after {
          content: "已关注" !important;
        }

        &:hover {
          &::after {
            content: "取消关注";
          }
        }
      }

      /deep/.el-card {
        background-color: var(--tint-color);
        color: unset;
        border: 1px solid var(--tint-solid);
      }

      .space-follow-box {
        display: flex;
        justify-content: space-between;

        >div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          justify-content: center;
          align-items: center;

          span:last-child {
            font-size: 12px;
          }

          &.follow,
          &.fan {
            cursor: pointer;

            &:hover {
              color: var(--main-color);
            }
          }
        }
      }

      .primary {
        display: flex;
        justify-content: space-between;

        >button {
          width: 50%;
        }
      }
    }
  }
}
</style>