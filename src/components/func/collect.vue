<template>
  <el-dialog title="添加到收藏夹" :visible.sync="boolean" width="30%" :append-to-body="true" :before-close="down"
    :lock-scroll="false">
    <div class="content-box">
      <el-checkbox-group v-model="tuples">
        <el-checkbox :label="item.id" v-for="item of info" :key="item.id" @change="change">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div class="add" v-if="bool" @click="Increase()">添加收藏夹</div>
      <div class="add-box" v-else>
        <input v-model.trim="value" />
        <button @click="submit()">添加</button>
      </div>
    </div>
    <div class="last">
      <el-button type="primary" @click="ensure()" :disabled="bled">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Def from "@/assets/js/Def"
export default {
  name: "Collect",
  data() {
    return {
      info: [],
      value: "",
      boolean: true,
      bool: true,
      array: [],
      tuples: [],
      add: [],
      remove: [],
      title: "",
      checked: true,
      switch: true,
      type: "",
      id: "",
      fun: "",
      collect: "",
    }
  },
  mounted() {
    Def.scroll()
  },
  computed: {
    bled() {
      if (this.add.length) {
        this.switch = false
        return this.switch
      } else if (this.remove.length) {
        this.switch = false
        return this.switch
      } else {
        this.switch = this.array.length != 0 ? false : true
        return this.switch
      }
    }
  },
  methods: {
    change(boolean, event) {
      // 取消选择，判断数据是否已经收藏过，是就把数据往 remove 数组放
      const includes = this.array.includes(event.target._value)
      if (!boolean && includes) {
        this.remove.push(event.target._value)
      } else {
        this.remove = this.remove.filter(item => item !== event.target._value)
      }
      // 选择，判断数据是否已经收藏过，没有就放到 add 数组
      if (boolean && !includes) {
        this.add.push(event.target._value)
      } else {
        this.add = this.add.filter(item => item !== event.target._value)
      }
    },
    Increase() {
      this.bool = false
    },
    async submit() {
      if (!this.value) {
        this.$message({
          type: "error",
          message: "收藏夹名不能为空!"
        })
        return
      }
      const { data } = await this.Fetch.Home.Collect({
        method: "post",
        data: {
          name: this.value
        }
      })
      this.bool = true
      this.info.push(data)
    },
    async ensure(method = "put") {
      if (!this.array.length && this.switch) {
        this.$message({
          type: "error",
          message: "你还没有选择呢!"
        })
        return
      }
      const { data } = await this.Fetch.Home.Collect({
        method,
        data: {
          type: this.type,
          add: this.add,
          remove: this.remove,
          id: this.id
        }
      })
      this.Def.Home.Message({
        res: data,
        fun: () => {
          this.fun(data.collect)
          this.down()
        }
      })
    },
    down() {
      Def.Remove(".v-modal").Remove(".el-dialog__wrapper").scroll()
    }
  }
}
</script>