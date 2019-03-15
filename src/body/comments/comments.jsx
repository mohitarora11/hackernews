import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./comment";
import Header from "../../header/header";


export default class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:"",
            isLoaded:false
        }
    }
    componentDidMount() {
        var that = this;
        let paramid = this.props.match.params.id;
        //let url = paramid ? "http://hn.algolia.com/api/v1/items/"+paramid:"";
        if(paramid) {

            fetch("http://hn.algolia.com/api/v1/items/"+paramid)
                .then((res) => res.json())
                .then((res) => {
                    that.setState({
                        data: res,
                        isLoaded: true
                    })
                })
        }
    }
    render(){
        const $data = this.state.data;
        return(
            this.state.isLoaded?
                    <React.Fragment>
                        <Header/>
                        <div className={"header"}>
                            {$data.type === "comment" ?
                                <div className="comment-description" dangerouslySetInnerHTML={ { __html: $data.text } }></div>
                                :
                                <NavLink to={$data.url}>{$data.title}</NavLink>
                            }
                            <p>{$data.points} points
                                by {$data.author} {parseInt($data.created_at_i / 86400000)} hour
                                ago | <span>hide</span>| past | web | favourite | {$data.children.length ? $data.children.length:0} comments
                            </p>
                            <form>
                                <ul>
                                    <li>
                                        <textarea rows={"5"} cols={"50"}></textarea>
                                    </li>

                                    <li>
                                        <input className="btn-primary" type={"button"} value={"Add Comment"}/>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <Comment {...this.props} data={$data.children}/>
                    </React.Fragment>
            :
                <div>
                    <h3>Loading...</h3>
                </div>
        )
    }

}


