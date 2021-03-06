import React, { Component } from 'react';
import '../App.css';

class StreamBoxBig extends Component {

    render() {
        let classname = "streamboxbig";
        if (this.props.quantity === 1) {
            classname = "streamboxsingle";
        }
        let chatsrc = `https://www.twitch.tv/embed/${this.props.streamid}/chat`;
        return(
                <div className={classname}>
                    <div className={(this.props.chat) ? "streamvideoplayer_withchat" : "streamvideoplayer_withoutchat"}>
                        <iframe
                            title={this.props.streamid}
                            src={`https://player.twitch.tv/?channel=${this.props.streamid}&autoplay=true`}
                            width="100%"
                            height="100%"
                            frameborder="0"
                            scrolling="no"
                            allowfullscreen="true">
                        </iframe>
                    </div>
                    
                    {this.props.chat && 
                    <div className="streamchat">
                        <iframe
                            title={this.props.streamid + "chat"}
                            frameborder="0"
                            scrolling="no"
                            id="chat_embed"
                            src={chatsrc}
                            height="100%"
                            width="200">
                        </iframe>
                    </div>
                    }
                </div>
        );
    }
}

export default StreamBoxBig;