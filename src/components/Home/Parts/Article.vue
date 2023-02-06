<template>
  <div class="blog-box-new">
    <div class="blog-news-box-img" v-if="item.image">
      <!-- 标题 -->
      <div class="blog-news-title">
        <a target="_blank" :href="`/article/${item.author.alias}/${item.id}`">
          {{ item.title }}</a>
      </div>
      <div class="blog-news-content">
        <!-- 图片 -->
        <div class="blog-cont-img">
          <img :src="item.image" alt="" />
        </div>
        <div class="blog-cont-box">
          <div class="blog-cont-desc">
            {{ item.abridged }}
          </div>
          <Like :item="item" :render="render" />
        </div>
      </div>
    </div>
    <div class="blog-news-box" v-else>
      <!-- 标题 -->
      <div class="blog-news-title">
        <a target="_blank" :href="`/article/${item.author.alias}/${item.id}`">
          {{ item.title }}
        </a>
      </div>
      <div class="blog-news-content">
        <div class="blog-cont-box">
          <div class="blog-cont-desc">{{ item.abridged }}</div>
          <Like :item="item" :render="render" :mount="mount" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Like from '../Like';
export default {
  name: 'Article',
  data() {
    return {}
  },
  props: {
    item: {
      default: [
        {
          author: {
            name: ""
          }
        }
      ]
    },
    render: {

    },
    mount: {

    }
  },
  mounted() {
    this.Def.Enlarge(".blog-cont-img")
  },
  components: { Like }
}
</script>
<style lang="less">
.blog-type {
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--tint-solid);
  align-items: center;

  ul {
    list-style: none;
    display: flex;

    &:nth-child(1) {
      width: 35%;
      justify-content: space-between;
    }

    &:nth-child(2) {
      width: 50%;
      flex-direction: row-reverse;
    }

    a {
      text-decoration: none;
      color: var(---headlines-color);
    }
  }
}

.blog-news-box-img {
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 1px var(--tint-solid) solid;

  .blog-news-content {
    height: 70%;
    display: flex;
    justify-content: space-between;

    .blog-cont-img {
      width: 15%;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--tint-solid);
      &:hover {
        cursor: zoom-in;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .blog-cont-box {
      display: flex;
      width: 84%;
      justify-content: space-between;
      flex-direction: column;

      .blog-cont-desc {
        width: 100%;
        height: 60%;
        -webkit-line-clamp: 3;
      }

      .blog-cont-up {
        height: 38%;

        .up-left-box {
          display: flex;
        }
      }
    }
  }
}

.blog-news-title {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 25%;

  a {
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    color: var(--color);

    &:hover {
      text-decoration: underline;
    }
  }
}

.blog-cont-desc {
  font-size: 14px;
  font-weight: 400;
  color: var(--article-color);
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.up-left-box {
  display: flex;
  justify-content: space-between;

  .like {
    width: 68%;
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    >div {
      display: flex;

      i,
      span {
        .flex();
      }

      span {
        margin-left: 4px;
      }

      svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }

  .username {
    .flex();
  }
}

.blog-box-new {
  &:hover {
    background: var(--background);
  }
}

.blog-news-box {
  display: flex;
  flex-direction: column;
  height: 140px;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 1px var(--tint-solid) solid;

  .blog-news-content {
    height: 66%;
    display: flex;
    justify-content: space-between;

    .blog-cont-box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-direction: column;



      .blog-cont-desc {
        width: 100%;
        height: 40px;

        @-moz-document url-prefix() {
          height: 33px;
        }
      }

      .blog-cont-up {
        height: 41%;
      }
    }
  }
}
</style>