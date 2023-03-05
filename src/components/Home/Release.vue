<template>
  <div class="release">
    <div class="succee" v-if="$store.state.info.id">
      <div
        class="input-box"
        :class="{ error: content && content.length > 220 ? true : false }"
      >
        <textarea
          @keydown.ctrl.enter="Release()"
          placeholder="写下你的评论..."
          :value="content"
          @input="AT($event)"
          ref="text"
        />
        <span>{{ content ? content.length : 0 }}/220</span>
        <div class="select-box" v-if="bool">
          <span>选择或输入你想@的人</span>
          <div class="select-content-box">
            <span>我的关注</span>
            <div class="select-main-box">
              <div
                class="select-item-box"
                v-for="item of follower"
                :key="item.id"
                @click="AIT(item.name)"
              >
                <img :src="item.avatar" alt="" />
                <div class="select-title-box">
                  <span>{{ item.name }}</span>
                  <p>{{ item.introduce }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tip" v-if="boolean">
        <div class="one">
          <i v-html="Icon.Article.brow" />
          <span>Ctrl + Enter 发表</span>
        </div>
        <div class="two">
          <el-button
            type="primary"
            :disable="$store.state.info.id"
            @click="Release()"
            round
          >
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
export default {
  name: "Release",
  data() {
    return {
      content: "",
      follower: "",
      bool: false,
    };
  },
  props: {
    perform: {},
    not: {},
    id: {},
    boolean: {
      default: true,
    },
  },
  async mounted() {
    if (this.$store.state.info.id) {
      const { data } = await this.Fetch.Space.Follower({
        method: "put",
        alias: this.$store.state.info.alias,
      });
      this.follower = data.follower;
    }
  },
  methods: {
    async Release() {
      // 判断@开头空格结尾的字符
      const match = this.content.match(/(?<=@)(.+?)(?=\s)/g);
      // 替换字符
      const res = await this.perform(this.content, this.id, match);
      if (res) this.content = "";
    },
    AT(event) {
      this.content = event.target.value;
      this.bool = event.data === "@" ? true : false;
    },
    AIT(name) {
      this.content += `${name} `;
      this.bool = false;
      this.$refs.text.focus();
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
    padding: 10px 16px;
    font-size: 13px;
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
    font-family: inherit;
  }

  .input-box {
    width: 100%;
    height: 90px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #f1f2f3;
    display: flex;
    flex-direction: column;
    padding: 5px;
    position: relative;

    &.error {
      border: 2px solid var(--error);

      span {
        color: var(--error);
      }
    }

    .select-box {
      position: absolute;
      width: 200px;
      height: 190px;
      border-radius: 6px;
      background: var(--tint-color);
      border: 1px solid var(--tint-solid);
      box-shadow: var(--shadow);
      top: -197px;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      > span {
        font-size: 12px;
        padding: 0 10px;
      }

      .select-content-box {
        display: flex;
        flex-direction: column;
        gap: 10px;

        > span {
          font-size: 12px;
          padding: 0 10px;
          font-weight: bolder;
        }

        .select-main-box {
          overflow-y: auto;

          .select-item-box {
            display: flex;
            height: 60px;
            padding: 10px;
            gap: 10px;
            cursor: pointer;

            &:hover {
              background: var(--admin-hover);
            }

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }

            .select-title-box {
              display: flex;
              flex-direction: column;
              justify-content: center;

              span {
                font-size: 14px;
                font-weight: bolder;
              }

              p {
                font-size: 12px;
                color: var();
              }
            }
          }
        }
      }
    }

    textarea {
      flex: 1;
      background: none;
      border: none;
      overflow: none;
    }

    > span {
      font-size: 12px;
      color: #909399;
      align-self: self-end;
    }
  }

  textarea {
    padding: 10px 10px;
    font-size: 13px;
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
    font-family: inherit;

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
    height: 90px;
    i {
      background: #409eff;
      color: #fff;
      padding: 7px;
      border-radius: 8px;
      border: none;
      font-style: normal;
      margin: 0 5px;
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
