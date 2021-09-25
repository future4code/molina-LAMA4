import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { createLogicalNot } from "typescript";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            if (
                !input.name ||
                !input.email ||
                !input.password ||
                !input.role
            ) {
                throw new Error('Preencha todos os campos ')
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            if (!loginData.email || loginData.password) {
                throw new Error("Preencha todos os campos!");

            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}