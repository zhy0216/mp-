import { Button, View, Block } from "mplus2/component";
export default class Index {
	state = {
		counter: 0,
	};

	render() {
		return (
			<Block>
				<View>{this.state.counter}</View>
				<Button onClick={() => {}}>+</Button>
				<Button onClick={() => {}}>-</Button>
			</Block>
		);
	}
}
