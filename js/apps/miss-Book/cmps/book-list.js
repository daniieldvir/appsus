import bookPreview from "./book-preview.js";

export default {
  props: ["books"],
  template: `
       <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book" @click.native="selected(book)" />
                <div class="actions">
                    <button @click="remove(book.id)">X</button>
                    <router-link class="details-btn" :to="'/book/'+book.id">Details</router-link>
                    <router-link class="edit-btn" :to="'/book/edit/'+book.id">Edit</router-link>
                </div>
            </li>
        </ul>
    `,
  methods: {
    selected(book) {
      this.$emit("selected", book);
    },
    remove(bookId) {
      this.$emit("remove", bookId);
    },
  },
  components: {
    bookPreview,
  },
};
