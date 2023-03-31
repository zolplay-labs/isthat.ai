type Locale = 'en-US' | 'zh-CN'
type RootParams = { locale: Locale }

type Messages = typeof import('~/translations/en-US.json')
declare interface IntlMessages extends Messages {}
