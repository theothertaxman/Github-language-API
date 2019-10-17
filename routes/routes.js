const request = require('request');
const favoriteLanguageSelector = require('./../favoriteLanguageSelector.js')

function appRouter(app) {

    app.get('/', (req, res) => {
        res.status(200).send({ message: 'Welcome to our restful API' });
    });

    app.get('/:user', (req, res) => {
        

        const options = populateRequestOptions(req.params.user);
   
        console.log(`Sending GET request to + ${options.url}`);
        request.get(options,(error, response, body) => {
                    if (!error && response.statusCode == 200){
                    const preferedLanguage = favoriteLanguageSelector(body);
                    res.status(200).send(`${req.params.user} favorite language is: ${preferedLanguage}`);
                }
            }
            );
    });
}

function populateRequestOptions(user){
    const url = urlPopulateRepos(user);
    return {
            url : url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Github-language-API',
                // 'Authorization': 'Basic yourUsername yourPassword' 
            }
        };
}
function urlPopulateRepos(user) {
    const githubEndpoint = "http://api.github.com/users/";
    return githubEndpoint + user + "/repos";
}


module.exports = appRouter;