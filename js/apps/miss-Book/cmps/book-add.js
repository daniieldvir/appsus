export default {
  props: ["searchBooks"],
  template: `
        <section class="book-add-search app-main">
        <div class="book-add-search">
            <label>Search from Google: </label>
            <input class="search-input"  v-model.lazy="searchStr" type="text" placeholder="Search for a book">
                <ul class="search-result" v-if="searchBooks">
                    <li v-for="book in top5">
                      <button @click="addBook(book)">+</button>
                        <span>{{book.volumeInfo.title}} </span>
                     </li>

                </ul>
        </div>
        </section>`,
  data() {
    return {
      searchStr: "",
    };
  },
  created() {
    // console.log(this.searchBooks);
  },
  methods: {
    search() {
      this.$emit("searched", this.searchStr);
    },
    addBook(book) {
      this.$emit("addBook", book);
    },
  },
  watch: {
    searchStr(val) {
      this.search(val);
    },
  },
  computed: {
    top5() {
      return this.searchBooks.slice(0, 5);
    },
  },
};
