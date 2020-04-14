let ActionButton = React.createClass({
	render(){
		return <button className = "action-btn" onClick = {() => this.props.setAction(this.props.action)}>{this.props.action}</button>;
	}
});

let Calculator = React.createClass({
	getInitialState(){
		return {
			result: "",
			colorResult: "#65f76f"
		};
	},

	//function that define first number
	setFirstNumber(event){
		this.firstNumber = event.target.value;
	},

	//function that define second number
	setSecondNumber(event){
		this.secondNumber = event.target.value;
	},

	//function to get action
	setAction(value) {
   		this.action = value;
	},

	//function that performs arithmetic
	calcFunc(){
		let a = +this.firstNumber,
			b = +this.secondNumber,
			{colorResult} = this.state,
			result = 0;

		if (isNaN(a) || isNaN(b)){
			result = "Error: you entered no numbers.";
			colorResult = "#ff795e";
		} else if (b === 0){
			result = "Error: division by zero.";
			colorResult = "#ff795e";
		} else{
			switch (this.action){
				case "+":
					result = a + b;
					break;
				case "-":
					result = a - b;
					break;
				case "×":
					result = a * b;
					break;
				case "/":
					result = a / b;
					break; 
			}
		 
			colorResult = "#65f76f";
		}

		this.setState({result, colorResult});	
	},

	render(){
		let styleResult = {color: this.state.colorResult};
		return <div className = "calculator">
					<h2 className = "calculator-title">Calculator</h2>
					<input className = "input-calc" type ="text" placeholder = "First number..." onChange = {this.setFirstNumber}/>
					<input className = "input-calc" type ="text" placeholder = "Second number..." onChange = {this.setSecondNumber}/>
					<div className = "action-buttons">
						<ActionButton action = "+" setAction={this.setAction} />
						<ActionButton action = "-" setAction={this.setAction} />
						<ActionButton action = "×" setAction={this.setAction} />
						<ActionButton action = "/" setAction={this.setAction} />
					</div>
					<button className = "get-res-btn" onClick = {this.calcFunc}> Get result </button>
					<div className = "result" >Result: <span style = {styleResult}>{this.state.result}</span></div>
				</div>;
	}
});

ReactDOM.render(<Calculator/>, document.getElementById('content'));