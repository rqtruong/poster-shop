new Vue({
    el: "#app",
    data: {
        total: 1,
        products: [],
        cart: [],
        search: "cat",
        lastSearch: "",
        loading: false,
    },
    methods: {
        addToCart: function(product) {
            this.total += product.price;
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    found = true;
                    this.cart[i].qty++;
                }
            }
            if (!found) {
                this.cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                });
            }
        },
        inc: function(item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0) {
                var index = this.cart.indexOf(item);
                this.cart.splice(index, 1);
            }
        },
        onSubmit: function() {
            this.products = [];
            this.loading = true;
            var path = "/search?q=".concat(this.search);
            this.$http.get(path)
            .then(function(response) {
                this.lastSearch = this.search;
                this.products = response.body;
                this.loading = false;
            });
        }
    },
    filters: {
        currency: function(price) {
            return "$".concat(price.toFixed(2));
        }
    },
    created: function() {
        this.onSubmit();
    }
});