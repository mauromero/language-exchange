import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as languageActions from "../../actions/languageActions";
import * as userActions from "../../actions/userActions";
import { Link } from 'react-router-dom';


class LanguageDetail extends Component{
    componentDidMount(){
        this.props.fetchCurrentUser();
        const id = this.props.match.params.id;
        this.props.fetchLanguage(id);
    }
    
    render(){ 
        const authUser = this.props.userState.current;
        let createdAt = (new Date(this.props.languageState.active.created_at)).toString();
        let updatedAt = (new Date(this.props.languageState.active.updated_at)).toString();

        if( authUser.user_type){

            if (!this.props.languageState.active) {
                return (<h4>Select a language </h4>);
            }       
            return (         
                <div>
                    <div className="card mt-3">
                        <div className="card-header bg-dark text-white">
                            Languages
                        </div>
                        <div className="card-body">
                            <h3>{this.props.languageState.active.name} </h3>
                            <hr/>
                            <p><label>Short Name:</label> {this.props.languageState.active.short_name} </p>
                            <p><label>Date Created:</label> {createdAt} </p>
                            <p><label>Date Updated:</label> {updatedAt} </p>
                        </div>  
                        <div className="card-footer">
                        <Link to={'/Languages'}  className="btn btn-secondary">Back</Link>
                        </div>     
                    </div>    
                </div>    
            )
        }else{
            return ( <div> <h4> 403 Forbidden - User Not Authorized </h4></div> )
        }            
    }
}

function mapStateToProps(state){
    return {
        languageState : state.languageState,
        userState: state.userState
     }
 }

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchLanguage: languageActions.fetchLanguage,
        fetchCurrentUser: userActions.fetchCurrentUser
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguageDetail);