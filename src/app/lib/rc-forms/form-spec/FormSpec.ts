
interface GroupListSpec {
  type: 'group-list'
  title?: string
  prompt?: string
  listItem: FormSpec
}

interface GroupSpec {
  type: 'group' | 'group-inline'
  title?: string
  prompt?: string
  fields: {
    [key: string]: FormSpec
  }
}

interface QuestionSpec {
  type: string // 'text' | 'number' | 'radio-button' | 'select' | 'multi-select'
  title?: string
  prompt?: string
  options?: string
}

type FormSpec = GroupSpec | GroupSpec | QuestionSpec

export {
  FormSpec,
  GroupSpec,
  GroupListSpec,
  QuestionSpec
}
