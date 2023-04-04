type Locale = 'en-US' | 'zh-CN'
type RootParams = { locale: Locale }

type Messages = typeof import('~/translations/en-US.json')
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}
