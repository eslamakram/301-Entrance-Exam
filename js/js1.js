'use strict';

let studentForm = document.getElementsByTagName('form')[0];
studentForm.addEventListener('submit',clickHandler);
let tableSection = document.getElementById('tableSection');
let studentEmail = document.getElementById('studentEmail');
let studentPhonNum = document.getElementById('studentPhonNum');
let h2Element = document.createElement('h2');
    tableSection.appendChild(h2Element);
let fee = document.getElementById('fee');
let header = ['ID','Name','Email','Mobile','Age', 'Tuition'];

let stdTable = document.createElement('table');
tableSection.appendChild(stdTable);
stdTable.addEventListener('click', removeRowFromTable);



function student(stdName, stdMail, stdMobile, stdAge, stdTuition ){
      this.stdName =  stdName;
    this.stdMail = stdMail;
    this.stdMobile = stdMobile;
    this.stdAge = stdAge;
    this.stdTuition = stdTuition; 

 student.all.push(this);
 }

student.all = [];

getDataLocalStorage();
render();

function render(){


    for (let i = 0; i < student.all.length; i++) {

        let dataRow = document.createElement('tr');
        stdTable.appendChild(dataRow);

        let idElement = document.createElement('td');
        idElement.textContent = i;
        dataRow.appendChild(idElement);

        let stdNameElement = document.createElement('td');
        stdNameElement.textContent = student.all[i].stdName;
        dataRow.appendChild(stdNameElement);

        let stdMailElement = document.createElement('td');
        stdMailElement.textContent = student.all[i].stdMail;
        dataRow.appendChild(stdMailElement);

        let stdMobileElement = document.createElement('td');
        stdMobileElement.textContent = student.all[i].stdMobile;
        dataRow.appendChild(stdMobileElement);

        let stdAgeElement = document.createElement('td');
        stdAgeElement.textContent = student.all[i].stdAge;
        dataRow.appendChild(stdAgeElement);
        
        let stdTutionElement = document.createElement('td');
        stdTutionElement.textContent = student.all[i].stdTuition;
        dataRow.appendChild(stdTutionElement);

        let headerRemover = document.createElement('td');
        headerRemover.textContent = 'X';
        headerRemover.id = 'remove';
        dataRow.appendChild(headerRemover);

    }



}


 function getTotal (){
    h2Element.innerHTML = ' ';
    let total = 0;
for (let i = 0; i < student.all.length; i++) {
    total +=  parseInt(student.all[i].stdTuition);
      
}

h2Element.textContent = `Total = ${total}`;    
}

 



headerTable();



function clickHandler(event){
    event.preventDefault();
   clearTable();
   window.localStorage.clear();
   h2Element.innerHTML = ' ';
    let stdName = event.target.studentEmail.value.split('@')[0];
    let stdMail = event.target.studentEmail.value;
    let stdMobile = event.target.studentPhonNum.value;
    let stdTuition = event.target.fee.value;
    let stdAge = getAge(24,18);
    let newStd = new student( stdName, stdMail, stdMobile, stdAge, stdTuition);
    //saveData
   saveLocalStorage();
    
    studentForm.reset(); //reset form
        render();
        getTotal();
    }


function getAge(max, min){
 return Math.floor(Math.random() * ((max - min + 1) + min));
 }



function headerTable(){
 
    let headerRow = document.createElement('tr');
    stdTable.appendChild(headerRow);

    for (let i = 0; i < header.length; i++) {
        let headerData = document.createElement('th');
        headerRow.appendChild(headerData);
        headerData.textContent = header[i];
       
    }
    let headerRemover = document.createElement('th');
        headerRow.appendChild(headerRemover);
        headerRemover.textContent = 'Remove';

   }

function clearTable(){

    while(stdTable.rows.length > 1){
        // stdTable.removeChild(stdTable.lastChild);
            stdTable.innerHTML = ' ';
            h2Element.innerHTML = ' ';
            localStorage.clear();


    }

}

//  function getClear(){

//     stdTable.innerHTML = "";
// } 
function removeRowFromTable(event){
    event.preventDefault();
     if(event.target.id == 'remove'){
         let index = parseInt(event.target.parentElement.rowIndex);
         student.all.splice(index-1, 1); 
         event.target.parentElement.remove();
        localStorage.setItem('StoredStudents',student.all);
        getTotal();
                     }

}


function saveLocalStorage(){

    localStorage.setItem('StoredStudents',JSON.stringify(student.all));
  }

  function getDataLocalStorage(){
  

    if(localStorage.getItem('StoredStudents') !== null){

      let oldData = JSON.parse(localStorage.getItem('StoredStudents'));
      for (let i = 0; i < oldData.length; i++) {
            student.all.push(oldData)  ;        
      }
 

    }


  }