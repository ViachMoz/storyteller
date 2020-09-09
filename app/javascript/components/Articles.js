import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { Table, FormControl, InputGroup, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'

class Articles extends React.Component {
    state = {
        articles: JSON.parse(this.props.articles),
        stories: JSON.parse(this.props.stories),
    }

    onSortByName = () => {
        let query = '/?sort=name'
        this.getArticles(query)
    }

    onSortByText = () => {
        let query = '/?sort=text'
        this.getArticles(query)
    }

    onSearch = (val) => {
        let query = `/?q=${val}`
        this.getArticles(query)
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

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Story name</th>
                                        <th>Articles sum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.stories.map(row => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.name}</td>
                                            <td>{row.articles}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>

                        <Col>
                            <ButtonGroup className="mb-3">
                                <Button variant="primary" disabled>
                                    Group by:
                                </Button>{' '}
                                <Button variant="secondary">
                                    Name
                                </Button>
                                <Button variant="secondary">
                                    Text
                                </Button>
                            </ButtonGroup>

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={this.onSortByName}>Name</th>
                                    <th onClick={this.onSortByText}>Text</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.articles.map(row => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.name}</td>
                                            <td>{row.text}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Articles;
