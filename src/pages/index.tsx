import React from 'react';
import { type NextPage } from 'next';
import { Container } from '@mantine/core';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';

const HomePage: NextPage = () => (
  <>
    <Container style={{ marginTop: 60, marginBottom: 60 }}>
      <Logo />

      <div>
        <h1>Epic Task</h1>
        <p>
          Онлайн площадка для разработчиков, на которой можно [будет, в течение
          2023 года]:
        </p>
        <ul>
          <li>
            <b>Создать и заполнить свой Профиль.</b> Укажи свой опыт, контакты и
            соц сети, прикрепи все свои сертификаты, ссылку на свой блог.
          </li>
          <li>
            <b>Создать Эпик.</b> Это общий план по разработке продукта. Бизнес
            задачи, идеи, планы, мотивация, цели, проблемы, решения, технические
            детали, сроки, бюджет, команда, результаты.
          </li>
          <li>
            <b>Наполнять свои Эпики контентом.</b> Столкнулся с интересным
            заданием? Поделись со всеми решением! В процессе ты получишь Опыт и
            Трофеи.
          </li>
          <li>
            <b>Следить за прогрессом других.</b> Подпишись на Эпики
            разработчиков, на их профили.
          </li>
        </ul>
      </div>
    </Container>

    <Footer />
  </>
);

export default HomePage;
