import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions'
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CreateComment extends Component {

  // Add comments
  addComment = () => {
    this.props.dispatch(action.addComment(this.props.comment))
  }

// Update comments
  updateComment = () => {
    this.props.dispatch(action.updateComment(this.props.comment))
  }


  render() {
    const {comment, edit} = this.props
    return (
      <section>
        <Form widths="equal" size="large">
          <Form.Group>
            <Form.Input label="Name" name="author" value={comment.author} onChange={(e) => this.props.updateComment({author: e.target.value})} placeholder="Your name..." />
          </Form.Group>
          <Form.Group>
            <Form.TextArea label="Comment" name="body" value={comment.body} onChange={(e) => this.props.updateComment({body: e.target.value})} />
          </Form.Group>
          <Form.Group>
            { edit ? (
              <Form.Button onClick={(e) => {
                e.preventDefault() 
                this.updateComment()
              } }>Update</Form.Button> 
            ) : (
              <Form.Button onClick={(e) => {
                e.preventDefault() 
                this.addComment()
              } }>Add</Form.Button>
            )}
            <div></div>
          </Form.Group>
        </Form>
      </section>
    );
  }
}

export default connect()(CreateComment)