let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let addBtn = document.getElementById("addBtn");
let tableBody = document.getElementById("tableBody");
let message = document.getElementById("message");
let totalNum = document.getElementById("totalNum");
let tdProduct = document.getElementById("tdProduct");
let products = JSON.parse(localStorage.getItem("products")) || [];

displayProducts();
addBtn.addEventListener("click", function() {
    let name = productName.value;
    let price = productPrice.value;
    let quan = productQuantity.value;
    if (name === "" || price === "" || quan === "") {
        message.textContent = "Add product firstly";
        return;
    }
    products.push({
        name: name,
        price: price,
        quantity: quan
    });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    message.textContent = "";
    
    productName.value = "";
    productPrice.value = "";
    productQuantity.value = "";
});
function displayProducts() {
    tableBody.innerHTML = "";
    let total = 0;
    let totalProduct = 0;
    products.forEach(function(product, index){
        let tr = document.createElement("tr");
        tableBody.appendChild(tr);
        let tdName = document.createElement("td");
        tr.appendChild(tdName);
            tdName.textContent = product.name;
            let tdPrice = document.createElement("td");
            tr.appendChild(tdPrice);
            tdPrice.textContent = product.price;
            let tdQuan = document.createElement("td");
            tr.appendChild(tdQuan);
            tdQuan.textContent = product.quantity;
            let tdActionBtns = document.createElement("td");
            tr.appendChild(tdActionBtns);
            let tdTotal = document.createElement("td");
            tr.appendChild(tdTotal);
            tdTotal.textContent = Number(product.price) * Number(product.quantity);
            let editBtn = document.createElement("button");
            editBtn.type = "button";
            editBtn.className = "editBtn";
            editBtn.textContent = "Edit";
            tdActionBtns.appendChild(editBtn);
            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "deleteBtn";
            deleteBtn.textContent = "Delete";
            tdProduct.textContent = products.length;;
            total += Number(product.price) * Number(product.quantity);
            totalNum.textContent = total;
            tdActionBtns.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", function() {
                tdProduct.textContent = products.length - 1;
                products.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));
                displayProducts();
                total -= Number(product.price) * Number(product.quantity);
                totalNum.textContent = total;
                message.textContent = "";
            });
            editBtn.addEventListener("click", function() {
                productName.value = product.name;
                productPrice.value = product.price;
                productQuantity.value = product.quantity;
                products.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));
                displayProducts();
                message.textContent = "";
            });
            
});
    }
