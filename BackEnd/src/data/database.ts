import { connect, ConnectOptions } from "mongoose";

export const dbBook = () => {
    connect(process.env.MONGO_URI!, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("Base de datos mongo a sido conectado correctamente "),
        (error) => console.log(error)
    )
}