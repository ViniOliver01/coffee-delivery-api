import { hash } from "bcryptjs";
import { v4 as UUIDv4 } from "uuid";
import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = UUIDv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', '123123123')`
  );

  connection.close;
}

create().then(() => {
  console.log("User admin created");
});
