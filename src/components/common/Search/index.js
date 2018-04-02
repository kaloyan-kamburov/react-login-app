import React, { Component } from 'react';
import { debounce } from '../../../common/helpers'
import ResultsTable from './results-table';


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            timer: {},
            results: this.props.searchResults,
            searchField: this.props.searchFields[0]
        }
    }

    onSearchTextChange = event => {
        this.setState({
            searchValue: event.target.value
        })
        debounce(this.performSearch.bind(this, event.target.value), 1000)();
    };


    performSearch = value => {
        this.props.search(value, this.state.searchField);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchField: nextProps.searchField,
            results: nextProps.searchResults
        });
        // this.setState({
        //     results: nextProps.results
        // })
    }

    renderResults = () => {
        
        return this.props.renderSearchResults(this.state.results);
    }

    onChangeSearchField = event => {
        this.setState({
            searchValue: ''
        })
        this.props.changeSearchField(event.target.value)
    }

    renderSearchCriteries = () => {
        let fields = this.props.searchFields.map((fieldName, index) => (
            <div key={index}>
                <label>
                    <input 
                        name='searchField' 
                        type='radio' 
                        value={fieldName} 
                        onChange={this.onChangeSearchField}
                        checked={this.state.searchField === fieldName}
                    />{fieldName}
                </label>
            </div>
        ))
        return fields;
    }

    render() {
        return (
            <div>
                <h5>Search by</h5>
                <div className='search-cirteries'>
                    {this.renderSearchCriteries()}
                </div>
                <br/>
                <div>
                    <input type='text' value={this.state.searchValue} onChange={this.onSearchTextChange} />
                </div>
                <div className='search-results'>
                    {this.props.children}
                    {/* {this.renderResults()} */}
                </div>
            </div>
        )
    }
}