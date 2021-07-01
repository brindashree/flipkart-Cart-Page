import { useState } from "react";
import { Redirect } from "react-router-dom";
import { loadSaved, savedEmpty } from "./helper";
import Navbar from "./Navbar";

const SaveForLater = () => {
	const [saved, setsaved] = useState(loadSaved);
	const [redirect, setRedirect] = useState(false);
	let price;
	const handleClear = () => {
		setsaved(savedEmpty(() => setRedirect(true)));
	};
	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/" />;
		}
	};
	return (
		<div>
			{getRedirect(redirect)}
			<Navbar />
			{!saved && (
				<div>
					<h6 className="text-dark text-center">No Saved Items</h6>
				</div>
			)}

			<div className="d-flex justify-content-center m-3">
				<button onClick={handleClear} className="btn btn-warning">
					Clear
				</button>
			</div>

			<div className="container-fluid col-10 d-flex justify-content-center">
				{saved &&
					saved.map((savedProd, i) => (
						<div className=" card" key={i}>
							<div className="row d-flex flex-row">
								<div className="col-3">
									<img
										src={savedProd.imgSrc}
										alt={savedProd.name}
										className="card-img-top p-3 border"
										style={{ height: "200px", width: "100%" }}
									/>
								</div>
								<div className="col-9">
									<div className="card-body">
										<h5 className="card-title text-primary">
											{savedProd.name}
										</h5>
										<p className="text-secondary">{savedProd.brand}</p>

										<p className="text-secondary">
											Size :{" "}
											{savedProd.size.map((s, i) => (
												<span key={i}>{s} , </span>
											))}
										</p>
										<p className="text-dark">{savedProd.quantity} no's</p>
										<div className="d-flex justify-content-start">
											<p
												className="fw-bold fs-6 text-secondary"
												style={{ textDecoration: "line-through" }}
											>
												Rs. {(price = savedProd.price * savedProd.quantity)}
											</p>
											<p className="fw-bold fs-6 mx-2">
												Rs.
												{savedProd.dp}
											</p>

											<p className="text-success mx-2">
												{savedProd.discount}% Off
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default SaveForLater;
