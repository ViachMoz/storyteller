import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { FormControl, InputGroup, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import StoriesTable from "./tables/StoriesTable";
import ArticlesTables from "./tables/ArticlesTables";
import ArticleButtons from "./ui/ArticleButtons";
import StoryButtons from "./ui/StoryButtons";
import ActionCable from 'actioncable';
import consumer from "../channels/consumer"

class MainPage extends React.Component {
    state = {
        articles: JSON.parse(this.props.articles),
        stories: JSON.parse(this.props.stories)
    }

    componentDidMount() {
        this.subscription = consumer.subscriptions.create("IndexChannel", {
            received: data => {this.updateArcticleData(data)}
        });
    }

    updateArcticleData = (data) => {
        this.setState({articles: JSON.parse(data)})
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

    deleteArticle = (id) => {
        const newList = this.state.articles.list.filter((article) => article.id !== id);
        const newArticles = { grouped: this.state.articles.grouped,list: newList }
        this.subscription.send({id: id})
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
                            <div className="headline">
                                Storyteller
                            </div>
                        </Col>
                    </Row>
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
                                onDeleteArticle={this.deleteArticle}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainPage;
