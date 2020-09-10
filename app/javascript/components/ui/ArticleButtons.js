import React from 'react'
import {Button, ButtonGroup} from "react-bootstrap";

class ArticleButtons extends React.Component {

    articleNameGroup = () => {
        let query = `/?place=article&art_group=name`;
        this.props.getArticles(query)
    };

    articleTextGroup = () => {
        let query = `/?place=article&art_group=text`;
        this.props.getArticles(query)
    };

    articleTypeGroup = () => {
        let query = `/?place=article&art_group=article_type`;
        this.props.getArticles(query)
    };

    render () {
        return (
            <ButtonGroup className="mb-3">
                <Button variant="primary" disabled>
                    Group by:
                </Button>{' '}
                <Button variant="secondary" onClick={this.articleNameGroup}>
                    Name
                </Button>
                <Button variant="secondary" onClick={this.articleTextGroup}>
                    Text
                </Button>
                <Button variant="secondary" onClick={this.articleTypeGroup}>
                    Type
                </Button>
            </ButtonGroup>
        )
    }
}

export default ArticleButtons;