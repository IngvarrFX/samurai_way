type ValidatorsType = (value: string) => string | undefined


export const required: ValidatorsType = (value) => value ? undefined : "Field is required"


type MaxLengthType = (max: number) => (value: string) => string | undefined

export const maxLength: MaxLengthType = (max: number) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

