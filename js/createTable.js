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
    div.appendChild(tableId);
    if(tableData != null){
        tableData.forEach(item => {
            let tr = tableId.insertRow(-1);
            for (let [key, value] of Object.entries(item)) {
                let td = document.createElement("td");
                td.innerHTML = value;
                if(isNaN(value)){
                    if(isNaN(value.slice(0,3))){
                        td.style.textAlign = "left";
                    }
                    else{
                        td.style.textAlign = "right";
                    }
                }
                else{
                    td.style.textAlign = "right"
                }
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
