import { h } from "snabbdom"
class Boz {
  proxy() {
    class proxyImp {
      // _oldVal: any

      // setState: Function
      constructor(newVal) {
        this.val = newVal
      }
    }
    const main = (obj) => {
      return new Proxy(obj, {
        get(target, key) {
          return target[key]
        },
        set(target, key, value) {
          target[key] = value
          this.render()
          return true
        }
      })
    }
    // const { toString } = Object.prototype
    // if (toString.call(val) === "[object Array]") {
    //   const METHODS = [
    //     'push',
    //     'pop',
    //     'shift',
    //     'unshift',
    //     'splice',
    //     'sort',
    //     'reverse',
    //   ]
    //   let arr_methods = Object.create(Array.prototype)
    //   METHODS.forEach((methods: any) => {
    //     arr_methods[methods] = function () {
    //       // console.log(`使用的是ARR_METHODS里面的 ${methods}方法`)
    //       [val, setState] = useState(val)
    //       if (methods === 'push') {
    //         console.log(val);

    //       }
    //       const res = Array.prototype[methods].apply(this, arguments)
    //       return res
    //     }
    //   })
    //   val.__proto__ = arr_methods
    //   return main(val)
    // } else {

    // }
    return main(new proxyImp(val))
  }
  state = {

  }
  analysis = (main) => {
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
  render() {

  }
}
export default new Boz()