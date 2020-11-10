let dictionary = [];
const classNames = {
    dictonary: 'dictionary-table',
    btnadd: 'btn-add',
    textToAdd: 'word-to-add',
    textToSearch: 'word-to-search',
    matchTable: 'match-table'
} 

const autoComplete = (token, lwords) => lwords.filter(word => RegExp(`^${token}\\w*$`,'i').test(word));

const addWordToDictionary = (lwords, newWord) => {
    if(newWord) lwords.push(newWord);
    return lwords;
};

const refreshTable = (className, words = []) => 
{
    const tableBody = document.querySelector(`.${className} tbody`);
    tableBody.innerHTML = words.length &&`<tr><td>${words.length}</td></tr>` + words.reduce((final, data)=>final + `<tr><td>${data}</td></tr>`,'');
}

const refreshAutoComplete = ()=>{
    const token = document.querySelector(`.${classNames.textToSearch}`).value;
    if(token && token.length>0)
    {
    const autoloadWords = autoComplete(token,dictionary);
    refreshTable(classNames.matchTable, autoloadWords);
    }
    else
    {
        refreshTable(classNames.matchTable, []);
    }

};


document.addEventListener('DOMContentLoaded',()=>{

    refreshTable('dictionary-table',dictionary);
    
    document.querySelector(`.${classNames.btnadd}`).addEventListener('click',()=>{
        const newWord = document.querySelector(`.${classNames.textToAdd}`).value;
        dictionary = addWordToDictionary(dictionary,newWord);
        refreshTable(classNames.dictonary, dictionary);
        const token = document.querySelector(`.${classNames.textToSearch}`).value;
        refreshAutoComplete();
    });


    document.querySelector(`.${classNames.textToSearch}`).addEventListener('keyup',refreshAutoComplete);

    
});