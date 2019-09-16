let studThead = ["Roll_No", "Name", "Email", "Phone_Number"];
let tableId = document.createElement("table");
tableId.setAttribute("id", "tableId");

function createTable(tableArr, storageId){
    let headArr = tableArr;
    let tr = tableId.insertRow(0);
    headArr.forEach(function(element) {
        let th = document.createElement("th");
        let button = document.createElement("BUTTON"); 
        th.innerHTML = element;
        button.setAttribute("class", "sortBtn");
        button.setAttribute("onclick", "sortRow(this)");
        th.appendChild(button);
        tr.appendChild(th);
    });
    let div = document.getElementById("tableDisplay");
    div.appendChild(tableId);
    let i=0;
    let tableData = retrieveFromStorage(storageId);
    tableData.forEach(function(){
        let tr = tableId.insertRow(-1);
        let td1 = document.createElement("td");
        td1.innerHTML = tableData[i].Roll_No;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.innerHTML = tableData[i].Name;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.innerHTML = tableData[i].Email;
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.innerHTML = tableData[i].Phone_Number;
        tr.appendChild(td4);
        i++;
        let editBtn = document.createElement("BUTTON");
        editBtn.innerHTML = "edit";
        editBtn.setAttribute("onclick", "addRow(headArr)");
        tr.appendChild(editBtn);
        let dltBtn = document.createElement("BUTTON");
        dltBtn.setAttribute("class", "dltBtn");
        dltBtn.innerHTML = "Delete";
        dltBtn.setAttribute("onclick", "dltRow(this, 'studArry')");
        tr.appendChild(dltBtn);
    });
}

function handleForm(storageId, tableArr){
    let headArr = tableArr;
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

function addRow(tableArr){
    document.getElementById("tableId").style.display = "none";
    let headArr = tableArr;
    let form = document.createElement("FORM");
    form.setAttribute("type", "text");
    form.setAttribute("id", "formData");
    document.getElementById("modalBody").appendChild(form);
    headArr.forEach(function(element){
        let label = document.createElement("LABEL");
        label.innerHTML = element;
        form.appendChild(label);
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        form.appendChild(input);
        let lineBreak = document.createElement('br');
        form.appendChild(lineBreak);
    });
    let modal = document.getElementById("formModal");
    modal.style.display ="block";
    var span =document.getElementsByClassName("close")[0];
    span.onclick = function(){ modal.style.display="none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }  
}

function displayTable(storageId, tableArr){
    let headArr = tableArr;
    document.getElementById("tableId").style.display = "block";
    window.location.reload();
}

function dltRow(dltBtn, storageId){
    let tableId = document.getElementById("tableId");
    let rowIndex = (dltBtn.parentNode.rowIndex)-1;
    let tableData = retrieveFromStorage(storageId);
    tableData.splice(rowIndex, 1);
    tableId.deleteRow(dltBtn.parentNode.rowIndex);
    saveToStorage(storageId, tableData);
}

function editRow(editBtn, headArr, storageId){
    addRow(headArr);
}

function sortRow(sortBtn, tableArr){
    let headArr = studThead;
    let cellIndex = (sortBtn.parentNode.cellIndex);
    let cellName = headArr[cellIndex]; 
    alert(cellName);
    let tableData = retrieveFromStorage('studArry');
    tableData.forEach(function(item, index){
        
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

