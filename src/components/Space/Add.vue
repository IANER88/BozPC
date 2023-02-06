<template>
  <transition name="el-fade-in-linear">
    <main id="add-collect-box" class="full-box">
      <div class="add-collect-main-box" @click.stop>
        <header>
          <span>{{ title }}</span>
          <i class="el-icon-close" @click="close()" />
        </header>
        <div class="add-collect-content-box">
          <span :class="{ error }">{{ olds }}</span>
          <el-input placeholder="请输入分组名称" v-model.trim="news" :class="{ error }" @keyup.enter.native="submit()" />
          <el-radio-group v-model="state" size="small">
            <el-radio-button label="公开" />
            <el-radio-button label="私密" />
          </el-radio-group>
        </div>
        <div class="add-collect-bottom-box">
          <el-button size="small" @click="close()">取消</el-button>
          <el-button type="primary" size="small" @click="submit()">确认</el-button>
        </div>
      </div>
    </main>
  </transition>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      news: "",
      olds: "收藏夹名称",
      state: "私密",
      error: false
    }
  },
  mounted() {
    this.news = this.name
    this.state = this.State(this.visible)
    this.Def.scroll()
  },
  props: ["title", "name", "id", "visible"],
  methods: {
    State(state, boolean = true) {
      if (boolean) return state === 0 ? "公开" : "私密"
      if (!boolean) return state === "公开" ? 0 : 1
    },
    close() {
      this.$emit("close", false)
      this.Def.scroll()
    },
    async Live({ alias, id }) {
      const { data } = await this.Fetch.Home.Collect({
        method: "post",
        alias,
        id,
        data: {
          name: this.news,
          state: this.State(this.state, false),
        }
      })
      this.Def.Home.Message({
        res: data,
        fun: () => {
          this.close()
        }
      })
    },
    async submit() {
      if (!this.news) {
        this.error = true
        this.olds = "请输入收藏夹名称"
        return
      }
      this.error = false
      this.olds = "收藏夹名称"
      switch (this.title) {
        case "添加收藏夹":
          this.Live({
            alias: "add",
          })
          break
        case "编辑收藏夹":
          this.Live({
            alias: "update",
            id: this.id
          })
          break
      }
    },

  }
}
</script>
<style scoped lang="less">
.add-collect-main-box {
  display: flex;
  width: 400px;
  height: 258px;
  flex-direction: column;
  justify-content: space-between;

  .add-collect-bottom-box {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid var(--tint-solid);
  }

  .add-collect-content-box {
    display: flex;
    gap: 10px;
    flex-direction: column;

    span {
      font-size: 14px;
    }
  }
}
</style>