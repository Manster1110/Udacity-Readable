import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as readableAPI from '../util/readableAPI';
// import { getCategory } from '../actions';
// import * as helper from '../util/collectionHelper'
import { Menu, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CategoryMenu extends Component {
    state = { activeItem: 'all' }
    
    clickActive = (e, { name }) => this.setState({ activeItem: name});

    // store.dispatch(helper.dispatchCategory())

    /* getCatCollection = () => {
        let categories = this.props.dispatchCategories();
        this.props.dispatch(getCategory({store: categories})
    )} */

    render() {
        const { store } = this.props;
        const { activeItem } = this.state

        // store.dispatch(helper.dispatchCategory());

        // this.props.helper.dispatchCategory();

        return (
            <div>
                <Divider hidden />
                <div>
                <h3 className="titleAlign">Category:</h3>
                    <Menu vertical>
                        <Menu.Item key="all" as={Link} to="/" name={"all"} active={activeItem === "all"} onClick={this.clickActive}>
                            all
                        </Menu.Item>
                        {store.categories.map((category) => 
                            <Menu.Item key={category.name} as={Link} to={`/${category.fullPath}`} name={category.name} active={activeItem === category.name} onClick={this.clickActive}>
                                {category.name}
                            </Menu.Item>
                        )}  
                    </Menu>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    // console.log("*********  map state   " + store.categories);
    const categoryKeys = Object.keys(store.categories);
    return {
        store: {
            categories: categoryKeys.map((key) => ({
                name: store.categories[key].name,
                fullPath: store.categories[key].path
            }))
        }   
    }
}

export default connect(mapStateToProps)(CategoryMenu);