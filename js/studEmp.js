let studThead = ["Roll No", "Name", "Email", "Phone Number"];
let studTtype = ["number", "text", "email", "number"];
let empThead = ["Emp Id", "Name", "Date of Birth", "Email"];
let empTtype = ["number", "text", "date", "email"];
let tableId = document.createElement("table");
tableId.setAttribute("id", "tableId");

function createTable(tableArr, storageId){
    let headArr = tableArr;
    let tr = tableId.insertRow(0);
    headArr.forEach(element => {
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
    div.style.width = "88.5%";
    document.getElementById("searchTable").style.marginRight = "11.5%";
    div.appendChild(tableId);
    if(tableData != null){
        debugger
        tableData.forEach(item => {
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
            div.style.width = "101.9%";
            document.getElementById("search").style.display="block";

        });
    }
}

function handleForm(storageId, tableArr){
    debugger
    let headArr = tableArr;
    if(formValidation(headArr) == headArr.length){
        let data = [];
        let rowObj = {};
        let i =0;
        let form = document.getElementById("formData");
        headArr.forEach(element => {
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

function formValidation(headArr){
    let typeArr;
    if(headArr == studThead){
        typeArr = studTtype;
    }
    else{
        typeArr = empTtype
    }
    let count = 0;
    let flag = 0;
    headArr.forEach((item, index) =>{
        type = typeArr[index];
        let formValue = document.forms["formData"][item].value;
        if(formValue == 0 ){
            alert(item+" field empty");
        }
        else if(type == "number"){
            let numberPattern = /^[-+]?\d+$/;
            if(numberPattern.test(formValue) === true){
                if(formUniqueChecker(formValue, index) == 1)
                {
                    alert(item+" already exist");
                }
                else if(formValue < 0)
                {
                    alert("Invalid "+item);
                }
                else{
                    count++;
                }
                
            } 
            else{
                alert("Invalid "+item);
            }
        }
        else if(type == "text"){
            let namePattern = /^[a-zA-Z ]*$/;
            
            if(namePattern.test(formValue) === true){
                count++;
            }
            else{
                alert(item+" must be in alphabets only");
            }
        }
        else if(type == "email"){
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(emailPattern.test(formValue) === true){
                if(formUniqueChecker(formValue, index) == 1)
                {
                    alert(item+" already exist");
                }
                else{
                    count++;
                }
                
            } 
            else{
                alert("Invalid Email");
            }
        }
        else if(type == "date"){
            if(formValue <= "2000-12-31"){
                count++;
            }
            else{
                alert("Enter valid date")
            }
        }
    });
    return count;
}

function formUniqueChecker(value, colIndex){
    let index;
    let rows = document.getElementById("tableId").rows;
    let unique = 0;
    for(index=0; index < rows.length; index++){
        if(value == rows[index].cells[colIndex].innerText) {
            unique = 1;
            return unique;
        }
    } 
}

function clearForm(){
    document.getElementById("formData").reset();
}

function addRowModal(tableArr, type){
    let headArr = tableArr;
    let inputType = type;
    let i = 0;
    let form = document.createElement("FORM");
    form.setAttribute("type", "text");
    form.setAttribute("id", "formData");
    document.getElementById("modalBody").appendChild(form);
    headArr.forEach(element => {
        let label = document.createElement("LABEL");
        label.innerHTML = element;
        form.appendChild(label);
        let input = document.createElement("INPUT");
        input.setAttribute("type", inputType[i]);
        if(inputType[i] == "date"){
            input.setAttribute("max", "2000-12-31");
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
    if(tableData.length == 0){
        window.location.reload();
    }    
    }  
}

function editRow(editBtn, headArr, storageId){
    let typeArr;
    if(headArr === studThead)
    {
        typeArr = studTtype;
    }
    else{
        typeArr = empTtype;
    }
    let rowIndex = editBtn.parentNode.rowIndex;
    let rows = document.getElementById("tableId").rows;
    if(rows[rowIndex].cells[0].contentEditable == "true"){
        if(editRowValidation(rowIndex, typeArr, headArr) == headArr.length){
            editBtn.innerHTML = '<img src="../images/edit.png" width="30px" height="30px">';
            headArr.forEach( (item, index) => {
                rows[rowIndex].cells[index].contentEditable = "false";
                rows[rowIndex].cells[index].style.backgroundColor = "white";
            }); 
            let rowObj = {};
            headArr.forEach((item, index) => {
                rowObj[item] = rows[rowIndex].cells[index].innerText;
            });
            let rowData = retrieveFromStorage(storageId);
            rowData.splice(rowIndex-1, 1, rowObj);
            saveToStorage(storageId, rowData);
        } 
        else{
            rows[rowIndex].cells[0].focus();
        }        
    }
    else{ 
        editBtn.innerHTML = '<img src="../images/save.jpg" width="30px" height="30px">';
        headArr.forEach((item, index) => {
            rows[rowIndex].cells[index].contentEditable = "true";
            rows[rowIndex].cells[index].style.backgroundColor = "#E0E0E0";   
        });
        rows[rowIndex].cells[0].focus();
    }
}

function editRowValidation(rowIndex, typeArr, headArr){
    let rows = document.getElementById("tableId").rows;
    let count = 0;
    typeArr.forEach((type, index) => {
        if(type == "number"){
            let numberPattern = /^[-+]?\d+$/;
            if(numberPattern.test(rows[rowIndex].cells[index].innerText) === true){
                if(editUniqueChecker(rows[rowIndex].cells[index].innerText, index, rowIndex) == 1)
                {
                    alert(headArr[index]+" already exist");
                }
                else if(rows[rowIndex].cells[index].innerText < 0)
                {
                    alert("Invalid "+headArr[index]);
                }
                else{
                    count++;
                }
                
            } 
            else{
                alert("Invalid "+headArr[index]);
            }
        }
        else if(type == "text"){
            let namePattern = /^[a-zA-Z ]*$/;
            
            if(namePattern.test(rows[rowIndex].cells[index].innerText) === true){
                count++;
            }
            else{
                alert(headArr[index]+" must be in alphabets only");
            }
        }
        else if(type == "date"){
            if(rows[rowIndex].cells[index].innerText < "2000-12-31"){
                count++;
            }
            else{
                alert("Enter valid date")
            }
        }
        else if(type == "email"){
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(emailPattern.test(rows[rowIndex].cells[index].innerText) === true){
                if(editUniqueChecker(rows[rowIndex].cells[index].innerText, index, rowIndex) == 1)
                {
                    alert(headArr[index]+" already exist");
                }
                else{
                    count++;
                }
                
            } 
            else{
                alert("Invalid "+headArr[index]);
            }
        }
    });
    return count;
}

function editUniqueChecker(value, colIndex, rowIndex){
    let index;
    let rows = document.getElementById("tableId").rows;
    let unique = 0;
    for(index=0; index < rows.length; index++){
        if(index !== rowIndex && value == rows[index].cells[colIndex].innerText) {
            unique = 1;
            return unique;
        }
    } 
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
                if(isNaN(valueX)){
                    if (valueX.toLowerCase() > valueY.toLowerCase()) { 
                        Switch = true; 
                        break; 
                    }
                }
                else{
                    if (Number(valueX) > Number(valueY)) { 
                        Switch = true; 
                        break; 
                    }
                }
            } 
            else if(sort == 'dsc'){
                if(isNaN(valueX)){
                    if (valueX.toLowerCase() < valueY.toLowerCase()) { 
                        Switch = true; 
                        break; 
                    }
                }
                else{
                    if (Number(valueX) < Number(valueY)) { 
                        Switch = true; 
                        break; 
                    }
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
        tableArr.forEach((element, innerIndex) => {
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
    let filter, table, tr;
    filter = input.toUpperCase();
    table = document.getElementById("tableId");
    tr = table.getElementsByTagName("tr");
    let tableData = retrieveFromStorage(storageId);
    tableData.forEach((item, index) => {
        let flag =0;
        for (let [key, value] of Object.entries(item)) {
            if(value.toUpperCase().indexOf(filter) > -1){
                flag = 1;
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
