<template>
  <div class="course-right-box">
    <div class="course-top-title">
      <h2>学习路径</h2>
      <div>
        <ul>
          <li v-for="item of info" :key="item.id">
            <a>{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="course-top-type" v-for="title of info" :key="title.id">
      <h4>{{ title.name }}</h4>
      <div class="box">
        <a v-for="item of title.course" :key="item.id" @click.prevent="Link({
          name: item.name,
          sub: item.submenu,
        })">
          <div>
            <i v-html="item.svgimg" />
            <p>
              <span>{{ item.name }}</span>
              <span>{{ item.introduce }}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Type",
  data() {
    return {
      info: [

      ],
    };
  },
  async mounted() {
    const res = await this.Fetch.Course({});
    this.info = res.data;
  },
  methods: {
    Link({ name, sub }) {
      window.location = `/course/${name}/${sub.name}?id=${sub.catalog}`
    }
  }
};
</script>