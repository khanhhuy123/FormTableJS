class Food{
    constructor(foodName, price, amount, id){
        this.foodName = foodName;
        this.price = price;
        this.amount = amount;
        this.id = id;
    }
}

//Change photo, food name

const food1 = new Food("Hamburger", 119, 1 , "food1");
const food2 = new Food("Blackburger", 129, 1, "food2");
const food3 = new Food("Fries", 10, 1, "food3");
const food4 = new Food("Toast", 19, 1, "food4");
const food5 = new Food("Steak", 99, 1, "food5");
const food6 = new Food("Pasta 1", 79, 1, "food6");
const food7 = new Food("Pasta 2", 79, 1, "food7");
const food8 = new Food("Cola", 19, 1, "food8");
const food9 = new Food("Red drink", 29, 1, "food9");
const food10 = new Food("Green drink", 29, 1, "food10");
const food11 = new Food("Ice cream", 29, 1, "food11");
const food12 = new Food("Pancake", 39, 1, "food12");

const menu = [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10, food11, food12];
const receipt = [];
const img = ["img/hamburger.jpg", "img/blackburger.jpg", "img/fries.jpg", "img/toast.jpg", "img/steak.jpg", "img/pasta1.jpg", "img/pasta2.jpg", "img/cola.jpg", "img/red-drink.jpg", "img/green-drink.jpg", "img/icecream.jpg", "img/pancake.jpg"];

function DisplayFood(){
    const webMenu = document.getElementsByClassName("food-menu")[0];

    for (let i = 0; i < menu.length; i++) {
        const foodDiv = document.createElement("div");
        foodDiv.innerHTML = `<p>${menu[i].foodName}</p> <img src="${img[i]}"> <p>Price: ${menu[i].price}</p> <button id="food${i}" onclick="Order(${menu[i].id})">Order</button>`;
        webMenu.appendChild(foodDiv);
    }
}

function DisplayReceipt(){
    const webReceiptTable = document.getElementsByClassName("receipt-table")[0];
    const webReceipt = document.getElementsByClassName("receipt")[0];
    const tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>Amount</th> <th>Food Name</th> <th>Price</th>`
    webReceiptTable.appendChild(tableHeader);
    var totalPrice = 0;
    var currentPrice;
    if(receipt.length != 0){
        for(let i = 0; i < receipt.length; i++){
            currentPrice = receipt[i].price * receipt[i].amount;
            totalPrice += currentPrice
        }
        const totalPriceDiv = document.createElement("div");
        totalPriceDiv.setAttribute("id", "total-price");
        webReceipt.appendChild(totalPriceDiv);
        var content = document.createTextNode("Total price: " + totalPrice);
        totalPriceDiv.appendChild(content);
    }
    for (let i = 0; i < receipt.length; i++) {
        const receiptDiv = document.createElement("tr");
        receiptDiv.innerHTML = `<td>x${receipt[i].amount}</td> <td>${receipt[i].foodName}</td> <td>${receipt[i].price}</td> <button id="delete-${receipt[i].foodName}" onclick="DeleteFood('${receipt[i].foodName}')">Delete</button>`;
        webReceiptTable.appendChild(receiptDiv);
    }
}

function ResetDisplayReceipt(){
    const webReceiptTable = document.getElementsByClassName("receipt-table")[0];
    const totalPriceDiv = document.getElementById("total-price");
    if (document.contains(totalPriceDiv)){
        totalPriceDiv.remove();
    }  
    webReceiptTable.innerHTML = ``;

}

function ChangeFoodAmount(){
    var elementToCheck;

    for (let i = 0; i < receipt.length; i++){
        elementToCheck = receipt[i];
        for (let x = i+1; x < receipt.length; x++){
            if (elementToCheck.foodName == receipt[x].foodName){
                receipt.pop(receipt[x]);
                elementToCheck.amount += 1;
            }
            else{
                continue;
            }
        }
    }
}

function DeleteFood(foodName){ 
    for (let i = 0; i < receipt.length; i++){
        if(receipt[i].foodName == foodName){
            if(receipt[i].amount == 1){
                receipt.splice(i, 1);
            }
            else{
                receipt[i].amount -= 1;
            }
        }   
        else{
            continue;
        }
    }

    if (receipt.length == 0){
        const webReceipt = document.getElementsByClassName("receipt")[0]
        const finishBtn = document.getElementById("finish-orderBtn");
        webReceipt.removeChild(finishBtn);
    } 

    ResetDisplayReceipt();
    DisplayReceipt();
    DisplayFinshBtn();
}

function Order(food){
    receipt.push(food);
    ResetDisplayReceipt();
    ChangeFoodAmount();
    DisplayReceipt();
    DisplayFinshBtn();
}

function DisplayFinshBtn(){
    const webReceipt = document.getElementsByClassName("receipt")[0]

    if(receipt.length != 0){
        if(document.contains(document.getElementById("finish-orderBtn"))){
            document.getElementById("finish-orderBtn").remove();
        }
        const finishOrderBtn = document.createElement("BUTTON");
        finishOrderBtn.setAttribute("onclick", "FinishOrder()");
        finishOrderBtn.setAttribute("id", "finish-orderBtn");
        webReceipt.appendChild(finishOrderBtn);

        var content = document.createTextNode("Finish Order");
        finishOrderBtn.appendChild(content);
    }
}

function FinishOrder(){
    sessionStorage.setItem("finish-receipt", JSON.stringify(receipt));
    window.location.href = "FinishOrder.html";
}   

// console.log(Order(food1));
// console.log(Order(food3));
// console.log(Order(food5));
// console.log(Order(food4));
// console.log(Order(food6));
// console.log(Order(food7));
// console.log(Order(food4));
// console.log(Order(food9));
// console.log(Order(food2));
// console.log(Order(food5));
// console.log(Order(food8));
// console.log(Order(food1));
// console.log(Order(food2));
// console.log(Order(food5));
// console.log(Order(food4));
// console.log(Order(food9));
// console.log(Order(food8));
// console.log(Order(food1));
// console.log(Order(food2));
// console.log(Order(food5));



DisplayFood();
