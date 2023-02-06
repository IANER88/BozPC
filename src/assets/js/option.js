import { DomEditor } from "@wangeditor/editor"
import { h, VNode } from 'snabbdom'
import { Editor, Transforms, Text, Point, Node } from 'slate'
import $ from "jquery"


class Option {
  constructor() {
    this.title = "选项"
    this.iconSvg = `<svg t="1662988689650" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2431" width="32" height="32"><path d="M928 960l-832 0C78.336 960 64 945.664 64 928l0-64C64 846.336 78.336 832 96 832l832 0c17.664 0 32 14.336 32 32l0 64C960 945.664 945.664 960 928 960zM928 576l-832 0C78.336 576 64 561.664 64 544l0-64C64 462.336 78.336 448 96 448l832 0C945.664 448 960 462.336 960 480l0 64C960 561.664 945.664 576 928 576zM928 192l-832 0C78.336 192 64 177.664 64 160l0-64C64 78.336 78.336 64 96 64l832 0C945.664 64 960 78.336 960 96l0 64C960 177.664 945.664 192 928 192z" p-id="2432"></path></svg>`
    this.tag = 'button'
    this.showDropPanel = true
  }
  getValue(editor) {
    return ''
  }

  isActive(editor) {
    const node = DomEditor.getSelectedNodeByType(editor, 'option')
    return !!node
  }

  isDisabled(editor) {
    if (editor.selection == null) return true

    const [nodeEntry] = Editor.nodes(editor, {
      match: n => {
        const type = DomEditor.getNodeType(n)

        // 只可用于 p 和 blockquote
        if (type === 'paragraph') return true
        if (type === 'option') return true

        return false
      },
      universal: true,
      mode: 'highest', // 匹配最高层级
    })

    // 匹配到 p blockquote ，不禁用
    if (nodeEntry) {
      return false
    }
    // 未匹配到，则禁用
    return true
  }
  exec(editor) {

  }
  getPanelContentElem(editor) {
    const $list = $(`
      <ul class="option-ul">
        <li>提示</li>
        <li>警告</li>
        <li>危险</li>
      </ul>
    `)

    $list.on('click', 'li', (e) => {
      if (this.isDisabled(editor)) return
      const active = this.isActive(editor)
      const newType = active ? 'paragraph' : 'option'

      // 执行命令
      Transforms.setNodes(editor, { type: newType, title: e.target.innerText }, { mode: 'highest' })
    })

    return $list[0]
  }
}

const option = {
  key: 'option',
  factory() {
    return new Option()
  },
}
function withOption(editor) {
  const { insertBreak, insertText } = editor
  const newEditor = editor

  // 重写 insertBreak - 换行时插入 p
  newEditor.insertBreak = () => {
    const { selection } = newEditor
    if (selection == null) return insertBreak()

    const [nodeEntry] = Editor.nodes(editor, {
      match: n => DomEditor.checkNodeType(n, 'option'),
      universal: true,
    })
    if (!nodeEntry) return insertBreak()

    const quoteElem = nodeEntry[0]
    const quotePath = DomEditor.findPath(editor, quoteElem)
    const quoteEndLocation = Editor.end(editor, quotePath)

    if (Point.equals(quoteEndLocation, selection.focus)) {
      // 光标位于 option 最后
      const str = Node.string(quoteElem)
      if (str && str.slice(-1) === '\n') {
        // option 文本最后一个是 \n
        editor.deleteBackward('character') // 删除最后一个 \n

        // 则插入一个 paragraph
        const p = { type: 'paragraph', children: [{ text: '' }] }
        Transforms.insertNodes(newEditor, p, { mode: 'highest' })
        return
      }
    }

    // 情况情况，插入换行符
    insertText('\n')
  }

  // 返回 editor ，重要！
  return newEditor
}
const select1 = {
  'tip': '提示',
  'warning': '警告',
  'error': '危险',
}
const select = {
  '提示': 'tip',
  '警告': 'warning',
  '危险': 'error',
}
function RenderTemptale(name, children, editor) {
  const node = h(
    'div',
    {
      className: `${select[name.title]} option`
    },
    [
      h('p', null, name.title),
      h('div', null, children)
    ]
  )
  return node
}
function OptionTemlate(elem, children) {
  // 生成 HTML 代码
  const html = `<div class="${select[elem.title]} option"  
    data-w-e-type="option" data-type="${select[elem.title]}">
    <p>${elem.title}</p>
    <div>${children}</div>
  </div>`
  return html
}

function parseAttaOptionHtml(domElem, children, editor) {
  const title = domElem.getAttribute("data-type")
  const [list, ...arrar] = children
  return {
    type: 'option',
    title: select1[title],
    children: arrar,
  }
}
export const Model = {
  menus: [option],
  editorPlugin: withOption,
  renderElems: [
    {
      type: 'option',
      renderElem: RenderTemptale,
    }
  ],
  elemsToHtml: [
    {
      type: 'option', // 新元素的 type ，重要！！！
      elemToHtml: OptionTemlate,
    }
  ],
  parseElemsHtml: [
    {
      selector: 'div[data-w-e-type="option"]', // CSS 选择器，匹配特定的 HTML 标签
      parseElemHtml: parseAttaOptionHtml,
    }
  ]
}