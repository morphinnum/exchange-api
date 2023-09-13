(function(){
    var apiKey;
    (()=>{
        fetch("/getKey")
        .then(response => response.json())
        .then(data => {
            apiKey = data.key;
            return apiKey;
        })
    })();
  let convert = document.querySelector('#currency-convert');
  let tableBody = document.querySelector('#table-body');
  let clearHistory = document.querySelector('#clear-history');
  
  var deleteRowBtns;
  var result;
  var recordId = 0;

  function calcResult(amount, fromCurrency, toCurrency){
    var currencyConvertion;

    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`, {
            base: fromCurrency,
        })
        .then(response => response.json())
        .then(exchange => { 
            currencyConvertion = exchange.rates[toCurrency];
            
            result = (amount * currencyConvertion).toFixed(2);
            saveResult(amount, fromCurrency, toCurrency, result);
        });   
  }

  function incrementRecordId() {
    recordId += 1;
    return recordId;
  }

  function updateRowBtns() {
    deleteRowBtns = document.querySelectorAll('[id^="remove-record-"]');
    return deleteRowBtns;
  }
  
  function removeRow(e) {
    var btnID = e.target.id.split('-');
    var btnIndex = btnID[btnID.length - 1];
    var parentRow = document.querySelector('#row-record-' + btnIndex);
    parentRow.remove();
  }
  
  function saveResult(amount, fromCurrency, toCurrency, result) {    
    incrementRecordId();  

    tableBody.innerHTML += `<tr id="row-record-${recordId}">
    <td scope="row">${amount}</td>
    <td>${fromCurrency}</td>
    <td>${toCurrency}</td>
    <td>${result}</td>
    <td><button id="remove-record-${recordId}" class="btn btn-danger">Delete</button></td>
    </tr>`;

    updateRowBtns();
    let deleteBtnsArr = Array.from(deleteRowBtns);
    deleteBtnsArr.forEach(element => {
        element.addEventListener('click', removeRow);
      });
  }
  

  convert.addEventListener('click', () => {
    
    let amount = document.querySelector('#amount').value;
    let fromCurrency = document.querySelector('#from-currency').value;
    let toCurrency = document.querySelector('#to-currency').value;

    if (amount.length != 0 && fromCurrency!= 0 && toCurrency.length != 0) {
        calcResult(amount, fromCurrency, toCurrency);
    } else {
        alert ('Fill all fields first!')
    }
    
  });

  clearHistory.addEventListener('click', () => {
    tableBody.innerHTML = '';
    recordId = 0;
  });
})()