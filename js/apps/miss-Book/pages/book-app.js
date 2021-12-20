import { bookService } from "../services/book-service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import bookList from "../cmps/book-list.js";
import bookFilter from "../cmps/book-filter.js";
import bookDetails from "./book-details.js";
import bookAdd from "../cmps/book-add.js";

export default {
  template: `
        <section class="book-app">
        <book-filter @filtered="setFilter"/>
        <book-add @addBook="addBook" @searched="setGoogleSearch" :searchBooks="searchBooks"></book-add>
        <book-list :books="booksToShow" @remove="removeBook"></book-list> 
        </section>`,

  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
      searchBooks: null,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      bookService.query().then((books) => (this.books = books));
    },
    closeDetails() {
      this.selectedBook = null;
    },
    removeBook(id) {
      bookService
        .remove(id)
        .then(() => {
          const msg = {
            txt: "Deleted Successfully",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
          this.loadBooks();
        })
        .catch((err) => {
          // console.log("err", err);
          const msg = {
            txt: "Error. Please try later",
            type: "error",
          };
          eventBus.$emit("showMsg", msg);
        });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    setGoogleSearch(searchBooks) {
      this.searchStr = searchBooks;
      bookService.getGoogleBooksApi(this.searchStr).then((books) => {
        this.searchBooks = books;
        // console.log(books);
      });
    },
    addBook(book) {
      // console.log(book);
      // this.searchBooks = bookId
      bookService.addGoogleBook(book).then(() => {
        this.loadBooks();
      });
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;

      const searchStr = this.filterBy.title.toLowerCase();
      const minPrice = this.filterBy.minPrice ? this.filterBy.minPrice : 0;
      const maxPrice = this.filterBy.maxPrice
        ? this.filterBy.maxPrice
        : Infinity;

      const filterBook = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount >= minPrice &&
          book.listPrice.amount <= maxPrice
        );
      });
      return filterBook;
    },
  },
  components: {
    bookList,
    bookFilter,
    bookDetails,
    bookAdd,
  },
};
