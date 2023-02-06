<template>
  <main id="message">
    <Nav />
    <main id="message-box">
      <nav>
        <router-link v-for="(item, index) of link" :key="index" :to="item.to" active-class="active">{{ item.name }}
        </router-link>
      </nav>
      <transition :name="transition">
        <router-view />
      </transition>
    </main>
  </main>
</template>
<script>
import Nav from "../Home/Nav";
export default {
  name: "Massage",
  data() {
    return {
      link: [
        {
          name: "回复我的",
          to: "/message/reply"
        },
        {
          name: "@我的",
          to: "/message/ait"
        },
        {
          name: "收到的赞",
          to: "/message/like"
        },
        {
          name: "系统消息",
          to: "/message/system"
        },
        {
          name: "我的消息",
          to: "/message/mymessage"
        },
      ],
      transition: "slide-right"
    };
  },
  components: { Nav },
};
</script>
<style>
body {
  background: var(--article-backgrund);
  overflow: hidden;
}
</style>
<style scoped lang="less">
#message-box {
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  >main {
    width: calc(99% - 200px);
    margin: 20px 20px 20px 220px;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    .align {
      display: flex;
      align-items: center;
    }

    /deep/.title-box {
      width: 100%;
      height: 50px;
      background: var(--tint-color);
      box-shadow: var(--shadow);
      .align();
      padding: 0 20px;
      font-weight: bold;
    }

    /deep/.main-box {
      background: var(--tint-color);
      box-shadow: var(--shadow);
      padding: 20px 0;
      display: flex;
      height: 77vh;
      flex-direction: column;
      overflow-x: auto;

      &::-webkit-scrollbar {
        /*高宽分别对应横竖滚动条的尺寸*/
        width: 10px;
        background-color: none;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--course-solid);
        border-radius: 30px;
      }

      .line-box {
        display: flex;
        grid-gap: 10px;
        cursor: pointer;
        border-bottom: 1px solid var(--tint-solid);
        padding-bottom: 20px;
        box-sizing: content-box;
        padding: 10px 20px;

        &:not(:first-child) {
          padding-top: 20px;
        }

        &:hover {

          .delete {
            display: flex !important;
          }
        }
      }
    }
  }

  nav {
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    background: var(--tint-color);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    z-index: 1;
    position: fixed;
    bottom: 0;
    top: 60px;

    a {
      height: 50px;
      text-decoration: none;
      color: var(--color);
      display: flex;
      align-items: center;
      grid-gap: 10px;
      padding: 0 40px;

      &::before {
        content: "";
        width: 7px;
        height: 7px;
        background: var(--color);
        border-radius: 50%;
      }
    }

    .active {
      color: var(--main-color);
      font-weight: bold;
      background: var(--el-tag-solid);

      &::before {
        background: var(--main-color);
      }
    }
  }
}
</style>
