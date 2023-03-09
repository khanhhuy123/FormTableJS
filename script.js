class Food{
    constructor(foodName, price, amount){
        this.foodName = foodName;
        this.price = price;
        this.amount = amount;
    }
}

const food1 = new Food("food1", 49, 0);
const food2 = new Food("food2", 139, 0);
const food3 = new Food("food3", 159, 0);
const food4 = new Food("food4", 199, 0);
const food5 = new Food("food5", 299, 0);
const food6 = new Food("food6", 129, 0);
const food7 = new Food("food7", 79, 0);
const food8 = new Food("food8", 99, 0);
const food9 = new Food("food9", 119, 0);

const menu = [food1, food2, food3, food4, food5, food6, food7, food8, food9];
const receipt = [];

function DisplayFood(){
    const webMenu = document.getElementsByClassName("food-menu")[0];

    for (let i = 0; i < menu.length; i++) {
        const foodItem = menu[i];
        const foodDiv = document.createElement("div");
        foodDiv.innerHTML = `<strong>${foodItem.foodName}</strong> <p>Price: ${foodItem.price}</p> <button>Order</button>`;
        webMenu.appendChild(foodDiv);
    }
}

DisplayFood();
