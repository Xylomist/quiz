let container=document.querySelector(".wrapper")
let players=JSON.parse(localStorage.getItem("player"));
if(players===null){
    container.innerHTML="<h2>NO RECORDS</h2>"
}
else{
    let table=document.createElement("table");
let firstrow=document.createElement("tr");
    playerssort();
    firstrow.innerHTML="<th>Name</th><th>Time</th><th>Score</th>";
    table.append(firstrow);
    players.forEach((ele) => {
        let row=document.createElement("tr");
        row.innerHTML=`<td>${ele.name}</td><td>${ele.time}</td><td>${ele.score}`
        table.appendChild(row);
    });
container.append(table);

}

function playerssort(){
    players.sort((a,b)=>{
       return b.score-a.score;
    })
}