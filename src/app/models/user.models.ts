export class User {
    /* grace au type "public" typeScript créé directement
    les propriétés déclaré dans le constructeur*/
    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public drinkPreference: string,
                public hobbies?: string[]
    ){}
}