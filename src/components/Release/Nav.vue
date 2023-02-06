<template>
  <div class="editor">
    <div class="navs">
      <div class="nav">
        <Logo title="Bozhan" />
        <div class="title">
          <h4>{{ name }}</h4>
          <div class="box">
            <a href="">
              <span>{{ $store.state.info.name }}</span>
            </a>
            <a href="">
              <span>{{ title }}</span>
            </a>
            <time>{{ time }}</time>
          </div>
        </div>
      </div>
      <div class="create">
        <Fun size="220" :len="init.len" :author="author">
          <div class="setting">文档设置</div>
          <div class="delete" @click="del">
            <i v-html="Icon.Release.delete" />
            删除
          </div>
        </Fun>
        <el-button size="small" :loading="loading" :autofocus="false" @click="submit">{{ name.slice(0, 2) }}</el-button>
        <Synergy />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../Logo";
import Fun from "@/components/func/Fun";
import Synergy from "@/components/Release/Synergy"
export default {
  data() {
    return {
      loading: false,
    }
  },
  components: { Logo, Fun, Synergy },
  props: ["title", "name", "submit", "add", "time", "init", "del", "author"],

};
</script>
<style lang="less" scoped>
.editor {
  height: 60px;
  background: #ffffff;
  box-shadow: 0 1px 12px 0 rgba(1, 39, 78, 0.12);
  padding: 10px 30px;
  box-sizing: border-box;
  z-index: 1000;
  position: sticky;
  top: 0;

  .navs {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }


  .nav {
    // width: 24%;
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .title {
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--tint-solid);
      padding: 0 10px;

      .box {
        a {
          color: #8a8f8d;
          text-decoration: none;

          &:first-child {
            &::after {
              content: "/";
              font-size: 12px;
              margin: 0 5px;
            }
          }
        }

        span,
        time {
          font-size: 13px;
          color: #8a8f8d;
        }

        time {
          &::before {
            content: "|";
            font-size: 10px;
            margin: 0 5px;
            position: relative;
            top: -1px;
          }
        }
      }
    }
  }

  .create {
    width: 30%;
    display: flex;
    padding: 4px 0px;
    flex-direction: row-reverse;
    padding: 0 !important;
    align-items: center;
    gap: 10px;

    .content {
      >div {
        cursor: pointer;
        padding: 15px;
        display: flex;
        align-items: center;

        &:not(:first-child) {
          border-top: 1px solid var(--tint-solid);
        }
      }

      .delete {
        gap: 5px;
      }
    }
  }
}
</style>
