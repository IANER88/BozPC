import Prism from "./prism"
import { DomEditor, createEditor, createToolbar } from "@wangeditor/editor"
import config from "/src/assets/js/Editor";
import Vue from "vue"
import store from "./Store";
import Regular from "@/assets/js/regular"
import Fetch from "./Fetch";
import { Message } from 'element-ui'
import Collect from "@/components/func/collect"
import Operate from "@/components/func/operate"
import Tag from "@/components/func/tag"
import Enlarge from "@/components/func/enlarge"
import Relevance from "@/components/func/relevance"
import Direct from "@/components/func/Direct"
import Slide from "@/components/func/Slide"
import Verification from "@/components/func/Verification"
import $ from "jquery"
import xss from "xss";
export function _(dom) {
  const doms = document.querySelectorAll(dom)
  return doms
}
// 对浏览器URL中文进行转换
export function Revert(szInput) {
  let x, wch, wch1, wch2, szRet = "";
  for (x = 0; x < szInput.length; x++) {
    if (szInput.charAt(x) == "%") {
      wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
      if (!wch) { break; }
      if (!(wch & 0x80)) {
        wch = wch;
      } else if (!(wch & 0x20)) {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x1F) << 6;
        wch1 = wch1 & 0x3F;
        wch = wch + wch1;
      } else {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        x++;
        wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x0F) << 12;
        wch1 = (wch1 & 0x3F) << 6;
        wch2 = (wch2 & 0x3F);
        wch = wch + wch1 + wch2;
      }
      szRet += String.fromCharCode(wch);
    } else {
      szRet += szInput.charAt(x);
    }
  }
  return (szRet);
}
// 方法面向对象类 Def 
class Def {
  editor = ''
  // 创作文本编辑器方法
  creationEditor = (html) => {
    this.editor = createEditor({
      selector: "#txt",
      html,
      config,
      mode: "default",
    });
    createToolbar({
      editor: this.editor,
      selector: "#menu",
      mode: "default",
    });
    this.editor.handleTab = () => this.editor.insertText("  ");
    this.editor.getCatalog = (boolean) => {
      const headers = this.editor.getElemsByTypePrefix('header')
      let nodes = []
      const DataTransition = ({ obj, index, elme }) => {
        obj[index].list.push({
          hash: elme.children[0].text,
          id: elme.id
        })
      }
      const find = (type) => {
        const split = type.split('')
        const box = split[split.length - 1]
        return box
      }
      if (headers.length !== 0) {
        let index = -1;
        let temp; // 存根级目录
        const box = find(headers[0].type)
        for (const item of headers) {
          if (item.type === `header${box}`) {
            index++
            const obj = {
              hash: item.children[0].text,
              list: [],
            }
            if (boolean) obj.id = item.id
            nodes.push(obj)
          } else {
            DataTransition({
              obj: nodes,
              elme: item,
              index,
            })
          }
        }
      }
      return nodes
    }
    const toolbar = DomEditor.getToolbar(this.editor).getConfig();
    toolbar.excludeKeys = ["fullScreen", "group-video"]; // 去掉全屏和上传视频
    toolbar.insertKeys = {
      index: 25,
      keys: ['option']
    }
  }
  GetDate = () => {
    return new Date().toLocaleString().replaceAll('/', '-')
  }
  // 用于查找内容的标题，然后和目录联动的方法
  _ = ({ select = ".course-center-box", boolean = true, bool = true }) => {
    const box = ["h2", "h3", "h4", "h5", "h6"]
    const list = []
    const fun = (children) => {
      for (const i of children) {
        if (box.includes(i.localName)) {
          list.push(i)
        }
      }
    }
    if (boolean) {
      const Dom = document.querySelectorAll(select)
      for (const h of Dom) {
        list.push(h.children[0])
        if (bool) {
          fun(h.children)
        } else {
          fun(h.children[1].children)
        }
      }
    } else {
      box.push("h1")
      const Dom = document.querySelector(select)

      for (const i of Dom.children) {
        if (bool) {
          fun(i.children)
        } else {
          if (box.includes(i.localName)) {
            list.push(i)
          }
        }
      }
    }
    return list
  }
  RemoveBlank = (Str) => Str.replace(/\s/g, '');
  // 锚点定位
  toHash = (select, dom = "html") => {
    if (_(select)[0]) {
      _(dom)[0].scrollTop = _(select)[0].offsetTop - 70
      return true
    } else {
      return false
    }
  }
  // 滚动底部
  ScrollBottom({ render, boolean }) {
    let time;
    window.addEventListener("scroll", async (e) => {
      clearTimeout(time)
      const {
        scrollTop, clientHeight, scrollHeight
      } = e.target.lastChild
      if (scrollHeight > clientHeight && scrollTop + clientHeight + 1 >= scrollHeight && boolean) {
        time = setTimeout(() => {
          render()
          return false
        }, 1000)
      }
    })
  }
  // 处理内容 h 标签
  GetH(box) {
    const div = []
    for (const ts of box) {
      div.push(`<h1 id="${ts.name}">${ts.name}</h1>`)
      for (const li of ts.course) {
        div.push(`<h1 id="${li.name}">${li.name}</h1>`)
        let str = ""
        for (const h of $(li.content)) {
          if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(h.localName)) {
            h.id = h.innerText
            h.int = li.id
          }
          str += h.outerHTML
        }
        div.push(str)
      }
    }
    return div
  }
  // 全屏方法
  Screen({ bool, fun, def }) {
    const docElm = document.documentElement;
    if (bool) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fun && fun()
      return
    }
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    def && def()
  }
  // 实现滚动监听
  scrollSpy = (data) => {
    const {
      nav,
      main = ".course-center-box",
      active,
      fun,
      boolean = true,
      win,
      bool = true,
      html = "html"
    } = data
    const Line = win ? _(win)[0] : window
    const obj = { select: main, bool }
    if (!boolean) obj.boolean = boolean

    Line.addEventListener("scroll", () => {
      let top;
      let int;
      let name;
      let footer = document.querySelectorAll(nav)
      const screen = _(html)[0].scrollTop
      const hash = this._(obj)
      for (const h of hash) {
        const hTop = h.offsetTop
        if (screen > hTop - 80) {
          if (h.getAttribute("int")) {
            int = Number(h.getAttribute("int"))
            name = h.id
          }
          top = h.id ? h.id : h.innerText
        }
      }
      if (top) {
        if (footer.length) {
          for (const h of footer) {
            const text = h.innerText
            text == top ? h.classList.add(active) : h.classList.remove(active)
          }
        }
        fun && fun({
          int,
          name,
        })
      }
    })
  }
  PrismAll = () => {
    setTimeout(async () => {
      for (const item of _("pre")) {
        item.className = "line-numbers";
      }
      Prism.highlightAll();
      // 给卡片添加跳转
      for (const element of _('[data-w-e-type="link-card"]')) {
        element.onclick = function () {
          open(this.getAttribute("data-link"))
        }
      }
    }, 0);
    return this
  }
  // 处理多于P标签
  LastpDom({ select, link = '[data-w-e-type="link-card"]', boolean = true, bool }) {
    setTimeout(() => {
      const header = this._({ boolean, select: select.split(">")[0], bool })
      const func = (select) => {
        const box = _(select)
        if (box.length != 0) {
          const Last = box[box.length - 1].nextSibling
          if (Last.innerHTML === "<br>") {
            Last.parentElement.removeChild(Last)
          }
        }
      }
      func(select)
      func(link)
      header.map(item => {
        item.id = item.innerText
      })
      const videos = _("video")
      for (const video of videos) {
        video.autoplay = true
        video.muted = "muted"
        video.loop = true
        video.controls = false
      }
    }, 100)
    return this
  }
  // 给图片添加点击事件
  Enlarge(select) {
    setTimeout(() => {
      const temp = _(`${select} img`)
      for (let item = 0; item < temp.length; item++) {
        temp[item].onclick = (e) => {
          e.stopPropagation()
          this.Home.Enlarge({
            image:
              Object.keys(temp).map(i => temp[i].src),
            self: item,
            transform: [e.offsetX, e.offsetY]
          })
        }
      }
    }, 100);
    return this
  }
  // 判断登录装饰器
  Decorator(func, data) {
    if (store.state.info.id) {
      func(data)
    } else {
      Message({
        type: "error",
        message: "登录后再试!"
      })
      setTimeout(() => {
        location.href = "/login"
      }, 1000);
    }
  }
  Recursive({ list, meta }) {
    for (const item of list) {
      item.meta = meta
      if (item.children) {
        this.Recursive({ list: item.children, meta })
      }
    }
    return list
  }
  scroll = () => {
    const scroll = document.body.classList
    scroll.value == "scroll" ? scroll.remove("scroll") : scroll.add("scroll")
    return this
  }
  data = {
    slide: "",
    count: 0,
  }
  Remove = (select) => {
    document.body.removeChild(document.querySelector(select))
    return this
  }
  // 课程、知识库演示功能
  async Slide({ content, catalog, fun }) {
    const Boz = Vue.extend(Slide)
    this.data.slide = new Boz().$mount()
    this.data.slide._data.box = content.slide
    this.data.slide._data.catalog = catalog
    this.data.slide._data.fun = fun
    if (!_("#slide-box")[0]) {
      document.body.appendChild(this.data.slide.$el)
    } else {
      _("#slide-box")[0].style.display = "flex"
    }
  }
  // 课程翻译方法
  Fanyi() {

  }
  async UPLOAD({ type = "editor", fun, file }) {
    if (!file) return;
    if (file.size / 1024 / 1024 < 5) {
      const form = new FormData();
      form.append(type, file);
      const res = await Fetch.upload.img({
        data: form,
        type,
      });
      this.Home.Message({
        res: res.data,
        fun,
      })
    } else {
      this.$message({
        message: "图片大小不能超过5M",
        type: "error",
      });
    }

  }
  template = {
    Direct: "",
    verification: "",
    Email: ""
  }
  Collect = async ({ fun, collect, id }) => {
    if (!store.state.info.id) { window.location = "/login"; return }
    const { data: { list, array } } = await Fetch.Home.Collect({
      id,
      alias: store.state.info.alias
    })
    this.Home.Collect({
      list, id, array, collect, render: this.render,
      fun: (collect) => {
        fun(collect)
      }
    })
    return
  }
  Attention = async ({ method, data, fun }) => {
    if (!store.state.info.id) {
      window.location = "/login";
      return true;
    }
    if (store.state.info.id === data.follower_id) {
      Message({
        message: "你每时每刻都在关注自己!"
      })
      return
    }
    const Res = await Fetch.Space.Follower({
      method,
      data
    })
    this.Home.Message({
      res: Res.data,
      fun,
    })
  }
  Home = {
    Reduce(list) {
      const lists = []
      if (list.length < 3) {
        lists.push(list)
      } else {
        let len = list.length / 3;
        len = Math.round(len)
        list.reduce(self => {
          if (self <= list.length - 1) {
            lists.push(list.slice(self, self + len));
            self += len;
          }
          return self;
        }, 0);
      }
      return lists
    },
    // 点赞方法
    Like: async (obj) => {
      if (!store.state.info.id) {
        window.location = "/login"
        return;
      }
      const data = {
        author_id: store.state.info.id,
      }
      data[obj.type] = obj.id
      const fetch = async (method = "post") => {
        const home = await Fetch.Home.Like({
          method,
          data,
        })
        return home.data
      }
      // 判断是否已经赞过
      if (obj.like.author !== store.state.info.id) {
        this.Home.Message({
          res: await fetch(),
          fun() {
            obj.like.count++;
            obj.like.author = store.state.info.id;
          }
        })
      } else {
        this.Home.Message({
          res: await fetch('delete'),
          fun() {
            obj.like.count--;
            obj.like.author = "";
          }
        })
      }
    },
    // 评论方法
    Comment: async (obj) => {
      if (!obj.content.trim()) {
        Message({
          type: "error",
          message: "内容不能为空!"
        })
        return
      }
      if (obj.content.length >= 220) {
        Message({
          type: "error",
          message: "最多发表220个字符"
        })
        return
      }
      const data = {
        content: xss(obj.content),
        article_id: obj.id,
        ait: obj.ait
      }
      if (obj.pre_comment_id) data.pre_comment_id = obj.pre_comment_id
      const res = await Fetch.Home.Comment({
        method: "post",
        data,
      });
      if (obj.fun) {
        this.Home.Message({
          res: res.data,
          fun: () => {
            obj.fun()
          }
        })
      }
      return res.data.code === 0 ? true : false
    },
    // 请求后成功的方法
    Message({ res, fun, def }) {
      if (res.code === 0 || res.errno === 0) {
        fun && fun(res)
        if (res.message) {
          Message({
            type: "success",
            message: res.message,
          })
        }
      } else {
        def && def()
        Message({
          type: "error",
          message: res.message,
        })
      }
    },
    // 移出移出方法
    Hover({ dom, enter, leave, date = 200 }) {
      let time;
      let ent;
      _(dom)[0].onmouseenter = () => {
        clearTimeout(time)
        // 节流防抖
        ent = setTimeout(enter, date)
      }
      _(dom)[0].onmouseleave = () => {
        clearTimeout(ent)
        // 节流防抖
        time = setTimeout(leave, date)
      }
      return this
    },
    // 调用式组件收藏组件
    Collect: ({ list, id, array, collect, fun }) => {
      const Boz = Vue.extend(Collect)
      const vm = new Boz().$mount()
      vm._data.info = list
      vm._data.type = "article"
      vm._data.id = id
      vm._data.array = array
      vm._data.tuples = array
      vm._data.collect = collect
      vm._data.fun = fun
      document.body.appendChild(vm.$el)
    },
    // 调用式组件课程组件
    Operate: ({ options, ensure, info }) => {
      const Boz = Vue.extend(Operate)
      const vm = new Boz().$mount()
      vm._data.options = options
      if (info) {
        vm._data.title = "修改课程"
        vm._data.info = info;
      }
      vm._data.ensure = ensure
      if (!_(".el-dialog__wrapper")[0]) {
        document.body.appendChild(vm.$el)
      }
    },
    // 调用式组件标签组件
    Tag({ options, info, ensure }) {
      const Boz = Vue.extend(Tag)
      const vm = new Boz().$mount()
      vm._data.options = options
      if (info) {
        vm._data.title = "修改标签"
        vm._data.info = info;
      }
      vm._data.ensure = ensure
      // if (!_(".el-dialog__wrapper")[0]) {
      //   document.body.appendChild(vm.$el)
      // }
    },
    // 调用式组件查看图片组件
    Enlarge(obj) {
      const Boz = Vue.extend(Enlarge)
      const vm = new Boz({
        data() {
          return obj
        }
      }).$mount()
      document.body.appendChild(vm.$el)
    },
    Relevance({ options }) {
      const Relevanc = Vue.extend(Relevance)
      const vm = new Relevanc({
        data() {
          return {
            options,
          }
        }
      }).$mount()
    },
    Direct: ({ obj }) => {
      if (!_(".direct-box")[0]) {
        const Boz = Vue.extend(Direct)
        this.template.Direct = new Boz().$mount()
        document.body.appendChild(this.template.Direct.$el)
      }
      else
        this.template.Direct.boolean = true
      this.template.Direct.info = obj
    },
    // 处理搜索高亮
    Trie(dict) {
      const { former, topic } = dict
      for (const item of topic) {
        const index = item.text.search(new RegExp(former, "i"))
        if (index !== -1) {
          const match = item.text.match(new RegExp(former, "i"))
          const res = match.input.replace(new RegExp(former, "i"), `<em>${match[0]}</em>`);
          item.xinde = res
        }
      }
      return topic
    }
  }
  Render = (main) => {
    let tag;
    if (main.sel) {
      tag = document.createElement(main.sel)
    } else {
      let text;
      main.text ? text = main.text : text = ''
      tag = document.createTextNode(text)
    }
    const data = main.data
    if (data) {
      data.class ? tag.className = data.class : null
      data.style ? tag.style.cssText = data.style : null
      if (data.on) {
        Object.keys(data.on).map(item => {
          tag.addEventListener(item, data.on[item])
        })
      }
      if (data.attrs) {
        Object.keys(data.attrs).map(item => {
          tag.setAttribute(item, data.attrs[item])
        })
      }
    }
    if (main.text) {
      tag.textContent = main.text
    }
    if (main.children) {
      const Day = (list) => {
        for (let item of list) {
          if (item instanceof Array) {
            Day(item)
          }
          const children = this.Render(item)
          tag.appendChild(children)
        }
      }
      Day(main.children)
    }
    return tag
  }
  Fication({ letiable, component, obj }) {
    // 封装调用式组件
    if (!letiable) {
      const Boz = Vue.extend(component)
      letiable = new Boz().$mount()
      document.body.appendChild(letiable.$el)
      letiable._data.obj = obj

    } else {
      letiable._data.boolean = true
    }
  }
  async Enroll({ email, warning, effect, init, boolean = true }) {
    if (!Regular.Email().test(email && email.trim()) && boolean) {
      warning && warning.fun()
    } else {
      warning && warning.def()
      let [code, time, obj] = [60];
      const { data } = await Fetch.Login.Enroll({
        email: email && email.trim(),
        effect,
      });
      this.Home.Message({
        res: data,
        fun: () => {
          time = setInterval(() => {
            code--;
            if (code <= 0) {
              init.title = "获取验证码"
              init.name = false
              clearInterval(time);
            } else {
              init.title = `(${code})秒重新发送`
              init.name = true
              // update(code)
            }
          }, 1000);
        }
      })
      return obj
    }

  }
  Space = {
    Verification: (obj) => {
      // 邮箱验证
      this.Fication({
        letiable: this.template.verification,
        component: Verification,
        obj
      })
    },
    Email: async (obj) => {
      // 修改邮箱
      const component = await import("@/components/func/Email.vue")
      this.Fication({
        letiable: this.template.Email,
        component: component.default,
        obj
      })
    },
    Password: async (obj) => {
      // 设置密码
      const component = await import("@/components/func/Password")
      this.Fication({
        letiable: this.template.Password,
        component: component.default,
        obj
      })
    },
    Way: async () => {
      // 个人路径
      const component = await import("@/components/func/Way")
      this.Fication({
        letiable: this.template.Way,
        component: component.default,
      })
    },
    OldWay: async () => {
      const component = await import("@/components/Space/Way")
      this.Fication({
        letiable: this.template.OldWay,
        component: component.default,
      })
    }
  }
  //动画
  Animation = ({ box, actives }) => {
    setTimeout(() => {
      const active = _(box)[0].classList
      if (!Object.values(active).includes(actives)) {
        active.add(actives)
      } else {
        active.remove(actives)
        setTimeout(() => {
          active.add(actives)
        }, 0)
      }
    }, 0);
  }
  Article = {
    // 置顶评论
    topComment(info) {
      const arrar = info.filter(item => {
        return item.author.top !== 0
      })
      const unshift = info.filter(item => {
        return item.author.top === 0
      })
      return [...unshift, ...arrar]
    }
  }
}
export default new Def()