<template>
  <fu-yong title="关注">
    <div class="follower-box">
      <div class="follower-item-box" v-for="item of follower" :key="item.id">
        <div class="follower-left-box" @click="Link(item)">
          <el-avatar shape="square" :size="70" fit="fill" :src="item.avatar" />
          <div class="follower-content-box">
            <span>{{ item.name }}</span>
            <p>{{ item.introduce ? item.introduce : "大侠有点忙，来不及介绍" }}</p>
          </div>
        </div>
        <div class="follower-right-box" v-if="$route.params.name === $store.state.info.alias">
          <el-button type="info" size="small" :class="{ follower: item.mutual, fan: !item.mutual }"
            @click="Follower(item)" />
          <el-dropdown trigger="click">
            <i class="el-icon-more" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>联系</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </fu-yong>
</template>
<script>

import FuYong from './FuYong';
export default {
  name: 'Follower',
  data() {
    return {
      follower: []
    }
  },
  components: { FuYong },
  mounted() {
    this.Get()
  },
  methods: {
    Follower(item) {
      this.Def.Attention({
        method: "delete",
        data: {
          follower_id: item.id,
        },
        fun: this.Get
      })
    },
    async Get() {
      const { data } = await this.Fetch.Space.Follower({
        method: "put",
        alias: this.$route.params.name
      })
      this.follower = data.follower
    },
    Link(item) {
      location.href = `/space/${item.alias}`
    }
  }
}
</script>
<style scoped lang="less">
.follower-box {
  .follower-item-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--tint-solid);
    padding: 10px 0;

    .follower-left-box {
      display: flex;
      gap: 20px;
      cursor: pointer;

      .follower-content-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        span {
          font-size: 16px;
        }

        p {
          font-size: 13px;
        }
      }
    }

    .follower-right-box {
      display: flex;
      align-items: center;
      gap: 10px;

      .el-icon-more {
        transform: rotate(90deg);
        cursor: pointer;
      }
    }
  }

}
</style>