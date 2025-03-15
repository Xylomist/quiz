import questions from "./question.js";

// console.log(questions);
let btn=document.querySelector("#start")
let input=document.querySelector("#name")
let questiondiv=document.querySelector(".questions")
let questioncont=document.querySelector("#question")
let detailsdiv=document.querySelector(".details")
let option=document.querySelectorAll(".option")
let timerdiv=document.querySelector(".timer")
let scorediv=document.querySelector(".score")
let questioncount=0;
let timer=5;
let players=JSON.parse(localStorage.getItem("player"))!==null?JSON.parse(localStorage.getItem("player")):[];
let score=0;
window.addEventListener("load",()=>{
    localStorage.clear();
})
//as page is getting refreshed it is creating a new array
btn.addEventListener("click",startquiz)
function startquiz(){
storeinls();
questiondiv.classList.remove("hidden");
detailsdiv.classList.add("hidden");
createquestions();
createtimer();
}
function storeinls(){
    let obj={
        name:input.value,
        time:new Date().toLocaleString(),
        score:0,
    }
    players.push(obj);
    localStorage.setItem("player",JSON.stringify(players));
}

function createquestions(){
    questioncont.innerText=questions[questioncount].q
    option.forEach((ele,idx)=>{
        ele.innerText=questions[questioncount].opts[idx]
        //removing the color before next question
        ele.classList.remove("correct","incorrect");
        ele.classList.remove("pointer")
    })
}
option.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        calculatescore(e);
        disableoptions();
    })
})
function calculatescore(e){
    if(typeof(questions[questioncount].ans)==="number"){
    if(questions[questioncount].ans===Number(e.target.innerText)){
        score++;
        applycolor(e.target,"correct")
    }
    else{
        applycolor(e.target,"incorrect")
    }
}
else if(typeof(questions[questioncount].ans)=="string"){
    if(questions[questioncount].ans===e.target.innerText){
        score++;
        applycolor(e.target,"correct")
    }
    else{
        applycolor(e.target,"incorrect")
    }
}
}
function disableoptions(){
    option.forEach((ele)=>{
    ele.classList.add("pointer")
    })
}

function applycolor(div,correct){
    div.classList.add(`${correct}`)
}
function createtimer(){
    let val=setInterval(()=>{
      
       if(timer>0){
        // console.log(timer)
        timerdiv.innerText=timer--;
       }
       else{
        if(questioncount >= questions.length-1){
            //after completing the question only the question count will increase after excecuting the last question the question count increases it will be equal to length-1 so we need equal to 
            questiondiv.classList.add("hidden");
            scorediv.classList.remove("hidden");
            clearInterval(val);
            storescoreinls();
            displayscore();
        }
        else{
        timer=5;
        timerdiv.innerText=timer;
        questioncount++;
        console.log(questioncount)
        console.log(questions.length)
        createquestions();
       }
    }
    },1000)
}
function storescoreinls(){
    const LeaderBoard=JSON.parse(localStorage.getItem("player"));
    LeaderBoard[LeaderBoard.length-1].score=score;
    localStorage.setItem("player",JSON.stringify(LeaderBoard));
}
function displayscore(){
    scorediv.innerHTML=`<h2>Your Score is :- ${score}</h2>`
}