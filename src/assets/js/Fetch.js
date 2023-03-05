import axios from "axios"
// axios.defaults.baseURL = "http://127.0.0.1:8000"
axios.defaults.baseURL = "http://fetch.bozhan.top"
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true
export default class Fetch {
  static Home = {
    Home() {
      return axios.get('/home')
    },
    Article({ name, id, method = "get" }) {
      const url = method === "patch" ? `/article?tag=${name}` :
        `/article?name=${name}&id=${id}`
      return axios(url, {
        method,
      })
    },
    Comment({ method, data, article, type }) {
      if (!type) {
        return axios(`/admin/comment`, {
          method,
          data
        })
      }
      return axios.get(`/admin/comment?article=${article}&type=${type}`)
    },
    Like({ data, method }) {
      return axios("/admin/like", {
        method,
        data,
      })
    },
    Notify({ method = "get", type }) {
      return axios(`/admin/notify?type=${type}`, { method })
    },
    Dynamic({ method = "get" }) {
      return axios(`/admin/dynamic`, {
        method
      })
    },
    Collect({ method = "get", data, id, alias }) {
      let url = "/admin/collect"
      if (alias) url = `/admin/collect?alias=${alias}`;
      if (id && alias) url = `/admin/collect?alias=${alias}&id=${id}`;
      return axios(url, {
        method,
        data
      })
    },
    History({ method = "get", number }) {
      return axios(`/history?number=${number}`, {
        method,
      })
    },
    Trie({ q }) {
      return axios(`/trie?q=${q}`, {
        method: "get"
      })
    },
    Search({ q, method = "get" }) {
      let url = `/search`
      if (method === "get") url = `/search?q=${q}`;
      return axios(url, {
        method
      })
    }
  }
  static Course({ method = "get", url = "/course" }) {
    return axios(url, {
      method,
    })
    
  }
  
  static Tool({ method = "get"}){
    return axios("/tool", {
      method,
    })
  }
  static Login = {
    Login(obj) {
      return axios("/login", obj)
    },
    Enroll(data) {
      return axios.post("/code", data)
    },
    Register(data) {
      return axios.post("/register", data)
    }
  }


  static upload = {
    img({ type = "editor", data }) {
      return axios.post(`/admin/upload/${type}`, data)
    }
  }

  static Account({ method = "put", alias, data }) {
    let url = `/admin/user`
    if (alias) url = `/admin/user?alias=${alias}`
    return axios(url, {
      method,
      data
    })
  }

  static Release = {
    Article({ method = 'get', id, data }) {
      const url = id ? `/admin/article?id=${id}` : "/admin/article"
      return axios(url, {
        method,
        data,
      })
    },
    Draft({ method = "get", data, id }) {
      const url = id ? `/admin/draft?id=${id}` : "/admin/draft"
      return axios(url, {
        method,
        data
      })
    },
    Select(name) {
      return axios(`/admin/user?name=${name}`)
    },
    Tag({ search, method = "get" }) {
      return axios(search ? `/tag?search=${search}` : "/tag", {
        method
      })
    },
  }

  static Space = {
    Space({ method = "get", alias }) {
      return axios(`/space?alias=${alias}`, {
        method,
      })
    },
    Manage({ method = "get", data }) {
      return axios("/admin/manage", {
        method,
        data
      })
    },
    Follower({ method = "get", data, alias }) {
      let url = '/follower'
      if (alias) url = `/follower?alias=${alias}`
      return axios(url, {
        method,
        data,
      })
    }
  }

  static Editor = {
    HTML(link) {
      return axios.put("/trie", {
        link
      })
    }
  }
}