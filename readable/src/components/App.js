import React, { Component } from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Readable.css';
import CategoryMenu from './CategoryMenu';
import Posts from './Posts';
import Post from './Post';
import SortPosts from './SortPosts';
import { Route } from 'react-router-dom';
import CreatePost from './CreatePost';


class App extends Component {
    state = {
        posts: {
            sortBy: "voteScore",
            // sortOrder: true,
            desc: true,
            sortOptions: [
                {text: "Vote Score", value: "voteScore"}, // voteScore and timestamp are attribs of post
                {text: "Date", value: "timestamp"}
            ]
        },
        post:[]
    }

    handleSort = (sort) => {
        if(this.state.posts.sortBy === sort) {
          const desc = !this.state.posts.desc;
          // console.log("***** equals   " + sort);
          this.setState({
              ...this.state.posts,
              sortBy: sort,
              desc: desc
          })
        } else {
            const desc = this.state.posts.desc;
            // console.log("***** not equals   " + sort);
            this.setState ({
                ...this.state.posts,
                sortBy: sort,
                desc: desc
            })
        }
      }

    render() {
        return (
            <div className="intro">
                <header className="App-header">
                    <h1 className="title">Readable</h1>
                    <h4>A Content and Comment App</h4>
                </header>
                <div>
                    <Grid columns="equal" stackable padded="horizontally">
                        <Grid.Row>
                            <Grid.Column container="true" width={4}>
                                <CategoryMenu />
                                <Divider hidden />
                                <Route exact path="/" render={() => (
                                    <SortPosts sortOptions={this.state.posts.sortOptions} handleSort={this.handleSort} sort={this.state.posts.sortBy} />
                                )}/>
                                <Route exact path="/:category" render={({match}) => (
                                    <SortPosts sortOptions={this.state.posts.sortOptions} handleSort={this.handleSort} sort={this.state.posts.sortBy} match={match} />
                                )}/>
                            </Grid.Column>
                            <Grid.Column container="true" width={8}>
                                <Divider hidden />
                                <Route exact path="/" render={() => (
                                    <Posts sort={this.state.posts.sortBy} desc={this.state.posts.desc} />
                                )}/>
                                <Route exact path="/:category" render={({match}) => (
                                    <Posts sort={this.state.posts.sortBy} desc={this.state.posts.desc} match={match} />
                                )}/>
                                <Route exact path="/:category/:id" render={({match, history}) => (
                                    <Post match={match} history={history} />
                                )} />
                            </Grid.Column>
                            <Grid.Column container="true" width={4}>
                                <CreatePost />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default App;