import { snippet as LoginSnippet } from '@/snippets/login/SnipetService'
import { snippet as HeaderSnippet } from '@/snippets/header/SnipetService.js'
import { snippet as UserSnippet } from '@/snippets/user/SnipetService.js'
import { snippet as HomePageSnippet } from '@/snippets/home-page/SnipetService.js'
import { snippet as Lab } from '@/snippets/lab/SnipetService.js'
import { snippet as Computer } from '@/snippets/computer/SnipetService.js'
import { snippet as UserGroup } from '@/snippets/user-group/SnipetService.js'

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
      case 'HomePage':
        this.currentSnippet = HomePageSnippet
        return this.filterSnippet(HomePageSnippet.getSnippetByLanguage(language));
      case 'Lab':
        this.currentSnippet = Lab
        return this.filterSnippet(Lab.getSnippetByLanguage(language));
      case 'Computer':
        this.currentSnippet = Computer
        return this.filterSnippet(Computer.getSnippetByLanguage(language));
      case 'UserGroup':
        this.currentSnippet = UserGroup
        return this.filterSnippet(UserGroup.getSnippetByLanguage(language));
    }
  }

}
