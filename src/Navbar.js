import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-primary">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">Flipkart</span>
				<div className="d-flex justify-content-end ">
					<button className="btn btn-dark">
						<Link to="/save" className="fw-bold text-white nav-link">
							WishList
						</Link>
					</button>
					<button className="btn btn-warning mx-3">
						<Link to="/cart" className="fw-bold text-white nav-link">
							Cart
						</Link>
					</button>
					<button className="btn btn-dark">
						<Link to="/" className="fw-bold text-white nav-link">
							Home
						</Link>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
