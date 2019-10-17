function favoriteLanguageSelector(body){
    
  const languagesInRepos = extractLanguages(body)
  const languagesFrequency = getFrequency(languagesInRepos)
  let favoriteLanguage = languagesInRepos[0];
  Object.keys(languagesFrequency).forEach((key) => {
      if(languagesFrequency[key] >= languagesFrequency[favoriteLanguage]) favoriteLanguage = key;
  })
  return favoriteLanguage;
}

function extractLanguages(body){
  const bodyArray = Array.from(JSON.parse(body))
  return Array.from(bodyArray, repo => repo.language)
}

function getFrequency(languagesInRepos){
  const languagesFrequency = {}
  languagesInRepos.forEach((language) => {
      if (languagesFrequency.hasOwnProperty(language)){
          languagesFrequency[language]++; 
      }else{
          languagesFrequency[language] = 1;
      }
  })
  return languagesFrequency;
}

module.exports = favoriteLanguageSelector