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

    onSortStoryLast = () => {
        let query = `/?place=story&sort=created_at`;
        this.props.getStories(query)
    };

    render () {
        return (
            this.props.stories.grouped ?
                this.props.stories.list.map(row => {
                    return (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th onClick={this.onSortStoryId}>#</th>
                                <th onClick={this.onSortStoryName}>Story name</th>
                                <th onClick={this.onSortStorySum}>Articles sum</th>
                                <th onClick={this.onSortStoryLast}>Last Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {row.grouped_list.map(story => {
                                return (
                                    <tr key={story.id}>
                                        <td>{story.id}</td>
                                        <td>{story.name}</td>
                                        <td>{story.articles}</td>
                                        <td>{row.last_created}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    )
                })
            :
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th onClick={this.onSortStoryId}>#</th>
                    <th onClick={this.onSortStoryName}>Story name</th>
                    <th onClick={this.onSortStorySum}>Articles sum</th>
                    <th onClick={this.onSortStoryLast}>Last Created</th>
                </tr>
                </thead>
                <tbody>
                {this.props.stories.list.map(row => {
                    return (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.articles}</td>
                            <td>{row.last_created}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        )
    }
}

export default StoriesTable;