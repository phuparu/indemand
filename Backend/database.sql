CREATE SCHEMA public;
CREATE TABLE "user" (
	user_id uuid DEFAULT gen_random_uuid() NOT NULL,
	username varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	firstname varchar NULL,
	lastname varchar NULL,
	gender varchar NULL,
	birthdate date NULL,
	image varchar NULL,
	CONSTRAINT user_check CHECK (
		(
			(gender)::text = ANY (
				ARRAY [('male'::character varying)::text, ('female'::character varying)::text, ('other'::character varying)::text]
			)
		)
	),
	CONSTRAINT user_pk PRIMARY KEY (user_id),
	CONSTRAINT user_unique UNIQUE (username),
	CONSTRAINT user_unique_1 UNIQUE (email),
	CONSTRAINT user_unique_2 UNIQUE (password)
);
CREATE TABLE "admin" (
	user_id uuid NOT NULL,
	CONSTRAINT admin_pk PRIMARY KEY (user_id),
	CONSTRAINT admin_user_fk FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);
CREATE TABLE student (
	user_id uuid NOT NULL,
	school varchar NULL,
	grade_level varchar NULL,
	CONSTRAINT student_pk PRIMARY KEY (user_id),
	CONSTRAINT student_user_fk FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);
CREATE TABLE tutor (
	user_id uuid NOT NULL,
	biography text NULL,
	CONSTRAINT teacher_pk PRIMARY KEY (user_id),
	CONSTRAINT teacher_user_fk FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);
CREATE TABLE course (
	course_id varchar NOT NULL,
	"name" varchar NOT NULL,
	description text NULL,
	tutor_id uuid NULL,
	CONSTRAINT course_pk PRIMARY KEY (course_id),
	CONSTRAINT course_tutor_fk FOREIGN KEY (tutor_id) REFERENCES tutor(user_id)
);
CREATE TABLE "session" (
	session_id uuid DEFAULT gen_random_uuid() NOT NULL,
	course_id varchar NOT NULL,
	timerange tsrange NOT NULL,
	status varchar NOT NULL,
	feedback text NULL,
	CONSTRAINT session_pk PRIMARY KEY (session_id),
	CONSTRAINT session_course_fk FOREIGN KEY (course_id) REFERENCES course(course_id)
);
CREATE TABLE booking (
	booking_id uuid NOT NULL,
	student_id uuid NOT NULL,
	session_id uuid NOT NULL,
	CONSTRAINT booking_pk PRIMARY KEY (booking_id),
	CONSTRAINT booking_session_fk FOREIGN KEY (session_id) REFERENCES "session"(session_id),
	CONSTRAINT booking_student_fk FOREIGN KEY (student_id) REFERENCES student(user_id)
);