// needed to move the voting functions to here.  Didn't seem to be working in the collection file.
import * as getHelp from '../util/readableAPI';

/* List our actions  */

export const GET_CATEGORY = "GET_CATEGORY"  // Get categories from server side
export const GET_POSTS = "GET_POSTS"  // Get posts from the server side
export const GET_POST = "GET_POST"  // Get post for display and editing
export const NEW_POST = "NEW_POST"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const UPDATE_POST = "UPDATE_POST" // Updated posts on server side
export const DELETE_POST = "DELETE_POST"
export const GET_COMMENTS = "GET_COMMENTS"  // Get comments from server side
export const NEW_COMMENT = "NEW_COMMENT"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT" // Update comment for specific post on server side

// Use UUID for ids
const uuidv1 = require("uuid/v1");

/* Action creators for each action  */

// Get category
export const getCategory = categories => ({
        
        type: GET_CATEGORY,
        categories
})


// Get posts
/* export function getPosts ({ posts }) {
    return {
        type: GET_POSTS,
        posts
    }
} */

export const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

// Get post
export const getPost = post => ({
    type: GET_POST,
    post
})
/* export function getPost ({ post }) {
    return {
        type: GET_POST,
        post
    }
} */

// New post
export function newPost () {
    return {
        type: NEW_POST,
        post: {
            // id: "",
            id: uuidv1(),
            timestamp: Date.now(),
            title: "",
            body: "",
            author: "",
            category: "",
            voteScore: 1,
            deleted: false
        }
    }
}

// Add new post
export function addPost (post) {
    publishPost(post);
    return {
      type: ADD_POST,
      post
    }
  }

// Edit post
/* export function editPost ({ post }) {
    return {
        type: EDIT_POST,
        post
    }
} */

export const editPost = (post, option) => ({
    type: EDIT_POST,
        post,
        option
})

// Update post
/* export function updatePost ({ post }) {
    return {
        type: UPDATE_POST,
        post
    }
} */
export const updatePost = (post, option) => ({
    type: UPDATE_POST,
        post,
        option
})

// Delete post
export function deletePost ({ post }) {
    return {
        type: DELETE_POST,
        post
    }
}

export const getComments = (parentId, comments) => ({
    type: GET_COMMENTS,
    parentId,
    comments
  })

// New comment
export function newComment ({ comment }) {
    return {
        type: NEW_COMMENT,
        comment
    }
}

// Add Comment
export const addComment = comment => {
    getHelp.newComment(comment)
  
    return {
      type: ADD_COMMENT,
      comment: comment
    }
  }
  
  
// Edit comment
export function editComment ({ comment }) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

// Delete comment
export function deleteComment ({ comment }) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

// Update comment
export const updateComment = (comment) => {
    getHelp.updateComment(comment)
  
    return {
      type: UPDATE_COMMENT,
      comment: comment
    }
}

/* Actions for adding posts/comments and updating Post and Comment vote scores */

// Publish the post so it displays with the others.
const publishPost = function(post) {
    getHelp.newPost(post)
        .then((res) => { return res.text() })
}

// Update vote score for a post
export const upThePostVote = (post, option) => {
    getHelp.upPostVote(post.id, option)
  
    return {
      type: UPDATE_POST,
      post
    }
  }

// Update vote score for a comment
export const upTheCommentVote = (comment, option) => {
    getHelp.upCommentVote(comment.id, option)
  
    return {
      type: UPDATE_COMMENT,
      comment
    }
  }

