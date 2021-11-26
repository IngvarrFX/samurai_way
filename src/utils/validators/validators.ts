export type ValidatorsType = (value: string) => string | undefined


export const required: ValidatorsType = (value) => value ? undefined : "Field is required"


type MaxLengthType = (max: number) => (value: string) => string | undefined

export const maxLength: MaxLengthType = (maxLength: number): ValidatorsType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
// value && value.length > maxLength ? `Must be ${maxLength} characters or less` : undefined

