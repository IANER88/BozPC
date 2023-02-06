import { _ } from "/src/assets/js/Def";

export function setItem(name, text) {
  return localStorage.setItem(name, text)
}

export function getItem(name) {
  return localStorage.getItem(name)
}
export function unItem(name) {
  return localStorage.removeItem(name)
}
export function Theme() {
  const dark = getItem("theme");
  if (dark) {
    _("html")[0].className = "dark";
  }
}
class LocaL {
  get(name) {
    return localStorage.getItem(name)
  }
  set({ name, text }) {
    return localStorage.setItem(name, text)
  }
  del(name) {
    return localStorage.removeItem(name)
  }
}

export default new LocaL()