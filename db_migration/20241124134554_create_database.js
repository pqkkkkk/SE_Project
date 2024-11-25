/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE users (
      id INT IDENTITY(1,1) PRIMARY KEY,
      username VARCHAR(20) NOT NULL,
      password VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      fullname NVARCHAR(30) NOT NULL,
      phonenumber VARCHAR(15) NOT NULL,
      address NVARCHAR(50),
      birthday DATE,
      userrole VARCHAR(10),
      gender VARCHAR(10)
    );
  
    CREATE TABLE patient_information (
      id INT REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
      health_insurance BIT DEFAULT 0
    );
  
    CREATE TABLE doctor_information (
      id INT REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
      experience_year INT NOT NULL,
      speciality VARCHAR(20) NOT NULL,
      consultation_price INT NOT NULL,
      rating double precision default 0
    );
  
    CREATE TABLE consultation (
      id INT IDENTITY(1,1) PRIMARY KEY,
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      type VARCHAR(10) NOT NULL,
      status VARCHAR(10) NOT NULL,
      patient_id INT REFERENCES users(id) ON DELETE CASCADE,
      doctor_id INT REFERENCES users(id) ON DELETE CASCADE,
      consultation_result VARCHAR(100),
      reason NVARCHAR(100)
    );
  
    CREATE TABLE management (
      id INT IDENTITY(1,1) PRIMARY KEY,
      doctor_id INT REFERENCES users(id) ON DELETE CASCADE,
      patient_id INT REFERENCES users(id) ON DELETE CASCADE,
      patient_new_message BIT DEFAULT 0,
      doctor_new_message BIT DEFAULT 0
    );
  
    CREATE TABLE message (
      id INT IDENTITY(1,1) PRIMARY KEY,
      sender_id INT REFERENCES users(id) ON DELETE CASCADE,
      receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
      content NVARCHAR(100) NOT NULL
    );
  
    CREATE TABLE feedback (
      id INT IDENTITY(1,1) PRIMARY KEY,
      patient_id INT REFERENCES users(id) ON DELETE CASCADE,
      doctor_id INT REFERENCES users(id) ON DELETE CASCADE,
      content NVARCHAR(100),
      rating DECIMAL(3,2)
    );
  
    CREATE TABLE drug (
      id INT IDENTITY(1,1) PRIMARY KEY,
      name NVARCHAR(50) NOT NULL,
      unit NVARCHAR(10) NOT NULL,
      price INT NOT NULL,
      quantity INT NOT NULL,
      manufacturing_date DATE NOT NULL,
      expiry_date DATE NOT NULL,
      drug_type NVARCHAR(30) NOT NULL
    );
  
    CREATE TABLE prescription (
      id INT IDENTITY(1,1) PRIMARY KEY,
      total_price INT NOT NULL,
      created_day DATE NOT NULL,
      consultation_id INT REFERENCES consultation(id) ON DELETE CASCADE
    );
  
    CREATE TABLE prescription_detail (
      id INT IDENTITY(1,1) PRIMARY KEY,
      quantity INT NOT NULL,
      usage NVARCHAR(100) NOT NULL,
      prescription_id INT REFERENCES prescription(id) ON DELETE CASCADE,
      drug_id INT REFERENCES drug(id) ON DELETE CASCADE
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS prescription_detail;
    DROP TABLE IF EXISTS prescription;
    DROP TABLE IF EXISTS drug;
    DROP TABLE IF EXISTS feedback;
    DROP TABLE IF EXISTS message;
    DROP TABLE IF EXISTS management;
    DROP TABLE IF EXISTS consultation;
    DROP TABLE IF EXISTS doctor_information;
    DROP TABLE IF EXISTS patient_information;
    DROP TABLE IF EXISTS users;
  `);
};
