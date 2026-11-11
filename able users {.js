able users {
  id int [pk, increment]
  username varchar
  email varchar [unique]
  password_hash varchar
  role varchar // visitor, admin
  preferred_language varchar
  created_at timestamp
}

Table heritage_sites {
  id int [pk, increment]
  name varchar
  description text
  location varchar
  image_url varchar
}

Table artifacts {
  id int [pk, increment]
  site_id int [ref: > heritage_sites.id]
  name varchar
  historical_period varchar
  detailed_description text
}

Table beacons {
  id int [pk, increment]
  uuid varchar
  major int
  minor int
  artifact_id int [ref: - artifacts.id]
  status varchar
}

Table media_resources {
  id int [pk, increment]
  artifact_id int [ref: > artifacts.id]
  media_type varchar // image, video, audio
  file_url varchar
  language_code varchar // vi, en
}

Table visitor_interactions {
  id int [pk, increment]
  user_id int [ref: > users.id]
  artifact_id int [ref: > artifacts.id]
  interaction_type varchar // viewed, favorited, rated
  rating_score int
  feedback_comment text
  timestamp timestamp
}
able users {
  id int [pk, increment]
  username varchar
  email varchar [unique]
  password_hash varchar
  role varchar // visitor, admin
  preferred_language varchar
  created_at timestamp
}

Table heritage_sites {
  id int [pk, increment]
  name varchar
  description text
  location varchar
  image_url varchar
}

Table artifacts {
  id int [pk, increment]
  site_id int [ref: > heritage_sites.id]
  name varchar
  historical_period varchar
  detailed_description text
}

Table beacons {
  id int [pk, increment]
  uuid varchar
  major int
  minor int
  artifact_id int [ref: - artifacts.id]
  status varchar
}

Table media_resources {
  id int [pk, increment]
  artifact_id int [ref: > artifacts.id]
  media_type varchar // image, video, audio
  file_url varchar
  language_code varchar // vi, en
}

Table visitor_interactions {
  id int [pk, increment]
  user_id int [ref: > users.id]
  artifact_id int [ref: > artifacts.id]
  interaction_type varchar // viewed, favorited, rated
  rating_score int
  feedback_comment text
  timestamp timestamp
} 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Khởi tạo ứng dụng NestJS
  const app = await NestFactory.create(AppModule);

  // Kích hoạt tính năng kiểm tra dữ liệu đầu vào tự động
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Cấu hình giao diện tài liệu Swagger API (Trang web xem API)
  const config = new DocumentBuilder()
    .setTitle('Smart Heritage API')
    .setDescription('Tài liệu API hệ thống Du lịch thông minh Smart Heritage')
    .setVersion('1.0')
    .addBearerAuth() // Hỗ trợ test API có khóa bảo mật JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Đường dẫn xem tài liệu: /api/docs

  // Chạy server ở cổng 3000
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server đang chạy tại: http://localhost:3000`);
  console.log(`📄 Trang tài liệu API: http://localhost:3000/api/docs`);
}
bootstrap();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}