let Button = React.createClass({
	getInitialState: function(){
		return {
			action: ""
		}
	},

	//function that update state action and transmits the action to the main component
	updateAction: function(){
		this.state.action = this.props.action;
		this.props.setAction(this.state.action);
	},

	render: function(){
		return <a className = "action-btn" onClick = {this.updateAction}>{this.props.action}</a>;
	}
});

let Calculator = React.createClass({

	getInitialState: function(){
		return {
			result: 0
		};
	},

	//function that define first number
	setFirstNumber: function(event){
		this.firstNumber = event.target.value;
	},

	//function that define second number
	setSecondNumber: function(event){
		this.secondNumber = event.target.value;
	},

	//function to get action
	setAction: function(value) {
   		this.action = value;
	},

	//function that performs arithmetic
	calcFunc: function(){
		let a = +this.firstNumber,
			b = +this.secondNumber,
			result = this.state.result;

		switch (this.action){
			case "+":
				result = a + b;
				break;
			case "-":
				result = a - b;
				break;
			case "*":
				result = a * b;
				break;
			case "/":
				result = a / b;
				break; 
		}

		this.setState({
			result: result
		});
	},

	render: function(){
		return <div className = "calculator">
					<h2 className = "calculator-title">Enter your numbers here:</h2>
					<input className = "input-calc" type ="text" placeholder = "Enter first number..." onChange = {this.setFirstNumber}/>
					<input className = "input-calc" type ="text" placeholder = "Enter second number..." onChange = {this.setSecondNumber}/>
					<div className = "action-buttons">
						<Button action = "+" setAction={this.setAction} />
						<Button action = "-" setAction={this.setAction} />
						<Button action = "*" setAction={this.setAction} />
						<Button action = "/" setAction={this.setAction} />
					</div>
					<a className = "get-res-btn" onClick = {this.calcFunc}> Get result </a>
					<div className = "result" >Your result: {this.state.result}</div>
					

				</div>;
	}

});

ReactDOM.render(
	<Calculator/>,
	document.getElementById('content')
	);