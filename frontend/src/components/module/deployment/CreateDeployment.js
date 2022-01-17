// External files import
import React from 'react'
import axios from 'axios'

// Internal files import
import {
    TOKEN,
    TOKEN_CODE,
    API_DOMAIN,
    DEPLOYMENT_LIST,
    ADD_DEPLOYMENTS,
    FRONT_END_DOMAIN,
    COMMON_API_HEADERS
} from '../../../config/constant'

class CreateDeployment extends React.Component {
    constructor(props) {
        super(props)

        // Initialise State
        this.state = {
            templateName: "",
            url: "",
            versions: ["1.0.0"],
            templateNameError: "",
            urlError: ""
        }
    }

    // Update Template Name
    updateTemplateName = (e) => {
        this.setState({
            templateName: e.target.value,
            templateNameError: ""
        })
    }

    // Update URL
    updateUrl = (e) => {
        this.setState({
            url: e.target.value,
            urlError: ""
        })
    }

    // Update Versions
    updateAddVersions = () => {
        const { versions } = this.state
        const lastVersion = versions[versions.length - 1]
        let versionNumber = lastVersion.split('.').join('')
        const updateVersionNumber = parseInt(versionNumber) + 1
        const updateVersion = updateVersionNumber.toString().split('').join('.')
        versions.push(updateVersion)
        this.setState({ versions })
    }

    // Submit Add a New deployment Form
    submitDeploymentForm = () => {
        const {
            templateName,
            url,
            versions
        } = this.state
        if (!templateName) {
            this.setState({
                templateNameError: "Please select a template name"
            })
        }
        if (!url) {
            this.setState({
                urlError: "Please add a url"
            })
        }
        if (templateName && url) {
            let headers = COMMON_API_HEADERS
            headers[TOKEN] = TOKEN_CODE
            const data = {
                'name': templateName,
                'url': url,
                'versions': versions
            }
            axios.post(API_DOMAIN + ADD_DEPLOYMENTS, data, { headers })
                .then((response) => {
                    window.location = FRONT_END_DOMAIN + DEPLOYMENT_LIST
                })
        }
    }

    // Render header
    renderHeader = () => {
        return <div className="jumbotron text-center">
            <h1>Deployment Form</h1>
            <p>Pull deployments and render them on the list</p>
        </div>
    }

    // Render back links
    renderBackToForm = () => {
        return <div>
            <button type="button" onClick={this.redirectToList} className="btn btn-link" style={{ "float": "right" }} > Back to deployment List &#8594; </button> <br /><br />
        </div>
    }

    // Redirect To List
    redirectToList = () => {
        window.location = FRONT_END_DOMAIN + DEPLOYMENT_LIST
    }

    // Render Deployment Form 
    renderDeploymentForm = () => {
        const { templateNameError, urlError, versions } = this.state
        return <form align='center'>
            <div className='form-group'>
                <b>Select a Template  : </b>&#160; &#160; &#160;
                <input type='radio' name='rating' value='Sporty - 1' onChange={this.updateTemplateName} /> Sporty - 1 &#160; &#160; &#160;
                <input type='radio' name='rating' value='Sporty - 2' onChange={this.updateTemplateName} /> Sporty - 2 &#160; &#160; &#160;
                <input type='radio' name='rating' value='Sporty - 3' onChange={this.updateTemplateName} /> Sporty - 3 &#160; &#160; &#160;
                <input type='radio' name='rating' value='Sporty - 4' onChange={this.updateTemplateName} /> Sporty - 4 &#160; &#160; &#160;
                <input type='radio' name='rating' value='Sporty - 5' onChange={this.updateTemplateName} /> Sporty - 5 &#160; &#160; &#160;
                <br />
                <a className="link-warning">{templateNameError}</a>
                <br />
                <b>URL  : </b>&#160; &#160; &#160;
                <input type='text'
                    onChange={this.updateUrl}
                    align='center'
                    id='feedback'
                    style={{ 'width': '400px' }} />
                <br />
                <a className="link-danger">{urlError}</a>
                <br />
                <b>Version  : </b>&#160; &#160; &#160;
                {versions.map((item, index) => {
                    return <span className="badge badge-pill badge-primary" key={index}>{item}</span>
                })}
                &#160;&#160;&#160;&#160;<button type='button' className="btn btn-primary" onClick={this.updateAddVersions}>Update and Add Version</button>
            </div>
            <button type='button'
                onClick={this.submitDeploymentForm}
                className='btn btn-default'>Submit
            </button>
        </form>
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBackToForm()}
                {this.renderDeploymentForm()}
            </div>
        )
    }
}

export default CreateDeployment