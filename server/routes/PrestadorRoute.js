import Database from "../database/index";
import Prestador from "../models/index";

export default class ClientRoute{

    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
        this.prestador = null;
    }

    init(){
        this.insert();
        this.update();
        this.delete();
    }

    async insert(){

        this.app.post("/prestador", async (req, res) => {

            let dataAbertura = new Date();

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;

            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")
            
            try {
                
                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                    );
                let savedPrestador = await this.database.save(this.prestador);
                return res.send(savedPrestador);
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async update(){
        this.app.put("/prestador", async (req, res) => {

            let dataAbertura = new Date();

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {
                
                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                );

                let updatedRows = await this.database.update(this.prestador);
                
                if (updatedRows.toString() === "0") return res.status(500).send("Cannot complete your request. Try again later.") 

                return res.send(updatedRows.toString() + " rows update successfully.");
                
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async delete(){
        this.app.delete("/prestador", async (req, res) => {

            let dataAbertura = new Date();

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;

            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {

                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                );

                let rowsAffected = await this.database.delete(this.prestador);
                if(rowsAffected == 0) res.status(500).send("Cannot complete your request. Try again.");
                return res.send(rowsAffected.toString() + " rows affected.")

            } catch (error) {
                console.log("An error ocurred trying to delete the data.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again.");
            }
        })
    }

    async connectDatabase(){

        try {
            this.database.connect();
            // await this.database.authenticate();
            await this.database.setModel();
            await this.database.sync();
            return "ok";
        } catch (error) {
            console.log("An error ocurred when syncing the database.");
            console.log(error);
            return null;
        }
    }
}