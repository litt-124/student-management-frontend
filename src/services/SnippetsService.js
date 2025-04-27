import { snippet as LoginSnippet } from '@/snippets/login/SnipetService'
import { snippet as HeaderSnippet } from '@/snippets/header/SnipetService.js'
import { snippet as UserSnippet } from '@/snippets/user/SnipetService.js'

export default class SnippetsService {
  // contains current filtered snippet
  currentSnippet = []

  /**
   * returns filtered snippet {key: value}
   *
   * @param snippets
   *
   * @returns {{}}
   */
  static filterSnippet(snippets) {
    const cleanSnippet = {}

    for (let i = 0; i < snippets.length; i++) {
      cleanSnippet[snippets[i].key] = snippets[i].value
    }

    return cleanSnippet
  }

  /**
   * returns snippet by namespace and language
   *
   * @param namespace
   * @param language
   *
   * @returns {{}}
   */
  static getSnippetsByNamespaceAndLanguage(namespace, language = 'en') {
    if (!namespace || !language) {
      return
    }

    // eslint-disable-next-line default-case
    switch (namespace) {
      case 'Login':
        this.currentSnippet = LoginSnippet
        return this.filterSnippet(LoginSnippet.getSnippetByLanguage(language))
           case 'Header':
        this.currentSnippet = HeaderSnippet
        return this.filterSnippet(HeaderSnippet.getSnippetByLanguage(language));
        case 'User':
          this.currentSnippet = UserSnippet
          return this.filterSnippet(UserSnippet.getSnippetByLanguage(language));
    }
  }

}
