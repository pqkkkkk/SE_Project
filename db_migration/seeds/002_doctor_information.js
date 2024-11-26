/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  const doctors = await knex('users').where({ userRole: 'doctor' });
  console.log(doctors);
  // Deletes ALL existing entries
  await knex('doctor_information').del();
  await knex('doctor_information').insert(
      doctors.map(doctor => ({
        ID: doctor.id, // Use the ID from User table
        Experience_Year: 10,
        Rating: 4.5,
        consultation_price: 500000,
        Speciality: 'Cardiology'
      }))
  );
};
