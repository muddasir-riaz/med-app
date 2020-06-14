import {CATCONTENT} from '../../data/categoriesData';
import {DELETE_CATCONTENT, CREATE_CATCONTENT, UPDATE_CATCONTENT} from '../actions/catContent';
import CatContent from '../../models/catContent';


const initialState = {
    categoriesContent: CATCONTENT,
};

export default (state = initialState, action) => {
    switch(action.type){
    
        case CREATE_CATCONTENT:
            const newCatContent = new CatContent(
                new Date().toString(),  
                action.catContentData.title,
                action.catContentData.color,
                action.catContentData.subId,
                action.catContentData.evaluation,
                action.catContentData.signs,
                action.catContentData.management,
                action.catContentData.medications,
                action.catContentData.references
                );
                return {
                    ...state,
                    categoriesContent: state.categoriesContent.concat(newCatContent),
                };
        
        case UPDATE_CATCONTENT:
            const catContentIndex = state.categoriesContent.findIndex(
                cat => cat.id === action.catContentId
                );
            const updatedCatContent  = new CatContent(
                action.catContentId, 
                action.catContentData.title,
                state.categoriesContent[catContentIndex].color,
                state.categoriesContent[catContentIndex].subId,
                action.catContentData.evaluation,
                action.catContentData.signs,
                action.catContentData.management,
                action.catContentData.medications,
                action.catContentData.references
                );
                const updatedAvailableCatContent = [...state.categoriesContent];
                updatedAvailableCatContent[catContentIndex] = updatedCatContent;
                return{
                    ...state,
                    categoriesContent: updatedAvailableCatContent
                }
                
        case DELETE_CATCONTENT:
            return {
                ...state,
                categoriesContent: state.categoriesContent.filter(catContent => catContent.id !== action.catContentId),
            };
    }
    return state;
};
