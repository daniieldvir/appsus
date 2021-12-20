export default {
  name: "action-btns",
  props: ["selected"],
  template: `
        <section >
            <button @click="removeSelected">Delete selected</button>
            <button @click="markReadSelected">Mark as read</button>
        </section>
    `,
  methods: {
    removeSelected() {
      this.$emit("removeSelected");
    },
    markReadSelected() {
      this.$emit("markReadSelected");
    },
  },
};
