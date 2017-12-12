import React, { Component } from 'react';
import Languages from '../../components/languages/Languages';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";

class LanguageContainer extends Component{
    componentWillMount(){
        this.props.fetchLanguages();
    }
    
    render(){        
        return (
            <div>
                <Languages state= {this.props.languageState} fetchLanguage = {this.props.fetchLanguage}/>
            </div>       
        )
    }
}

function mapStateToProps(state){
    return{
        languageState: state.languageState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchLanguages: languageActions.fetchLanguages, fetchLanguage : languageActions.fetchLanguage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);