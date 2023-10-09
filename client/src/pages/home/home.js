import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Filebase from "react-file-base64";

import "./home.css";

export const Home = () => {
	const [account, setAccount] = useState("novone2020");
	const [postData, setPostData] = useState({
		title: "",
		description: "",
		image: "",
		account: "",
	});

	const Navigate = useNavigate();

	const [D, setDisplay] = useState([]);

	const autoFetch = () => {
		axios
			.get(`${process.env.REACT_APP_baseurl}/pict0/getPost`)
			.then((res) => {
				setDisplay(res.data.data);
				// console.log(res.data.data)
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		autoFetch();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log({...postData,account})
		await axios
			.post(`${process.env.REACT_APP_baseurl}/pict0/createPost`, {
				...postData,
				account,
			})
			.then((res) => {
				// console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});

		alert("done");

		autoFetch();
	};

	return (
		<div className="home-screen">
			<div className="post-adjust home-post-area">
				{D.map((data, index) => (
					<div
						key={index}
						className="posts"
						onClick={() => {
							return Navigate("/post/" + data._id);
						}}
					>
						<img
							src={data.image}
							alt={data.title}
							height={"50%"}
							width={"70%"}
							style={{ marginTop: "1vh" }}
						/>
						<br />
						<br />
						<h4 style={{ color: "white" }}>{data.title}</h4>
						<h5 style={{ color: "white" }}>{data.description}</h5>
						{/* <p>{data._id}</p> */}
					</div>
				))}
			</div>

			<div className="home-share-area">
				<h3 style={{ color: "white", marginTop: "1vh" }}>SHARE</h3>
				<hr />
				<form
					className="form-adjust form-control"
					onSubmit={handleSubmit}
				>
					<h4 style={{ color: "white" }}>Title</h4>
					<input
						type="text"
						placeholder="Post title"
						className="post-title home-inputs"
						onChange={(e) =>
							setPostData({ ...postData, title: e.target.value })
						}
					/>

					<h4 style={{ color: "white" }}>Description</h4>
					<textarea
						type="text"
						placeholder="Post Description"
						className="post-description home-inputs"
						onChange={(e) =>
							setPostData({
								...postData,
								description: e.target.value,
							})
						}
					/>

					<center>
						<div className="file-button btn btn-dark">
							<Filebase
								type="file"
								multiple={false}
								onDone={({ base64 }) =>
									setPostData({ ...postData, image: base64 })
								}
							/>
						</div>
					</center>

					<button type="submit" className="btn btn-light">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
