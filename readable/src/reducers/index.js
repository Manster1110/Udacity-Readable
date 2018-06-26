import { combineReducers } from 'redux'
import {
    GET_CATEGORY,
    GET_POSTS,
    GET_POST,
    NEW_POST,
    ADD_POST,
    EDIT_POST,
    UPDATE_POST,
    DELETE_POST,
    GET_COMMENTS,
    NEW_COMMENT,
    EDIT_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../actions'

// Reducer functions

// Category reducer
function categories(state = {}, action) {
    
    switch (action.type) {
      case GET_CATEGORY:
        // create an object to hold our categories
        const categoryObject = {};
        // loop through the categories we have and store them to our object
        for (let category of action.categories) {
            categoryObject[category.name] = category;
        }
        // Object will be used to build the category menu
        return categoryObject;
      default:
        return state;
    }
}

// Posts reducer
function posts(state = {}, action) {

    switch (action.type) {
        case GET_POSTS:
            // create an object to hold all posts
            const postObject = {}
            for(let post of action.posts) {
                postObject[post.id] = post
            }
            //Object to be used by Posts component to list all posts
            return postObject
        case NEW_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case ADD_POST:
            return {
            ...state,
            [action.post.id]: action.post
        }
        case UPDATE_POST:
            // console.log("******** inside Update Post reducer "+ action.post);
            return {
                ...state,
                [action.post.id]: action.post
        }
        case DELETE_POST:
            return {
                ...state,
                [action.post.deleted]: action.post
        }
    default:
        return state
    }
}

// Post reducer. Test for each action as they relate to posts
function post(state = {}, action) {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case NEW_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        default:
            return state
    }

}
// Comments reducer. Test for each action as they relate to comments
function comments(state = {}, action) {
        switch (action.type) {
            case GET_COMMENTS:
                const commentsObj = {};
        
                for (let comment of action.comments) {
                    commentsObj[comment.id] = comment;
                }
                return commentsObj
            case NEW_COMMENT:
                return {
                    ...state,
                    [action.comment.id]: action.comment
            }
            case EDIT_COMMENT:
                return {
                    ...state,
                    [action.comment.id]: action.comment
            }
            case UPDATE_COMMENT:
                return {
                    ...state,
                    [action.comment.id]: action.comment
            }
            case DELETE_COMMENT:
                return {
                    ...state,
                    [action.comment.deleted]: action.comment
            }
            default:
                return state
      }
}

export default combineReducers({
    // reducers go here
    categories,
    posts,
    post,
    comments
})