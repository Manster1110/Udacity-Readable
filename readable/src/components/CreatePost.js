import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Icon, Divider, Modal, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import * as helper from '../util/collectionHelper';
import * as actions from '../actions';

class CreatePost extends Component {
    // Set initial new post flag to false in case we are really editing
    newPost = false

    componentWillMount() {
        if (typeof this.props.match !== 'undefined') {
            this.props.getPost(this.props.match.params.id)
        } else {
            // this.props.dispatch(action.createPost())
            this.props.addNewPost()
            this.newPost = true
        }
    }

    // Add Post
    addPost = (post) => {
        this.props.publishPost(post)
        // return <Redirect to="/" />
        this.props.history.push("/")
    }

    // Edit Post temp state
    editPost = (post, option) => {
        this.props.editAPost({...post, ...option})
    }



    render() {
        const { store, history } = this.props

        return(
            <div>
                <Divider hidden />
                <div>
                  <Modal trigger={
                        <Button as={Link} to="/create" history={history} circular animated='vertical'>
                        <Button.Content visible>
                            <Icon size='big' color="purple" name='add circle' />
                        </Button.Content>
                        <Button.Content hidden>
                            new post
                        </Button.Content>
                    </Button>
                    }>
                    <Modal.Header>
                        { this.newPost ? (
                        <h1>New Post</h1>
                        ) : (
                        <h2>Edit Post</h2>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {store.post.map((post) => 
                                <Form widths="equal" key={ post.id }>
                                    { this.newPost && (
                                        <Form.Group>
                                            <Form.Input
                                                label="Your Name"
                                                name="author"
                                                value={post.author}
                                                onChange={(e) => this.editPost(post, {author: e.target.value})} />
                                            <Form.Field label="Select a category" control='select'>
                                                <option value="">Select...</option>
                                                {store.categories.map((category) => (
                                                <option key={category.path} value={category.path}>{category.name}</option>
                                                ))}
                                            </Form.Field> 
                                        </Form.Group>
                                    )}
                                    <div><Form.Group></Form.Group></div>
                                    <div>
                                        <Form.Group>
                                            <Form.Input
                                                label="Title"
                                                name="title"
                                                value={post.title}
                                                onChange={(e) => this.editPost(post, {title: e.target.value})} />
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group>
                                            <Form.TextArea
                                                label="Body"
                                                name="body"
                                                value={post.body} 
                                                onChange={(e) => this.editPost(post, {body: e.target.value})} />
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group>
                                            { this.newPost ? (
                                            <Form.Button onClick={(e) => {
                                                e.preventDefault() 
                                                this.addPost(post)
                                            } }>Post</Form.Button> 
                                            ) : (
                                            <Form.Button onClick={(e) => {
                                                e.preventDefault() 
                                                this.updatePost(post)
                                            } }>Update</Form.Button>
                                            )}
                                            <div></div>
                                        </Form.Group>
                                    </div>
                                </Form>
                            )}
                        </Modal.Description>
                    </Modal.Content>
                    
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    const allPostKeys = Object.keys(store.post);
    const allCategoryKeys = Object.keys(store.categories);
    return {
      store: {
        post: allPostKeys.map((key) => {
          return {
            ...store.post[key]
          }
        }),
        categories: allCategoryKeys.map((key) => ({
          name: store.categories[key].name,
          path: store.categories[key].path
        }))
      }
    }
  }

const mapDispatchToProps = dispatch => ({
    getPost: (id) => dispatch(helper.collectPost(id)),
    addNewPost: () => dispatch(actions.newPost()),
    publishPost: (post) => dispatch(actions.addPost(post)),
    editAPost: (post, option) => dispatch(actions.editPost(post, option))
    // updateAPost
    //removePost: (post) => dispatch(helper.deletePost(post)),
    //updateVoteScore: (post, option) => dispatch(actions.upThePostVote(post, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);