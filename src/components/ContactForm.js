import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactForm = () => {
  const [data, setData] = useState();
  const [post, setPost] = useState();
	const { register, errors, handleSubmit } = useForm({
		mode: "onBlur",
	});

	const onSubmit = data => {
		setData(data);

		console.log(data);

		axios
			.post(`https://reqres.in/api/users`, data)
			.then(response => {
        setPost(response.data);
			})
			.catch(err => {
				console.log(err);
      });
      
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="firstName">First Name*</label>
					<input
						id="firstName"
						name="firstName"
						placeholder="Edd"
						ref={register({ required: true, minLength: 3 })}
					/>
					{errors.firstName && (
						<p>Looks like there was an error: {errors.firstName.type}</p>
					)}
				</div>

				<div>
					<label htmlFor="lastName">Last Name*</label>
					<input
						name="lastName"
						id="lastName"
						placeholder="Burke"
						ref={register({ required: true })}
					/>
					{errors.lastName && (
						<p>Looks like there was an error: {errors.lastName.type}</p>
					)}
				</div>

				<div>
					<label htmlFor="email" placeholder="bluebill1049@hotmail.com">
						Email*
					</label>
					<input name="email" id="email" ref={register({ required: true })} />
					{errors.email && (
						<p>Looks like there was an error: {errors.email.type}</p>
					)}
				</div>
				<div>
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						id="message"
						ref={register({ required: false })}
					/>
				</div>
				{data && (
					<pre
						data-testid="newUser"
						style={{ textAlign: "left", color: "white" }}>
						{JSON.stringify(post, null, 2)}
					</pre>
				)}
				<input type="submit" value="submit" />
			</form>
		</div>
	);
};

export default ContactForm;
