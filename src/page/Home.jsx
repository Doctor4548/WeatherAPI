import React from "react";

import Dice from "../component/Dice.jsx";



export default function Home(){

    let [dices, setDices]=React.useState(initialGame());
    let [win, setWin]=React.useState(false);

    function initialGame(){
        let newDice=[];
        for(let i=0;i<10;i++){
            let dice={};
            dice.value=Math.ceil(Math.random()*6);
            dice.click=false;
            dice.id=i;
            newDice.push(dice);
        }
        return newDice
    }

    React.useEffect(()=>{
        let flag=dices.every((item)=>{
            return item.click===true
        });

        let first=dices[0].value;
        dices.forEach((item)=>{
            if(item.value!==first){
                flag=false;
            }
        })
        if(flag){
            
            setWin(true);
        }
    },[dices])

    

    function handle_click(id){
        setDices((old)=>{
            return old.map((item)=>{
                if(item.id===id){
                    return {
                        ...item,
                        click: !item.click
                    }
                }
                else{
                    return{
                        ...item
                    }
                }
            })
        })
    }



    let element=dices.map((item)=>{
        return <Dice key={item.id} id={item.id} method={handle_click} click={item.click} value={item.value}/>
    })


    function clear(){
        setDices((old)=>{
            return old.map((item)=>{
                if(!item.click){
                    return{
                        ...item,
                        value: Math.ceil(Math.random()*6)
                    }
                }
                else{
                    return{
                        ...item
                    }
                }
            })
        })
    }

    function reset(){
        setDices(initialGame());
        setWin(false);
    }

    return(
        <div>
            <div className="dice-container">
                {element}
            </div>
            <div className="button-container">
                <button className="button" onClick={win? reset:clear}>{win? "Reset":"Clear"}</button>
            </div>
            
        </div>
    )
}