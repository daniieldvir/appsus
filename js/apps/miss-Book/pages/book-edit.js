import { bookService } from "../services/book-service.js";

export default {
  template: `
        <section class="book-edit app-main">
            <h3>Edit Book</h3>
            <form v-if="bookToEdit" @submit.prevent="save" >
                <input class="edit-book-title" v-model="bookToEdit.title" type="text" placeholder="Tittle">
                <input v-model.number="bookToEdit.listPrice.amount" type="number" placeholder="Price">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      bookToEdit: null,
    };
  },
  created() {
    const { bookId } = this.$route.params;
    if (bookId) {
      bookService.getById(bookId).then((book) => (this.bookToEdit = book));
    } else {
      this.bookToEdit = bookService.getEmptyBook();
    }
  },
  methods: {
    save() {
      bookService
        .save(this.bookToEdit)
        .then((book) => this.$router.push("/book"));
    },
  },
};
