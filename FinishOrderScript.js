var sessionString = sessionStorage.getItem("finish-receipt");
var finishReceipt = JSON.parse(sessionString);

//FinishOrder.html with form and js
//Style FinishOrder.html with css
//Extra: add and edit food function, logo, navigation, 

function DisplayForm(){
    const formMenu = document.getElementsByClassName("information")[0];
    const formDiv = document.createElement("div");
    formDiv.innerHTML = `
    <input id="nameInput"type="text" name="name" placeholder="Name" onclick="SelectText() required="required">
    <fieldset><legend>Name</legend><input type="text" name="name" placeholder="Name"></fieldset>
    <label>Phonenumber <input type="tel" name="phone-number"></label>
    <label>Email <input type="email" name="email-address" placeholder="email@domain.com"></label>
    `;
    formMenu.appendChild(formDiv);
    
}

function DisplayReceipt(){
    const webReceiptTable = document.getElementsByClassName("receipt-table")[0];
    const webReceipt = document.getElementsByClassName("receipt")[0];
    const tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>Amount</th> <th>Food Name</th> <th>Price</th>`
    webReceiptTable.appendChild(tableHeader);
    var totalPrice = 0;
    var currentPrice;
    if(finishReceipt.length != 0){
        for(let i = 0; i < finishReceipt.length; i++){
            currentPrice = finishReceipt[i].price * finishReceipt[i].amount;
            totalPrice += currentPrice
        }
        const totalPriceDiv = document.createElement("div");
        totalPriceDiv.setAttribute("id", "total-price");
        webReceipt.appendChild(totalPriceDiv);
        var content = document.createTextNode("Total price: " + totalPrice);
        totalPriceDiv.appendChild(content);
    }
    for (let i = 0; i < finishReceipt.length; i++) {
        const receiptDiv = document.createElement("tr");
        receiptDiv.innerHTML = `<td>x${finishReceipt[i].amount}</td> <td>${finishReceipt[i].foodName}</td> <td>${finishReceipt[i].price}</td> <button id="delete-${finishReceipt[i].foodName}" onclick="DeleteFood('${finishReceipt[i].foodName}')">Delete</button>`;
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

function DeleteFood(foodName){ 
    for (let i = 0; i < finishReceipt.length; i++){ 
        if(finishReceipt[i].foodName == foodName){
            if(finishReceipt[i].amount == 1){
                finishReceipt.splice(i, 1);
            }
            else{
                finishReceipt[i].amount -= 1;
            }
        }
        else{
            continue;
        }
    }


    ResetDisplayReceipt();
    DisplayReceipt();
}

function ReturnToIndex(){
    window.location.href = "index.html";
}

DisplayReceipt();
DisplayForm();
