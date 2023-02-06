<template>
  <main id="slide-box">
    <div class="hash-box" v-for="item of history">
      <span>{{ item }}</span>
    </div>
    <div class="content-box" v-html="content[int]" v-if="boolean" />
    <div class="content-box continuous" v-else v-focus>
      <div class="continuous-box" v-for="(item, index) of content" v-html="item" :key="index" />
    </div>
    <div class="bottom-box" :class="{ 'continuous-bottom': !boolean }">
      <div class="type">
        <div class="continuous" @click.stop="continuous()">
          <i v-html="Icon.Course.continuous" />
          连续
        </div>
        <div class="page" @click.stop="page()">
          <i v-html="Icon.Course.page" />
          分页
        </div>
      </div>
      <div class="switch" v-if="boolean">
        <div class="upper" v-html="Icon.Course.upper" @click.stop="upper()" @keyup.top="upper()" />
        <div class="number">
          <span>{{ int + 1 }}</span>
          <span>/</span>
          <span>{{ content.length }}</span>
        </div>
        <div class="nexl" v-html="Icon.Course.nexl" @click.stop="nexl()" @keyup.bottom="nexl()" />
      </div>
      <div class="fun">
        <div class="moving" v-html="Icon.Course.moving" />
        <el-tooltip class="item" effect="dark" content="显示大纲" placement="bottom-start">
          <div v-html="Icon.Course.outline" class="outline" @click.stop="drawer = !drawer" />
        </el-tooltip>
      </div>
      <el-tooltip class="item" effect="dark" content="esc关闭" placement="bottom-start">
        <div v-html="Icon.Course.esc" class="esc" @click.stop="screen(true)" />
      </el-tooltip>
    </div>
    <transition name="nav-right">
      <nav class="nav-box" v-show="drawer">
        <header>
          课程大纲
        </header>
        <div class="nav-main-box">
          <div class="name-box" v-for="(item, index) of catalog" :key="index">
            <div class="title-box" @click.stop="hash(item.name)" :id="item.name">{{ item.name }}</div>
            <div class="span-box" v-for="(hove, range) of item.title" :key="range">
              <span @click.stop="hash(hove.name)" :id="hove.name">{{ hove.name }}</span>
              <ol>
                <li v-for="(home, each) of hove.title" :key="each" :id="home.hash" @click.stop="hash(home.hash)">
                  {{ each + 1 }}. {{ home.hash }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
    </transition>
  </main>
</template>
<script>
import Def, { _ } from '@/assets/js/Def'
import { Message } from 'element-ui'
import $ from "jquery"
export default {
  name: 'Slide',
  data() {
    return {
      content: [],
      int: 0,
      history: [],
      self: '',
      box: [],
      bool: true,
      catalog: [],
      boolean: true,
      drawer: false,
      fun: {},
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  mounted() {
    this.screen(false)
    setTimeout(() => {
      this.page(this.box)
    }, 100)
    this.Render()
    document.addEventListener("fullscreenchange", (e) => {
      if (!document.fullscreenElement) {
        this.fun()
        $("main#slide-box").hide()
        return
      }
      document.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "ArrowRight":
            this.nexl()
            break
          case "ArrowLeft":
            this.upper()
            break
        }
      })
    })
  },
  watch: {
    int() {
      // 给目录添加高亮
      const nav = $(".name-box .title-box, .name-box span, .name-box li")
      // 创建正则匹配 h1 to h6 的标签
      const tag = new RegExp(`<h[1-6]>.*?</h[1-6]>`)
      const name = this.content[this.int]
      for (const item of nav) {
        if (tag.test(name)) {
          // 过滤掉标签
          const title = name.replace(/<h[1-6]>/, "").replace(new RegExp("</h[1-6]>"), "")
          // 判断 id 值和 title 相等，然后添加类
          if (item.id === title) {
            item.classList.add("active")
          } else {
            item.classList.remove("active")
          }
        }
      }
    },
    boolean() {
      if (!this.boolean) {
        Def.scrollSpy({
          win: "#slide-box",
          html: "#slide-box",
          main: "#slide-box .content-box",
          active: "active",
          boolean: false,
          nav: ".name-box .title-box, .name-box span, .name-box li",
        })
      }
    }
  },
  methods: {
    upper() {
      if (this.int !== 0) {
        this.int -= 1
        this.Render()
        return
      }
      Message({
        message: "第一张, 无法上一张!"
      })
    },
    nexl() {
      if (this.int < this.content.length - 1) {
        this.int += 1
        this.Render()
        return
      }
      Message({
        message: "已经是最后一张了!"
      })
    },
    Render() {
      this.Def.PrismAll()
    },
    screen(bool) {
      this.Def.Screen({
        bool,
      })
      // 为 true 显示课程
      if (bool) {
        $("main#slide-box").hide()
        this.fun()
      }
    },
    hash(name) {
      if (!this.boolean) {
        // 锚点定位
        Def.toHash(`#${name}`, "#slide-box")
      } else {
        // 分页
        this.int = this.content.findIndex(str => new RegExp(`<h[1-6]>${name}</h[1-6]>`).test(str))
      }
    },
    page() {
      // 分页
      this.boolean = true
      const main = (slide) => {
        const list = []
        let array = $("<div></div>")
        for (const ts of slide) {
          list.push(`<h1>${ts.name}</h1>`)
          if (ts.content) {
            for (const fun of $(ts.content)) {
              const name = fun.childNodes[0].localName
              if (
                ["h1", "h2", "h3", "h4", "h5", "h6", "pre"].includes(fun.localName) ||
                fun.childNodes[0].localName == 'img'
              ) {
                fun.removeAttribute("style")
                list.push(fun.outerHTML)
                array = ""
                array = $("<div></div>")
              } else if (name !== "br") {
                array.append(fun)
                list.push(array[0].outerHTML)
              }
            }
          }
          if (ts.course) {
            list.push(...main(ts.course))
          }
        }
        return list
      }
      this.content = main(this.box)
    },
    continuous() {
      // 连续查看
      this.boolean = false
      this.content = Def.GetH(this.box)
      this.Render()
    },
  }
}
</script>
<style lang="less">
#slide-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1111;
  background: var(--tint-color);
  overflow-y: auto;
  scroll-behavior: smooth;

  .hash-box {
    padding: 20px;
    font-size: 20px;
    display: flex;
    gap: 10px;
    color: var(--headlines-color);

    span {
      cursor: pointer;

      &:not(:last-child) {
        display: flex;
        gap: 10px;

        &::after {
          content: "/";
        }
      }
    }
  }

  .content-box {
    display: flex;
    width: 80%;
    height: calc(100% - 66.4px);
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;

    // .code-toolbar{
    //   height: 100%;
    // }
    &:not(.continuous) {

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-left: 100px;
      }

      h1 {
        font-size: 4.5rem;
      }

      h2 {
        font-size: 4rem;
      }

      h3 {
        font-size: 3.5rem;
      }

    }

    &.continuous {
      flex-direction: column;
      height: auto !important;
    }

    .continuous-box {
      padding: 60px 0;

      h1 {
        width: 100%;
        border-bottom: solid var(--course-solid) 1px;
        padding: 0 1.8rem 4rem 0;
        display: flex;
      }
    }

    p {
      font-size: 2rem;
    }

    >div {
      font-size: 1.5rem;
    }

    ol,
    ul {
      margin-left: 30px;

      li {
        line-height: 45px;
      }
    }

    img {
      width: 100%;
    }

    .option {
      display: flex;
      flex-direction: column;
      gap: 35px;
    }

    span[style] {
      padding: 2px;
      border-radius: 5px;
    }

    // .code-toolbar {
    //   height: 100%;
    // }

    >div,
    >p {
      width: 100%;
    }
  }

  .bottom-box {
    height: 50px;
    position: fixed;
    background: rgba(0, 0, 0, .9);
    border-radius: 5px;
    bottom: 20px;
    width: 430px;
    margin: 0 auto;
    display: flex;
    color: #fff;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    left: 0;
    right: 0;
    opacity: 0;
    transition: .3s;

    &.continuous-bottom {
      width: 310px !important;
    }

    &:hover {
      opacity: 1;
    }

    .type {
      gap: 5px;

      >div {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 5px;
        border-radius: 3px;

        i {
          display: flex;
          align-content: center;
        }

        &:hover {

          background: #484848;
        }
      }
    }

    >div {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      padding: 0 10px;

      >div {
        display: flex;
        align-items: center;
      }

      &:not(:last-child) {
        &::after {
          content: "";
          width: 1px;
          display: flex;
          background: #484848;
          position: absolute;
          height: 20px;
          right: 0;
        }
      }
    }

    .switch {
      width: 130px;
      justify-content: space-between;

      div:not(.number) {
        width: 32px;
        display: flex;
        align-items: center;
      }

      .number {
        gap: 2px;
        display: flex;
      }

      .nexl {
        justify-content: flex-end;
      }
    }

    .fun {
      gap: 7px;
    }
  }

}


.nav-left-enter,
.nav-right-leave-to {
  opacity: 0;
  transform: translateX(400px)
}

.nav-left-leave-to,
.nav-right-enter {
  opacity: 0;
  transform: translateX(400px)
}

.nav-left-enter-active,
.nav-left-leave-active,
.nav-right-enter-active,
.nav-right-leave-active {
  transition: 1s ease;
  position: absolute;
}

.nav-box {
  width: 280px;
  height: 100%;
  background: #fafafa;
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0;
  gap: 20px;
  top: 0;
  // animation: show .2s;

  header {
    height: 40px;
    font-size: 20px;
    padding: 20px 10px;
  }

  .nav-main-box {
    overflow-y: auto;
  }

  .active {
    color: var(--main-color);
  }

  .name-box {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title-box,
    li,
    span {
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 20px;

      &:hover {
        background: #f5f5f5;
      }
    }

    .title-box,
    span {
      font-weight: 500;
    }

    li {
      padding: 0 37px;
    }
  }
}
</style>