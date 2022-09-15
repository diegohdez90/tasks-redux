export const addZero = (n: number): string =>
	n < 10 ? `0${n}` : n.toString();
