<template>
  <div class="release">
    <div class="succee" v-if="$store.state.info.id">
      <textarea @keydown.ctrl.enter="Release()" placeholder="写下你的评论..." v-model="content" />
      <div class="tip" v-if="boolean">
        <div class="one">
          <i v-html="Icon.Article.brow" />
          <span>Ctrl + Enter 发表</span>
        </div>
        <div class="two">
          <el-button type="primary" :disable="$store.state.info.id" @click="Release()" round>
            发布
          </el-button>
        </div>
      </div>
    </div>
    <div class="error" v-else @click="Link()">
      <span>请先<i>登录</i>后发表评论 (・ω・)</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'element-ui';

export default {
  name: "Release",
  data() {
    return {
      content: this.ait,
    };
  },
  props: {
    perform: {},
    ait: {},
    not: {},
    id: {},
    boolean: {
      default: true
    }
  },
  methods: {
    Release() {
      if (!this.content) {
        this.$message({
          type: "error",
          message: "请先输入评论",
        });
      } else {
        this.content = this.content.replace(this.ait, "")
        const res = this.perform(this.content, this.id);
        if (res) this.content = "";
      }
    },
    Link() {
      window.location = "/login";
    },
  },
};
</script>

<style lang="less" scoped>
.release {
  .fun1 {
    padding: 12px 16px;
    width: 100%;
    height: 90px;
    font-size: 13px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fafafa;
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
    font-family: inherit;
  }

  textarea {
    .fun1();

    &::-webkit-scrollbar {
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #eaecef;
      border-radius: 30px;
    }
  }

  .error {
    .fun1();
    background: #f1f2f3;
    cursor: pointer;
    color: #9499a0;
    font-size: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    i {
      background: #409eff;
      color: #fff;
      padding: 7px;
      border-radius: 8px;
      border: none;
    }
  }

  .tip {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    /deep/.el-button.is-round {
      padding: 7px 13px;
    }
  }

  .one {
    display: flex;
    color: #969696;
    fill: #969696;

    i,
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /deep/svg {
      margin-right: 10px;
    }

    span {
      font-size: 13px;
    }
  }
}
</style>
