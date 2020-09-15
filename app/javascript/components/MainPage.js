import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { FormControl, InputGroup, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import StoriesTable from "./tables/StoriesTable";
import ArticlesTables from "./tables/ArticlesTables";
import ArticleButtons from "./ui/ArticleButtons";
import StoryButtons from "./ui/StoryButtons";

class MainPage extends React.Component {
    state = {
        articles: JSON.parse(this.props.articles),
        stories: JSON.parse(this.props.stories),
    }

    getArticles = (query) => {
        axios.get(query)
            .then(res => {
                this.setState({articles: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    getStories = (query) => {
        axios.get(query)
            .then(res => {
                this.setState({stories: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSearch = (val) => {
        let query = `/?place=article&q=${val}`
        this.getArticles(query)
    }

    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Search...</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={val => this.onSearch(val.currentTarget.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs lg="5">
                            <StoryButtons
                                getStories={this.getStories}
                            />
                            <StoriesTable
                                stories={this.state.stories}
                                getStories={this.getStories}
                            />
                        </Col>
                        <Col>
                            <ArticleButtons
                                getArticles={this.getArticles}
                            />
                            <ArticlesTables
                                articles={this.state.articles}
                                getArticles={this.getArticles}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainPage;
