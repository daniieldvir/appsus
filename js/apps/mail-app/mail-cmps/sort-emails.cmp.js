export default {
  name: "sort-emails",
  template: `
      <section >
          <select v-model="sortBy" @change="sort" name="sort">
              <option value="">Sort by</option>
              <option value="subject">Subject</option>
          </select>
      </section>
  `,
  data() {
    return {
      sortBy: null,
    };
  },

  methods: {
    sort() {
      this.$emit("sorted", this.sortBy);
    },
  },
};
