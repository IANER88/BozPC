<template>
  <nav :class="`catalog-box ${sticky}`">
    <div class="title">大纲</div>
    <div class="content-box">
      <div class="box" v-for="(item, index) of catalog" :key="index">
        <span @click="Hash(item)" :id="item.hash">{{ item.hash }}</span>
        <ol>
          <li v-for="(list, each) of item.list" :key="each" :id="list.hash" @click="Hash(list)">
            {{ list.hash }}
          </li>
        </ol>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Catalog',
  data() {
    return {}
  },
  props: {
    catalog: {},
    sticky: { default: "sticky" }
  },
  methods: {
    Hash(item) {
      console.log(item.id);
      this.sticky === "sticky" ? this.Def.toHash(`#${item.hash}`) : this.Def.toHash(`#${item.id}`)
    }
  }
}
</script>
<style scoped lang="less">
.catalog-box {
  &.sticky {
    position: sticky;
    top: 85px;
    width: 215px;
    height: 100vh;
    padding-top: 20px;
  }

  &.flex {
    position: fixed;
    width: 220px;
    top: 173px;
    right: 70px;

    .content-box {
      height: 65vh;
    }
  }

  .title {
    font-weight: bold;
    padding: 0 25px;
  }

  .content-box {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    overflow-y: auto;
    height: 80vh;

    &::-webkit-scrollbar {
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 10px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      background: none;
    }

    .active {
      border-left-color: var(--main-color) !important;
      color: var(--main-color);
    }

    .box {

      >span,
      li {
        height: 40px;
        cursor: pointer;
        align-items: center;
        padding-left: 25px;
        border-left: 3px solid var(--course-solid);
        transition: all .3s;
        overflow: hidden;
        line-height: 40px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;

        &:hover {
          .active()
        }
      }

      li {
        padding: 0 40px !important;
      }
    }
  }
}
</style>