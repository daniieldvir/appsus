export default {
  props: ['book'],
  template: `
    <div class="book-preview">
        <h3> Title: {{book.title}} </h3>
        <p :class="price"> Price: {{currencyIcon}}</p>
        <img class="book-img" :src="book.thumbnail">
        <img class="sale-img" :src=sale> 
    </div>`,

  computed: {
    price() {
      if (this.book.listPrice.amount > 150) return 'red';
      if (this.book.listPrice.amount < 20) return 'green';
    },
    sale() {
      if (this.book.listPrice.isOnSale === true) return './img/sale.png';
    },
    currencyIcon() {
      const currency = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
        currencySign: 'accounting',
      }).format(this.book.listPrice.amount);
      return currency;
    },
  },
};
