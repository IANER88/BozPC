<template>
  <main id="main-box">
    <header class="button">
      <button @click="add()">添加标签</button>
      <button>修改标签</button>
      <button>管理标签</button>
      <button>添加题目</button>
    </header>
    <div class="box">
      <div v-for="item of options" :key="item.id" @click.right.prevent="Floating(item.id)">
        <div class="main-box" @click.stop="Link(item.id)">
          <i v-html="item.svgImg" />
          <p>
            <span>{{ item.name }}</span>
            <span>{{ item.englishName }}</span>
          </p>
        </div>
        <div class="floating-box" v-show="index === item.id">
          <div @click="del(item)">删除课程</div>
          <div @click="updata(item)">修改课程</div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      tag: [],
      index: "",
      type: "",
      options: []
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Admin.Tag({})
    this.options = data.type
  },
  methods: {
    add() {
      this.Def.Home.Tag({ options: this.options, ensure: this.ensure })
    },
    async ensure(obj) {
      const resolve = await this.Fetch.Admin.Tag({ method: "post", data: obj })
      this.Def.Home.Message({
        res: resolve.data,
        message: this.$message,
        fun: () => {
          // 清空属性值
          obj = {
            tag: {
              text: "",
              englishName: "",
            },
            type: []
          }
        }
      })
      return obj
    },
    Floating(id) {
      this.index = id
    },
    del() {

    },
    updata() {

    }
  },
  watch: {
    async type(name) {
      const { data } = await this.Fetch.Admin.Tag({ method: "put", name })
      this.tag = data.content
    },
  }
}
</script>
<style scoped lang="less">
.box {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  cursor: pointer;
  gap: 15px;
  position: relative;
  background: var(--tint-color);

  .main-box {
    background: #f1f0f0;
    border-radius: 8px;
    display: flex;
    padding: 10px;
    gap: 10px;

    /deep/svg {
      width: 45px;
      height: 100%;
    }

    p {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        &:first-child {
          font-weight: 700;
        }
      }
    }
  }

  .floating-box {
    position: absolute;
  }
}
</style>