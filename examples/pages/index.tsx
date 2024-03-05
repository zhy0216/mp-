export default class Index {
  state = {
    counter: 0
  }

  render() {
    return (
      <>
        <View>{this.state.counter}</View>
        <Button onClick={() => {}}>+</Button>
        <Button onClick={() => {}}>-</Button>
      </>
    );
  }
}
