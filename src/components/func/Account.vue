<template>
  <transition name="el-fade-in-linear">
    <main id="account-box">
      <div class="account-main-box">
        <nav class="account-nav-box">
          <div class="topic-box" v-for="(item, index) of nav" :key="index" @click="Switch(item.name)">
            {{ item.name }}
          </div>
        </nav>
        <main class="account-content-box">
          <div class="account-info-box">
            <div class="account-title-box">
              <h4>{{ init.name }}</h4>
              <i v-html="Icon.Home.delete" @click="Exit()" />
            </div>
            <keep-alive>
              <Info v-if="init.name === nav[0].name" :info="info" :teuple="teuple" :boolean="Exit" />
              <Manage v-if="init.name === nav[1].name" :boolean="Exit" />
            </keep-alive>
          </div>
        </main>
      </div>
    </main>
  </transition>
</template>
<script>
import Manage from "@/components/Space/Manage"
import Info from "../Space/Info.vue"
export default {
  name: 'Account',
  data() {
    return {
      nav: [
        {
          name: "个人信息",
        },
        {
          name: "账户管理",
        }
        ,
        {
          name: "账户安全"
        }
      ],
      info: {

      },
      hide: {

      },
      init: {
        name: "个人信息",
      }
    }
  },
  props: {
    show: {
      default: false
    },
    teuple: {

    },
    item: {

    },
    Get: {

    }
  },
  mounted() {
    this.hide = this.show
    setTimeout(() => {
      this.info = this.item
    }, 100)
  },
  methods: {
    Exit() {
      this.$emit("hide", false)
      this.Def.scroll()
    },
    Switch(name) {
      this.init.name = name
    },
  },
  components: { Manage, Info }
}
</script>
<style  lang="less" scoped>
#account-box {
  position: fixed;
  background: rgba(0, 0, 0, .7);
  height: 100vh;
  bottom: 0;
  display: flex;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: display .3s;

  .account-main-box {
    width: 70%;
    height: 80vh;
    border-radius: 5px;
    background: var(--tint-color);
    overflow: hidden;
    display: flex;

    .account-nav-box {
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--tint-solid);

      >div {
        height: 50px;
        padding: 0 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:not(:first-child) {
          border-top: 1px solid var(--tint-solid);
        }

        &:last-child {
          border-bottom: 1px solid var(--tint-solid);
        }
      }
    }

    .account-content-box {
      width: 100%;

      .account-info-box {
        .account-title-box {
          display: flex;
          border-bottom: 1px solid var(--tint-solid);
          width: 100%;
          height: 52px;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;

          i {
            cursor: pointer;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>