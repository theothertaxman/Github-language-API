const request = require('request');


function appRouter(app) {

    app.get('/', (req, res) => {
        res.status(200).send({ message: 'Welcome to our restful API' });
    });

    app.get('/:user', (req, res) => {
        
        let url = urlPopulateRepos(req.params.user);
        let options = {
            url : url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Github-language-API',
                'Authorization': 'Basic ' //Introduce here your credential
            }
        };
   
        console.log(`Sending GET request to + ${url}`);
        request.get(options,(error, response, body) => {
                    if (!error && response.statusCode == 200){
                    let preferedLanguage = favoriteLanguageSelector(body);
                    res.status(200).send(`${req.params.user} favorite language is: ${preferedLanguage}`);
                }
            }
            );
    });
}

function urlPopulateRepos(user) {
    const githubEndpoint = "http://api.github.com/users/";
    return githubEndpoint + user + "/repos";
}


function favoriteLanguageSelector(body){
    
    const languagesInRepos = extractLanguages(body)
    const languagesFrequency = getLanguagesFrequency(languagesInRepos)
    let preferedLanguage = languagesInRepos[0];
    Object.keys(languagesFrequency).forEach((key) => {
        if(languagesFrequency[key] >= languagesFrequency[preferedLanguage]) preferedLanguage = key;
    })
    return preferedLanguage;
}

function extractLanguages(body){
    const bodyArray = Array.from(JSON.parse(body))
    return Array.from(bodyArray, x => x.language)
}

function getLanguagesFrequency(languagesInRepos){
    let languagesFrequency = {}
    languagesInRepos.forEach((language) => {
        if (languagesFrequency.hasOwnProperty(language)){
            languagesFrequency[language]++; 
        }else{
            languagesFrequency[language] = 1;
        }
    })
    return languagesFrequency;
}

/*function getMostFrequentLanguage(languagesFrequency){
    const languagesPresent = Object.keys(languagesFrequency).forEach((key);
}*/

function isEmpty(object){
    return !Object.keys(object).length;
}
module.exports = appRouter;