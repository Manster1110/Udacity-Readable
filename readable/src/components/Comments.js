import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions';
import * as helper from '../util/collectionHelper';
import CreateComment from './CreateComment';
import { Divider, Icon, Comment, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

//Use to create a unique ID for new comments
const uuidv1 = require('uuid/v1');

class Comments extends Component {
  state = {
    comment: {},
    edit: false
  }

  componentWillMount() {
    this.props.gatherComments(this.props.post.id);
    // console.log("**** CWM in Comments    " + this.props.post.id);
    // this.props.dispatch(helper.collectComments(this.props.post.id))
    this.resetComment();
  }

  resetComment = () => {
    this.setState({
      comment: {
        id: uuidv1(),
        parentId: this.props.post.id,
        timestamp: Date.now(),
        body: "",
        author: "",
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      }
    })
  }

  updateComment = (item) => {
    this.setState({
      comment: {
        ...this.state.comment,
        ...item
      }
    })
  }
  // copied from Post component for handling the comment vote count.
  handleCommentVote = (comment, option) => {
    const cvCount = option.option === "upVote" ? 1 : -1;
    comment.voteScore += cvCount;
    this.props.updateVoteScore(comment, option);
  }

  editComment = (comment) => {
    comment.timestamp = Date.now()

    this.setState({
      comment: comment,
      edit: true
    })
  }

  deleteComment = (comment) => {
    this.props.removeComment(comment);
  }

  render() {
    const { store, post } = this.props

    // console.log("***** Comments Render:  " + store.comments);

    // Sort comments during render
    store.comments.sort(function(a, b) {
        return b['voteScore'] - a['voteScore']
    })

    return (
      <div>
        <Comment.Group>
          {store.comments.map((comment) => 
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author>
                  {comment.author}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(comment.timestamp).toDateString()}</div>
                  <div><Icon name="star" />{comment.voteScore} Votes</div>
                  <div>
                    <span>
                      <Icon fitted link onClick={(e) => this.updateCommentVote(comment, {option: "upVote"})} name='triangle up' size='large' color='green' />
                      <Icon fitted link onClick={(e) => this.updateCommentVote(comment, {option: "downVote"})} name='triangle down' size='large' color='red' />
                    </span>
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.body}
                </Comment.Text>
                <Comment.Metadata>
                  <div>
                    <Icon link onClick={(e) => this.editComment(comment)} name='edit' size='small' />
                    <Icon link onClick={(e) => this.deleteComment(comment)} name='trash' size='small' />
                  </div>
                  <div></div>
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          )}
        </Comment.Group>
        <Segment raised>
          <Divider hidden />
          <CreateComment parentId={post.id} comment={this.state.comment} updateComment={this.updateComment} edit={this.state.edit} />
        </Segment>
      </div>
    )
  }
}

function mapStateToProps(store) {
  const commentsIdentity = Object.keys(store.comments);
  return {
    store: {
      comments: commentsIdentity.map((key) => {
        return {
          ...store.comments[key]
        }
      })
    }
  }
}

const mapDispatchToProps = dispatch => ({
    gatherComments: (id) => dispatch(helper.collectComments(id)),
    removeComment: (comment) => dispatch(helper.deleteComment(comment)),
    updateVoteScore: (comment, option) => dispatch(actions.upTheCommentVote(comment, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);