import React from 'react'
import {Button, ButtonGroup} from "react-bootstrap";

class StoryButtons extends React.Component {

    storyNameGroup = () => {
        let query = `/?place=story&story_group=name`;
        this.props.getStories(query)
    };

    storySumGroup = () => {
        let query = `/?place=story&story_group=articles`;
        this.props.getStories(query)
    };

    storyLastGroup = () => {
        let query = `/?place=story&story_group=last_created`;
        this.props.getStories(query)
    };

    render () {
        return (
            <ButtonGroup className="mb-3">
                <Button variant="primary" disabled>
                    Group by:
                </Button>
                <Button variant="secondary" onClick={this.storyNameGroup}>
                    Name
                </Button>
                <Button variant="secondary" onClick={this.storySumGroup}>
                    Articles sum
                </Button>
                <Button variant="secondary" onClick={this.storyLastGroup}>
                    Last article
                </Button>
            </ButtonGroup>
        )
    }
}

export default StoryButtons;