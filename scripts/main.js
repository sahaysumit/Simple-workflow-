var absCls = document.getElementById("absolute-class");
var table = document.getElementById('myTable');
var div = document.getElementById('entr-cls');
var a = document.getElementsByClassName('hdr');
var tableBody = document.getElementById("myTableBody");
var e = document.getElementById("selectVal");
var pop1 = document.getElementById('popup1');
var pop2 = document.getElementById('popup2');
var pop3 = document.getElementById('popup3');
var txt = document.getElementById('msg');

var i = undefined;
DatePicker.init('date1');

function toggleCls(elem){
	for (i = 0; i < a.length; i++) {
		a[i].classList.remove('active-class');
	}
	elem.classList.add('active-class');
	if(elem.classList.contains('first-tab')){
		table.style.display='none';
		div.style.display='block';	
	}
	else{
		table.style.display='table';
		div.style.display='none';
		console.log(table);
	}
}
function buttonSubmitTask(){
	var row = tableBody.insertRow(0);
	row.classList.add('table-body');

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	var sel =  document.createElement("select");
	sel.classList.add('select-class');
	var opt1 = document.createElement("option");
	opt1.text = 'Pending';
	var opt2 = document.createElement("option");
	opt2.text = 'Done';

	sel.appendChild(opt1);
	sel.appendChild(opt2);
	
	var close = document.createElement("i");
	close.classList.add('fa');
	close.classList.add('fa-close');
	close.onclick = function(){
		deleteRow(this);
	}
	close.title='Remove this row';

	cell1.innerHTML = text1.value;
	cell2.innerHTML = date1.value;
	cell3.innerHTML = e.options[e.selectedIndex].value;
	cell4.appendChild(sel);
	cell5.appendChild(close);
	
	text1.value=null;
	date1.value=null;
	pop1.style.display='none';
	pop2.style.display='block';
	txt.innerHTML = 'Item Successfully added';
}
function buttonNotSubmitTask(){
	absCls.style.display='none';
	pop1.style.display='none';
}
function closeBtn(){
	absCls.style.display='none';
	pop2.style.display='none';
}
function deleteRow(r) {
	i = r.parentNode.parentNode.rowIndex;
	// table.deleteRow(i);
	pop3.style.display='block';
	absCls.style.display='block';
}
function deleteBtn(){
	table.deleteRow(i);
	pop3.style.display='none';
	pop2.style.display='block';
	txt.innerHTML = 'Item Successfully deleted';
}
function notDelete(){
	pop3.style.display='none';
	absCls.style.display='none';
}
function getDtls(){
	absCls.style.display='block';
	if(e.options[e.selectedIndex].value ==="" || date1.value ==="" || text1.value ===""){
		pop2.style.display='block';
		txt.innerHTML = 'Please enter all the details';
	}
	else{		
		pop1.style.display='block';
	}
}
function sortTable(table, col, reverse) {
	var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
	tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
	i;
	reverse = -((+reverse) || -1);
	tr = tr.sort(function (a, b) { // sort rows
		return reverse // `-1 *` if want opposite order
		* (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
		.localeCompare(b.cells[col].textContent.trim())
		);
	});
	for(i = 0; i < tr.length; ++i){
		tb.appendChild(tr[i]); // append each row in order
	}
}
function makeSortable(table) {
	var th = table.tHead, i;
	th && (th = th.rows[0]) && (th = th.cells);
	if (th) i = th.length;
	else return;
	while (--i >= 0) (function (i) {
		var dir = 1;
		th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
	}(i));
}
function makeAllSortable(parent) {
	parent = parent || document.body;
	var t = parent.getElementsByTagName('table'), i = t.length;
	while (--i >= 0){
		makeSortable(t[i]);
	}
}
window.onload = function () {
	makeAllSortable();
};