const { MongoClient } = require('mongodb');

const DB_COLLECTION_NAME_ARTICLES = 'articles';
const DB_COLLECTION_NAME_ORDERS = 'orders';

class Database {
  constructor(mongoClient) {
    this._mongoClient = mongoClient;
    this._db = this._mongoClient.db();
    this.articles = this._db.collection(DB_COLLECTION_NAME_ARTICLES);
    this.orders = this._db.collection(DB_COLLECTION_NAME_ORDERS);
  }

  async dispose() {
    await this._mongoClient.close();
  }

  static async create(dbConnectionString) {
    const mongoClient = await MongoClient.connect(dbConnectionString);
    return new Database(mongoClient);
  }
}

module.exports = Database;
