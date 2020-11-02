//Purpose: Returns sum.
function add(a,b)
{
    return a+b;
}

//Purpose: Returns difference.
function subtract(a,b)
{
    return a-b;
}

//Purpose: Returns product.
function multiply(a,b)
{
    return a*b;
}

//Purpose: Returns quotient.
function divide(a,b)
{
    return a/b;
}

//Purpose: Converts number in display to percent.
function getPercent()
{
    display.innerText=parseFloat(divide(currentNum, 100));
    currentNum=display.innerText;
}

//Purpose: Calculates the equation and returns the answer.
function operate(op, a, b)
{
    a=parseFloat(a);
    b=parseFloat(b);

    let ans;

    if(op=="+")
        ans=add(a,b);
    else if(op=="-")
        ans=subtract(a,b);
    else if(op=="x")
        ans=multiply(a,b);
    else
        ans=divide(a,b);

    return Number(ans.toFixed(4));

}

//Purpose: Display the numnber the user has entered in.
function displayNum(e){

    if(!isNaN(display.innerText)){//If an error message is displayed, clear the calculator.
            
            if(currentNum===0 || prevClick=="operator" || prevClick=="equal")//if the display number is 0, replace it with the number that was chosen
                display.innerText=e.target.innerText;
            else{//else, append number to display number
                if(currentNum.length<MAX_DIGITS)// continue only if the number length is less than max digits
                    display.innerText= Number(currentNum+e.target.innerText);
                else
                    return;
            }
            
            prevClick="number";//updates the last type of button clicked
            currentNum=display.innerText;

            //re-enable backspace, clear, and decimal buttons once a number has been entered in
            backspace.disabled=false;
            clear.disabled=false;
            decimal.disabled=false;
        
    }
    else    
        clearCalc();        
}


//Purpose: Stores operator the user has chosen and calculates if a previously
//chosen number exists.
function getOperator(e){

    if(operator && prevNum && prevClick!=="operator" && prevClick!="equal"){
        
        currentNum=operate(operator, prevNum, currentNum);

        if(currentNum<MAX_NUM)
            display.innerText=currentNum;
        else{
            display.innerText="Overflow";
            return;
        }
    }

    operator=e.target.innerText;
    prevClick="operator";
    prevNum=display.innerText;

    //re-enable equal button and decimal buttons once an operator has been chosen
    equal.disabled =false;
        
}

//Purpose: Finds and displays the answer when the user hits the equal sign button.
function solveEquation(){

    currentNum=operate(operator, prevNum, currentNum);//solve problem
    if(currentNum<=MAX_NUM)
        display.innerText=currentNum;
    else{
            display.innerText="Overflow";
            return;
    }
    

    operator=null;
    prevClick=null;
    equal.disabled=true;//disable equal button
    prevClick="equal";
     
}

//Purpose: Adds a decimal point to the number the user has entered in.
function addDecimalPoint(){

    if(!currentNum.toString().includes("."))
            display.innerText=display.innerText+".";
    else if(prevClick==="operator" || prevClick==="equal"){
            display.innerText="0.";
        }
    else 
        return;

    currentNum=display.innerText;
    prevClick="decimal";

}

//Purpose: Removes the last digit the user entered in.
function eraseCharacter(){

    display.innerText=Number((display.innerText).replace((display.innerText).substr((display.innerText).length-1,1),""));
    currentNum=display.innerText;  
    prevClick="backspace";
        
}


// Purpose: Adds or removes a negative sign from the number the user has entered in
function addSign(){

     if(!isNaN(display.innerText)){
        if(display.innerText>0)
            display.innerText=-Math.abs(display.innerText);
        else if(display.innerText<0)
            display.innerText=Math.abs(display.innerText);

        currentNum=display.innerText;
        prevClick="sign";
    }
    
}

//Purpose: Resets the calculator.
function clearCalc(){

    display.innerText=0;
    currentNum=display.innerText;
    operator=undefined;
    prevNum=undefined;
    decimal.disabled=false;
    backspace.disabled=true;
    equal.disabled=true;
    prevClick="click";

}


//constants
const MAX_NUM=99999999;
const MAX_DIGITS=8;
const display=document.getElementById("resultBox");
const numChoice=document.getElementsByClassName("numBtn");
const operatorChoice = document.getElementsByClassName("opBtn");
const clear = document.getElementById("clearBtn")
const equal=document.getElementById("equalBtn");
const decimal=document.getElementById("decBtn");
const backspace=document.getElementById("backBtn");
const sign=document.getElementById("signBtn");
const percentNum=document.getElementById("percentBtn");

//variables
let operator; //holds chosen operator
let prevNum;//holds first number chosen
let currentNum=display.innerText;
let message="0";
let prevClick;//holds previous button choice

//event listeners - button click
for (let i = 0; i < numChoice.length; i++) {
    numChoice[i].addEventListener('click', displayNum);
    numChoice[i].id=numChoice[i].innerText;//adds id to each number button
}

for (let i = 0; i < operatorChoice.length; i++) {
    operatorChoice[i].addEventListener('click', getOperator);
    operatorChoice[i].id=operatorChoice[i].innerText;//adds id to each operator button
}

clear.addEventListener('click', clearCalc);
equal.addEventListener('click', solveEquation);
decimal.addEventListener('click', addDecimalPoint);
backspace.addEventListener('click', eraseCharacter);
sign.addEventListener('click',addSign);
percentNum.addEventListener('click',getPercent)

//event listeners - keyboard support
let keyChoice=document.getElementById("bodyDiv");
keyChoice.addEventListener('keyup',function(e)
{
    let keyPress;
    if(e.keyCode>=48 && e.keyCode<=57) //number keys
    {
       keyPress=document.getElementById(e.key);
       keyPress.click();
    }
    else if(e.key=="+" || e.key=="-" || e.key=="x"|| e.key=="/")//operator keys
    {
        keyPress=document.getElementById(e.key);
        keyPress.click();
    }
    else if(e.key=="=")//equality keys
    {
        keyPress=document.getElementById("equalBtn");
        keyPress.click();
    }
    else if(e.key=="c" || e.key=="C" || e.key=="Delete")//Clear keys
    {
        keyPress=document.getElementById("clearBtn");
        keyPress.click();
    }
    else if(e.key==".")//decimal key
    {
        keyPress=document.getElementById("decBtn");
        keyPress.click();
    }
    else if(e.key=="Backspace")//backspace key
    {
        keyPress=document.getElementById("backBtn");
        keyPress.click();
    }
    else if(e.key=="s" || e.key=="S")//+- sign keys
    {
        keyPress=document.getElementById("signBtn");
        keyPress.click();
    }
    else if(e.key=="%"){
        keyPress=document.getElementById("percentBtn");
        keyPress.click();
    }


});





