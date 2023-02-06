<template>
  <main id="oldway-box" class="full-box">
    <div class="way-main-box" @click.stop>
      <header>
        <span>更改个人路径</span>
        <i class="el-icon-close" />
      </header>
      <div class="way-content-box">
        <div class="way-title-box">
          更改个人路径后会发生以下事情，请知晓。
        </div>
        <ul>
          <li>更改个人路径以后，原个人路径将不归属于你</li>
          <li>原个人路径链接将无法访问，且不会进行跳转到新的个人路径。</li>
        </ul>
      </div>
      <div class="way-bottom-box">
        <el-button type="danger" size="small" @click="submit()" plain>确认修改</el-button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: "Way",
  data() {
    return {}
  },
  mounted() {
    this.Def.scroll()
  },
  methods:{
    submit(){
      this.Def.Remove("main#oldway-box").scroll()
      this.Def.Space.Way()
    }
  }
}
</script>
<style scoped lang="less">
.way-main-box {
  width: 520px;
  height: 274px;
  flex-direction: column;
  justify-content: space-between;

  .way-content-box {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .way-title-box {
      background: #f9efcd;
      border: 1px solid #f5d480;
      padding: 10px;
      border-radius: 5px;
    }

    ul {
      display: flex;
      gap: 10px;
      flex-direction: column;
      padding-left: 18px;

      li {
        font-size: 14px;
      }
    }
  }

  .way-bottom-box {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>