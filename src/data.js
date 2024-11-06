export const API_KEY = 'AIzaSyA4XpwKcpfBlkC2OYFQPKaaRU8wMngLHPM';


export const value_converter = (value)=> {
   if(value> 1000000){
    return (value/1000000).toFixed(0)+'M';
   
    }else if(value> 1000){
        return (value/1000).toFixed(0)+'K';
    }else{
        return value
    }
}
