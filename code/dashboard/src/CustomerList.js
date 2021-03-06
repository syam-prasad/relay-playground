import React from 'react'
import Customer from './Customer.js'
import { Link } from 'react-router-dom'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class CustomerList extends React.Component {

  render () {
    console.log('Customer List rendering...', this.props)
    if (!this.props.viewer) return false
    return (
      <div className=''>
        <h2>Customer List</h2>      
        <div className='' style={{ maxWidth: 400 }}>
          {this.props.viewer.allCustomers.edges.map(({node}) =>
            <Customer key={node.id} customer={node} viewer={this.props.viewer} />
          )}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(CustomerList, graphql`
  fragment CustomerList_viewer on Viewer {
    ...Customer_viewer
    allCustomers(last: 100, orderBy: createdAt_DESC) @connection(key: "CustomerList_allCustomers", filters: []) {
      edges {
        node {
          id
          name
          ...Customer_customer
        }
      }
    }
  }
`)