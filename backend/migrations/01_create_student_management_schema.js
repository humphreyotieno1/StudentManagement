exports.up = function(knex) {
  return knex.schema
    .createTable('students', function(table) {
      table.string('studentId').primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable().unique();
      table.date('dateOfBirth').notNullable();
      table.string('program').notNullable();
      table.string('semester').notNullable();
      table.string('major').notNullable();
      table.decimal('gpa', 3, 2).notNullable();
      table.date('enrollmentDate').notNullable();
      table.enum('status', ['Active', 'Inactive', 'Graduated', 'Suspended', 'On Leave']).defaultTo('Active');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('students');
}; 