import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [trig, setTrig] = useState(false);
	const [data, setData] = useState([]);
	const [invalid, setInvalid] = useState("");
	const [menuoption, setMenuOption] = useState("create");
	const [menupageoption, setmenuPageoption] = useState(false);

	const signin = (e) => {
		e.preventDefault();
		axios.post("http://localhost:8090/api", { user, password }).then((res) => {
			setTrig(true);
		});
	};

	useEffect(() => {
		axios.get("http://localhost:8090/api/").then((res) => {
			setData(res.data);
		});
	}, [trig]);

	const login = (e) => {
		e.preventDefault();
		const value = data.filter((v) => {
			return v.user === user && v.password === password;
		});
		if (value[0].user === user && value[0].password === password) {
			setInvalid("");
			setMenuOption("create");
			const id = value[0]._id;
			axios
				.post("http://localhost:8090/api/login/", {
					id,
				})
				.then((res) => {
					setmenuPageoption(true);
				});
		} else {
			setInvalid("Invalid username/Password");
		}
	};

	const signupform = (
		<div align="center">
			<h1 className="signup">Sign Up</h1>
			<form onSubmit={signin}>
				<table>
					<tr>
						<label for="username">User Name : </label>
						<td>
							<input
								type="text"
								id="username"
								onChange={(e) => {
									setUser(e.target.value);
								}}
								required
							/>
						</td>
					</tr>
					<tr>
						<label for="password">Password : </label>
						<td>
							<input
								type="password"
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</td>
					</tr>
					<tr>
						<td></td>
						<br></br>
						<button>SignUp</button>
					</tr>
					<tr>
						<td />{" "}
						<td>
							<p>
								If Already logged in :{" "}
								<button
									onClick={() => {
										setTrig(true);
									}}
								>
									Login
								</button>
							</p>
						</td>
					</tr>
				</table>
			</form>
		</div>
	);

	const loginform = (
		<div align="center">
			<h1 className="login">Login</h1>
			<div style={{ color: "red" }}>{invalid}</div>
			<form onSubmit={login}>
				<table>
					<tr>
						<label for="username">User Name : </label>
						<td>
							<input
								type="text"
								id="username"
								onChange={(e) => {
									setUser(e.target.value);
								}}
								required
							/>
						</td>
					</tr>
					<tr>
						<label for="password">Password : </label>
						<td>
							<input
								type="password"
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</td>
					</tr>
					<tr>
						<td></td>
						<br></br>
						<button>Login</button>
					</tr>
					<tr>
						<td />{" "}
						<td>
							<p>
								if not :{" "}
								<button
									onClick={() => {
										setTrig(false);
									}}
								>
									SignUp
								</button>
							</p>
						</td>
					</tr>
				</table>
			</form>
		</div>
	);

	const onCreateMenu = () => {
		const value = data.filter((v) => {
			return v.user === user && v.password === password;
		});
		const id = value[0]._id;
		axios.post("http://localhost:8090/api/createMenu/", { id }).then((res) => {
			setMenuOption("delete");
		});
	};
	const onDeleteteMenu = () => {
		const value = data.filter((v) => {
			return v.user === user && v.password === password;
		});
		const id = value[0]._id;
		axios.post("http://localhost:8090/api/deleteMenu/", { id }).then((res) => {
			setMenuOption("");
		});
	};
	let menuPage;
	if (menuoption === "delete") {
		menuPage = (
			<div>
				<button onClick={onDeleteteMenu}>Delete menu</button>
			</div>
		);
	} else if (menuoption === "create") {
		menuPage = (
			<div>
				<button onClick={() => onCreateMenu()}>Create menu</button>
			</div>
		);
	}

	const logoutActivator = () => {
		const value = data.filter((v) => {
			return v.user === user && v.password === password;
		});
		const id = value[0]._id;
		axios.post("http://localhost:8090/api/logout/", { id }).then((res) => {
			setmenuPageoption(false);
		});
	};

	const logout = (
		<header align="right">
			<a className="logout-btn" onClick={() => logoutActivator()}>
				Logout
			</a>
		</header>
	);

	const result = trig ? (
		menupageoption ? (
			<div>
				{logout}
				<div>{menuPage}</div>
			</div>
		) : (
			<div>{loginform}</div>
		)
	) : (
		<div>{signupform}</div>
	);
	return result;
};

export default SignUp;
