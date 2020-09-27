const wordsLongerThan18Chars = /[\w:]{18,}/g
const camelCaseChars = /([a-z])([A-Z])/g
const underscoresAfter12thChar = /([\w:]{12}[^_]*?)_/g

// insert a <wbr> tag in code terms that use camelcase or underscore
// inspired by http://heap.ch/blog/2016/01/19/camelwrap/
export default function () {
  const codeTerms = document.querySelectorAll('#article-contents table code')
  if (!codeTerms) return

  codeTerms.forEach(node => {
    node.innerHTML = node.innerHTML.replace(wordsLongerThan18Chars, (str) => {
      return str
        // GraphQL code terms use camelcase
        .replace(camelCaseChars, '$1<wbr>$2')
        // REST code terms use underscores
        // to keep word breaks looking nice, only break on underscores after the 12th char
        // so `has_organization_projects` will break after `has_organization` instead of after `has_`
        .replace(underscoresAfter12thChar, '$1_<wbr>')
    })
  })
}