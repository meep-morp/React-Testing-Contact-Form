import React from "react";
import {
	render,
	screen,
	fireEvent,
	queryAllByText,
} from "@testing-library/react";
import ContactForm from "./ContactForm";
import { act } from "react-dom/test-utils";

test("Adds a New user on Submit", async () => {
	render(<ContactForm />);

	const firstName = screen.getByLabelText(/first name/i);
	const lastName = screen.getByLabelText(/last name/i);
	const email = screen.getByLabelText(/email/i);
	const message = screen.getByLabelText(/message/i);
	const error = screen.queryByText(/looks like there was an error/i);

	fireEvent.change(firstName, { target: { value: "Adrian" } });

	fireEvent.change(lastName, { target: { value: "Hartley" } });

	fireEvent.change(email, { target: { value: "adrian@gmail.com" } });

	fireEvent.change(message, { target: { value: "good form m8" } });

	const submit = screen.getByText(/submit/i);

	act(() => {
		fireEvent.click(submit);
	});

	expect(error).not.toBeInTheDocument();

	const newUser = await screen.findByTestId("newUser");
	expect(newUser).toBeInTheDocument();
});

test("Runs validation", () => {
	render(<ContactForm />);

	const firstName = screen.getByLabelText(/first name/i);
	const message = screen.getByLabelText(/message/i);
	const errors = screen.queryAllByText(/looks like there was an error/i);

	fireEvent.change(firstName, { target: { value: "A" } });

	fireEvent.change(message, { target: { value: "good form m8" } });

	const submit = screen.getByText(/submit/i);

    fireEvent.click(submit);
    
	errors.forEach(error => {
		expect(error).toBeInTheDocument();
    });
    
    expect(errors.length === 0).toBeTruthy();
});
