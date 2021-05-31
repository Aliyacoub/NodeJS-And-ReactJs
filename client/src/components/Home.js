
import React from 'react';


import axios from 'axios';

import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            error: '',
            isLoading: true
        };
    }

    componentDidMount() {

        this.fetchPosts();

    }

    fetchPosts() {
        axios.get('/api/posts')

            .then(res => {

                this.setState({
                    posts: res.data,
                    error: '',
                    isLoading: false
                });
            })

            .catch(err => {

                //alert(err.response.data.message)
                this.setState({
                    error: err?.response?.data?.message,
                    isLoading: false
                });
            })

    }

    render() {
        if (this.state.isLoading) {
            return (<h4>الرجاء الإنتظار</h4>);
        }
        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>);
        }
        if (this.state.posts.length < 1) {
            return (<h4>لايوجد تدوينات</h4>);
        }
        return (this.state.posts.map(post => {
            return (
                <div key={post._id} className="row">
                    <div className="column">

                        <h4>{post.title}</h4>

                        <h6 className="title">{post?.author?.name}</h6>

                        <p>{post.content.substr(0, 120)}</p>

                        <Link to={'/post/view/' + post._id}>
                            <button className="button-primary button-outline">افرأ المزيد</button>
                        </Link>

                        <hr />
                    </div>
                </div>
            )

        })
        )
    }
}

export default Home;