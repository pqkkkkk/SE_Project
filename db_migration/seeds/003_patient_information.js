/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {

  const patients = await knex('users').where({ userRole: 'patient' });

  // Deletes ALL existing entries
  await knex('patient_information').del();
  await knex('patient_information').insert(
      patients.map(patient => ({
        ID: patient.id, // Use the ID from User table
        health_insurance: true
      }))
  );
};
