<template>
  <main :class="{ 'direct-box': true, boolean: boolean }" @click.self="cancel()">
    <div class="direct-main-box">
      <header>
        <h3>{{ info.name }}</h3>
        <i class="el-icon-close" @click="cancel()" />
      </header>
      <section>
        <div class="chat-main-box" v-for="item of chat" :key="item.id">
          <div class="actor-box">
            <img :src="info.avatar" alt="avatar" />
            <div class="bubbles">

            </div>
          </div>
          <div class="recipient-box">
            <img :src="store.avatar" alt="avatar" />
            <div class="bubbles">

            </div>
          </div>
        </div>
      </section>
      <div class="chat-box">
        <div class="title-box"></div>
        <textarea v-model="message" />
        <div class="bottom">
          <el-button type="primary" @click="submit()">发送</el-button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import store from '@/assets/js/Store';
export default {
  name: 'Direct',
  data() {
    return {
      boolean: true,
      store: "",
      info: {},
      scoket: "",
      chat: [],
      message: "",
    }
  },
  mounted() {
    document.body.style.overflow = "hidden"
    this.$nextTick(() => {
      this.store = store.state
      this.scoket = this.Fetch.Chat.WebSocket.Direct(this.info.alias)
      this.scoket.onopen = (e) =>{
        
      }
      this.scoket.onmessage = (e) => {
        
      }
    })
  },
  watch: {
    boolean(news) {
      if (news) {
        document.body.style.overflow = "hidden"
      }
    }
  },
  methods: {
    cancel() {
      this.boolean = false
      document.body.removeAttribute("style")
    },
    submit() {
      this.scoket.send(JSON.stringify({ message: this.message }))
    }
  }
}
</script>
<style scoped lang="less">
@keyframes identifier {
  0% {
    opacity: 0;
    transform: rotate3d(-5%);
  }

  100% {
    opacity: 1;
  }
}

.direct-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  right: 0;
  display: none;
  bottom: 0;
  z-index: 10000;
  opacity: 1;
  align-items: center;
  justify-content: center;

  &.boolean {
    opacity: 1;
    display: flex;
    animation: identifier .3s;
  }

  .direct-main-box {
    width: 600px;
    height: 550px;
    border-radius: 5px;
    background: var(--tint-color);
    padding: 10px;

    header {
      height: 50px;
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
      border-bottom: 1px solid var(--tint-solid);

      h3 {
        margin: 0 auto;
      }

      i {
        cursor: pointer;
        font-size: 17px;
      }
    }

    section {
      height: 65%;
      padding: 10px 0;

      .chat-main-box {
        display: flex;
        flex-direction: column;
        gap: 10px;

        >div {
          display: flex;
          gap: 10px;
          min-height: 50px;

          .bubbles {
            min-height: 40px;
            padding: 10px;
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



      img[alt="avatar"] {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }

    .chat-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid var(--tint-solid);

      textarea {
        width: 100%;
        height: 75px;
        resize: none;
        padding: 10px;
        border: none;
        font-family: inherit;
        font-size: 16px;
        outline: none;
        background: var(--tint-color);
      }

      .bottom {
        align-self: flex-end;
      }
    }
  }
}
</style>