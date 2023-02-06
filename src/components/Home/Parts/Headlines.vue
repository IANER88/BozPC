<template>
  <div class="content-center-box">
    <div class="headlines-main-box">
      <div class="headlines-box" v-for="(item, index) of entry" :key="index">
        <a :href="`/article/${hove.author.alias}/${hove.id}`" type="_blank" v-for="hove of item" :key="hove.item">
          <p>{{ hove.title }}</p>
          <span>{{ hove.abridged }}</span>
        </a>
      </div>
    </div>
    <div class="advertising-box">
      <!-- <h3>前端框架趋势</h3> -->
      <div :id="item.name" v-for="(item, index) of web" :key="index" @click="Link(item)">
        <h4>{{ item.name }}</h4>
        <i v-html="item.svgIcon" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Headlines",
  data() {
    return {

    };
  },
  props: ["web", "entry"],
  methods: {
    Link({ name, submenu }) {
      window.location = `/course/${name}/${submenu.name}?id=${submenu.catalog}`
    }
  }
};
</script>
<style scoped lang="less">
.content-center-box {
  width: calc(100% - 547px);
  height: 100%;
  display: flex;

  .headlines-main-box {
    display: flex;
    width: calc(273px * 2);
    justify-content: space-between;
    height: 100%;

    .headlines-box {
      width: 273px;
      padding: 0 25px;
      display: flex;
      flex-direction: column;

      &:first-child {
        border-right: 1px solid var(--tint-solid);
      }

      a {
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-decoration: none;
        color: var(--color);

        .ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }

        p {
          .ellipsis();
        }

        span {
          color: var(--headlines-color);
          font-size: 14px;
          .ellipsis();
        }

        &:hover {
          p {
            text-decoration: underline;
          }
        }

        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }
  }

  .advertising-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: solid 1px var(--tint-solid);
    padding: 10px;

    >div {
      height: 50px;
      border-radius: 5px;
      padding: 0 30px;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:not(:first-child) {
        margin-top: 12px;
      }

      i {
        position: absolute;
        right: 15px;
        top: 5px;
        transition: transform 0.5s;

        /deep/svg {
          width: 70px;
          height: 70px;
        }
      }

      &:hover {
        i {
          transform: rotate(360deg);
        }
      }
    }

    #ReactJS {
      background: #b7d3ec;

      h4 {
        color: #5373a2;
      }
    }

    #VueJS {
      background: #c1e4de;

      h4 {
        color: #518d85;
      }
    }

    #SvelteJS {
      background: #e181bc;

      h4 {
        color: #fff;
      }

      /deep/svg {
        path {
          fill: white;
        }
      }
    }

    #AngularJS {
      background: #9b94f6;

      h4 {
        color: #2e5593;
      }
    }

    #SolidJS {
      background: #8ec2e8;

      h4 {
        color: #3a01c6;
      }
    }
  }
}
</style>
