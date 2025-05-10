import { snippetList as EnSnippetList } from './en/snippet'

export const snippet = {
  getSnippetByLanguage(language) {
    switch (language) {
      case 'en':
        return EnSnippetList
      default:
        return EnSnippetList
    }
  },

  getSnippets() {
    return EnSnippetList
  },
}
