import { Entity, Column, PrimaryGeneratedColumn, DataSource } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'book_database',
  entities: [Book],
});

const main = async () => {
  await appDataSource.initialize();
};

main().catch(error => {
  console.log('Connection error:', error);
  process.exit(1);
}).then(async () => {
  console.log('Connected to PostgreSQL database');
  let bookRepo = appDataSource.getRepository(Book);

  const newBook = new Book();
  newBook.title = 'Example Book';

  const savedBook = await bookRepo.save(newBook);

  const retrievedBook = await bookRepo.findOne({
    where: {
      id: savedBook.id
    }
  });
  console.log(retrievedBook);
});
