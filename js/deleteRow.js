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