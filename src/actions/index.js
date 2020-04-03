export const SHAPE_CHANGED='SHAPE_CHANGED';

export function shapeChangeAction(data){
    return {
        type:SHAPE_CHANGED,
        shape:data
    }
}