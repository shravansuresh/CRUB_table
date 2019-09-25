function searchTable(storageId){
    let input = document.getElementById("searchTable").value;
    let inputUp, table, tr;
    inputUp = input.toUpperCase();
    table = document.getElementById("tableId");
    tr = table.getElementsByTagName("tr");
    let tableData = retrieveFromStorage(storageId);
    tableData.forEach((item, index) => {
        let flag =0;
        for (let [key, value] of Object.entries(item)) {
            if(value.toUpperCase().indexOf(inputUp) > -1){
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