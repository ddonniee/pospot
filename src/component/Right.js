import React from "react"
import Social from './Social'
import Jeju from '../images/jeju.jpg'
import Sticker from '../images/sticker.jpg'

const Right=(prop)=>{

    const dummy = prop;
    return (
        <div className="contentRight">
                    {dummy.map((each,index)=> ( 
                    
                        <div className="postWrapper" key={index}>
                        
                            <div className="postImg">
                                <img src={Jeju}></img>
                            </div>
                            <div className="postContent">
                                <h2 className="postTitle">{each.title}</h2>
                            <   div className="postDetail">{each.detail}</div>
                            </div>
                            <div className="postInfo">
                                <div className="postDate">{each.date}</div>
                                <div className="division">| </div>
                                <div className="postCategory">{each.category}</div>
                            </div>
                            <Social />
                        <div className="category">
                            <img src={Sticker} alt="category"></img>
                            <div className="categoryName">카테고리</div>
                        </div>
                    
                        </div>
                    
                    ))}
        </div>
    )
}
export default Right;