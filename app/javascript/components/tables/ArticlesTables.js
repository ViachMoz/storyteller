import React from 'react'
import {Table} from "react-bootstrap";

class ArticlesTables extends React.Component {

    onSortByName = () => {
        let query = '/?place=article&sort=name';
        this.props.getArticles(query)
    };

    onSortByDefault = () => {
        let query = '/?place=article&sort=id';
        this.props.getArticles(query)
    };

    onSortByText = () => {
        let query = '/?place=article&sort=text';
        this.props.getArticles(query)
    };

    onSortByType = () => {
        let query = '/?place=article&sort=article_type';
        this.props.getArticles(query)
    };

    render () {
        return (
            this.props.articles.grouped ?
                this.props.articles.list.map(row => {
                    return (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th onClick={this.onSortByDefault}>#</th>
                                <th onClick={this.onSortByName}>Name</th>
                                <th onClick={this.onSortByText}>Text</th>
                                <th onClick={this.onSortByType}>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {row.grouped_list.map(list => {
                                return (
                                    <tr key={list.id}>
                                        <td>{list.id}</td>
                                        <td>{list.name}</td>
                                        <td>{list.text}</td>
                                        <td>{list.article_type}</td>
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
                        <th onClick={this.onSortByDefault}>#</th>
                        <th onClick={this.onSortByName}>Name</th>
                        <th onClick={this.onSortByText}>Text</th>
                        <th onClick={this.onSortByType}>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.articles.list.map(row => {
                        return (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.text}</td>
                                <td>{row.article_type}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
        )
    }
}

export default ArticlesTables;