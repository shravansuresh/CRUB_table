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