import "./style.sass";
// Calculator Function
const screen: HTMLElement | null = document.querySelector("#screen");
const value: HTMLSpanElement = document.createElement("span");
value.style.maxWidth = "100%";
value.style.overflow = "hidden";
const keys: HTMLCollection | never[] =
	document.querySelector("#keyboard")?.children || [];
const keysArray = Array.from(keys);
const equal: HTMLElement | null = document.querySelector("#result");
const resetKey: HTMLElement | null = document.querySelector("#reset");
const delKey: HTMLElement | null = document.querySelector("#del");
const mathOperations = ["+", "-", "x", "/"];
let isResultShowed: boolean = false;

// Switch
const circle: HTMLElement | null = document.querySelector("#circle");
const app: HTMLElement | null = document.querySelector("#app");
let click: number = parseInt(
	localStorage.getItem("prefers-color-scheme") || "1"
);
circle?.addEventListener("click", () => {
	click = click >= 3 ? 1 : click + 1;
	localStorage.setItem("prefers-color-scheme", `${click}`);
	app?.classList.remove("theme1", "theme2", "theme3");
	app?.classList.add(`theme${localStorage.getItem("prefers-color-scheme")}`);
});

document.addEventListener("DOMContentLoaded", () => {
	if (app)
		app.className = `theme${localStorage.getItem("prefers-color-scheme")} || 1`;
});

delKey?.addEventListener("click", () => deleteNumber());

keysArray.forEach((key) => {
	key.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		if (target?.textContent !== "DEL") {
			if (isResultShowed) {
				value.textContent = target?.textContent;
				isResultShowed = false;
			} else {
				value.textContent += target?.textContent || "";
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
function result(result: number | string | null): void {
	value.textContent = "";
	value.textContent = result?.toString() || "";
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
	if (show) value.textContent = show;
}
