import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../createRelayEnvironment'
import { withRouter, Link } from 'react-router-dom'
import UpdateOrCreatePostMutation from '../mutations/UpdateOrCreatePost'

const CreatePageNewQuery = graphql`
    query CreatePageNewQuery {
        viewer {
            id
        }
    }
`;

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery($id: ID!) {
    viewer {
      id
      Post(id: $id) {
          id
          description
          imageUrl    
      }
    }
  }
`;

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.initialValues ={
        description: '',
        imageUrl: '',
    };
    this.state = {
        description: '',
        imageUrl: '',
    };
  }

  render () {
    return (
      <QueryRenderer 
        environment={environment}
        query={this.props.match.params.id? CreatePageViewerQuery : CreatePageNewQuery}
        variables={{id: this.props.match.params.id || " "}}
        render={({error, props}) => {
          if (error) {
            return (
              <div>{error.message}</div>
            )
          } else if (props) {
            this.initialValues = props.viewer.Post || this.initialValues ;
            const imageUrl = this.state.imageUrl || this.initialValues.imageUrl,
                description = this.state.description || this.initialValues.description;
            return (
              <div className='w-100 pa4 flex justify-center'>
                <div style={{ maxWidth: 400 }} className=''>
                  <input
                    className='w-100 pa3 mv2'
                    value={description}
                    placeholder='Description'
                    onChange={(e) => this.setState({description: e.target.value}, )}
                  />
                  <input
                    className='w-100 pa3 mv2'
                    value={imageUrl}
                    placeholder='Image Url'
                    onChange={(e) => this.setState({imageUrl: e.target.value})}
                  />
                  {imageUrl &&
                    <img 
                      src={imageUrl}
                      alt={description}
                      className='w-100 mv3' 
                    />
                  }

                  <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={() => this._handlePost(props.viewer.id)}>Post</button>

                  <div style={{textAlign: "center", color: "red"}}>
                    <Link to="/" >Cancel</Link>
                  </div>
                </div>
              </div>
            )
          }
          return (<div>loading</div>)
        }}
      />
    )
  }

  _handlePost = (viewerId) => {
    const id = this.state.id || this.initialValues.id,
        description = this.state.description || this.initialValues.description,
        imageUrl = this.state.imageUrl || this.initialValues.imageUrl;
    UpdateOrCreatePostMutation(id, description, imageUrl, viewerId,  () => this.props.history.replace('/'))
  }

}

export default withRouter(CreatePage)