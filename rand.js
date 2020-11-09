
var storage = window.localStorage;

var random = function(minnum,maxnum){
	return parseInt(Math.random() * (maxnum-minnum+1)+minnum,10);
}

var names=[ "aaa" ,"bbb"]

function loadname(){
	document.getElementById("namelist").innerHTML = "";
	let usrlist = storage["usrlist"];
	if (usrlist!=""&& usrlist!=null){
		usrlist = usrlist.replace(/,/g, ",&nbsp;&nbsp;" );
		document.getElementById("namelist").innerHTML = usrlist;
		/*
		var result = usrlist.split(",");
		for(let i = 0 ; i < result.length; ++i){
			div = document.createElement("div");
			div.innerHTML = result[i];
			document.getElementById("namelist").appendChild(div);
		}*/
	}else{
		if(names.length>0){
				usrlist=names[0];
		}
		for(let i = 1 ; i < names.length; ++i){
				usrlist+=",";
				usrlist+= names[i];
		}
    	storage["usrlist"] = usrlist;
		loadname();
	}
}

function addname(){
	var usr_name = document.getElementById("addname_input").value;
	document.getElementById("addname_input").value="";
	var usrlist = storage["usrlist"];
  	if (usr_name !="" && usr_name !=null){
		if (usrlist!=""&& usrlist!=null){
			usrlist += ",";
			usrlist += usr_name;
		}else{
			usrlist = usr_name;
		}
    		storage["usrlist"] = usrlist;
		loadname();
	}
}

function stclear(){
	var se=confirm("确定清空所有人员？");
	if (se==false) {
			return;
  	}
	storage.clear();
	document.getElementById("namelist").innerHTML="";
}

function keyd(e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
				addname();
        }
}

var startrand = false;

function rand(){
	var randnum = document.getElementById("rand_num").value;
	if(randnum ==""||randnum ==null){
				randnum=1;
	}
	var usrlist = storage["usrlist"];
	var result = usrlist.split(",");
	var len = result.length;
	var idxs = new Array();
	var num = randnum > len ? len:randnum;
	for(let i=0;i<num;++i){
		var idx = random(0,len-1);
		for(let j = 0;j<idxs.length;++j){
					if(idx==idxs[j]){
							i--;
							idx=-1;
							break;
					}
		}
		if(idx>=0)
			idxs.push(idx);
	}

	if(!startrand){
		return;
	}
	document.getElementById("process").innerHTML = "";
	for(let i=0;i<idxs.length;++i){
			div = document.createElement("div");
			div.innerHTML = result[idxs[i]];
			document.getElementById("process").appendChild(div);
	}
	setTimeout(rand,10);
}

function start(){
	var usrlist = storage["usrlist"];
	var result = usrlist.split(",");
	startrand = true;
	rand();
}

function stop(){
	startrand = false;
}
