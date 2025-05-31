export interface IShip {
	readonly length: number;
	getHits(): number;
	hit(): void;
	isSunk(): boolean;
}

export const Ship = (length: number): IShip => {
	if (length <= 0) {
		throw new Error("Ship length must be a postive number");
	}

	let currentHits = 0;

	const hit = (): void => {
		if (currentHits < length) {
			currentHits += 1;
		}
	};

	const getHits = (): number => {
		return currentHits;
	};

	const isSunk = (): boolean => {
		return currentHits >= length;
	};

	return {
		length,
		getHits,
		hit,
		isSunk,
	};
};
