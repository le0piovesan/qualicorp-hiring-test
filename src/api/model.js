var neo4j = require("neo4j-driver");
const { v4: uuidv4 } = require("uuid");

const driver = neo4j.driver(
  "bolt://34.204.3.238:7687",
  neo4j.auth.basic("neo4j", "bigamy-groups-portions"),
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);

const session = driver.session({ database: "neo4j" });

const findAll = async () => {
  const result = await session.run(
    `MATCH (n) RETURN (n) ORDER BY n.createdAt ASC`
  );
  return result.records.map((i) => i.get("n").properties);
};

const findById = async (id) => {
  const result = await session.run(
    `MATCH (n:User {id: '${id}'} ) RETURN n LIMIT 1`
  );
  return result.records[0].get("n").properties;
};

const createUser = async (user) => {
  try {
    const unique_id = uuidv4();

    await session.run(
      `CREATE (n:User {id: '${unique_id}', name: '${user.name}', 
      email: '${user.email}', cpf: '${user.cpf}', phone: '${user.phone}', 
      uf: '${user.uf}', qualiClient: ${
        user.qualiClient
      }, createdAt: ${JSON.stringify(new Date())} } ) RETURN n`
    );

    return await findById(unique_id);
  } catch (err) {
    console.log(err);
  }
};

const findAndUpdate = async (id, user) => {
  const result = await session.run(
    `MATCH (n:User {id: '${id}'}) SET n.name= '${user.name}', 
    n.email= '${user.email}', n.cpf= '${user.cpf}', n.phone= '${user.phone}', 
    n.uf= '${user.uf}', n.qualiClient= ${user.qualiClient} RETURN n`
  );
  return result.records[0].get("n").properties;
};

const findAndDelete = async (id) => {
  await session.run(`MATCH (n:User {id: '${id}'}) DELETE n`);
  return await findAll();
};

module.exports = {
  findAll,
  findById,
  createUser,
  findAndUpdate,
  findAndDelete,
};
