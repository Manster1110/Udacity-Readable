import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import * as actions from '../actions';
import * as helper from '../util/collectionHelper';


// Parent container for each post

class Posts extends Component {

  handlePostVote = (post, option) => {
    //refactored
    const vCount = option.option === "upVote" ? 1 : -1;
    post.voteScore += vCount;
    this.props.updateVoteScore(post, option);
    /* if(option.option === "upVote") {
        const vCount = 1;
        post.voteScore += vCount;
        // console.log(post.voteScore);
        this.props.updateVoteScore(post, option);
    }
    if(option.option === "downVote") {
        const vCount = -1;
        post.voteScore += vCount;
        // console.log(post.voteScore);
        this.props.updateVoteScore(post, option);
    } */
  }

  render() {
    let posts = [];
    const { store, desc, match, sort } = this.props

    // Filter Posts by a specific category
    if (match) {
      posts = store.posts.filter((post) => {
        return post.category === match.params.category
      })
    } else {
      posts = store.posts;
    }

    // Sort posts
    posts.sort(function(a, b) {
      // console.log("inside Posts sort function    " + sort );
      if (desc) {
        return b[sort] - a[sort]
      } else {
        return a[sort] - b[sort]
      }
    })

    return (
      <div>
        {posts.map((post) =>
          <Post key={post.id} post={post} />
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const postIdentities = Object.keys(store.posts);

  return {
    store: {
      posts: postIdentities.map((key) => ({
        ...store.posts[key]
      }))
    }
  }
}

const mapDispatchToProps = dispatch => ({
  postComments: (id) => dispatch(helper.collectComments(id)),
  removePost: (post) => dispatch(helper.deletePost(post)),
  updateVoteScore: (post, option) => dispatch(actions.upThePostVote(post, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);