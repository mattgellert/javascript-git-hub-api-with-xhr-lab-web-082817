const baseAPI = 'https://api.github.com'
const token = '30862a3d2c9ba97b0dfb8ef5b2ec74945e5f1b45'
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault()
  getRepositories()
})

function getRepositories(){
  const user = document.querySelector('input#username').value
  fetch(`${baseAPI}/users/${user}/repos`,
    {
      method: 'get',
      headers: {
        Authorization: `token ${token}`
      }
    }
  ).then(resp => resp.json()).then(json => {displayRepositories(json, user)})
}

function displayRepositories(json, user){
  const repoElement = document.querySelector('div#repositories')
  const list = document.createElement('ul')
  repoElement.appendChild(list)
  json.forEach(repo => {
      const item = document.createElement('li')
      item.innerHTML = `<li data-user='${user}' data-repo='${repo.name}'>${repo.name} - <a href='${repo.html_url}'>link</a></li>`
      list.appendChild(item)

      item.addEventListener('click', (ev) => {
        getCommits(ev.target)
        getBranches(ev.target)
      })
  })
}

function getCommits(target){
  const user = target.attributes[0].value
  const repo = target.attributes[1].value
  fetch(`${baseAPI}/repos/${user}/${repo}/commits`,
    {
      method: 'get',
      headers: {
        Authorization: `token ${token}`
      }
    }).then(resp => resp.json()).then(json => displayCommits(json))
}

function displayCommits(json){
  const detailsElement = document.querySelector('div#details')
  const list = document.createElement('ul')
  json.forEach(commit => {
    const item = document.createElement('li')
    item.innerHTML = `${commit.commit.author.name}: ${commit.commit.message}`
    list.appendChild(item)
  })
  detailsElement.appendChild(list)
}

function getBranches(target){
  const user = target.attributes[0].value
  const repo = target.attributes[1].value
  fetch(`${baseAPI}/repos/${user}/${repo}/branches`,
    {
      method: 'get',
      headers: {
        Authorization: `token ${token}`
      }
    }).then(resp => resp.json()).then(json => displayBranches(json))
}

function displayBranches(json){
  const detailsElement = document.querySelector('div#details')
  detailsElement.innerHTML = ''
  const list = document.createElement('ul')
  json.forEach(branch => {
    const item = document.createElement('li')
    item.innerHTML = `Branch: ${branch.name}`
    list.appendChild(item)
  })
  detailsElement.appendChild(list)
}
