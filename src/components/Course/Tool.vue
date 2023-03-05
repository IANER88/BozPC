<template>
  <div class="course-right-box">
    <div class="course-top-title">
      <h2>编译工具</h2>
      <div>
        <ul>
          <li v-for="tool in info" :key="tool.id">
            <a :href="tool.name">{{ tool.name }}</a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="course-top-type" v-for="title in info" :key="title.id">
      <h4>{{ title.name }}</h4>
      <div class="box">
        <a v-for="t in title.tool" :key="t.id" :href="t.url">
          <div>
            <i v-html="t.svgimg"></i>
            <p>
              <span>{{ t.name }}</span>
              <span>{{ t.introduce }}</span>
            </p>
          </div>
          <span></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tool",
  data() {
    return {
      info: [],
    };
  },
  async mounted() {
    const { data } = await this.Fetch.Tool({})
    this.info = data
  },
};
</script>