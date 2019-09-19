let studThead = ["Roll No", "Name", "Email", "Phone Number"];
let studTtype = ["number", "text", "email", "number" ];
let empThead = ["Emp Id", "Name", "Date of Birth", "Email"];
let empTtype = ["number", "text", "date", "email"];
let tableId = document.createElement("table");
tableId.setAttribute("id", "tableId");
function createTable(tableArr, storageId){
    let headArr = tableArr;
    let tr = tableId.insertRow(0);
    headArr.forEach(function(element) {
        let th = document.createElement("th");
        th.setAttribute("class", "tHead");
        let ascBtn = document.createElement("BUTTON"); 
        th.innerHTML = element;
        ascBtn.setAttribute("class", "sortBtn");
        ascBtn.innerHTML = '<img src="../images/up.png" width="15px" height="auto">';
        ascBtn.setAttribute('id', element);
        ascBtn.addEventListener("click", function(event) {
            sortRow(this, 'asc', headArr, storageId);
            event.preventDefault();
        });
        th.appendChild(ascBtn);
        tr.appendChild(th);
    });
    let tableData = retrieveFromStorage(storageId);
    let div = document.getElementById("tableDisplay");
    div.appendChild(tableId);
    if(tableData != null){
        tableData.forEach(function(item){
            let tr = tableId.insertRow(-1);
            for (let [key, value] of Object.entries(item)) {
                let td = document.createElement("td");
                td.innerHTML = value;
                tr.appendChild(td);
            }
            let editBtn = document.createElement("BUTTON");
            editBtn.setAttribute("class", "Btn");
            editBtn.innerHTML = '<img src="../images/edit.png" width="30px" height="30px">';
            editBtn.addEventListener("click", function(event) {
                editRow(this, headArr, storageId);
                event.preventDefault();
            });
            tr.appendChild(editBtn);
            let dltBtn = document.createElement("BUTTON");
            dltBtn.setAttribute("class", "Btn");
            dltBtn.innerHTML = '<img src="../images/delete.png" width="30px" height="30px">';
            dltBtn.addEventListener("click", function(event) {
                dltRow(this, storageId);
                event.preventDefault();
            });
            tr.appendChild(dltBtn);
        });
    }
}

function handleForm(storageId, tableArr){
    let headArr = tableArr;
    if(formValidation(headArr, storageId).count == headArr.length && formValidation(headArr, storageId).flag ==0){
        let data = [];
        let rowObj = {};
        let i =0;
        let form = document.getElementById("formData");
        headArr.forEach(function(element){
            rowObj[element] = form[i].value;
            i++;
        });
        if(retrieveFromStorage(storageId) == null){
            data.push(rowObj);
            saveToStorage(storageId, data);
        }
        else{
            data = retrieveFromStorage(storageId);
            data.push(rowObj);
            saveToStorage(storageId, data);

        }
        displayTable(storageId, headArr);
    }
}

function formValidation(headArr, storageId){
    let count = 0;
    let flag = 0;
    let tableData = retrieveFromStorage(storageId);
    headArr.forEach(function(item){
        let formValue = document.forms["formData"][item].value;
        if(tableData != null){
            tableData.forEach(function(element){
                for (let [key, value] of Object.entries(element)) {
                    if(formValue == value){
                        alert(item+" already exist");
                        flag=1;
                    }
                }
            });
        }
        else{
            flag = 0;
        }
        let date = new Date();
        if (formValue == "" || formValue < 0 || formValue > date) {
            alert(item+" must be filled out");
            return false;
        }
        else{
            count++;
        }
    });
    return {count, flag};
}

function clearForm(){
    document.getElementById("formData").reset();
}
function addRow(tableArr, type){
    let headArr = tableArr;
    let inputType = type;
    let i = 0;
    let form = document.createElement("FORM");
    form.setAttribute("type", "text");
    form.setAttribute("id", "formData");
    document.getElementById("modalBody").appendChild(form);
    headArr.forEach(function(element){
        debugger
        let label = document.createElement("LABEL");
        label.innerHTML = element;
        form.appendChild(label);
        let input = document.createElement("INPUT");
        input.setAttribute("type", inputType[i]);
        if(inputType[i] == "date"){
            input.setAttribute("max", "2000-12-31");
            //input.setAttribute("min", "2000-01-01");
        }
        input.setAttribute("id", element);
        form.appendChild(input);
        let lineBreak = document.createElement('br');
        form.appendChild(lineBreak);
        i++
    });
    
    let modal = document.getElementById("formModal");
    modal.style.display ="block";
    var span =document.getElementsByClassName("close")[0];
    span.onclick = function(){ 
        window.location.reload();
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            window.location.reload();
        }
    }  
}

function displayTable(storageId, tableArr){
    let headArr = tableArr;
    document.getElementById("tableId").style.display = "block";
    window.location.reload();
}

function dltRow(dltBtn, storageId){
    if (confirm("Confim Deletion?") == true) {
        let tableId = document.getElementById("tableId");
        let rowIndex = (dltBtn.parentNode.rowIndex)-1;
        let tableData = retrieveFromStorage(storageId);
        tableData.splice(rowIndex, 1);
        tableId.deleteRow(dltBtn.parentNode.rowIndex);
    saveToStorage(storageId, tableData);
    } 
    
}

function editRow(editBtn, headArr, storageId){
    let rowIndex = editBtn.parentNode.rowIndex;
    let rows = document.getElementById("tableId").rows;
    if(rows[rowIndex].cells[0].contentEditable == "true"){
        editBtn.innerHTML = '<img src="../images/edit.png" width="30px" height="30px">';
        headArr.forEach(function(item, index){
            rows[rowIndex].cells[index].contentEditable = "false";
            rows[rowIndex].cells[index].style.backgroundColor = "white";
        }); 
        let rowObj = {};
        headArr.forEach(function(item, index){
                rowObj[item] = rows[rowIndex].cells[index].innerText;
        });
        let rowData = retrieveFromStorage(storageId);
        rowData.splice(rowIndex-1, 1, rowObj);
        saveToStorage(storageId, rowData);         
    }
    else{ 
        editBtn.innerHTML = '<img src="../images/save.jpg" width="30px" height="30px">';
        headArr.forEach(function(item, index){
            rows[rowIndex].cells[index].contentEditable = "true";
            rows[rowIndex].cells[index].style.backgroundColor = "#E0E0E0";   
        });
        rows[rowIndex].cells[0].focus();
    }
}
function editRowValidation(rowIndex){
    let rows = document.getElementById("tableId").rows;
    let typeArr = studTtype;
    typeArr.forEach(function(type, index){
        if(type == "number"){
            if(isNaN(rows[rowIndex].cells[index].innerText)){
                alert("Invalid Input");
            }
        }
        else if(type == "text"){

        }
        else if(type == "date"){

        }
        else if(type == "email"){
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(rows[rowIndex].cells[index].innerText); 
        }
    });
}
function sortRow(sortBtn, sort, tableArr, storageId){
    const thKey = sortBtn.getAttribute('id');
    let cellIndex = (sortBtn.parentNode.cellIndex);
    let rows = document.getElementById("tableId").rows;
    let switching = true; 
    let Switch;
    let valueX,index,valueY;
    while (switching) { 
        switching = false;  
        for (index = 1; index < (rows.length - 1); index++) { 
            Switch = false; 
            valueX = rows[index].cells[cellIndex].innerHTML; 
            valueY = rows[index + 1].cells[cellIndex].innerHTML;
            if(sort == 'asc'){
                if (valueX.toLowerCase() > valueY.toLowerCase()) { 
                    Switch = true; 
                        break; 
                }
            } 
            else if(sort == 'dsc'){
                if (valueX.toLowerCase() < valueY.toLowerCase()) { 
                    Switch = true; 
                        break; 
                }
            }
        } 
        if (Switch) {  
            rows[index].parentNode.insertBefore(rows[index+1], rows[index]); 
            switching = true; 
        } 
    }
    let newTableData = [];
    let outerIndex;
    for(outerIndex = 1; outerIndex < rows.length; outerIndex++){
        let rowObj = {};
        tableArr.forEach(function(element, innerIndex){
            rowObj[element] = rows[outerIndex].cells[innerIndex].innerText;
        });
        newTableData[outerIndex-1] = rowObj;
    }
    saveToStorage(storageId, newTableData);

    let btn = document.getElementById(thKey);
    if(sort == 'asc'){
        btn.setAttribute("onclick", null);
        btn.innerHTML = '<img src="../images/down.png" width="15px" height="auto">';
        btn.addEventListener("click", function(event) {
            sortRow(this, 'dsc', tableArr, studThead);
            event.preventDefault();
        });
    } 
    if(sort == 'dsc'){
        btn.setAttribute("onclick", null);
        btn.innerHTML = '<img src="../images/up.png" width="15px" height="auto">';
        btn.addEventListener("click", function(event) {
            sortRow(this, 'asc', tableArr, studThead);
            event.preventDefault();
        });
    }
}   

function searchTable(storageId){
    let input = document.getElementById("searchTable").value;
    let filter, table, tr, td, i, txtValue;
    filter = input.toUpperCase();
    table = document.getElementById("tableId");
    tr = table.getElementsByTagName("tr");
    let tableData = retrieveFromStorage(storageId);
    tableData.forEach(function(item, index){
        let flag =0;
        for (let [key, value] of Object.entries(item)) {
            if(value.toUpperCase().indexOf(filter) > -1){
                flag = 1;
                console.log(value);
            }
        }
        if (flag == 1) {
            tr[index+1].style.display = "";
        }   
        else {
            tr[index+1].style.display = "none";
        }
    });
    
}
function saveToStorage(storageId, data){
    let storingData = JSON.stringify(data);
    localStorage.setItem(storageId, storingData);
}

function retrieveFromStorage(storageId){
    let storedData = localStorage.getItem(storageId);
    let toJSON = JSON.parse(storedData);
    return toJSON;    
}
