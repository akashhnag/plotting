import {SHAPE_CHANGED} from '../actions/index';

const initialState={
    shape:'line'
};

export default(state=initialState,action)=>{
    switch(action.type){
        case SHAPE_CHANGED:
            return{
                ...state,
                shape:action.shape
            }
            
        default: return state;
    }
   
}