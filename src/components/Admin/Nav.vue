<template>
  <main id="nav-box">
    <nav id="top-bar" />
    <nav id="left-bar">
      <div class="menu">
        <Menu @link="Link" v-for="(item, index) of box" :key="index" :item="item" :Index="Index" />
      </div>
    </nav>
  </main>
</template>
<script>
import Menu from "../Admin/home/menu";
export default {
  name: "Nav",
  data() {
    return {
      Index: 1,
      box: [
        {
          id: 1,
          name: "首页",
          Path: "/admin/home/main",
          Icon: this.Icon.Admin.home,
        },
        {
          id: 2,
          name: "文章管理",
          Path: "/admin/article",
          Icon: this.Icon.Admin.article.main,
          list: [
            {
              id: 2,
              name: "审核",
              Path: "/admin/article/main/",
              Icon: this.Icon.Admin.article.audit,
            },
            {
              id: 2,
              name: "文章管理",
              Path: "/admin/article/main/",
              Icon: this.Icon.Admin.article.main,
            },
          ],
        },
        {
          id: 3,
          name: "评论审核",
          Path: "/admin/audit/main",
          Icon: this.Icon.Admin.audit,
        },
        {
          id: 4,
          name: "课程管理",
          Path: "/admin/course",
          Icon: this.Icon.Admin.course,
        },
        {
          id: 5,
          name: "标签管理",
          Path: "/admin/tag",
          Icon: this.Icon.Admin.tag,
        },
        {
          id: 6,
          name: "用户管理",
          Path: "/admin/user/home",
          Icon: this.Icon.Admin.user,
        },
      ],
    };
  },
  methods: {
    Link(Index) {
      this.Index = Index;
    },
  },
  components: { Menu },
};
</script>
<style lang="less">
main#nav-box {
  nav#top-bar {
    height: 60px;
    position: fixed;
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
    top: 0;
    right: 0;
    left: 200px;
    z-index: 2000;
    background: var(--tint-color);
  }

  nav#left-bar {
    width: 200px;
    height: 100vh;
    background: #304156;
    position: fixed;
    top: 0;

    .menu {
      height: auto;
      padding-top: 84px;

      .menu-box {
        button {
          width: 100%;
          height: 50px;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          grid-gap: 20px;
          font-size: 16px;
          padding: 0 30px;
          cursor: pointer;
          color: rgb(191, 203, 217);

          &.active {
            background: var(--main-color);
            color: var(--tint-color);

            svg,
            path {
              fill: #fff;
            }
          }

          &.active-box {
            color: var(--tint-color);

            svg,
            path {
              fill: #fff;
            }
          }

          i {
            display: flex;
            align-items: center;
          }

          svg {
            width: 20px;
            height: 20px;
            fill: rgb(191, 203, 217);

            path {
              fill: rgb(191, 203, 217);
            }
          }

          &:hover {
            background: var(--main-color);
            color: #fff;

            svg {
              fill: var(--main-color);
            }
          }
        }
      }
    }
  }
}

main#main-box {
  margin: 84px 20px 0 220px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding-bottom: 30px;

  >div {
    border: 1px solid var(--tint-solid);
  }

  header.button {
    padding: 20px;
    border: 1px solid var(--tint-solid);
    display: flex;
    height: 100px;
    grid-gap: 10px;
    background: var(--tint-color);

    button {
      border: none;

      flex: 1;
      font-size: 17px;
      border-radius: 5px;
      width: calc(100% / 3);
      font-weight: bold;
      cursor: pointer;

      &:first-child {
        background: #b7d3ec;
        color: #5373a2;
      }

      &:nth-child(2) {
        background: #c1e4de;
        color: #518d85;
      }

      &:nth-child(3) {
        background: #9b94f6;
        color: #2e5593;
      }

      &:nth-child(4) {
        background: #8ec2e8;
        color: #2e5593;
      }

      &:last-child {
        background: #e181bc;
        color: #fff;
      }
    }
  }

}
</style>
