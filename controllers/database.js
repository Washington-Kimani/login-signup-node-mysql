import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise()


export async function getUsers(){
    const [rows] = await pool.query("SELECT * FROM users")
    return rows;
}

export async function getUser(id){
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ? `, [id])

    return rows[0]
}
export async function createUser(username, email, passcode){
    const [result] = await pool.query(`
    INSERT INTO users (username, email, passcode) 
    VALUES (?, ?, ?)
    `, [username, email, passcode])

    const id = result.insertId
    return getUser(id)
}

export async function deleteUser(id){
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id])
}