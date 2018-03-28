import React, { Component } from 'react';
import * as languageActions from '../../actions/languageActions';
import * as abilityActions from '../../actions/abilityActions';
import * as userLanguageActions from '../../actions/userLanguageActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProvidedLanguageSelectionForm from '../../components/userLanguage/ProvidedLanguageSelectionForm';

class ProvidedLanguageSelection extends Component{

    componentDidMount() {
        this.props.fetchAbilities();
        this.props.fetchLanguages();
    }

    submit = values => {
        const user_id =  this.props.userState.current.id;
        const now = new Date();
        const newProvidedLanguage ={
            language_id : values.provided_language_id,
            user_id : user_id,
            ability : values.provided_ability,
            created_at : now,
            updated_at : now
        }
        this.props.createProvidedLanguage(newProvidedLanguage);
      }

    render(){
        const providedLanguagesSelect = this.props.languageState.languages;
        const languageAbility = this.props.abilityState.abilities
        const languagesToRemove =  this.props.userLanguageState.userProvidedLanguages;

        for( var i=providedLanguagesSelect.length - 1; i>=0; i--){
            for( var j=0; j<languagesToRemove.length; j++){
                if(providedLanguagesSelect[i] && (providedLanguagesSelect[i].id === languagesToRemove[j].language.id)){
                    providedLanguagesSelect.splice(i, 1);
                }
            }
        }

        return (
            <div>
            <div> 
                <h2>Languages I know</h2>
            </div>
                
                <ProvidedLanguageSelectionForm
                    providedLanguagesSelect={providedLanguagesSelect}
                    abilities={languageAbility}
                    onSubmit={this.submit}
                    form="ProvidedLanguageSelectionForm"
                    formKey="ProvidedLanguageSelectionForm"
                    />
            <hr /> 
            </div>  
        )
        
    }
}

function mapStateToProps(state){
    return{ abilityState: state.abilityState,
            languageState : state.languageState,
            userLanguageState : state.userLanguageState,
            userState : state.userState }
}
 
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      fetchLanguages : languageActions.fetchLanguages,
      fetchAbilities : abilityActions.fetchAbilities,
      createProvidedLanguage : userLanguageActions.createProvidedLanguage
  }, dispatch)
 }

 export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ProvidedLanguageSelection));