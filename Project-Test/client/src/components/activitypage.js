import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
//import axios from "axios";
const io = socket("http://localhost:8090/");

const Activity = () => {
	const [feeds, setfeedsData] = useState([]);
	const [container, setContainer] = useState([]);
	let result;

	io.on("login", (data) => {
		switch (data.operation) {
			case "signup":
				setfeedsData([
					...feeds,
					[
						...feeds,
						{
							user: data.user,
							signup: data.signup,
							date: data.date,
							operation: data.operation,
						},
					],
				]);
				break;
			case "login":
				setfeedsData([
					...feeds,
					[
						...feeds,
						{
							user: data.user,
							login: data.login,
							date: data.date,
							operation: data.operation,
						},
					],
				]);
				break;

			case "createMenu":
				setfeedsData([
					...feeds,
					[
						...feeds,
						{
							user: data.user,
							createmessage: data.createmessage,
							operation: data.operation,
						},
					],
				]);
				break;

			case "deleteMenu":
				setfeedsData([
					...feeds,
					[
						...feeds,
						{
							user: data.user,
							createmessage: data.createmessage,
							operation: data.operation,
						},
					],
				]);
				break;

			case "logout":
				setfeedsData([
					...feeds,
					[
						...feeds,
						{
							user: data.user,
							logout: data.logout,
							date: data.date,
							operation: data.operation,
						},
					],
				]);
				break;
			default:
				break;
		}
	});

	useEffect(() => {
		setContainer(
			feeds.map((v, k) => {
				if (v[k].operation === "signup") {
					result = (
						<p key={k} className="feeds">
							{v[k].user} {v[k].signup} {v[k].date}
						</p>
					);
				} else if (v[k].operation === "login") {
					result = (
						<p className="feeds">
							{v[k].user} {v[k].login} {v[k].date}
						</p>
					);
				} else if (v[k].operation === "createMenu") {
					result = (
						<p className="feeds">
							{v[k].user} {v[k].createmessage}
						</p>
					);
				} else if (v[k].operation === "deleteMenu") {
					result = (
						<p className="feeds">
							{v[k].user} {v[k].createmessage}
						</p>
					);
				} else if (v[k].operation === "logout") {
					result = (
						<p className="feeds">
							{v[k].user} {v[k].logout} {v[k].date}
						</p>
					);
				}

				return result;
			})
		);
	}, [feeds]);

	return (
		<div>
			<h1 className="container">Activity Logs</h1>
			<div>{container}</div>
		</div>
	);
};

export default Activity;
