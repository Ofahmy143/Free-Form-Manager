
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

export type {FormTitle, FormQuestion }