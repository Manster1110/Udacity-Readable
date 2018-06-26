/* Readable API */
// API created by using the README.MD under api-server and from my BookShelf project

/* Category API */
// get all categories
export const fetchCategories = () => fetch(
    'http://localhost:3001/categories',
    {
        headers: { 'Authorization': 'b00mshakalaka'},
        method: "GET"
    }
)

/* Post API */
//get all posts
export const fetchPosts = () => fetch(
    "http://localhost:3001/posts",
    { 
        headers: { 'Authorization': 'b00mshakalaka' },
        method: "GET"
    }
)
// get a post and pass in post id
export const fetchPost = (id) => fetch(
    `http://localhost:3001/posts/${id}`,
    { 
        headers: { 'Authorization': 'b00mshakalaka' },
        method: "GET"
    }
)
// add new post and pass in new post data object
export const newPost = (data) => {
    return fetch(
      "http://localhost:3001/posts",
      {
        // headers: { 'Authorization': 'b00mshakalaka'},
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "POST",
        body: JSON.stringify(data)
      }
    )
  }
// edit post and pass in data changes
export const editPost = (data) => {
    return fetch(
      `http://localhost:3001/posts/${data.id}`,
      {
        // headers: { 'Authorization': 'b00mshakalaka'},
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "PUT",
        body: JSON.stringify(data)
      }
    )
}
// update post, this is exactly like edit (Could you combine these?)
export const updatePost = (data) => {
    return fetch(
      `http://localhost:3001/posts/${data.id}`,
      {
        // headers: { 'Authorization': 'b00mshakalaka'},
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "PUT",
        body: JSON.stringify(data)
      }
    )
}
// delete a post
export const deletePost = (data) => {
    return fetch(
      `http://localhost:3001/posts/${data.id}`,
      {
        // headers: { 'Authorization': 'b00mshakalaka'},
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' },
        method: "DELETE"
      }
    )
}
/* Comments API */
// get all comments for a specific post
export const fetchComments = (id) => fetch(
    `http://localhost:3001/posts/${id}/comments`,
    { 
        headers: { 'Authorization': 'b00mshakalaka' },
        method: "GET"
    }
)
// add a new comment
export const newComment = (data) => {
    return fetch(
      "http://localhost:3001/comments",
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "POST",
        body: JSON.stringify(data)
      }
    )
}
// edit a specific comment
export const editComment = (data) => {
    return fetch(
      `http://localhost:3001/comments/${data.id}`,
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "PUT",
        body: JSON.stringify(data)
      }
    )
}
// delete a specific comment
export const deleteComment = (data) => {
    return fetch(
      `http://localhost:3001/comments/${data.id}`,
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' },
        method: "DELETE"
      }
    )
  }
// update a specific comment
export const updateComment = (data) => {
    return fetch(
      `http://localhost:3001/comments/${data.id}`,
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "PUT",
        body: JSON.stringify(data)
      }
    )
}

/* adding an API for post voting */

// pass in the post id and the vote option of upVote or downVote
export const upPostVote = (id, option) => {
    // console.log("******** Inside the upPostVote API");
    return fetch(
      `http://localhost:3001/posts/${id}`,
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "POST",
        body: JSON.stringify(option)
      }
    )
}

/* adding an API for comment voting */

// pass in the comment id and the vote option of upVote or downVote
export const upCommentVote = (id, option) => {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        headers: { 'Authorization': 'b00mshakalaka', 'Content-Type': 'application/json' }, 
        method: "POST",
        body: JSON.stringify(option)
      }
    )
  }