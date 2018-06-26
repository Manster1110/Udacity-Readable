/* File for collecting data from the server and any additional functions I can think of */
import * as getHelp from './readableAPI';
import * as actions from '../actions';

// Collect all the categories
export const collectCategories = function() {
  return function (dispatch) {
    return getHelp.fetchCategories()
      .then(res => res.json())
      .then(function(data) {
        // console.log('******** dispatch category    ' + data);
        return dispatch(actions.getCategory(data.categories))
      }
    )
  }
}

// Collect all posts
export const collectPosts = function() {
  return function (dispatch) {
    return getHelp.fetchPosts()
      .then(res => res.json())
      .then(function(posts) {
        return dispatch(actions.getPosts(posts))
      }
    )
  }
}

// Collect a post
export const collectPost = function() {
  return function (dispatch) {
    return getHelp.fetchPost()
      .then(res => res.json())
      .then(function(post) {
        return dispatch(actions.getPost(post))
      }
    )
  }
}

// Delete a post
export const deletePost = function(post) {
    return function (dispatch) {
      return getHelp.deletePost(post)
      .then(res => res.text())
      .then(function(post) {
        return dispatch(actions.deletePost(post))
      }
    )
  }
}
// Update post vote score - affecting all posts - moving to a specific action
/* export const upThePostVote = (post, option) => {
    return function (dispatch) {
      return getHelp.upPostVote(post.id, option)
      .then(res => res.json())
      .then(function(post, id) {
        return dispatch(actions.updatePost(post, id))
      }
    )
  }
} */

// Collect all comments
export const collectComments = function(id) {
  return function (dispatch) {
    return getHelp.fetchComments(id)
      .then((res) => {return(res.json())})
      .then(function(comments) {
        return dispatch(actions.getComments(id, comments))
      }
    )
  }
}

// Delete a comment
export const deleteComment = function(comment) {
  return function (dispatch) {
    return getHelp.deleteComment(comment)
    .then(res => res.text())
    .then(function(comment) {
      return dispatch(actions.deletePost(comment))
    }
  )
}
}
//Update comment vote score - affects all comments - moving to specific action
/* export const upTheCommentVote = (comment, option) => {
  return function (dispatch) {
      return getHelp.upCommentVote(comment.id, option)
      .then(res => res.text())
      .then(function(comment, id) {
        return dispatch(actions.updateComment(comment, id))
      }
    )
  } 
} */
