<template>
  <div class="synergy-box">
    <div class="synergy" v-html="Icon.Release.synergy" @click.stop="hide = true" />
    <transition name="el-zoom-in-top">
      <div class="synergy-main-box" v-show="hide" @click.stop>
        <h4>文档协作者</h4>
        <div class="select">
          <el-input v-model="name" placeholder="输入用户名、用户ID 邀请协作" @blur="Blur()" />
          <transition name="el-zoom-in-top">
            <div class="select-box" v-show="show">
              <div class="topic-box" v-for="item of option" :key="item.id">
                <div class="topic-main-box">
                  <img :src="item.avatar" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <i class="el-icon-plus" />
              </div>
            </div>
          </transition>
        </div>
        <div class="author">
          <img src="../../assets/img/None.png" alt="">
        </div>
        <div class="link">
          <p>拿到链接的人可获得编辑权限</p>
          <div class="link-box">
            <el-input placeholder="请输入内容" v-model="link" :disabled="true" />
            <el-button type="primary">复制链接</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Synergy',
  data() {
    return {
      name: "",
      link: "",
      show: false,
      hide: false,
      option: []
    }
  },
  mounted() {
    window.addEventListener("click", () => {
      this.hide = false
    })
  },
  updated() {
    this.show = this.name && this.option.length ? true : false
  },
  watch: {
    async name(e) {
      if (e) {
        const res = await this.Fetch.Release.Select(e)
        this.option = res.data.option
      }
    }
  },
  methods: {
    query() {

    },
    Select(value) {
      console.log(value);
    },
    Blur() {
      this.show = false
    }
  }
}
</script>
<style scoped lang="less">
.synergy-box {
  display: flex;
  align-items: center;
  position: relative;

  .synergy {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .synergy-main-box {
    position: absolute;
    width: 420px;
    height: 400px;
    top: 40px;
    border: 1px solid var(--tint-solid);
    right: -5px;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
    border-radius: 5px;
    background: var(--tint-color);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;

    img {
      width: 97px;
    }

    .author {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 240px;
    }

    .link {
      height: 150px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: flex-end;

      .link-box {
        display: flex;
        gap: 10px;
      }
    }

    .select {
      position: relative;

      .select-box {
        position: absolute;
        width: 100%;
        height: 185px;
        background: var(--tint-color);
        box-sizing: 1px solid var(--tint-solid);
        border-radius: 5px;
        top: 45px;
        box-shadow: 0 0 30px rgb(0 0 0 / 10%);
        display: flex;
        flex-direction: column;
        padding: 10px 0;

        .topic-box {
          height: 45px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          align-items: center;
          cursor: pointer;

          &:hover {
            background: var(--topic-hover);
          }

          .topic-main-box {
            display: flex;
            align-items: center;

            gap: 10px;

            img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>