export default {
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    limited: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    pricePer() {
      return this.limited ? 'for one user' : '/ per user'
    }
  }
}
