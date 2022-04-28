import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Hands } from "../svg/hire.icon";
import { Fade } from "react-reveal";
const Want=()=>{

 
    const [wanted, setWanted]=useState([]);

    useEffect(()=>{
        fetch('https://apipospot.anypot.co.kr/front/recruitList')
        .then (res=> {
            return res.json();
        })
        .then (data => {
            setWanted(data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])

    console.log(wanted)
    return (
        <Fade bottom>
        <div className="recruit_want">
            
                <div className="recruit_want_inner">
                    <h2 className="recruit_want_title">이런 분을 뽑고 있어요 {<Hands />}</h2>
                    
                    {wanted.map((want, index) => (
                        <ul className="recruit_people_list" key={index}>
                        <Link to="/hire/detail">
                        <li className="recruit_people_detail">
                            <div className="recruit_people_category">
                                <div className="recruit_people_job">{want.recruit_title}</div>
                                <div className="recruit_people_condition">
                                    <ul className="condition_list_all">
                                        <li className="condition_list_each">{want.workType}</li>
                                        <li className="condition_list_each">{want.career}</li>
                                        <li className="condition_list_each">{want.education}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="recruit_people_state">
                                <div className="recruit_people_current">{want.state}</div>
                                <div className="recruit_people_expire">{want.deadline}</div>
                            </div>
                        </li>
                        </Link>
                    </ul>
                    ))}

                    <div id="hiring_list"></div>

                </div>
               
            </div>
            </Fade>
    )
}
export default Want;