export default {
  template: `
        <section >
            <form class="form-review" @submit.prevent="saveReview">  
                <input v-model="review.reviewerName" type="text" placeholder="Your Name"/>
                    <select v-model="review.selected">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input v-model="review.reviewerDate" type="date" />
                    <textarea  v-model="review.reviewerText"></textarea>
                    <button type="submit">Save</button>
            </form>
        </section>
    `,

  data() {
    return {
      review: {
        reviewerName: "",
        selected: 0,
        reviewerDate: null,
        reviewerText: "",
      },
    };
  },
  methods: {
    saveReview() {
      this.$emit("addReview", this.review);
    },
  },
};
