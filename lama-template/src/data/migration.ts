import { connection } from "./connection";

connection.raw(`
    CREATE TABLE IF NOT EXISTS LAMA_music_Bands (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS LAMA_shows (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
    );

    CREATE TABLE IF NOT EXISTS LAMA_users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );
`).then(() => {
    console.log("Tabelas criadas!");
}).catch(error => {
    console.log(error.sqlMessage || error.message);
}).finally(() => {
    connection.destroy()
})