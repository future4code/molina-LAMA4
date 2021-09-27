import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, User, UserInputDTO, UserRole } from "../model/User";

const userDatabase = {
    createUser: jest.fn(async (user: User) => { }),
    getUserByEmail: jest.fn((email: string) => {

        if (email === "teste@email.com") {
            return User.toUserModel({
                id: "id_usuario",
                name: "Nome_usuario",
                email,
                password: "33124",
                userRole: UserRole.ADMIN
            })

        } else {
            throw new Error(`Unable to found user with email: ${email}`);

        }
    })
}

const authenticator = {
    generateToken: jest.fn((payload: { id: string, role: UserRole }) => "Token_usuario"),
    getData: jest.fn((token: string) => {
        switch (token) {
            case "userToken":
                return { id: "id_do_token", role: "NORMAL" }
            case "adminToken":
                return { id: "id_do_token", role: "ADMIN" }
            default:
                return undefined
        }
    })

}

const idGenerator = {
    generate: jest.fn(() => "id_gerado")
}

const hashManager = {
    hash: jest.fn((password: string) => "LABENU_SECRET_PASS_HASH"),
    compare: jest.fn((text: string, hash: string) => text === "123123" ? true : false)
}

const userBussines = new UserBusiness()

describe("SignUp tests", () => {
    test.skip("Should return error when wrong email format", async () => {
        expect.assertions(2)
        const user = {
            email: "teste.com",
            name: "Astrodev",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBussines.createUser(user)
        } catch (error) {
            expect(error.message).toBe("Invalid email format")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return error when wrong role format", async () => {
        expect.assertions(1)
        const user = {
            email: "teste@teste.com",
            name: "Astrodev",
            password: "123123",
            role: "TESTE"
        } as UserInputDTO

        try {
            await userBussines.createUser(user)
        } catch (error) {
            expect(error.message).toBe("Invalid user role")
        }
    })

    test.skip("Should return error when wrong password format", async () => {
        expect.assertions(1)
        const user = {
            email: "teste@teste.com",
            name: "Astrodev",
            password: "123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBussines.createUser(user)
        } catch (error) {
            expect(error.message).toBe("Password should have more than 6 digits")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return error when no password", async () => {
        expect.assertions(1)
        const user = {
            email: "teste@teste.com",
            name: "Astrodev",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBussines.createUser(user)
        } catch (error) {
            expect(error.message).toBe("Invalid input to signUp")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return error when no role", async () => {
        expect.assertions(1)
        const user = {
            email: "teste@teste.com",
            name: "Astrodev",
            password: "123",

        } as UserInputDTO

        try {
            await userBussines.createUser(user)
        } catch (error) {
            expect(error.message).toBe("Invalid input to signUp")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return token", async () => {
        expect.assertions(1)
        const user = {
            email: "teste.com",
            name: "Astrodev",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        const result = await userBussines.createUser(user)
        expect(result).toBe("Token_usuario")

    })

})

describe("Login test", () => {
    test.skip("Should return error when no user linked to email", async() =>{
        expect.assertions(2)
        const login = {
            email: "teste@teste.com",
            password: "123", 
        } as LoginInputDTO

        try {
            await userBussines.getUserByEmail(login)
        } catch (error) {
            expect(error.message).toBe("Unable to found user with email teste@teste.com")
            expect(error.code).toBe(404)

        }
    })

    test.skip("Should return error when password wrong", async() =>{
        expect.assertions(2)
        const login = {
            email: "teste@teste.com",
            password: "123456", 
        } as LoginInputDTO

        try {
            await userBussines.getUserByEmail(login)
        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return error when no password", async() =>{
        expect.assertions(2)
        const login = {
            email: "teste@teste.com",
        } as LoginInputDTO

        try {
            await userBussines.getUserByEmail(login)
        } catch (error) {
            expect(error.message).toBe("Invalid input to login")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return error when no email", async() =>{
        expect.assertions(2)
        const login = {
            password: "123456",
        } as LoginInputDTO

        try {
            await userBussines.getUserByEmail(login)
        } catch (error) {
            expect(error.message).toBe("Invalid input to login")
            expect(error.code).toBe(417)

        }
    })

    test.skip("Should return an access token", async() =>{
        expect.assertions(2)
        const login = {
            email: "teste@teste.com",
            password: "123456",
        } as LoginInputDTO

        const result = await userBussines.getUserByEmail(login)
        expect(result).toBe("Token_usuario")
        
    })
})