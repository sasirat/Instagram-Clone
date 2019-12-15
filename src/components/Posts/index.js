import React, { Component } from 'react'
import "./Posts.css"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Post from "../Post"
import { tsConstructorType } from '@babel/types'
import { responsePathAsArray } from 'graphql'

class Posts extends Component {

  componentDidMount(){
    Notification.requestPermission();
  }
  constructor () {
    super();
    this.state = {
      posts : []
    }
  }

  componentDidMount() {
    this.props.apollo_client
    .query({
      query:gql`
      {
        posts(user_id: "a"){
          id
          user{
            nickname
            avatar
          }
          image
          caption
      }
      }
    `})
  .then(response => {
    this.setState({posts: response.data.posts});
  });
  this.posts_channel = this.props.pusher.subscribe('posts-channel');
  this.posts_channel.bind("new-post", data => {
    this.setState({posts: this.state.posts.concat(data.post)});
  },this)
  }
  render(){
    return (
      <div className="Posts">
        {this.state.posts.map(post => <Post nickname={post.user.nickname} avatar={post.user.avatar} image={post.image} caption={post.caption} key={post.id} />)}
      </div>
    )
  }
  
}

// const Posts = () => {
//   return (
//     <Query
//       query={gql`
//         {
//           posts(user_id: "a"){
//             id
//             user{
//               nickname
//               avatar
//             }
//             image
//             caption
//           }
//         }
//       `}
//     >
//       {({ loading, error, data }) => {
//         if (loading) return <p>Loading Posts...</p>;
//         if (error) return <p>Error Fetching Posts...</p>;
//         let posts = data.posts;

//         return <div className="Posts">
//           {posts.map(post => <Post 
//             nickname={post.user.nickname} 
//             avatar={post.user.avatar} 
//             image={post.image} 
//             caption={post.caption} 
//             key={post.id} 
//           />)}
//         </div>;
//       }}
//     </Query>
//   )
// }


export default Posts
