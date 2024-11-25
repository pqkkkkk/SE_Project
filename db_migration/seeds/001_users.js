/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      UserName: 'doctor_1',
      Password: 'hashed_password_1',
      Email: 'doctor1@example.com',
      FullName: 'Dr. John Doe',
      PhoneNumber: '1234567890',
      Address: '123 Main St, Cityville',
      Birthday: '1980-01-01',
      userRole: 'doctor'
    },
    {
      UserName: 'patient_1',
      Password: 'hashed_password_2',
      Email: 'patient1@example.com',
      FullName: 'Jane Smith',
      PhoneNumber: '9876543210',
      Address: '456 Elm St, Townsville',
      Birthday: '1990-05-15',
      userRole: 'patient'
    },
    {
      UserName: 'doctor_2',
      Password: 'hashed_password_3',
      Email: 'doctor2@example.com',
      FullName: 'Dr. James',
      PhoneNumber: '1234567890',
      Address: '123 Main St, Cityville',
      Birthday: '1980-01-01',
      userRole: 'doctor'
    },
    {
      UserName: 'patient_2',
      Password: 'hashed_password_4',
      Email: 'patient2@example.com',
      FullName: 'Jane Jane',
      PhoneNumber: '9876543210',
      Address: '456 Elm St, Townsville',
      Birthday: '1990-05-15',
      userRole: 'patient'
    },
    {
      UserName: 'doctor_3',
      Password: 'hashed_password_5',
      Email: 'doctor3@example.com',
      FullName: 'Dr. Doe Doe',
      PhoneNumber: '1234567890',
      Address: '123 Main St, Cityville',
      Birthday: '1980-01-01',
      userRole: 'doctor'
    },
    {
      UserName: 'patient_3',
      Password: 'hashed_password_6',
      Email: 'patient3@example.com',
      FullName: 'Smith Smith',
      PhoneNumber: '9876543210',
      Address: '456 Elm St, Townsville',
      Birthday: '1990-05-15',
      userRole: 'patient'
    }
  ]);
};
