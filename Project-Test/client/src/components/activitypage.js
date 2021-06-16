import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
import axios from "axios";
const io = socket("http://localhost:8090/");

const Activity = () => {
	const [feeds, setfeedsData] = useState([]);
	const [container, setContainer] = useState([]);

	io.on("login", (data) => {
		setfeedsData(data);
	});
	useEffect(() => {
		axios.get("http://localhost:8090/api/operation").then((res) => {
			setContainer(
				res.data.length !== 0 ? (
					res.data[0].operation.map((v, k) => {
						return (
							<div>
								<p key={k} className="feeds">
									{v}
								</p>
							</div>
						);
					})
				) : (
					<p></p>
				)
			);
		});
		setContainer();
	}, [feeds]);

	return (
		<div>
			<h1 className="container">Activity Logs</h1>
			<div>{container}</div>
		</div>
	);
};

export default Activity;
