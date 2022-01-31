const rElement=document.getElementById("r")
const gElement=document.getElementById("g")
const bElement=document.getElementById("b")
const colorDisplayElement= document.getElementById("color-display");

const levels=Array.from(document.getElementsByClassName("mode"));
let SelectedLevelButton=levels.find((level)=>{
  const classList= Array.from(level.classList);
  return classList.includes("selected");

});

let gameLevel = SelectedLevelButton.innerHTML;
let squares = getSquares()
 
 levels.forEach(level=> {
    level.addEventListener("click",function() {
       levels.forEach((mode)=>mode.classList.remove("selected"));  
       //console.log(this)
      // console.log(this.innerHTML)
     
       this.classList.add("selected")

       gameLevel=this.innerHTML;
       setTitlesAccordingToLevel(gameLevel)
       squares= getSquares()

       });
    });
    function getSquares(){
      const allsquares =Array.from(document.getElementsByClassName("square"))

      if (gameLevel == "Easy"){
          return allsquares.slice(0, 3)
      }else {
           return allsquares
      }
    }

    function setTitlesAccordingToLevel(currentGameLevel){
      const allSquares= Array.from(document.getElementsByClassName("square"))
      if (currentGameLevel == "Easy") {
        //set 3 sqs
        const firstThreeSquares = allSquares.slice(0, 3)
        const lastThreeSquares =  allSquares.slice(3, 6)

        lastThreeSquares.forEach(sq => sq.classList.add("hidden"))
      } else if(currentGameLevel == "Hard"){
        // set 6 sqs
        squares.forEach(sq => sq.classList.remove("hidden") )
      }
    }
//attempt to make all squares have a different background color:rgb
const startButton =document.getElementById("reset");
 

startButton.addEventListener("click",function(){
  this.innerHTML = "New Colors";
  const firstSquare= squares[0];
  for(let i=0;i<squares.length;i++){
     const red=Math.floor(Math.random()*256);
     const green=Math.floor(Math.random()*256);
     const blue=Math.floor(Math.random()*256);

     const rgbString="rgb(" + red + "," + green + "," + blue + ")";
     const square=squares[i];
     square.dataset.rgb_value=JSON.stringify([red, green, blue])
     square.style.backgroundColor=rgbString;
    // console.log(i);
    // console.log(squares[i]);
  }

  //firstSquare.style.backgroundColor= "rgb(255, 45, 200)";
  //console.log(firstSquare)
// assign header to random rgb value
const randomSQUAREIndex=Math.floor(Math.random()* squares.length);
const headerColorSquare=squares[randomSQUAREIndex];
setHeaderRgbBackroundColor(headerColorSquare)
});


function setHeaderRgbBackroundColor(squareElement){
 const setHeaderElementBackgroundColor=(rgbValues,element)=>{
   const [r, g, b]=rgbValues
   const rgbString=`rgb( ${r}, ${g}, ${b})`
   element.style.backgroundColor=rgbString;
   element.innerHTML=rgbValues.find(rgbValue=>{
     return rgbValue > 0;
   })
  }

 const rgbString=squareElement.dataset.rgb_value;
 colorDisplayElement.dataset.rgb_value = rgbString;
 const [red, green, blue]=JSON.parse(rgbString);
 
 const redBackground=[red, 0, 0]
 const greenBackground=[0, green, 0]
 const blueBackground=[0, 0, blue]



 setHeaderElementBackgroundColor(redBackground , rElement);
 setHeaderElementBackgroundColor(greenBackground ,gElement);
 setHeaderElementBackgroundColor(blueBackground , bElement);

}
// add event listener to squares either disappears or changes all other squares
squares.forEach(square =>{
  square.addEventListener("click",function (){
   const headerRgbValue = colorDisplayElement.dataset.rgb_value;
   const squareRgbValue = this.dataset.rgb_value;

   if(headerRgbValue == squareRgbValue) {
     setSquareBackroundAfterWin(headerRgbValue);
   }else {
       this.classList.add("hidden");
     }
   
   console.table({headerRgbValue ,squareRgbValue});
  })
})

function setSquareBackroundAfterWin(headerRgbString){
  const [r, g, b] = JSON.parse(headerRgbString);
  const rgbString=`rgb( ${r}, ${g}, ${b})`

  squares.forEach(sq=>{
    sq.classList.remove("hidden");
    sq.style.backgroundColor= rgbString;
    sq.dataset.rgb_value= colorDisplayElement.dataset.rgb_value
  });
}