<template>
  <a :href="`/nav/${item.englishName}`" class="item">
    <span>{{ item.name }}</span>
    <div class="list">
      <main class="box">
        <div class="sub" v-for="(item, index) of list" :key="index">
          <a :href="`/nav/${home.englishName}`" v-for="(home, hove) of item" class="item" :key="hove">
            {{ home.name }}
          </a>
        </div>
      </main>
    </div>
  </a>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      fr: ""
    };
  },
  name: "Sub",
  props: ["item", "index"],
  mounted() {
    this.list = this.Def.Home.Reduce(this.item.list);
  },
};
</script>
