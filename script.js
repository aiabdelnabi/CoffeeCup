
var app = angular.module("CoffeeCup",[]);

app.controller("MainCtrl",function($scope){

	$scope.glassHeight = 200;
	$scope.glassWidth = 300;
	$scope.CustomView = true;


	$scope.customeIngredients = [{name: 'espresso',height: 0, width: 310, top: 0, curve:0, amount: 0, mLeft: 12, price: 6},
								 {name: 'water',height: 0,width: 310, top: 0, curve: 0, amount: 0, mLeft: 12, price: 1},
								 {name: 'hotChoclet',height: 0,width: 310, top: 0, curve: 0, amount: 0, mLeft: 12, price: 8},
								 {name: 'steamedMilk',height: 0,width: 310, top: 0, curve: 0, amount: 0, mLeft: 12, price: 6},
								 {name: 'milkFoam',height: 0,width: 310, top: 0, curve: 0, amount: 0, mLeft: 12, price: 4}];

	$scope.readyMadeCoffee = [
		{ 
			CoffeeName: "Espresso",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6}]
		},
		{ 
			CoffeeName: "Macchiato",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'milkFoam',height: 50,width: 310, top: 80, curve: 0, amount: 25, mLeft: 22, price: 4}]
		},
		{ 
			CoffeeName: "Latte",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'steamedMilk',height: 90,width: 310, top: 40, curve: 0, amount: 45, mLeft: 22, price: 6},
					 {name: 'milkFoam',height: 40,width: 310, top: 0, curve: 0, amount: 20, mLeft: 22, price: 4}]
		},
		{ 
			CoffeeName: "Flat White",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'steamedMilk',height: 90,width: 310, top: 40, curve: 0, amount: 45, mLeft: 22, price: 6}]
		},
		{ 
			CoffeeName: "Caapucino",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'steamedMilk',height: 50,width: 310, top: 80, curve: 0, amount: 25, mLeft: 22, price: 6},
					 {name: 'milkFoam',height: 70,width: 300, top: 10, curve: 0, amount: 35, mLeft: 22, price: 4}]
		},
		{ 
			CoffeeName: "Mocha",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'hotChoclet',height: 40,width: 310, top: 90, curve: 0, amount: 20, mLeft: 22, price: 8},
					 {name: 'steamedMilk',height: 90,width: 310, top: 0, curve: 0, amount: 45, mLeft: 22, price: 6}]
		},
		{ 
			CoffeeName: "Doppio",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'espresso',height: 70,width: 310, top: 60, curve: 0, amount: 35, mLeft: 22, price: 1}]
		},
		{ 
			CoffeeName: "Long Black",
			MadeOf: [{name: 'espresso',height: 70, width: 310, top: 130, curve:0, amount: 35, mLeft: 22, price: 6},
					 {name: 'water',height: 130,width: 310, top: 0, curve: 0, amount: 65, mLeft: 22, price: 1}]
		}	
	];


	$scope.ingredients = $scope.customeIngredients;

	$scope.SetData = function(name){
		var index = $scope.GetIngredientIndexByName(name);
		var value = $scope.GetElementValue(name);

		$scope.AdjustAmount(index, value);
		$scope.AdjustHeight();
		$scope.AdjustTop();
		//$scope.AdjustCurve();
	};

	$scope.GetIngredientIndexByName = function (name){
		for (var i = 0; i < $scope.ingredients.length; i++) {
			if($scope.ingredients[i].name === name){
				return i;
			}
		};
	};

	$scope.GetElementValue = function(name){
		return	document.getElementById(name).value;
	};


	$scope.TotalAmount = function(){
		var total = 0;
		for (var i = 0; i < $scope.ingredients.length; i++) {
			total = total + parseInt($scope.ingredients[i].amount);
		};
		return total;
	}

	$scope.AdjustAmount = function(index, value){

		$scope.ingredients[index].amount = value;
		var totalAmount = $scope.TotalAmount();
		if(totalAmount > 100){

			var defAmount = totalAmount - 100;
			var remainTotalAmount = totalAmount - value;

			for (var i = 0; i < $scope.ingredients.length; i++) {
				if(index != i){
					$scope.ingredients[i].amount -= Math.round(defAmount * ( (($scope.ingredients[i].amount * 100) / remainTotalAmount) / 100)); 
				}
			};
		}
	};


	$scope.AdjustHeight = function(){
		for (var i = 0; i < $scope.ingredients.length; i++) {
			$scope.ingredients[i].height = $scope.ingredients[i].amount * 2; 
		};
	};

	$scope.AdjustTop = function(){

		$scope.ingredients[0].top =  $scope.glassHeight - $scope.ingredients[0].height; 

		for (var i = 1; i < $scope.ingredients.length; i++) {
			$scope.ingredients[i].top = $scope.ingredients[i-1].top - $scope.ingredients[i].height; 
		};
	};

	$scope.AdjustCurve = function(){
		for (var i = 0; i < $scope.ingredients.length; i++) {
			var LiquidHeight = $scope.ingredients[i].height + $scope.ingredients[i].top;
			if(LiquidHeight > 170){
				$scope.ingredients[i].curve = LiquidHeight / 5;
			}else{
				$scope.ingredients[i].curve = 0;
			}

			if($scope.ingredients[i].top > 160){
				$scope.ingredients[i].width = $scope.glassWidth - 24;
				$scope.ingredients[i].mLeft = 32;
			}else{
				$scope.ingredients[i].width  = 300;
				$scope.ingredients[i].mLeft = 22;
			}
		};
	};

	$scope.TotalPriceCalc = function(){
		var totalPrice = 0;
		for (var i = 0; i < $scope.ingredients.length; i++) {
			totalPrice +=	$scope.ingredients[i].amount * $scope.ingredients[i].price;
		};
		return totalPrice;
	};

	$scope.SetReadyMadeCoffee = function(name){
		for (var i = 0; i < $scope.readyMadeCoffee.length; i++) {
			if($scope.readyMadeCoffee[i].CoffeeName == name){
				$scope.ingredients = $scope.readyMadeCoffee[i].MadeOf;
				break;
			}
		};
	};

	$scope.ToggleView = function(value){
		$scope.CustomView = value;

		if($scope.CustomView){
			$scope.ingredients = $scope.customeIngredients;
		}
	}

});