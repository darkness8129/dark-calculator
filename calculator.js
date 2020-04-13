let ActionButton = React.createClass({
	render: function(){
		return <button className = "action-btn" onClick = {() => this.props.setAction(this.props.action)}>{this.props.action}</button>;
	}
});

let Calculator = React.createClass({

	getInitialState: function(){
		return {
			result: "",
			colorResult: "#65f76f"
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
			color = this.state.colorResult,
			result = 0;

		if (isNaN(a) || isNaN(b)){
			result = "Error: you entered no numbers";
			color = "#ff795e";
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
			color = "#65f76f";
		}

		this.setState({
			result: result,
			colorResult: color
		});
	},

	render: function(){
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

ReactDOM.render(
	<Calculator/>,
	document.getElementById('content')
	);