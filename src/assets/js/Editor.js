import { Boot } from "@wangeditor/editor";
import Module from "@wangeditor/plugin-link-card";
import { Model } from "@/assets/js/option"
import Markdown from '@wangeditor/plugin-md'
import Fetch from "./Fetch"
import _ from "jquery"
Boot.registerModule(Markdown)
Boot.registerModule(Module);
Boot.registerModule(Model)


export default {
  placeholder: "请输入内容...",
  hoverbarKeys: {
    // 在编辑器中，选中链接文本时，要弹出的菜单
    link: {
      menuKeys: [
        'editLink', 'unLink', 'viewLink', // 默认的配置可以通过 `editor.getConfig().hoverbarKeys.link` 获取
        'convertToLinkCard' // 增加 '转为链接卡片'菜单
      ],
    },
    table: {
      menuKeys: []
    },
    text: {
      menuKeys: []
    },
  },
  // 其他...
  MENU_CONF: {
    convertToLinkCard: {
      async getLinkCardInfo(linkText, link) {
        return new Promise(async resolve => {
          let img = ""
          const fun = (text) => {
            for (const h of text) {
              if (h.localName === "img") {
                img = h.src
              }
              if (h.children.length && !img) {
                fun(h.children)
                // if (!img) {
                //   const str = new XMLSerializer().serializeToString(_(h.outerHTML)[0]);
                //   // 通过window.btoa() 方法用于创建一个 base-64 编码的字符串
                //   img = `data:image/svg+xml;base64,${window.btoa(str)}`;
                // }
              }
            }
          }
          const data = await Fetch.Editor.HTML(link)
          const html = _(data.data.html)
          for (const i of html) {
            if (['body', 'div', "main"].includes(i.localName)) {
              fun(i.children)
            }
          }
          const obj = {
            title: linkText
          }
          if (img) obj.iconImgSrc = img
          console.log(obj);
          setTimeout(() => {
            resolve(obj)
          }, 200)
        })
      }
    },
    // 上传图片
    uploadImage: {
      fieldName: "editor",
      withCredentials: true,
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 5 * 1024, // 5kb
      server: 'http://fetch.bozhan.top/admin/upload/image/editor',
    },
  },
}