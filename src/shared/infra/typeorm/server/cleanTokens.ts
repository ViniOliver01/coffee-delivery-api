import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  await connection.query(`DELETE FROM users_tokens WHERE expires_date < NOW()`);

  connection.close;
}

create().then(() => {
  console.log("Deleted expired tokens");
});
