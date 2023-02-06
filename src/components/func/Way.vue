<template>
  <main id="way-box" class="full-box">
    <div class="way-main-box" @click.stop>
      <header>
        <span>输入一个新的路径</span>
        <i class="el-icon-close" @click="close()" />
      </header>
      <div class="way-content-box">
        <el-input placeholder="请输入路径" v-model.trim="alias" :class="{ error: error.boolean }">
          <template slot="prepend">http://{{ host }}/space/</template>
        </el-input>
        <p>{{ error.title }}</p>
      </div>
      <div class="way-bottom-box">
        <el-button size="small" type="primary" @click="submit()">确认</el-button>
      </div>
    </div>
  </main>
</template>
<script>
import store from '@/assets/js/Store'
export default {
  name: 'Way',
  data() {
    return {
      host: location.host,
      alias: store.state.info.alias,
      error: {
        boolean: false,
        title: ""
      }
    }
  },
  mounted() {
    this.Def.scroll()
  },
  methods: {
    async submit() {
      const { data } = await this.Fetch.Space.Manage({
        method: "delete",
        data: {
          alias: this.alias
        }
      })
      if (data.message === "路径已经存在") {
        this.error = {
          boolean: true,
          title: data.message
        }
      } else {
        this.Def.Home.Message({
          res: data,
          fun: () => {
            this.close()
            location.href = `/space/${data.alias}`
          }
        })
      }
    },
    close() {
      this.Def.Remove("main#way-box").scroll()
    }
  }
}
</script>
<style scoped lang="less">
.way-main-box {
  width: 520px;
  height: 207px;
  flex-direction: column;
  justify-content: space-between;

  .way-content-box {
    display: flex;
    gap: 10px;
    flex-direction: column;

    p {
      height: 20px;
      color: var(--error);
    }
  }
}
</style>