import { Boot } from "@wangeditor/editor";
import Module from "@wangeditor/plugin-link-card";
Boot.registerModule(Module);

const editorConfig = {
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
  MENU_CONF: {
    // '转为链接卡片'菜单的配置
    convertToLinkCard: {
      // 自定义获取 link-card 信息，可选
      // 返回 { title, iconImgSrc }
      async getLinkCardInfo(linkText) {
        // 1. 可通过 iframe 加载网页，然后获取网页 title 和其中的图片
        // 2. 服务端获取（有些网页会设置 `X-Frame-Options` ，无法通过 iframe 加载）

        // 模拟异步返回
        return new Promise(resolve => {
          setTimeout(() => {
            const info = { title: linkText, iconImgSrc: '' }
            resolve(info)
          }, 100)
        })
      }
    },
    // 上传图片
    uploadImage: {
      server: 'http://192.168.1.102/admin/upload/image',
    }
  },
}

export default editorConfig