import bcrypt from "bcryptjs";
export const usuarios:any[] =[
    {
        name: "alejandro",
        email: "alejandrot@gmail.com",
        password: bcrypt.hashSync("12345", 10),
        roles: ['administrador'],
    }
]

export const books: any[] =[
    {
        id: "1",
        name: 'Crepusculo',
        date: '2005',
        description: 'aasdsadsadasdasd',
        publishing_book: 'sdasdsad', //editorial
        sections: ['Luna']
    }
]