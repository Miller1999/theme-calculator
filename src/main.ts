import "./style.sass";

const screen = document.querySelector("#screen");
const value = document.createElement("span");
const keys = Array.from(document.querySelector("#keyboard")?.children);
const equal = document.querySelector("#result");
const resetKey = document.querySelector("#reset");
const delKey = document.querySelector("#del");
const mathOperations = ["+", "-", "x", "/"];

let isResultShowed = false;

delKey?.addEventListener("click", () => deleteNumber());

keys.forEach((key) => {
	key.addEventListener("click", (e) => {
		if (e?.target?.textContent !== "DEL") {
			if (isResultShowed) {
				value.textContent = e?.target?.textContent;
				isResultShowed = false;
			} else {
				value.textContent += e?.target?.textContent;
			}
			screen?.appendChild(value);
			mathOperations.forEach((operation) => resolve(value, operation));
			resetKey?.addEventListener("click", () => {
				reset();
			});
		}
	});
});

function sum(a: number, b: number): number {
	let result: number = a + b;
	return result;
}

function subtraction(a: number, b: number): number {
	let result: number = a - b;
	return result;
}

function multiplication(a: number, b: number): number {
	let result: number = a * b;
	return result;
}

function division(a: number, b: number): number | string {
	if (b !== 0) {
		let result: number = a / b;
		return result;
	} else {
		return "Math Error";
	}
}
function result(result: string | number): void {
	value.textContent = "";
	value.textContent = result;
}

function resolve(value: any, operation: string) {
	if (value.textContent?.includes(operation)) {
		const vars = value.textContent.split(operation);
		const varsN = vars.map(Number);
		equal?.addEventListener("click", () => {
			value.textContent = "";
			isResultShowed = true;
			switch (operation) {
				case mathOperations[0]:
					result(sum(varsN[0], varsN[1]));
					break;
				case mathOperations[1]:
					result(subtraction(varsN[0], varsN[1]));
					break;
				case mathOperations[2]:
					result(multiplication(varsN[0], varsN[1]));
					break;
				case mathOperations[3]:
					result(division(varsN[0], varsN[1]));
					break;
			}
		});
	}
}

function reset() {
	value.textContent = "";
}
function deleteNumber() {
	const valueA = value.textContent?.split("");
	valueA?.pop();
	const show = valueA?.join("");
	value.textContent = show;
}
