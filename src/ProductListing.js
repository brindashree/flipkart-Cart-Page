import { useState } from "react";
import { Redirect } from "react-router-dom";
import data from "./db.json";
import { addItemToCart } from "./helper";
import Navbar from "./Navbar";

const ProductListing = () => {
	const [prod, setprod] = useState(data);
	const [redirect, setRedirect] = useState(false);
	let dp;

	const handleAddtoCart = (product) => {
		addItemToCart(product, () => setRedirect(true));
	};
	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};
	return (
		<div>
			{getRedirect(redirect)}
			<Navbar></Navbar>
			<div>
				<div className="text-center fw-bold">
					<h3>All Products</h3>
				</div>
				<div className="product-container">
					{prod.map((product, index) => (
						<div className="card product" key={index}>
							<img
								src={product.imgSrc}
								alt={product.name}
								className="card-img-top"
								style={{ height: "350px", width: "100%" }}
							/>
							<div className="card-body">
								<p className="text-secondary">{product.brand}</p>
								<h6 className="card-title text-primary">{product.name}</h6>
								<div className="d-flex justify-content-around">
									<p className="fw-bold fs-6">
										Rs.
										{
											(dp =
												product.price -
												(product.discount / 100) * product.price)
										}
									</p>
									<p
										className="fw-bold fs-6 text-secondary"
										style={{ textDecoration: "line-through" }}
									>
										Rs. {product.price}
									</p>
									<p className="text-success">{product.discount}% Off</p>
								</div>
								<button
									className="btn btn-info"
									onClick={() => {
										handleAddtoCart(product);
									}}
								>
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductListing;
