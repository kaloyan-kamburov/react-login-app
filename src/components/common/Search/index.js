import React, { Component } from 'react';
import { debounce } from '../../../common/helpers'


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            timer: {},
            results: []
        }
    }

    onChange = event => {
        debounce(this.performSearch.bind(this, event.target.value), 1000)()
    };


    performSearch = value => {
        this.props.search(value);
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     results: nextProps.results
        // })
    }

    renderResults = result => {
        if (this.state.results.length) {
            this.state.results.forEach( (result, index) => {
                return <tr>{result}</tr>
            })

        } 
        return;
    }

    render() {
        return (
            <div>
                <div>
                    <input type='text' onChange={this.onChange} />
                </div>
                <div className='searc-results'>
                    {this.renderResults(this.state.results)}
                </div>
            </div>
        )
    }
}