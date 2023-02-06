<template>
  <main id="my-massage">
    <div class="title-box">我的消息</div>
    <div class="main-box">
      <nav class="my-meessage-nav-box">
        <div class="link-box" v-for="item of friend" :key="item.id">
          <el-avatar shape="square" :src="item.avatar" />
          <div class="name-box">
            <span>{{ item.name }}</span>
            <span>787878</span>
          </div>
        </div>
      </nav>
      <main class="my-message-box">
        <header></header>
        <div class="content-box">
          <div class="chat-main-box">
            <div class="actor-box">
              <img shape="square" :src="$store.state.info.avatar" avatar />
              <div class="bubbles">
                dddd
              </div>
            </div>
            <div class="recipient-box">
              <img shape="square" :src="$store.state.info.avatar" avatar />
              <div class="bubbles">
                ddd
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-box">
          <div class="bottom-title-box"></div>
          <textarea v-model="message" cols="30" rows="10" />
          <div class="bottom-button-box">
            <el-button type="primary" size="small" :disabled="boolean">发送</el-button>
          </div>
        </div>
      </main>
    </div>
  </main>
</template>
<script>
export default {
  name: 'MyMessage',
  data() {
    return {
      boolean: true,
      message: "",
      friend: []
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Chat.Friend({})
    this.friend = data.friend
    this.$router.push({
      path: "/message/mymessage",
      query: {
        id: this.friend[0].id
      }
    })
  },
  watch: {
    message() {
      this.boolean = this.message ? false : true
    }
  }
}
</script>
<style scoped lang="less">
.main-box {
  display: flex;
  padding: 0 !important;
  flex-direction: row !important;

  .my-meessage-nav-box {
    padding-top: 20px;
    width: 240px;
    height: 100%;
    display: flex;
    border-right: 1px solid var(--tint-solid);
    flex-direction: column;
    .link-box {
      width: 100%;
      padding: 10px 25px;
      height: 70px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      .name-box {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        span {
          &:last-child {
            font-size: 13px;
            color: var(--headlines-color);
          }
        }
      }

      &:hover {
        background: var(--topic-hover);
      }
    }
  }

  .my-message-box {
    width: calc(100% - 240px);
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid var(--tint-solid)
    }

    .content-box {
      width: 100%;
      height: calc(100% - 210px);
      background: var(--tabel);
      padding: 10px;

      [avatar] {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }

      .chat-main-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        word-break: break-word; //文本超出 自动换行

        >div {
          display: flex;
          gap: 10px;
          min-height: 50px;
          padding-right: 40px;

          .bubbles {
            min-height: 30px;
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 8px;
            background: var(--main-color);
            color: #fff;
            position: relative;

            &::before {
              content: "";
              display: block;
              border-width: 6px;
              width: 10px;
              height: 10px;
              position: absolute;
              background: var(--main-color);
              left: -4px;
              transform: rotate(45deg);
              top: 20px;
            }
          }

          &.recipient-box {
            flex-direction: row-reverse;
            padding-left: 40px;
            padding-right: 0px;

            .bubbles::before {
              right: -4px;
              left: auto;
            }

            img[alt="avatar"] {
              // align-self: flex-end;

            }
          }
        }
      }

    }

    .bottom-box {
      width: 100%;
      height: 160px;
      border-top: 1px solid var(--tint-with-color);
      background: var(--tabel);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;

      .bottom-title-box {}

      textarea {
        height: 70px;
        background: none;
        outline: none;
        border: none;
        font-size: 14px;
        resize: none;
        font-family: inherit;
      }

      .bottom-button-box {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>