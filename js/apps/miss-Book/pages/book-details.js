import bookDescription from "../cmps/book-description.js";
import { bookService } from "../services/book-service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import reviewAdd from "../cmps/review-add.js";

export default {
  template: `
        <section v-if="book" class="book-details-main app-main">
            <h3>Books Details: </h3>
            <section class="book-details">
            <p>Page Count: {{pageCount}}</p>
            <p>Published Date: {{publishedDate}}</p>
            <book-description :description="book.description"></book-description>
            </section>

            <div class="navigation">
                <router-link :to="'/book/'+nextBookId">Next Book Review</router-link> |
                <router-link :to="'/book/'+previousBookId">Previous Book Review</router-link>
            </div>

            <section class="review-add-section"  >
                <button class="close-btn" @click="close">x</button>
                <div class="review-add">
                <h3>Add a book review</h3>
                <review-add @addReview="addReview"></review-add>
                </div>
            </section>

            <section class="review-section"> 
                <div class="review-details" v-if="review" v-for="(review,idx) in reviews">
                    <h3>Book Review</h3>
                    <p>Reviewer Name: {{review.reviewerName}}</p>
                    <p>Review Date: {{review.reviewerDate}}</p>
                    <p>Book Reata: {{review.selected}}</p>
                    <p>Reviewer Text: {{review.reviewerText}}</p>
                    <button @click="remove(idx)">Deleting Review</button>
                </div>
            </section> 

        </section>
        
    `,
  data() {
    return {
      book: null,
      reviews: null,
      nextBookId: null,
      previousBookId: null,
    };
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getById(bookId).then((book) => {
      let reviews = book.reviews || [];
      this.book = book;
      this.reviews = reviews;
    });
  },
  methods: {
    close() {
      this.$router.push("/book");
    },
    addReview(review) {
      // console.log(review);
      let book = { ...this.book };
      this.reviews.push(review);
      book.reviews = this.reviews;
      bookService
        .save(book)
        .then(() => {
          const msg = {
            txt: `Book ${book.id} was successfully added`,
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
        })
        .catch((err) => {
          console.log("err", err);
          const msg = {
            txt: "Error. Please try later",
            type: "error",
          };
          eventBus.$emit("showMsg", msg);
        });
    },
    remove(idx) {
      this.book.reviews.splice(idx, 1);
      bookService
        .save(this.book)
        .then(() => {
          const msg = {
            txt: `Review was remove`,
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
        })
        .catch((err) => {
          console.log("err", err);
          const msg = {
            txt: "Error. Please try later",
            type: "error",
          };
          eventBus.$emit("showMsg", msg);
        });
    },
  },
  watch: {
    "$route.params.bookId": {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => (this.book = book));
        bookService
          .getNextBookId(bookId)
          .then((bookId) => (this.nextBookId = bookId));
      },
      immediate: true,
    },
    "$route.params.bookId": {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => {
          this.book = book;
        });
        bookService.getNextBookId(bookId).then((bookId) => {
          this.nextBookId = bookId;
        });
        bookService.getPrevBookId(bookId).then((bookId) => {
          this.previousBookId = bookId;
        });
      },
      immediate: true,
    },
  },
  computed: {
    pageCount() {
      if (this.book.pageCount > 500) return "Long reading";
      if (this.book.pageCount > 200) return "Decent Reading";
      if (this.book.pageCount < 100) return "Light Reading";
    },
    publishedDate() {
      var date = new Date();
      if (this.book.publishedDate - date.getFullYear() === -10)
        return "10 years ago – Veteran Book";
      if (this.book.publishedDate - date.getFullYear() === -1)
        return "1 Year – New!";
      else return this.book.publishedDate;
    },
  },
  components: {
    bookDescription,
    reviewAdd,
  },
};
