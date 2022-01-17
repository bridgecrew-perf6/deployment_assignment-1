// External files import
import React from 'react'
import axios from 'axios'

// Internal files import
import {
    TOKEN,
    TOKEN_CODE,
    API_DOMAIN,
    GET_DEPLOYMENTS,
    FRONT_END_DOMAIN,
    DELETE_DEPLOYMENT,
    COMMON_API_HEADERS
} from '../../../config/constant'

class DeploymentList extends React.Component {
    constructor(props) {
        super(props)

        // Initialise State
        this.state = {
            deploymentData: [],
            message: "",
            loader: false
        }
    }

    componentDidMount() {
        this.getDeploymentData()
    }

    // Get Deployment Data
    getDeploymentData = () => {
        let headers = COMMON_API_HEADERS
        headers[TOKEN] = TOKEN_CODE
        this.setState({ loader: true })
        axios.get(API_DOMAIN + GET_DEPLOYMENTS, { headers })
            .then((response) => {
                if (response &&
                    response.data &&
                    response.data.length) {
                    this.setState({
                        loader: false,
                        deploymentData: response.data
                    })
                }
            })
    }

    // Render Deployment Data Table
    renderDeploymentTable = () => {
        const { deploymentData, message, loader } = this.state

        if (deploymentData.length) {
            return <div>
                <center><h4>{message}</h4></center>
                <table className='table table-bordered'>
                    {this.renderDeploymentDataHeading()}
                    <tbody>
                        {this.renderDeploymentData(deploymentData)}
                    </tbody>
                </table>
            </div>
        }
        if (loader) {
            return <center><div className="loader"></div></center>
        }
        return <h3 style={{ 'textAlign': 'center' }}>No Deployment</h3>
    }

    // Render Deployment Data table column Heading
    renderDeploymentDataHeading = () => {
        return <thead>
            <tr>
                <th>Index</th>
                <th>Template Name</th>
                <th>URL</th>
                <th>Versions</th>
                <th>deployedAt</th>
                <th>Delete</th>
            </tr>
        </thead>
    }

    // Render header
    renderHeader = () => {
        return <div className="jumbotron text-center">
            <h1>Deployment Assignment</h1>
            <p>Pull deployments and render them on the list</p>
        </div>
    }

    // Render back links
    renderBackToForm = () => {
        return <div>
            <button type="button" onClick={this.redirectToForm} className="btn btn-link" style={{ "float": "right" }} > Back to deployment form &#8594; </button> <br /><br />
        </div>
    }

    // Redirect To Form
    redirectToForm = () => {
        window.location = FRONT_END_DOMAIN
    }

    // Render Deployment Data 
    renderDeploymentData = (deploymentData) => {
        let deploymentDataHtml = []
        deploymentData.forEach((deployment, index) => {
            deploymentDataHtml.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{this.validateColumn(deployment, 'name')}</td>
                <td>{this.validateColumn(deployment, 'url')}</td>
                <td>[ {this.validateColumn(deployment, 'versions').toString().split(',').join(', ')} ]</td>
                <td>{this.getDeploymentDate(deployment, 'deployedAt')}</td>
                <td onClick={() => this.deleteDeployment(deployment["_id"])}><a className="link-danger">Delete</a></td>
            </tr>)
        })
        return deploymentDataHtml
    }

    // Delete Deployment
    deleteDeployment = (deploymentId) => {
        if (deploymentId) {
            let headers = COMMON_API_HEADERS
            headers[TOKEN] = TOKEN_CODE
            axios.delete(API_DOMAIN + DELETE_DEPLOYMENT + deploymentId, { headers })
                .then((response) => {
                    if (response &&
                        response.data &&
                        response.data.message) {
                        this.setState({
                            message: response.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    message: ""
                                })
                            }, 2000);
                            this.getDeploymentData()
                        })
                    }
                })
        }
    }

    // Validate column of deployment table
    validateColumn = (deployment, key) => {
        if (deployment &&
            deployment[key]) {
            return deployment[key]
        }
        return ''
    }

    // Get deployment Date
    getDeploymentDate = (deployment) => {
        if (deployment &&
            deployment.deployedAt &&
            deployment.deployedAt.split('T').length) {
            return deployment.deployedAt.split('T')[0]
        }
        return ''
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBackToForm()}
                {this.renderDeploymentTable()}
            </div>
        )
    }
}

export default DeploymentList