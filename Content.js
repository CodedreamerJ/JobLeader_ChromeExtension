let jobList = []
const tabBtn = document.getElementById('tab-btn');
const inputEl = document.getElementById("input-el");
const salaryEl = document.getElementById("inputSalary-el");
const salaryEl2 = document.getElementById("inputSalary-el2");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
//const table = document.getElementById('myTable')
const jobsFromLocalStorage = JSON.parse( localStorage.getItem("jobList") );
let headers = ['Date', 'Job URL', 'Salary'];
let myTable = document.querySelector('#table');
let btnGet = document.getElementById('display-btn');
JSON.parse( localStorage.getItem("jobList"))

if (jobsFromLocalStorage) {
    jobList = jobsFromLocalStorage
    //render(jobList)
}

class Job {
    constructor(date, jobURL, salary) {
      this.date = date;
      this.jobURL = jobURL;
      this.salary = salary;
    }
  } 

inputBtn.addEventListener("click", function() {
    console.log("Input button clicked")
    webPage = inputEl.value; 
    baseSalary = salaryEl.value; 
    let addJob = new Job(new Date(), webPage, baseSalary)
    //addJob.date = new Date();
    //addJob.jobURL = webPage;

    jobList.push(addJob)
    //jobList.push(JSON.stringify(addJob))     
    //jobList.push(inputEl.value)
    inputEl.value = ""
    salaryEl.value = ""
    localStorage.setItem('jobList', JSON.stringify(jobList))
    //render(jobList)
  
    
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    jobList = []
    //render(jobList)
    console.log("Delete button clicked")
}) 


btnGet.addEventListener('click', () => {
    
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    jobList.forEach(job => {
        let row = document.createElement('tr');

        Object.values(job).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })

        table.appendChild(row);
    })
  myTable.appendChild(table);
  var data = document.getElementById('datatableholder').innerHTML,
	win = window.open('', '_blank', 'width=500, height=500, resizeable, scrollbars');
    win.document.write('<!DOCTYPE html>');
	win.document.write('<link rel="stylesheet" href="index.css" type="text/css">');
	win.document.write(data);
	win.document.close();
});

tabBtn.addEventListener("click", function(){   
    chrome.tabs.query({
        active: true,               // Select active tabs
        lastFocusedWindow: true     // In the current window
    }, function(array_of_Tabs) {
        // Since there can only be one active tab in one active window, 
        //  the array has only one element
        var tab = array_of_Tabs[0];
        // Example:
        var url = tab.url;
        var baseEarnings = salaryEl2.value; 
        let newJob = new Job(new Date(), url, baseEarnings)
        jobList.push(newJob)
        salaryEl2.value = ""
    //jobList.push(JSON.stringify(newJob))         
    localStorage.setItem('jobList', JSON.stringify(jobList))

    //render(jobList)
    console.log("tab button clicked")
        // ... do something with url variable
    });
 })

