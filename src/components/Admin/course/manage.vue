<template>
  <main id="main-box">
    <header class="stick button">
      <button @click="Catalog()">添加目录</button>
      <button>管理目录</button>
      <button>管理内容</button>
      <button>管理标题</button>
    </header>
    <header class="title-box button">
      <div class="title">
        <h2>{{ info.name }}</h2>
        <p>{{ info.introduce }}</p>
      </div>
      <i v-html="info.svgImg"></i>
    </header>
    <div class="box" v-for="item of info.catalog" :key="item.id">
      <div class="head">
        <h4 @click="Router(item.id)">{{ item.name }}</h4>
        <el-checkbox v-model="checked" />
      </div>
      <div class="list">
        <div v-for="hove of item.title" :key="hove.id">
          <span @click="Link(hove.id)">{{ hove.name }}</span>
          <span v-for="def of hove.catalog" :key="def.id">{{ def.hash }}</span>
        </div>
      </div>
    </div>
    <Input :options="title === '添加目录' ? [info] : catalog" :title="title" @cancel="cancel" :submit="submit"
      :dialog="dialog" />
  </main>
</template>
<script>
import Input from './Input.vue';
export default {
  name: 'Manage',
  data() {
    return {
      info: [],
      catalog: [],
      dialog: false,
      title: "添加目录",
      checked: true
    }

  },
  components: { Input },
  async mounted() {
    this.Render()
  },
  methods: {
    cancel(val) {
      this.dialog = val
    },
    async Render() {
      const { data } = await this.Fetch.Admin.course.Course({
        method: "put",
        data: {
          id: this.$route.query.id,
        }
      })
      this.info = data
      this.catalog = data.catalog
    },
    async submit(obj) {
      let data;
      if (this.title === "添加目录") {
        data = await this.Fetch.Admin.course.Catalog().add(obj)
      } else {
        data = await this.Fetch.Admin.course.Title().add({
          title: obj.name,
          course_title_id: obj.course_id
        })
      }
      this.Def.Home.Message({
        res: data.data,
        fun: () => {
          this.cancel(false)
        }
      })
    },
    Catalog() {
      this.title = "添加目录"
      this.dialog = true
    },
    Link(id) {
      location.href = `/admin/course/${this.info.name}/update?id=${id}`
    },
    Router(id) {
      location.href = `/admin/course/${this.info.name}/add?id=${id}`
    }
  },
}
</script>
<style scoped lang="less">
header.title-box {
  justify-content: space-between;
  overflow: hidden;
  position: sticky;
  top: 187px;
  z-index: 9;

  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  /deep/svg {
    width: 160px;
    height: 160px;
    position: absolute;
    right: 30px;
    top: 5px;
  }
}

.flex {
  display: flex;
  flex-direction: column;
}

h4 {
  cursor: pointer;

  &:hover {
    color: var(--main-color);
  }
}

.stick {
  position: sticky;
  top: 87px;
  z-index: 10;
}

.box {
  padding: 20px;
  background: var(--tint-color);
  grid-gap: 10px;

  .head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--tint-solid);
  }

  h4 {
    padding-bottom: 10px;
  }

  .list {
    .flex();

    >div {
      padding: 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--tint-solid);
      grid-gap: 5px;

      span {
        cursor: pointer;

        &:hover {
          color: var(--main-color);
        }

        &:first-child {
          font-weight: bold;
        }

        &:not(:first-child) {
          display: flex;
          grid-gap: 5px;

          &::before {
            content: "/";
            color: #c0c4cc;
          }
        }
      }
    }
  }
}
</style>