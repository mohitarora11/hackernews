import React from "react";
import {NavLink} from "react-router-dom";

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            alldata : "",
            isLoaded: false,
            pageIndex:1,
            showingPageNumber:0
        }
    }

    componentDidMount(){
        let that = this;
        fetch("http://hn.algolia.com/api/v1/search?tags=front_page")
            .then((res) => res.json())
            .then((res) => {
                that.updateData(res)

            })

    }

    updateData(data,type){
        let that = this;
        let upvoteSessionData = that.getData();
        let news = data.hits;
        if(upvoteSessionData !== null){
            for(let i=0;i<news.length;i++){
                news[i]["upvoteCount"] = !upvoteSessionData[news[i]["objectID"]] ? "" : upvoteSessionData[news[i]["objectID"]]["upvoteCount"];
                news[i]["hide"] = !upvoteSessionData[news[i]["objectID"]] ? "" : upvoteSessionData[news[i]["objectID"]]["hide"];
            }
        }
        that.setState({
            alldata:news,
            isLoaded:true,
            pageIndex:type === "updatePage"?that.state.pageIndex+1:that.state.pageIndex
        });
        

    }

    render(){
        let itemindex = this.state.showingPageNumber === 0 ? this.state.showingPageNumber : this.state.showingPageNumber+10;
        return(
            this.state.isLoaded ?
                    <React.Fragment>
                        <div className="main-body">
                                {this.state.alldata.map((item, index) => {
                                    return (
                                        item.hide?<div></div>
                                    :
                                        <div key={"news_list_" + index} id={"id_news"}>
                                            <div>
                                            <span className="text">
                                                <span>
                                                    {itemindex +index+ 1}.
                                                </span>
                                                <span className="hand" id="id_upvote">{item.upvoteCount}</span>
                                                <span className="hand" >upvote</span>
                                                <a href={item.url}>{item.title}</a>
                                            </span>
                                            </div>
                                            <p>{item.points} points
                                                by {item.author} {parseInt(item.created_at_i / 86400000)} hour
                                                ago | <span className="hand" >hide</span>| <NavLink to={"/"+item.objectID}>{item.num_comments ? item.num_comments:0} comments</NavLink></p>
                                        </div>)
                                })
                                }

                                <div className="more" >More</div>

                        </div>
                    </React.Fragment>
                :

                            <div/>

        )
    }

}