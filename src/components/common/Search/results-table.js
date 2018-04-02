import React from 'react';



const ResultsTable = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <td>Username</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody id='asd'>

                {props.data.map(result => (<tr><td>neshto</td></tr>))}

            </tbody>
        </table>
    )
}

export default ResultsTable;