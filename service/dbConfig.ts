const Config = () =>{
    let config = {
        server:'localhost\\sqlexpress',
        port:1433,
        database:"CAT_20220201",
        driver: 'msnodesqlv8',
        options:{
            trustedConnection:true,
            enableArithAbort:true
        }
    }

    return config;
}


export default Config;

