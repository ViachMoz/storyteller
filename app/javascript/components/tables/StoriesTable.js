import React from 'react'
import {Table} from "react-bootstrap";

class StoriesTable extends React.Component {

    onSortStoryId = () => {
        let query = `/?place=story&sort=id`;
        this.props.getStories(query)
    };

    onSortStoryName = () => {
        let query = `/?place=story&sort=name`;
        this.props.getStories(query)
    };

    onSortStorySum = () => {
        let query = `/?place=story&sort=sum`;
        this.props.getStories(query)
    };

    render () {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th onClick={this.onSortStoryId}>#</th>
                    <th onClick={this.onSortStoryName}>Story name</th>
                    <th onClick={this.onSortStorySum}>Articles sum</th>
                </tr>
                </thead>
                <tbody>
                {this.props.stories.map(row => {
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
        )
    }
}

export default StoriesTable;