import axios from 'axios';
///import * as shapes from ;
export const getShapes=new Promise((resolve,reject)=>{
    axios.get('./shapes.json').then((res)=>{
        if(res.status===200){
            console.log('rres',res);

            resolve(res.data)
        }else{
            reject('could not get data');

        }
    }).catch((err)=>{
        reject(err.message);
    })
})
