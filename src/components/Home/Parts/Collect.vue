<template>
  <li class="collect">
    <a href="/collect">收藏</a>
    <transition name="el-fade-in">
      <div class="v-popover" v-show="show">
        <main class="main-box">
          <nav>
            <div :class="{ item: true, active: index === item.id }" v-for="item of info" :key="item.id"
              @click="Ematy(item.id)">
              {{ item.name }}
            </div>
          </nav>
          <main>
            <a :class="{ 'header-fav': true, image: !item.image }" v-for="item of content" :key="item.id" @click="Link({
              id: item.id,
              title: item.title,
              author: item.author,
            })">
              <img :src="item.image" alt="" v-if="item.image" />
              <span class="tag-box" v-else>{{ item.type }}</span>
              <div class="title">
                <p>{{ item.title }}</p>
                <span>{{ item.author.name }}</span>
              </div>
            </a>
            <el-empty description="收藏夹为空" v-if="(content.length === 0)" />
          </main>
        </main>
      </div>
    </transition>
  </li>
</template>
<script>
export default {
  name: "Collect",
  data() {
    return {
      index: 0,
      show: false,
      info: [],
      content: [{
        title: "",
        image: "",
        author: {
          name: "",
          id: ""
        }
      }]
    };
  },
  async mounted() {
    if (this.$store.state.info.name) {
      const { data: { list } } = await this.Fetch.Home.Collect({ alias: this.$store.state.info.alias })
      this.info = list
      this.index = list[0].id
      this.Ematy(this.index)
      this.Def.Home.Hover({
        dom: "li.collect",
        enter: () => {
          this.show = true;
        },
        leave: () => {
          this.show = false;
        }
      })
    }
  },
  methods: {
    async Ematy(index) {
      this.index = index;
      const { data: { content } } = await this.Fetch.Home.Collect({
        id: index,
        alias: this.$store.state.info.alias,
        method: "patch"
      })
      this.content = content
    },
    Link({ author, id }) {
      window.location = `/article/${author.alias}/${id}`
    }
  },
};
</script>
<style scoped lang="less">
.v-popover {
  left: -200px;
  height: 520px;
  flex-direction: row !important;
  display: flex;

  main.main-box {
    display: flex;
    width: 465px;
    flex-direction: row !important;
  }

  nav {
    width: 150px;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid var(--tint-solid);

    &::-webkit-scrollbar {
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 7px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--course-solid);
      height: 50px;
      border-radius: 30px;
    }

    .item {
      height: 45px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: .2s;

      &.active {
        background: var(--main-color);
        color: #fff;
      }
    }
  }

  main {
    width: calc(100% - 150px);
    height: 100%;
    overflow-y: auto;
    transition: .2s;

    &::-webkit-scrollbar {
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 5px;
      background-color: none;
    }

    &::-webkit-scrollbar-thumb {
      height: 50%;
      border-radius: 30px;
      background: none;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background: var(--course-solid);
      }
    }

    .image {
      height: 36px;
    }

    a {
      display: flex;
      padding: 10px 10px 10px 20px;
      height: 72px;
      box-sizing: content-box;
      transition: background-color 0.3s;

      &:hover {
        background: var(--topic-hover);
      }

      img {
        width: 110px;
        height: 100%;
        border-radius: 8px;
        border: 1px solid var(--tint-solid);
      }

      .title {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        justify-content: space-between;

        p {
          height: 36px;
          color: var(--color);
          font-size: 14px;
          line-height: 18px;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          word-break: break-word !important;
          word-break: break-all;
          line-break: anywhere;
          -webkit-line-clamp: 2;
        }

        span {
          color: var(--headlines-color);
          font-size: 10px;
        }
      }
    }
  }
}
</style>
