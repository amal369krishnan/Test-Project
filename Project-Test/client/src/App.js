import "./App.css";
import React from "react";
import Activity from "./components/activitypage";
import SignUp from "./components/SignUp";

function App() {
	return (
		<div className="row">
			<div className="column">
				<SignUp />
			</div>
			<div className="column">
				<Activity />
			</div>
		</div>
	);
}

export default App;
