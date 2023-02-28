import { hash } from "bcryptjs";
import { v4 as UUIDv4 } from "uuid";
import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = UUIDv4();
  const password = await hash("admin27015", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, email_is_verified, password, "isAdmin", created_at) 
    values('${id}', 'admin', 'coffee.delivery@viniciusdeoliveira.dev', true, '${password}', true, 'now()')`
  );

  connection.close;
}

create().then(() => {
  console.log("User admin created");
});
