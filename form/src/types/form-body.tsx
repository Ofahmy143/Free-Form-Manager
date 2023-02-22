
type FormTitle = {
    title: string,
    img?: string,
    description: string,

}
type FormQuestion = {
    key:number,
    title: string,
    img?:string,
    type: string,
    input: string[],

}

type Form = {
    title: FormTitle,
    questions: FormQuestion[]
}

export type {Form, FormTitle, FormQuestion }