import axios from "axios";
import "../locate.css";
import { useEffect, useState } from "react";
import { CommonNav } from "../commonNav";

export const Boxes = () => {
	const [data, setData] = useState([]);

	const autofetch = () => {
		axios
			.get(`${process.env.REACT_APP_baseurl}/pict0/boxes`)
			.then((res) => {
				setData(res.data);
			});
	};

	useEffect(() => {
		autofetch();
	}, []);

	const updateRight = async (id, ind) => {
		console.log(id, ind);
		await axios
			.patch(`${process.env.REACT_APP_baseurl}/pict0/boxes/right/${id}`, {
				user: localStorage.userID,
				ind,
			})
			.then((res) => {
				if (res.data.done) autofetch();
				else {
					alert("unauthorized user modifying!!");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateLeft = async (id, ind) => {
		console.log(id, ind);
		await axios
			.patch(`${process.env.REACT_APP_baseurl}/pict0/boxes/left/${id}`, {
				user: localStorage.userID,
				ind,
			})
			.then((res) => {
				if (res.data.done) autofetch();
				else {
					alert("unauthorized user modifying!!");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div
				className="centering"
				style={{ height: "88vh", width: "100vw" }}
			>
				<CommonNav name="BOXES" />

				{data.map((info, index) => {
					return (
						info && (
							<div
								key={index} // Add a unique key prop here
								style={{
									border: "2px solid white",
									background:
										"linear-gradient(rgba(220,220,255,0.4) 85%, rgba(255,255,255,0.5) 100%)",
								}}
							>
								<div className="boxex-main">
									<div className="boxex-row-up">
										<>
											{info.right.map((val, ind) => {
												return (
													<button
														className={`boxex-buty ${
															val.state === 1
																? "green-button"
																: "white-button"
														}`}
														key={ind}
														title={val.user}
														onClick={() => {
															updateRight(
																info._id,
																ind
															);
														}}
													>
														🪑
													</button>
												);
											})}

											<center>
												<div
													style={{
														border: "solid 1px white",
														width: "100%",
													}}
												></div>
											</center>

											{info.left.map((val, ind) => {
												return (
													<button
														className={`boxex-buty ${
															val.state === 1
																? "green-button"
																: "white-button"
														}`}
														key={ind} // Add a unique key prop here
														title={val.user}
														onClick={() => {
															updateLeft(
																info._id,
																ind
															);
														}}
													>
														🪑
													</button>
												);
											})}
										</>
									</div>
								</div>
							</div>
						)
					);
				})}
			</div>
		</>
	);
};
