-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 08 2026 г., 05:57
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `russian_testing`
--

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `news_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `teacher_id`, `news_text`, `created_at`) VALUES
(1, 1, 'Идут технические работы', '2026-06-07 17:56:23');

-- --------------------------------------------------------

--
-- Структура таблицы `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `note_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `notes`
--

INSERT INTO `notes` (`id`, `user_id`, `title`, `note_text`, `created_at`) VALUES
(2, 2, 'тест', 'тестовые заметки', '2026-06-07 19:35:08'),
(3, 4, 'ударение', 'Ударение падает на окончание во всех формах: звони́т, звони́м, звони́шь, звоня́т, то же в приставочных глаголах: позвони́т, созвони́мся, перезвоня́т и т. д.', '2026-06-07 20:29:27');

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `guest_name` varchar(100) DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `question_text` text NOT NULL,
  `answer_text` text DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`id`, `user_id`, `guest_name`, `topic`, `question_text`, `answer_text`, `is_public`, `created_at`) VALUES
(1, 2, NULL, 'Другое', 'Тестовый вопрос', 'Ответ', 1, '2026-06-07 15:46:24'),
(2, 4, NULL, 'Другое', 'Как правильно: согласно приказа, договора, распоряжения или согласно приказу, договору, распоряжению?', NULL, 1, '2026-06-07 20:27:58');

-- --------------------------------------------------------

--
-- Структура таблицы `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `student_answer` text NOT NULL,
  `percent_result` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `mistakes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `guest_name` varchar(100) DEFAULT NULL,
  `guest_class` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `results`
--

INSERT INTO `results` (`id`, `test_id`, `student_id`, `student_answer`, `percent_result`, `grade`, `mistakes`, `created_at`, `guest_name`, `guest_class`) VALUES
(1, 3, 3, 'Наступила весна. На деревьях появились малодые листья. Рибята часто гуляют в парке и наблюдают за природой.', 0, 2, 'Ответ отличается от правильного варианта', '2026-06-07 13:11:47', NULL, NULL),
(2, 1, 3, 'На столе стоят молоко. Ребята вышли на улецу. В саду растут яблони.', 0, 2, 'Ответ отличается от правильного варианта', '2026-06-07 13:35:09', NULL, NULL),
(3, 3, 3, 'Наступила весна. На диревьях появились малодые листья. Ребята часто гуляют в пурке и наблюдают за преродой.', 75, 4, 'Ответ отличается от правильного варианта', '2026-06-07 13:43:45', NULL, NULL),
(4, 1, 2, 'На столе стоит молоко. Ребята вышли на улицу. В саду растут яблони.', 100, 5, 'Ошибок не найдено', '2026-06-07 14:28:02', NULL, NULL),
(5, 1, 4, 'На столе стоит молоко. Ребята вышли на улицу. В саду растут яблони.', 100, 5, 'Ошибок не найдено', '2026-06-07 20:40:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `tests`
--

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `instruction` text NOT NULL,
  `task_text` text NOT NULL,
  `correct_answer` text NOT NULL,
  `test_code` varchar(20) DEFAULT NULL,
  `qr_code` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tests`
--

INSERT INTO `tests` (`id`, `teacher_id`, `title`, `instruction`, `task_text`, `correct_answer`, `test_code`, `qr_code`, `created_at`) VALUES
(1, 1, 'Безударные гласные', 'Вставьте пропущенные буквы в словах.', 'На ст_ле сто_т м_л_ко. Р_бята вышл_ на ул_цу. В саду р_стут ябл_ни.', 'На столе стоит молоко. Ребята вышли на улицу. В саду растут яблони.', 'RUS585349', NULL, '2026-06-07 09:44:30'),
(2, 1, 'Парные согласные', 'Вставьте пропущенные буквы.', 'На лу_у пасётся ко_. Рядом стои_ высокий ду_. По тро_инке идёт гри_ник.', 'На лугу пасётся коза. Рядом стоит высокий дуб. По тропинке идёт грибник.', 'RUS461215', NULL, '2026-06-07 09:45:42'),
(3, 1, 'Проверяем безударные гласные', 'Вставьте пропущенные буквы в словах.', 'Наступ_ла в_сна. На д_ревьях появились м_лодые лист_я. Р_бята часто гуляют в п_рке и наблюдают за пр_родой.', 'Наступила весна. На деревьях появились молодые листья. Ребята часто гуляют в парке и наблюдают за природой.', 'RUS705651', NULL, '2026-06-07 10:55:44');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher','student') DEFAULT 'student',
  `class_name` varchar(20) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `class_name`, `avatar`, `created_at`) VALUES
(1, 'Марина', 'Ивановна', 'teacher@test.ee', '123456', 'teacher', NULL, NULL, '2026-06-07 08:12:30'),
(2, 'Анна', 'Сидорова', 'anna@test.ee', '123456', 'student', '8А', NULL, '2026-06-07 08:19:57'),
(3, 'Иван', 'Ретров', 'ivan@test.ee', '123456', 'student', '10А', NULL, '2026-06-07 08:28:17'),
(4, 'Михаил', 'Шпак', 'mihail@test.ee', '123456', 'student', '12C', NULL, '2026-06-07 20:25:05');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Индексы таблицы `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_id` (`test_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `test_code` (`test_code`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
