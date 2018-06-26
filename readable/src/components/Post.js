import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Grid, Button, Icon, Divider, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
// import { isNullOrUndefined } from 'util';
// import EditPost from './EditPost';
import * as actions from '../actions';
import * as helper from '../util/collectionHelper';
import Comments from './Comments';

class Post extends Component {
    
    state = {
        postId: null,  // setting to null.  Will add Id during life-cycle event.
        showComments: false  // if we are on the details path, show the comments, otherwise no.
    }
    

    // Life-cycle event that happens before the render
    /* componentWillMount() {
        if(!isNullOrUndefined(this.props.store.posts.length)) {
            if (!isNullOrUndefined(this.props.match)) {
                this.setState({postId: this.props.match.params.id, showComments: false});
                this.props.postComments(this.props.match.params.id);
                } else if (!isNullOrUndefined(this.props.post)) {
                    console.log("***** Post show details and comments");
                    this.setState({postId: this.props.post.id, showComments: true});
                    this.props.postComments(this.props.post.id);
                }
            // console.log("Inside life-cycle");
            // console.log(this.props.post);
        } else {
            // return <Redirect to="/404" />
           return this.props.
        }
    } */

    componentWillMount() {
        if (this.props.store.posts.length) {
            if (typeof this.props.match !== 'undefined') {
              this.setState({postId: this.props.match.params.id, showComments: false});
              // console.log("******** CWM POST match undefined   " + this.props.match.params.id);
              this.props.gatherPostComments(this.props.match.params.id)
            } else if (typeof this.props.post !== 'undefined') {
              this.setState({postId: this.props.post.id, showComments: true});
              // console.log("******** CWM POST post undefined   " + this.props.post.id);
              this.props.gatherPostComments(this.props.post.id)
            }
        } else {
        this.props.history.push('/404');
        }
    }

    handlePostVote = (post, option) => {
        const pvCount = option.option === "upVote" ? 1 : -1;
        post.voteScore += pvCount;
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

    deletePost = (post) => {
        this.props.removePost(post);
        return <Redirect to="/" />
      }

    render() {
        
        const { store } = this.props;

        // console.log("***** Post Render:  " + this.state.postId);
        
        return (
            <div>
                <Divider hidden />
                {store.posts.map((post) => post.id === this.state.postId && 
                    (
                        <Card key={post.id} fluid={true}>
                        <Card.Content>
                            <Grid columns="equal">
                                <Grid.Row>
                                    <Grid.Column size={4} textAlign='left' floated='left'>
                                    { this.state.showComments &&  (
                                        <p>{post.comments.length} Comments</p>
                                    )}
                                    </Grid.Column>
                                    <Grid.Column textAlign="right">
                                    <span>
                                        <Icon fitted link onClick={(e) => this.handlePostVote(post, {option: "upVote"})} name='triangle up' size='big' color='green' />
                                        <Icon fitted link onClick={(e) => this.handlePostVote(post, {option: "downVote"})} name='triangle down' size='big' color='red' />
                                    </span>
                                    &nbsp; Vote Count: &nbsp; {post.voteScore}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Content>
                        <Card.Content>
                            <Card.Header>
                            { this.state.showComments ? (
                                <Link to={`/${post.category}/${post.id}`}>
                                    {post.title}
                                </Link>) : (
                                <h3>{post.title}</h3>
                            )}
                            </Card.Header>
                            <Card.Meta>{post.author}</Card.Meta>
                            <Card.Meta>{new Date(post.timestamp).toDateString()}</Card.Meta>
                            <Card.Description>
                                {post.body}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Grid columns='equal'>
                                <Grid.Row>
                                    <Grid.Column size={4}  textAlign='left' floated='left'>
                                    
                                </Grid.Column>
                                <Grid.Column size={4} textAlign='right' floated='right'>
                                    <Button onClick={(e) => this.deletePost(post)} circular animated='fade'>
                                        <Button.Content visible>
                                            <Icon color="purple" name='trash' />
                                        </Button.Content>
                                        <Button.Content hidden>
                                            delete
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                        { !this.state.showComments && (
                            <Segment>
                                <Comments post={post} />
                            </Segment>
                        )}
                </Card>
                    )
                )}
            </div>
        )
    }
}

function mapStateToProps(store) {
    const allPostKeys = Object.keys(store.posts);

    return {
        store: {
            posts: allPostKeys.map((key) => {
                const allCommentKeys = (typeof store.posts[key].comments === 'object' ? Object.keys(store.posts[key].comments) : []);
                return {
                    ...store.posts[key],
                    comments: allCommentKeys.map((commKey) => ({
                        ...store.posts[key].comments[commKey]
                    }))
                }
            })
        }
    }
}

const mapDispatchToProps = dispatch => ({
    gatherPostComments: (id) => dispatch(helper.collectComments(id)),
    removePost: (post) => dispatch(helper.deletePost(post)),
    updateVoteScore: (post, option) => dispatch(actions.upThePostVote(post, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);