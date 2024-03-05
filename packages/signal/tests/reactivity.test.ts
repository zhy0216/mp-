import { signal, computed, effect, batch } from "..";
import { describe, expect, it } from "bun:test";

describe("signal", () => {
	it("should initialize with the correct value", () => {
		const testSignal = signal(10);
		expect(testSignal.peek()).toBe(10);
	});

	it("should update the value correctly", () => {
		const testSignal = signal(10);
		testSignal.value = 20;
		expect(testSignal.peek()).toBe(20);
	});
});

describe("computed", () => {
	it("should compute the correct value", () => {
		const testSignal = signal(10);
		const computedSignal = computed(() => testSignal.value * 2);
		expect(computedSignal.peek()).toBe(20);
		testSignal.value = 20;
		expect(computedSignal.peek()).toBe(40);
	});

	it("should compute the correct value with condition", () => {
		const conditionSignal = signal(true);
		const testSignal = signal(10);
		let effectTime = 0;
		const computedSignal = computed(() => {
			effectTime++;
			return conditionSignal.value ? 50 : testSignal.value * 2;
		});
		expect(effectTime).toBe(1);
		expect(computedSignal.peek()).toBe(50);
		testSignal.value = 20;
		expect(effectTime).toBe(1);
		conditionSignal.value = false;
		expect(effectTime).toBe(2);
		expect(computedSignal.peek()).toBe(40);
		testSignal.value = 30;
		expect(effectTime).toBe(3);
		expect(computedSignal.peek()).toBe(60);
	});

	it("should get correct value", () => {
		const count = signal(0);
		const double = computed(() => count.value * 2);
		const triple = computed(() => count.value * 3);
		count.value = 1;
		expect(double.value).toBe(2);
		expect(triple.value).toBe(3);
	});

	it("should get correct value", () => {
		const count = signal(0);
		const double = computed(() => count.value * 2);
		const triple = computed(() => count.value * 3);
		batch(() => {
			count.value = 1;
		});
		expect(double.value).toBe(2);
		expect(triple.value).toBe(3);
	});

	it("should get correct value", async () => {
		const count = signal(0);
		const double = computed(() => count.value * 2);
		const triple = computed(() => count.value * 3);
		batch(() => {
			count.value = 1;
		});
		await Promise.resolve();
		expect(double.value).toBe(2);
		expect(triple.value).toBe(3);
	});
});

describe("effect", () => {
	it("should run the effect function", () => {
		let testValue = 0;
		effect(() => {
			testValue = 10;
		});
		expect(testValue).toBe(10);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.value + " " + surname.value);

		let effectTimes = 0;
		const dispose = effect(() => {
			fullName.value;
			effectTimes++;
		});
		dispose();
		name.value = "John";
		expect(effectTimes).toBe(1);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.value + " " + surname.value);

		let effectTimes = 0;
		effect(() => {
			fullName.value;
			effectTimes++;
		});
		name.value = "John";
		expect(effectTimes).toBe(2);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.value + " " + surname.value);

		let effectTimes = 0;
		effect(() => {
			effectTimes++;
		});
		name.value = "John";
		expect(effectTimes).toBe(1);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.peek() + " " + surname.value);

		let effectTimes = 0;
		effect(() => {
			fullName.value;
			effectTimes++;
		});

		name.value = "John";
		expect(effectTimes).toBe(1);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.value + " " + surname.value);

		let effectTimes = 0;
		effect(() => {
			fullName.value;
			effectTimes++;
		});

		name.value = "John";
		expect(effectTimes).toBe(2);
	});

	it("should get correct value", () => {
		const name = signal("Dnt");
		const surname = signal("Zhang");
		const fullName = computed(() => name.value + " " + surname.value);

		let effectTimes = 0;
		effect(() => {
			fullName.value;
			effectTimes++;
		});

		name.value = "John";
		surname.value = "Smith";
		expect(effectTimes).toBe(3);
	});

	it("should get correct value", () => {
		const count = signal(1);
		const doubleCount = computed(() => count.value * 2);

		let effectTimes = 0;
		effect(() => {
			count.value;
			doubleCount.value;
			effectTimes++;
		});

		count.value = 2;
		expect(doubleCount.value).toBe(4);
		expect(effectTimes).toBe(2);
	});

	it("should get correct value", () => {
		const count = signal(1);
		const doubleCount = computed(() => count.value * 2);

		let effectTimes = 0;
		effect(() => {
			doubleCount.value;
			effectTimes++;
		});

		count.value = 2;
		expect(doubleCount.value).toBe(4);
		expect(effectTimes).toBe(2);
	});

	it("should get correct value", () => {
		const count = signal(1);
		const doubleCount = computed(() => count.value * 2);

		let effectTimes = 0;
		effect(() => {
			count.value;
			effectTimes++;
		});

		count.value = 2;
		expect(doubleCount.value).toBe(4);
		expect(effectTimes).toBe(2);
	});

	it("should get the value correctly", () => {
		const testSignal = signal([1, 2, 3]);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});
		testSignal.value.push(4);
		expect(effectTimes).toBe(1);
	});

	it("should get the value correctly", () => {
		const testSignal = signal([1, 2, 3]);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});
		testSignal.value.push(4);
		// same as testSignal.value = testSignal.value
		testSignal.update();
		expect(effectTimes).toBe(2);
	});
});

describe("batch", () => {
	it("should get the value correctly", () => {
		const testSignal = signal(10);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});
		batch(() => {
			testSignal.value = 20;
			testSignal.value = 30;
			testSignal.value = 40;
		});
		expect(effectTimes).toBe(2);
	});

	it("should get the value correctly", async () => {
		const testSignal = signal(10);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});
		batch(() => {
			testSignal.value = 20;
			testSignal.value = 30;
			testSignal.value = 40;
		});
		await Promise.resolve();
		expect(effectTimes).toBe(2);
	});

	it("should get the value correctly", () => {
		const testSignal = signal(10);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});

		testSignal.value = 15;

		batch(() => {
			testSignal.value = 20;
			testSignal.value = 30;
			testSignal.value = 40;
		});
		expect(effectTimes).toBe(3);
	});

	it("should get the value correctly", () => {
		const testSignal = signal(10);
		let effectTimes = 0;
		effect(() => {
			testSignal.value;
			effectTimes++;
		});
		// same as testSignal.value = testSignal.value
		testSignal.value = 10;

		batch(() => {
			testSignal.value = 20;
			testSignal.value = 30;
			testSignal.value = 40;
		});
		expect(effectTimes).toBe(2);
	});
});
