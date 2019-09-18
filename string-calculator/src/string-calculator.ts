export class StringCalculator {
	public add(numbersString: string): number {
		let delimiter = ',';
		if (numbersString.indexOf('//') !== -1) {
			delimiter = numbersString.charAt(2);
			numbersString = numbersString.substring(3);
		}

		const numbers = this.convertToNumbersArr(numbersString, delimiter);
		this.validateNumbers(numbers);

		return numbers.reduce((prev, curr) => prev + curr, 0);
	}

	private validateNumbers(numbers: number[]) {
		const negativeNumbers = numbers.filter((nbr) => nbr < 0);

		if (negativeNumbers.length > 0) {
			const errDetail = negativeNumbers.join(', ');
			throw new Error(`negatives not allowed: ${errDetail}`);
		}
	}

	private convertToNumbersArr(str: string, delimiter: string): number[] {
		const regex = new RegExp(`[\n${delimiter}]+`);
		return str.split(regex).map(val => Number(val));
	}
}
