export type createUser = {
    username : string
    email : string
    password : string
}

export type updateUser = {
    username? : string
    email? : string
    password? : string
}

export type login = {
    email : string
    password : string
}

