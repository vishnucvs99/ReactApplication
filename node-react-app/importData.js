const fs = require('fs');
const sql = require('mssql');

const config = {
   user: 'vishnu',
   password: 'Vishnu@12345',
   server: 'Covalenseglobal\\SQLEXPRESS',
   database: 'Application',
   port: 1433,
   options: {
     trustServerCertificate: true,
     enableArithAbort: true,
   },
};

async function insertData() {
   try {
      await sql.connect(config);
      const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

      for (const record of data) {
         // Exclude the `id` field from being inserted (let SQL Server auto-generate it)
         await sql.query`INSERT INTO Posts (userId, title, body) VALUES (${record.userId}, ${record.title}, ${record.body})`;
      }

      console.log('Data imported successfully');
   } catch (error) {
      console.error('Error importing data:', error);
   } finally {
      await sql.close();
   }
}

insertData();
