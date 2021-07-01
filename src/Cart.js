import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
	caldiscount,
	decreaseQuantity,
	increaseQuantity,
	loadCart,
	removeItemFromCart,
	addItemToSaveForLater,
	total,
	cartEmpty,
} from "./helper";
import Navbar from "./Navbar";

const Cart = () => {
	const [cart, setCart] = useState(loadCart);
	const [redirect, setRedirect] = useState(false);
	const [hredirect, setHRedirect] = useState(false);
	const [mtotal, setmtotal] = useState(total().pricetotal);
	const [dtotal, setdtotal] = useState(total().discounttotal);
	const [reduced, setreduced] = useState(total().reducedamount);

	let price;
	const handleClearCart = () => {
		setCart(cartEmpty(() => setHRedirect(true)));
	};
	const getHRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/" />;
		}
	};

	const handleRemove = (productId) => {
		setCart(removeItemFromCart(productId));
		setmtotal(total().pricetotal);
		setdtotal(total().discounttotal);
		setreduced(total().reducedamount);
	};
	const handleIncrease = (productId) => {
		setCart(increaseQuantity(productId));
		setCart(caldiscount(productId));
		setmtotal(total().pricetotal);
		setdtotal(total().discounttotal);
		setreduced(total().reducedamount);
	};
	const handleSaveForlater = (product) => {
		addItemToSaveForLater(product, () => setRedirect(true));
		handleRemove(product.id);
	};

	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/save" />;
		}
	};

	const handleDecrease = (productId) => {
		setCart(decreaseQuantity(productId));
		setCart(caldiscount(productId));
		setmtotal(total().pricetotal);
		setdtotal(total().discounttotal);
		setreduced(total().reducedamount);
	};
	return (
		<div>
			{getRedirect(redirect)}
			{getHRedirect(hredirect)}
			<Navbar />

			<div className="row mt-3">
				<div className="col-8">
					<div className="container-fluid">
						{cart && (
							<div className="card">
								<div className="card-header">
									<h5>My Cart ({cart.length})</h5>
								</div>
							</div>
						)}
						{cart &&
							cart.map((product, index) => (
								<div className=" card" key={index}>
									<div className="row d-flex flex-row">
										<div className="col-3">
											<img
												src={product.imgSrc}
												alt={product.name}
												className="card-img-top p-3 border"
												style={{ height: "200px", width: "100%" }}
											/>
											<div className="d-flex justify-content-evenly mt-2 p-2">
												<button
													onClick={() => {
														handleDecrease(product.id);
													}}
													className="btn btn-secondary fw-bold"
												>
													-
												</button>
												<p>{product.quantity}</p>

												<button
													onClick={() => {
														handleIncrease(product.id);
													}}
													className="btn btn-secondary fw-bold"
												>
													+
												</button>
											</div>
										</div>
										<div className="col-9">
											<div className="card-body">
												<h5 className="card-title text-primary">
													{product.name}
												</h5>
												<p className="text-secondary">{product.brand}</p>
												<p className="text-secondary">
													Size :{" "}
													{product.size.map((s, i) => (
														<span key={i}>{s} , </span>
													))}
												</p>

												<div className="d-flex justify-content-start">
													<p
														className="fw-bold fs-6 text-secondary"
														style={{ textDecoration: "line-through" }}
													>
														Rs. {(price = product.price * product.quantity)}
													</p>
													<p className="fw-bold fs-6 mx-2">
														Rs.
														{product.dp}
													</p>

													<p className="text-success mx-2">
														{product.discount}% Off
													</p>
												</div>
												<button
													onClick={() => {
														handleRemove(product.id);
													}}
													className="btn btn-danger"
												>
													Remove
												</button>
												<button
													onClick={() => {
														handleSaveForlater(product);
													}}
													className="btn btn-warning mx-3"
												>
													Save for later
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="col-4">
					<div className="card me-3">
						<div className="card-header">Price Details</div>
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<h6>Price :</h6>
								<h6 className="text-dark">Rs. {mtotal}</h6>
							</div>
							<div className="d-flex justify-content-between">
								<h6>Discount :</h6>
								<h6 className="text-success"> - Rs. {reduced}</h6>
							</div>
						</div>
						<div className="card-footer">
							<div className="d-flex justify-content-between">
								<h6>Total Amount :</h6>
								<h6 className="text-dark"> Rs. {dtotal}</h6>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center my-3">
						<button onClick={handleClearCart} className="btn btn-danger">
							Clear Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
