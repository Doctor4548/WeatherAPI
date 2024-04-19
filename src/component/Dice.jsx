import React from "react";

export default function Dice(props){

    let dice_style={
        background: "linear-gradient(135deg, hsl(0, 100%, 50%), hsl(246, 25%, 92%))"
    }
    return(
        <div className="dice" onClick={()=>{props.method(props.id)}} style={props.click? dice_style: null}>{props.value}</div>
    )
}