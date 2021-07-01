export const addItemToCart = (item, next) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.push({
			...item,

			inCart: true,
		});
		localStorage.setItem("cart", JSON.stringify(cart));
		next();
	}
};
export const addItemToSaveForLater = (item, next) => {
	let saved = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("saved")) {
			saved = JSON.parse(localStorage.getItem("saved"));
		}
		saved.push({
			...item,

			inCart: false,
		});
		localStorage.setItem("saved", JSON.stringify(saved));
		next();
	}
};
export const loadCart = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			return JSON.parse(localStorage.getItem("cart"));
		}
	}
};
export const loadSaved = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("saved")) {
			return JSON.parse(localStorage.getItem("saved"));
		}
	}
};

export const removeItemFromCart = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, i) => {
			if (product.id === productId) {
				cart.splice(i, 1);
			}
		});
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	return cart;
};
export const increaseQuantity = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, i) => {
			if (product.id === productId) {
				product.quantity = product.quantity + 1;
			}
		});

		localStorage.setItem("cart", JSON.stringify(cart));
	}

	return cart;
};
export const decreaseQuantity = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, i) => {
			if (product.id === productId) {
				if (product.quantity > 1) {
					product.quantity = product.quantity - 1;
				}
			}
		});

		localStorage.setItem("cart", JSON.stringify(cart));
	}

	return cart;
};

export const cartEmpty = (next) => {
	if (typeof window !== undefined) {
		localStorage.removeItem("cart");
		let cart = [];
		localStorage.setItem("cart", JSON.stringify(cart));
		next();
	}
};
export const savedEmpty = (next) => {
	if (typeof window !== undefined) {
		localStorage.removeItem("saved");
		let saved = [];
		localStorage.setItem("saved", JSON.stringify(saved));
		next();
	}
};
export const caldiscount = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, i) => {
			if (product.id === productId) {
				product.dp =
					product.price * product.quantity -
					(product.discount / 100) * (product.price * product.quantity);
			}
		});
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	return cart;
};

export const total = () => {
	let cart = [];

	let totalObject = {
		pricetotal: 0,
		discounttotal: 0,
		reducedamount: 0,
	};
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, i) => {
			totalObject.pricetotal += product.price * product.quantity;
			totalObject.discounttotal += product.dp;
		});
		totalObject.reducedamount =
			totalObject.pricetotal - totalObject.discounttotal;
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	return totalObject;
};
