import React from 'react'
import {Button, ButtonGroup} from "react-bootstrap";

class StoryButtons extends React.Component {
    render () {
        return (
            <ButtonGroup className="mb-3">
                <Button variant="primary" disabled>
                    Group by:
                </Button>{' '}
                <Button variant="secondary">
                    Name
                </Button>{' '}
                <Button variant="secondary">
                    Articles sum
                </Button>
                <Button variant="secondary">
                    Last article
                </Button>
            </ButtonGroup>
        )
    }
}

export default StoryButtons;