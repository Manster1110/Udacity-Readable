import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class SortPosts extends Component {

    state = { activeItem: "Vote Score" }

    render() {
        const { sortOptions, handleSort, sort  } = this.props
        const { activeItem } = this.state
        return (
            <div>
                <h3 className="titleAlign">Sort by:</h3>
                <Menu vertical>
                    {sortOptions.map((option) => 
                        <Menu.Item key={option.value} name={option.text} 
                            active={activeItem === option.text} className={activeItem === sort ? 'active' : ''} onClick={() => (handleSort(option.value))}>
                            {option.text}
                        </Menu.Item>
                    )}
                </Menu>
            </div>
        )
    }
}

export default SortPosts;