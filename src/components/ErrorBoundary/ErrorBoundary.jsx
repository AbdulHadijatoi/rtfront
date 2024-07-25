import React, {Component} from "react";
import Page from "../page/page";
import ErrorPage from './components/ErrorPage'


class ErrorBoundary extends Component {
    constructor(props)
     {
        super(props)
        this.state ={
            hasError : false
        }
     }
     static getDerivedStateFromError(error)
     {
        return{hasError: true}
     }
     componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
     }
    render()
    {
        return (
            <Page
            title=""
            >
                {this.state.hasError ? <><ErrorPage /> </> : this.props.children}

                 {console.log(this.state.hasError)}
            </Page>
        )
    }
}
export default ErrorBoundary