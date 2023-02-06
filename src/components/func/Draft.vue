<template>
  <transition name="el-fade-in">
    <main id="draft-box" class="full-box" v-if="full" @click.self="fun('draft')">
      <div class="draft-main-box" :style="`width:${size}%`" @click.stop>
        <header>
          <span>{{ title }}</span>
          <i v-html="Icon.Home.delete" @click="fun('draft')" />
        </header>
        <slot>
          <div class="draft-topic-box">
            <header>我的草稿</header>
            <div class="draft-content-box">
              <div class="topic-main-box" v-for="item of draft" :key="item.id" @click="Link(item)">
                <div class="topic-title-box">
                  <i v-html="Icon.YueQue.article" />
                  <p>{{ item.title }}</p>
                </div>
                <time>{{ item.create_time }}</time>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </main>
  </transition>
</template>
<script>
export default {
  name: 'Draft',
  data() {
    return {
      show: this.full,
      draft: []
    }
  },
  props: {
    size: {
      default: 30
    },
    title: {
      default: "草稿箱"
    },
    full: {
      default: false
    },
    fun: {

    }
  },
  async mounted() {
    const { data } = await this.Fetch.Release.Draft({})
    this.draft = data.draft
  },
  async updated() {
    const { data } = await this.Fetch.Release.Draft({})
    this.draft = data.draft
  },
  methods: {
    Link(item) {
      location.href = `/release/update?id=${item.id}#draft`
    }
  }
}
</script>
<style scoped lang="less">
.draft-main-box {
  height: 440px;
  background: var(--tint-color);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  >header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      cursor: pointer;
    }
  }

  .draft-topic-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;

    .draft-content-box {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--tint-solid);
      flex: 1;
      border-radius: 5px;
      overflow: hidden;

      .topic-main-box {
        height: 40px;
        padding: 10px;
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;

        &:not(:last-child) {
          border-bottom: 1px solid var(--tint-solid);
        }

        .topic-title-box {
          display: flex;
          gap: 10px;
          align-items: center;

          i {
            display: flex;
            align-items: center;
          }
        }

        time {
          color: var(--headlines-color)
        }

        &:hover {
          background: var(--topic-hover);
        }
      }
    }
  }
}
</style>
