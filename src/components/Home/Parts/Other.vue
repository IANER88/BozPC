<template>
  <div class="other-box" :style="`height:${info && info.length * height + 50}px`">
    <div class="topic" v-for="item of info" :key="item.id" :style="`height:${height}px`" @click="Link(item)">
      <div class="avatar-box">
        <img :src="item.author.avatar" alt="avatar">
        <div class="content-box">
          <div class="name">{{ item.author.name }}</div>
          <div class="introduction">{{ item.author.introduce }}</div>
        </div>
      </div>
      <main class="main-box">
        {{ item.title }}
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Other',
  data() {
    return {}
  },
  props: ["info", "height", "Link"],
}
</script>
<style scoped lang="less">
.other-box {
  width: 20.8%;
  border: 1px solid var(--tint-solid);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 85px;
  position: sticky;

  .topic {
    width: 100%;
    border: 1px solid var(--topic-solid);
    border-radius: 5px;
    padding: 15px;
    background: url("@/assets/img/original.png");
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-between;

    .avatar-box {
      display: flex;
      gap: 10px;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .content-box {
        display: flex;
        flex-direction: column;
        height: 32px;
        justify-content: space-between;

        .name {
          font-size: 14px;
        }

        .introduction {
          font-size: 12px;
        }
      }
    }

    .main-box {
      font-size: 14px;
      letter-spacing: 0;
      line-height: 22px;
      font-weight: 400;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>