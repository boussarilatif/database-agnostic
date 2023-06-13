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
}).then(()=>{
  console.log('Connected to PostgreSQL database');
  let bookRepo = appDataSource.getRepository(Book);

  bookRepo.find().then((book)=>{
     console.log(book,'[PostgreSQL]')
  })
});