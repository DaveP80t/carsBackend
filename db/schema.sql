DROP DATABASE IF EXISTS cars;
CREATE DATABASE cars;

\c cars;

DROP TABLE IF EXISTS public.cars;

CREATE TABLE public.cars (
	"name" text NULL,
	mpg float8 NULL,
	cylinders int8 NULL,
	displacement float8 NULL,
	horsepower float8 NULL,
	weight int8 NULL,
	acceleration float8 NULL,
	model_year int8 NULL,
	origin text NULL,
	id serial4 NOT NULL,
	preferences json NULL DEFAULT '{"isInterested": false, "color": null}'::json,
	CONSTRAINT cars_pkey PRIMARY KEY (id),
	CONSTRAINT unique_nameyear_constraint UNIQUE (name, model_year)
);

CREATE TABLE public.car_comments (
	id serial4 NOT NULL,
	car_id int8 NULL,
	"name" varchar(50) NOT NULL,
	"comment" varchar(255) NULL,
	CONSTRAINT car_comments_name_key UNIQUE (name),
	CONSTRAINT car_comments_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX unique_comment_non_null_idx ON public.car_comments USING btree (comment) WHERE (comment IS NOT NULL);


-- public.car_comments foreign keys

ALTER TABLE public.car_comments ADD CONSTRAINT car_comments_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id);