import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { Table } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'

class Articles extends React.Component {
    state = {
        articles: JSON.parse(this.props.articles)
    }

    onSortByName = () => {
        axios.get('/?sort=name')
            .then(res => {
                this.setState({articles: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSortByText = () => {
        axios.get('/?sort=text')
            .then(res => {
                this.setState({articles: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSearch = (val) => {
        axios.get(`/?q=${val}`)
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
            </div>
        )
    }
}

export default Articles;
