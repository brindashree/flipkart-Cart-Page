import "./App.css";
import ProductListing from "./ProductListing";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import SaveForLater from "./SaveForLater";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={ProductListing}></Route>
				<Route exact path="/cart" component={Cart}></Route>
				<Route exact path="/save" component={SaveForLater}></Route>
			</Switch>
		</Router>
	);
}

export default App;
