export default {
  name: "note-filter",
  template: `
         <section class="filter-notes">
        <button ><i class="fas fa-search fa-lg"></i></button>

        <input @input="filter" v-model="filterBy.info" type="text" placeholder="Title">
        <select @change="filter" v-model="filterBy.type">
            <option value="">All</option>
            <option value="note-txt">Text Notes</option>
            <option value="note-img">Image Notes</option>
            <option value="note-video">Video Notes</option>
            <option value="note-todos">List Notes</option>
            <option value="note-map">Map Notes</option>
        </select>
    </section>
    `,
  data() {
    return {
      filterBy: {
        info: "",
        type: "",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", { ...this.filterBy });
    },
  },
};
