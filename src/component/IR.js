import React from "react";
import { Fade } from "react-reveal";
import ir from '../svg/ir.svg';

const IR =()=>{

    return (
        <Fade bottom>
        <div className="ir_tri">
           <img src={ir} />
        </div>
        </Fade>
    )
}

export default IR;