import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {NavLink} from "react-router-dom";
import "./comment.css";

 class Comment extends Component {
    


    render() {
        
        const { data } = this.props;

        return (
            <div className="comments">
                {data.map(item =>
                    <div key={item.id} className="comment">
                        <div>
                            <p>[-] <NavLink to={"/"+item.id}>{item.author}</NavLink>
                                <span className="hour">{parseInt(item.created_at_i / 86400000)} hour ago</span>
                            </p>

                            <div className="comment-description" dangerouslySetInnerHTML={ { __html: item.text } }></div>
                            <p className="reply"><span>reply</span></p>
                        </div>
                        {item.children.length ? 
                            <div className="innerComment">
                                <Comment data={item.children}/>
                            </div>
                            :
                            ""
                        }         
                    </div>
                )}
            </div>
        )

    }

}


export default withRouter(Comment)