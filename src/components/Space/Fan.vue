<template>
  <fu-yong title="粉丝">
    <div class="fan-box">
      <div class="fan-item-box" v-for="item of fan" :key="item.id">
        <div class="fan-left-box" @click="Link(item)">
          <el-avatar shape="square" :size="70" fit="fill" :src="item.avatar" />
          <div class="fan-content-box">
            <span>{{ item.name }}</span>
            <p>{{ item.introduce ? item.introduce : "大侠有点忙，来不及介绍" }}</p>
          </div>
        </div>
        <div class="fan-right-box" v-if="$route.params.name === $store.state.info.alias">
          <el-button type="info" size="small" :class="{ follower: item.mutual, fan: !item.mutual }"
            @click="Follower({ item })" />
          <el-dropdown trigger="click">
            <i class="el-icon-more" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>联系</el-dropdown-item>
              <el-dropdown-item @click.native="Follower({ item, name: 'fan_id' })">移除</el-dropdown-item>
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
  name: 'Fan',
  data() {
    return {
      fan: []
    }
  },
  components: { FuYong },
  async mounted() {
    this.Get()
  },
  methods: {
    Follower({ item, name = "follower_id" }) {
      this.Def.Attention({
        method: item.mutual ? "delete" : "post",
        data: {
          [name]: item.id,
        },
        fun: this.Get
      })
    },
    async Get() {
      const { data } = await this.Fetch.Space.Follower({
        alias: this.$route.params.name
      })
      this.fan = data.fan
    },
    Link(item) {
      location.href = `/space/${item.alias}`
    }
  }
}
</script>
<style scoped lang="less">
.fan-box {
  .fan-item-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--tint-solid);
    padding: 10px 0;

    .fan-left-box {
      display: flex;
      gap: 20px;
      cursor: pointer;
      .fan-content-box {
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

    .fan-right-box {
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