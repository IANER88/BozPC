<template>
  <main id="audit-box" class="full-box">
    <div class="audit-main-box">
      <header>
        <span>审核</span>
        <i></i>
      </header>
      <header>
        <div class="audit-top-box">
          <div class="audit-selete-box">
            <span>审核</span>
            <el-select v-model="audit" placeholder="请选择">
              <el-option v-for="item of option" :key="item.state" :label="item.audit" :value="item.state" />
            </el-select>
          </div>
          <div class="not">
            <span class="note-span">备注</span>
            <el-autocomplete class="inline-input" v-model="message" :fetch-suggestions="search" placeholder="请输入内容"
              @select="select" />
          </div>
        </div>
        <div class="audit-right-box">
          <el-button type="success" @click="Audit()">确认</el-button>
        </div>
      </header>
      <Info :info="info.info" :day="false" :tag="false" />
    </div>
  </main>
</template>
<script>
import Info from '@/components/Space/Info.vue';
export default {
  name: "Audit",
  data() {
    return {
      audit: "",
      option: ["审核成功"],
      message: "信息审核成功！",
      option: [
        {
          state: 0,
          audit: "通过"
        },
        {
          state: 2,
          audit: "未通过"
        },
      ],
      reminder: [
        {
          value: "信息审核成功！",
        },
        {
          value: "信息有违禁词！",
        },
        {
          value: "图片包含暴力色情！",
        },
        {
          value: "包含暴力色情字段！",
        }
      ]
    };
  },
  async mounted() {
  },
  props: {
    info: {}
  },
  methods: {
    close() {
      this.$emit("hide", false)
    },
    async Audit() {
      const { data } = await this.Fetch.Account({
        method: "put",
        alias: this.info.user.alias,
        data: {
          info: this.info.info,
          filed: this.info.filed,
          message: this.message,
          audit: this.audit
        }
      });
      this.Def.Home.Message({
        res: data,
        fun: () => {
          this.close()
        }
      })
    },
    search(string, render) {
      render(string ? this.reminder.filter(this.createFilter(string)) : this.reminder);
    },
    createFilter(string) {
      return (reminder) => {
        return (reminder.value.toLowerCase().indexOf(string.toLowerCase()) === 0);
      };
    },
    select(item) {
      console.log(item);
    }
  },
  components: { Info }
};
</script>
<style scoped lang="less">
.audit-main-box {
  display: flex;
  width: 750px;
  height: 70vh;
  flex-direction: column;

  header {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--tint-solid);
    margin-bottom: 10px;

    .audit-top-box {
      display: flex;
      gap: 10px;

      >div {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>
