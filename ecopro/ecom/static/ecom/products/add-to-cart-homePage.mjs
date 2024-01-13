import Cookies from 'https://cdn.jsdelivr.net/npm/universal-cookie@7.0.1/+esm'
      
const cookies = new Cookies (null, { path: "/" });

const btns = document.querySelectorAll("[data-add-to-cart-btn]");

function getData(btn) {
	const flavor = btn.getAttribute("data-flavor");

	const quantity = 1;

	const productId = Number(btn.getAttribute("data-product-id"));

	const price = Number(
		document.querySelector("[data-pricing]").getAttribute("data-price")
	);

	const serving = document
		.querySelector(`[data-dropDown-list="${productId}"]`)
		.getAttribute("data-dropDown-serving");

	if (productId <= 0 || isNaN(productId)) {
		console.log("please set product id", productId);
		return;
	}
	return {
		flavor,
		productId,
		quantity,
		price,
		serving,
	};
}

async function addToCart(data) {
	const csrfToken = cookies.get("csrftoken");
	const url = "http://127.0.0.1:8000/cart/add_to_cart";
	const method = "POST";
	const headers = {
		"Content-Type": "application/json",
		"X-CSRFToken": csrfToken,
	};

	const res = await fetch(url, {
		method,
		headers,
		body: JSON.stringify(data),
	}).then((promise) => promise.json());

	return res;
}

const successToast = (text) =>
	Toastify({
		text,
		avatar:
			"https://api.iconify.design/material-symbols:done.svg?color=%234ade80",

		className:
			"bg-gradient-to-l from-neutral-800 to-neutral-800 text-sm w-full px-4 py-4 border-2 border-green-700 rounded-md max-w-fit capitalize flex items-center justify-between text-body text-neutral-300",
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		stopOnFocus: true // Prevents dismissing of toast on hover
	}).showToast();

const errorToast = (text) =>
	Toastify({
		text,
		avatar:
			"https://api.iconify.design/jam:triangle-danger-f.svg?color=%23fb7185",

		className:
			"bg-gradient-to-l from-neutral-800 to-neutral-800 text-sm w-full px-4 py-4 border-2 border-red-700 rounded-md max-w-fit capitalize flex items-center justify-between text-body text-neutral-300",
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
	}).showToast();

const handleResponse = (res) => {
	if (res.ok) {
		// see what type of action happened in the backend
		if (res.action === "nothing") {
			successToast("your product just got added");
			return;
		}

		if (res.action === "create") {
			successToast("product was added successfully");
			return;
		}

		if (res.action === "update") {
			successToast("your cart was updated successfully");
			return;
		}
	} else {
		errorToast("an error has occured, try again later.");
		return;
	}
};
btns.forEach((btn) => {
	btn.addEventListener("click", async () => {
		const data = getData(btn);
		console.log("🚀 ~ data ~", JSON.stringify(data));
		const res = await addToCart(data);
		handleResponse(res);
	});
});
