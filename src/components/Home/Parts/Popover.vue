<template>
  <li :class="className">
    <a :href="href">{{ name }}</a>
    <transition name="el-fade-in">
      <div class="v-popover" v-show="show">
        <main class="main-box">
          <div class="title">
            <span v-for="(item, key) of title" :key="key" :class="{ 'span-active': index === key }">
              {{ item.name }}
            </span>
          </div>
          <main>
            <div class="none-box" v-if="bool">
              <span>暂时没有新动态哦！</span>
            </div>
            <p v-if="bool">
              <span>历史动态</span>
            </p>
            <div class="historical-dynamics">
              <div class="dynamics-main" v-for="item of info" :key="item.id">
                <a :href="`/article/${item.author.alias}/${item.id}`">
                  <img :src="item.author.avatar" alt="avatar" />
                  <div class="center-box">
                    <span>{{ item.author.name }}</span>
                    <p>{{ item.title }}</p>
                    <h6>{{ item.time }}</h6>
                  </div>
                  <img :src="item.image" alt="describe" v-if="item.image" />
                </a>
              </div>
              <el-empty v-if="(info.length === 0)" :description="description" />
            </div>
          </main>
        </main>
      </div>
    </transition>
  </li>
</template>
<script>
import { _ } from "@/assets/js/Def"
export default {
  name: "",
  data() {
    return {
      show: false,
      index: 0,
      title: [
        {
          name: "文章",
        },
        {
          name: "知识库",
        },
        {
          name: "文章",
        },
      ],
    };
  },
  mounted() {
    if (this.$store.state.info.name) {
      this.Def.Home.Hover({
        dom: "li." + this.className,
        enter: () => {
          this.show = true;
        },
        leave: () => {
          this.show = false;
        }
      })
    }
  },
  props: ["className", "href", "name", "info", "bool", "description"],
};
</script>
<style scoped lang="less">
.active {
  transform: translate3d(-50%, 0, 0);
}

.history {
  .historical-dynamics {
    max-height: 98% !important;
  }
}

.v-popover {
  width: 370px;
  height: 550px;
  right: -540%;
  font-size: 14px;

  .title {
    display: grid;
    color: var(--color);
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--tint-solid);

    span {
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 0 20px 10px;

      &.span-active {
        color: var(--main-color);
        border-bottom: 3px solid var(--main-color)
      }
    }
  }

  main {
    height: 100%;

    .none-box {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--item-svg);
    }

    >p {
      height: 15px;
      display: flex;
      justify-content: center;
      position: relative;

      &::after {
        content: "";
        width: 100%;
        height: 1px;
        background: var(--tint-solid);
      }

      span {
        font-size: 12px;
        font-weight: bolder;
        position: absolute;
        top: -9px;
        color: var(--headlines-color);
        background: var(--tint-color);
      }
    }

    .historical-dynamics {
      display: flex;
      flex-direction: column;
      max-height: calc(95% - 110px);
      overflow-y: auto;

      &::-webkit-scrollbar {
        /*高宽分别对应横竖滚动条的尺寸*/
        width: 6px;
        background: none;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--course-solid);
        height: 50px;
        border-radius: 30px;
      }

      .dynamics-main {
        height: 100px;
        padding: 15px 20px;

        a {
          display: flex;
          height: 100%;

          img[alt="avatar"] {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }

          img[alt="describe"] {
            width: 80px;
            border-radius: 8px;
            margin-left: auto;
            border: 1px solid var(--tint-solid);
          }

          .center-box {
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            span {
              color: var(--article-color);
            }

            p {
              font-size: 13px;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            h6 {
              color: var(--tint-with-color);
              font-weight: normal;
            }
          }
        }

        &:hover {
          background: var(--item-background);
        }
      }
    }
  }
}
</style>
