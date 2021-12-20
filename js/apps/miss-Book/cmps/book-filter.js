export default {
    template: `
        <div class="book-filter">
            <label>Filter books: </label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Title">
            <input @input="filter" v-model.number="filterBy.minPrice" type="number" placeholder="Min Price">
            <input @input="filter" v-model.number="filterBy.maxPrice" type="number" placeholder="Max Price">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: 0,
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy})
        }
    }
   
}