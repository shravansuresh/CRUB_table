let studThead = ["Roll No", "Name", "Email", "Phone Number"];
let studTtype = ["number", "text", "email", "number" ];
let tableId = document.createElement("table");
tableId.setAttribute("id", "tableId");
function createTable(tableArr, storageId){
    let headArr = tableArr;
    let tr = tableId.insertRow(0);
    headArr.forEach(function(element) {
        let th = document.createElement("th");
        th.setAttribute("class", "tHead");
        let ascBtn = document.createElement("BUTTON"); 
        //let dscBtn = document.createElement("BUTTON"); 
        th.innerHTML = element;
        ascBtn.setAttribute("class", "sortBtn");
        ascBtn.innerHTML = '<img src="up.png" width="15px" height="auto">';
        ascBtn.setAttribute('id', element);
        ascBtn.setAttribute("onclick", "sortRow(this, 'asc')");
        th.appendChild(ascBtn);
        //dscBtn.setAttribute("class", "sortBtn");
        //dscBtn.innerHTML = '<img src="sort.png" width="30px" height="auto">'
        //dscBtn.setAttribute('id', element);
        //dscBtn.setAttribute("onclick", "sortRow(this)");
        //th.appendChild(dscBtn);
        tr.appendChild(th);
    });
    let div = document.getElementById("tableDisplay");
    div.appendChild(tableId);
    let tableData = retrieveFromStorage(storageId);
    tableData.forEach(function(item){
        let tr = tableId.insertRow(-1);
        for (let [key, value] of Object.entries(item)) {
            let td = document.createElement("td");
            td.innerHTML = value;
            tr.appendChild(td);
        }
        let editBtn = document.createElement("BUTTON");
        editBtn.setAttribute("class", "Btn");
        editBtn.innerHTML = '<img src="edit.png" width="30px" height="30px">';
        editBtn.setAttribute("onclick", "editRow(this, studThead, 'studArry')");
        tr.appendChild(editBtn);
        let dltBtn = document.createElement("BUTTON");
        dltBtn.setAttribute("class", "Btn");
        dltBtn.innerHTML = '<img src="delete.png" width="30px" height="30px">';
        dltBtn.setAttribute("onclick", "dltRow(this, 'studArry')");
        tr.appendChild(dltBtn);
       /* let saveBtn = document.createElement("BUTTON");
        saveBtn.setAttribute("class", "saveBtn");
        saveBtn.innerHTML = "Save";
        saveBtn.setAttribute("onclick", "");
        tr.appendChild(saveBtn);
        let cancelBtn = document.createElement("BUTTON");
        cancelBtn.setAttribute("class", "cancelBtn");
        cancelBtn.innerHTML = "edit";
        cancelBtn.setAttribute("onclick", "");
        tr.appendChild(cancelBtn);
        */
    });
    //document.getElementsByClassName('saveBtn').style.display = 'none';
    //document.getElementsByClassName('cancelBtn').style.display = 'none'; 

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
        tableData.forEach(function(element){
            for (let [key, value] of Object.entries(element)) {
                if(formValue == value){
                    alert(item+" already exist");
                    flag=1;
                }
            }
        });
        if (formValue == "") {
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
function addRow(tableArr){
    let headArr = tableArr;
    let inputType = studTtype;
    let i = 0;
    let form = document.createElement("FORM");
    form.setAttribute("type", "text");
    form.setAttribute("id", "formData");
    document.getElementById("modalBody").appendChild(form);
    headArr.forEach(function(element){
        let label = document.createElement("LABEL");
        label.innerHTML = element;
        form.appendChild(label);
        let input = document.createElement("INPUT");
        input.setAttribute("type", inputType[i]);
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
        //modal.style.display="none";
        //document.getElementById("tableId").style.display = "";
        window.location.reload();
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
    let Arr = studThead;
    let rowIndex = editBtn.parentNode.rowIndex;
    let rows = document.getElementById("tableId").rows;
    if(rows[rowIndex].cells[0].contentEditable == "false"){
        Arr.forEach(function(item, index){
            rows[rowIndex].cells[index].contentEditable = "true";
            rows[rowIndex].cells[index].style.backgroundColor = "lightgrey";    
        }); 
        editBtn.innerHTML = '<img src="save.jpg" width="30px" height="30px">';
    }
    else{
        Arr.forEach(function(item, index){
            rows[rowIndex].cells[index].contentEditable = "false";
            rows[rowIndex].cells[index].style.backgroundColor = "white";
        }); 
        editBtn.innerHTML = '<img src="edit.png" width="30px" height="30px">';
        let rowObj = {};
        Arr.forEach(function(item, index){
            rowObj[item] = rows[rowIndex].cells[index].innerText;
        });
        let rowData = retrieveFromStorage('studArry');
        rowData.splice(rowIndex-1, 1, rowObj);
        saveToStorage('studArry', rowData); 
    }
}

function sortRow(sortBtn, sort){
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
    let btn = document.getElementById(thKey);
    if(sort == 'asc'){
        btn.setAttribute("onclick", null);
        btn.innerHTML = '<img src="down.png" width="15px" height="auto">';
        btn.setAttribute("onclick", "sortRow(this, 'dsc')");
    } 
    if(sort == 'dsc'){
        btn.setAttribute("onclick", null);
        btn.innerHTML = '<img src="up.png" width="15px" height="auto">';
        btn.setAttribute("onclick", "sortRow(this, 'asc')");
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
            if(value.toUpperCase().search(filter) > -1){
                flag = 1;
            }
        }
        if (flag == 1) {
            tr[index].style.display = "";
        }   
        else {
            tr[index].style.display = "none";
        }
    });
    
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }   
            else {
                tr[i].style.display = "none";
        }
    }       
  }
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
