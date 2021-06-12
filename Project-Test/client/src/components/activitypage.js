import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
const io = socket("http://localhost:8090/");

const Activity = () => {
	const [login, setLoginData] = useState([]);
	const [createMenu, setcreateMenu] = useState([]);
	const [deleteMenu, setdeleteMenu] = useState([]);
	const [logout, setlogout] = useState([]);
	const [container, setContainer] = useState([]);

	useEffect(() => {
		/*setContainer(()=>{
            if(operation === "login"){
            return <p>{login.user} {login.signup} @ {login.createdAt}</p>
            }
            else if(operation === "createMenu"){
                return <p>{createMenu.user} {createMenu.createmessage}</p>
            }
            else if(operation === "deleteMenu"){
                return <p>{deleteMenu.user} {deleteMenu.createmessage}</p>
            }
            else if(operation === "logout"){
                return <p>{logout.user} {logout.logout}</p>
            }
            else{
                return <p></p>
            }
        });*/
		setContainer(
			<div>
				<p>
					{login.user} {login.signup} {login.date}
				</p>
				<p>
					{createMenu.user} {createMenu.createmessage}
				</p>
				<p>
					{deleteMenu.user} {deleteMenu.createmessage}
				</p>
				<p>
					{logout.user} {logout.logout} {logout.date}
				</p>
			</div>
		);
	}, [login, createMenu, deleteMenu, logout]);

	io.on("login", (data) => {
		setLoginData(data);
	});

	io.on("createMenu", (data) => {
		setcreateMenu(data);
	});

	io.on("deleteMenu", (data) => {
		setdeleteMenu(data);
	});

	io.on("logout", (data) => {
		setlogout(data);
	});

	return (
		<div>
			<h1>Activity Logs</h1>
			<div>{container}</div>
		</div>
	);
};

export default Activity;
