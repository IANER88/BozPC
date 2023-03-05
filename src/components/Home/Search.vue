<template>
  <main id="seach-box">
    <Nav :boolean="false" />
    <main class="main-box">
      <header>
        <div class="box">
          <div class="seach-main-box">
            <div :class="{ 'input-box': true, focus: focus }">
              <input
                type="text"
                @focus="Focus()"
                @blur="Blur()"
                v-model="text"
              />
              <div class="popover" v-show="focus">
                <div
                  class="topic"
                  v-for="(item, index) of info"
                  :key="index"
                  v-html="item.xinde"
                />
                <div class="history-box" v-show="!text">
                  <div class="history-main-box">
                    <h6>搜索历史</h6>
                    <div
                      class="topic"
                      v-for="(item, index) of history"
                      :key="index"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                  <div class="found-box"></div>
                </div>
              </div>
            </div>
            <button @click="Search(text)">搜索</button>
          </div>
        </div>
      </header>
      <div class="content-box">
        <div class="content-main-box">
          <nav></nav>
          <div class="box" v-for="(item, index) of content" :key="index">
            <a
              :href="`/article/${item.author.alias}/${item.id}`"
              v-html="item.xinde"
            ></a>
            <div class="box-content">{{ item.content }}</div>
            <div class="like"></div>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  </main>
</template>
<script>
import Nav from "./Nav";
import LocaL from "@/assets/js/Storage";
export default {
  name: "Seach",
  data() {
    return {
      focus: false,
      text: "",
      info: [],
      history: [],
      content: [],
    };
  },
  async mounted() {
    if (this.$route.query.q) {
      if (!LocaL.get("search")) {
        this.find([this.$route.query.q]);
      } else {
        const obj = JSON.parse(LocaL.get("search"));
        this.history = [...obj.topic];
        // 判断是否有一样的条目，没有就添加
        if (!this.history.includes(this.$route.query.q)) {
          this.history.push(this.$route.query.q);
          this.find(this.history);
        }
      }
      const rej = await this.Fetch.Home.Search({ q: this.$route.query.q });
      this.Def.Home.Message({
        res: rej.data,
        fun: () => {
          this.content = this.Def.Home.Trie(rej.data);
        },
      });
      return;
    }
    this.$message({
      type: "error",
      message: "请输入查找值！",
    });
  },
  components: { Nav },
  methods: {
    Focus() {
      this.focus = true;
    },
    Blur() {
      this.focus = false;
    },
    find(topic) {
      LocaL.del("search");
      LocaL.set({
        name: "search",
        text: JSON.stringify({
          topic,
        }),
      });
    },
    Search(text) {
      location.href = `/search?q=${text}`;
    },
  },
  watch: {
    async text(news) {
      if (this.text) {
        const rej = await this.Fetch.Home.Trie({ q: news });
        this.info = this.Def.Home.Trie(rej.data);
      }
    },
  },
};
</script>
<style lang="less">
body {
  background: #f5f5f5 !important;
}

.main-box {
  display: flex;
  flex-direction: column;
  gap: 10px;

  header {
    height: 70px;
    background: var(--tint-color);
    padding: 10px 0;

    .box {
      width: 1380px;
      margin: 0 auto;
      height: 100%;

      .seach-main-box {
        width: 1070px;
        height: 100%;
        display: flex;
        align-items: center;

        input,
        button {
          outline: none;
          height: 100%;
        }

        .input-box {
          height: 100%;
          width: 90%;
          display: flex;
          align-items: center;
          background: var(--tint-two-background);
          position: relative;
          border-radius: 3px 0 0 3px;

          &:not(.focus) {
            &:hover {
              border: 1px solid var(--main-color);
              background: var(--tint-color) !important;
            }
          }

          &.focus {
            border: 1px solid var(--main-color);
            border-bottom: none;
            border-left: none;
            background: var(--tint-color) !important;
            border-radius: 3px 0 0 0;

            input {
              border-left: 1px solid var(--main-color);
            }
          }

          .popover {
            width: 100%;
            height: auto;
            position: absolute;
            border: 1px solid var(--main-color);
            border-top: 2px solid var(--tint-solid);
            top: 48px;
            border-radius: 0 3px 0 3px;
            background: var(--tint-color) !important;

            .topic {
              display: flex;
              height: 40px;
              align-items: center;
              cursor: pointer;
              padding: 0 10px;

              &:hover {
                background: var(--search);
              }
            }

            em {
              color: var(--main-color);
              font-style: normal;
            }

            .history-box {
              display: grid;
              grid-template-columns: repeat(2, 1fr);

              h6 {
                padding: 0 10px;
                margin-top: 10px;
              }
            }
          }
        }

        input {
          width: 95%;
          padding: 0 10px;
          border: none;
          background: none;
        }

        button {
          width: 10%;
          background: var(--main-color);
          border: none;
          font-size: 17px;
          border-radius: 0 3px 3px 0;
          color: var(--tint-color);
          cursor: pointer;
        }
      }
    }
  }

  .content-box {
    width: 1380px;
    margin: 0 auto;

    .content-main-box {
      width: 1070px;
      background: var(--tint-color);
      padding: 0 20px;

      .box {
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;

        a {
          text-decoration: none;
          font-weight: bold;
          color: #000;

          em {
            font-style: normal;
            color: var(--main-color);
          }
        }

        &:not(:first-child) {
          border-top: 1px solid var(--tint-solid);
        }
      }
    }
  }
}
</style>