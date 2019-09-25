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

function displayTable(storageId, tableArr){
    let headArr = tableArr;
    document.getElementById("tableId").style.display = "block";
    window.location.reload();
}