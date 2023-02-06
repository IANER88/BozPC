<template>
  <main id="audit-box">
    <Nav />
    <div class="box">
      <Logo :href="false" />
      <div class="title">
        <h1>提交成功！文章审核中</h1>
        <div class="bottom">
          <el-button type="success" @click="view()">查看文章</el-button>
          <el-button @click="editor()">重新编辑</el-button>
          <el-button type="primary" @click="write()">再写一篇</el-button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Logo from '../Logo.vue';
import Nav from '@/components/Home/Nav';
export default {
  name: 'Audit',
  data() {
    return {}
  },
  components: { Nav, Logo },
  methods: {
    view() {
      const { id, alias } = this.$route.params
      location.href = `/article/${alias}/${id}`
    },
    editor() {
      const { id } = this.$route.params
      location.href = `/release/update?id=${id}`
    },
    write() {
      location.href = `/release/add`
    }
  }
}
</script>
<style scoped lang="less">
.box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 92vh;
  align-items: center;
  gap: 20px;

  .title {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h1 {
    font-size: 50px;
    font-family: "创客贴金刚体";
    background: -webkit-linear-gradient(315deg, #42d392 25%, var(--main-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /deep/.nologo {
    width: 300px;
    height: 300px;

    svg {
      width: 100%;
      height: 100%;
    }

  }
}
</style>