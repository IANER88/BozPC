<template>
  <main id="article-box">
    <header>
      <h4>{{ title }}</h4>
      <slot />
    </header>
    <div class="article-main-box">
      <el-timeline>
        <el-timeline-item v-for="item of info" :key="item.id" :timestamp="item.time" placement="top">
          <Article :item="item" :mount="mount" />
        </el-timeline-item>
      </el-timeline>
    </div>
  </main>
</template>
<script>
import Article from '../Home/Parts/Article';
export default {
  name: "Live",
  props: {
    title: {
      default: "文章"
    },
    info: {},
    mount: {}
  },
  components: { Article },
}
</script>
<style scoped lang="less">
#article-box {
  header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--tint-solid);

    /deep/.header-box {
      color: #76839b;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;

      i {
        display: flex;
        align-items: center;
      }
    }
  }

  /deep/.el-timeline-item__content {
    color: unset !important;
  }

  // /deep/.el-timeline {
  //   overflow-y: auto;
  //   height: 49vh;

  //   &::-webkit-scrollbar {
  //     /*高宽分别对应横竖滚动条的尺寸*/
  //     width: 10px;
  //     background-color: none
  //   }

  //   &::-webkit-scrollbar-thumb {
  //     height: 50%;
  //     width: 10px;
  //     border-radius: 30px;
  //     background-color: var(--course-solid);
  //   }
  // }

  .article-main-box {
    display: flex;
    flex-direction: column;
    padding: 15px 0;

    /deep/.el-card__body {
      padding: 5px;
    }
  }
}
</style>