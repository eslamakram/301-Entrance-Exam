

let shopsTable = document.getElementById('shopsTable');
let shopForm = document.getElementById('newShop');
shopForm.addEventListener('submit', submitHandler);
let hours = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
let allShops = [];

function shop(shopName, Min, Max, Avg) {
    this.shopName = shopName;
    this.Min = Min;
    this.Max = Max;
    this.Avg = Avg;
    this.cookies = 0;
    this.allCookies = [];
    this.dailyTotal = 0;
    allShops.push(this);

}


shop.prototype.getRandomCookies = function () {

    let randomCookies = Math.random() * ((this.Max - this.Min + 1) + this.Min);
    this.cookies = Math.floor(randomCookies * this.Avg);
    this.allCookies.push(this.cookies);
    return this.cookies

}

shop.prototype.render = function () {

    let rowData = document.createElement('tr');
    shopsTable.appendChild(rowData);

    let headData = document.createElement('th');
    headData.textContent = this.shopName;
    rowData.appendChild(headData);

    for (let i = 0; i < hours.length; i++) {
        let hData = document.createElement('td');
        let hourlyCookies = this.getRandomCookies();
        hData.textContent = hourlyCookies;
        rowData.appendChild(hData);
        this.dailyTotal = this.dailyTotal + hourlyCookies;
    }
    let tailData = document.createElement('th');
    tailData.textContent = this.dailyTotal;
    rowData.appendChild(tailData);
}


function headerTable() {

    let rowHeader = document.createElement('tr');
    shopsTable.appendChild(rowHeader);

    hours.unshift(' ');
    hours.push('Daily Total');

    for (let i = 0; i < hours.length; i++) {

        let rowHead = document.createElement('th');
        rowHead.textContent = hours[i];
        rowHeader.appendChild(rowHead);

    }

    hours.shift();
    hours.pop();


}

function footerTable() {

    let footerRow = document.createElement('tr');
    shopsTable.appendChild(footerRow);

    footerHead = document.createElement('th');
    footerRow.appendChild(footerHead);
    footerHead.textContent = 'Total';

    for (let i = 0; i < hours.length; i++) {
        let total = 0;
        for (let x = 0; x < allShops.length; x++) {
            total += allShops[x].allCookies[i];
        }
        let footerData = document.createElement('th');
        footerData.textContent = total;
        footerRow.appendChild(footerData);
    }
    let totalOfTotal = 0;
    for (let r = 0; r < allShops.length; r++) {
      totalOfTotal += allShops[r].dailyTotal;
    }

    let footerTail = document.createElement('th');
    footerRow.appendChild(footerTail);
    footerTail.textContent = totalOfTotal;
    



}

function submitHandler(event) {
    event.preventDefault();
    let shopName = event.target.shopName.value;
    let shopMax = parseInt(event.target.shopMax.value);
    let shopMin = parseInt(event.target.shopMin.value);
    let shopAvg = parseInt(event.target.shopAvg.value);

    let newShop = new shop(shopName, shopMin, shopMax, shopAvg);

    shopsTable.deleteRow(-1);
    newShop.render();
     footerTable();
}


let seattle = new shop('Seattle', 23, 65, 6.3);
let tokyo = new shop('Tokyo ', 3, 24, 1.2);
let dubai = new shop('Dubai ', 11, 38, 3.7);
let paris = new shop('Paris ', 20, 38, 2.3);
let lima = new shop('Lima ', 2, 16, 4.6);

headerTable();

for (let i = 0; i < allShops.length; i++) {
    allShops[i].render();

}

footerTable();