DROP DATABASE IF EXISTS cars;
CREATE DATABASE cars;

\c cars;

DROP TABLE IF EXISTS public.cars;

CREATE TABLE public.cars (
	"name" text NOT NULL,
	mpg float8 NULL,
	cylinders int8 NULL,
	displacement float8 NULL,
	horsepower float8 NULL,
	weight int8 NULL,
	acceleration float8 NULL,
	model_year int8 NULL,
	origin text NULL,
	id serial4 NOT NULL,
	preferences json NULL DEFAULT '{"imageURL": null, "color": null}'::json,
	CONSTRAINT cars_pkey PRIMARY KEY (id),
	CONSTRAINT unique_nameyear_constraint UNIQUE (name, model_year)
);

-- Table Triggers

create trigger cars_insert_trigger after
insert
    on
    public.cars for each row execute function insert_popularity_entry();

CREATE TABLE public.car_comments (
	id serial4 NOT NULL,
	car_id int8 NULL,
	"name" varchar(50) NOT NULL,
	"comment" varchar(255) NOT NULL,
	isinterested bool NOT NULL DEFAULT false,
	CONSTRAINT car_comments_name_cid_key UNIQUE (car_id, name),
	CONSTRAINT car_comments_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger update_popularity_count_trigger after
insert
    or
update
    on
    public.car_comments for each row execute function update_popularity_count();


-- public.car_comments foreign keys

ALTER TABLE public.car_comments ADD CONSTRAINT car_comments_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id) ON DELETE CASCADE;

CREATE TABLE public.popularity (
	car_id int4 NOT NULL,
	count int4 NULL DEFAULT 1,
	CONSTRAINT check_positive_value CHECK ((count >= 1)),
	CONSTRAINT popularity_pkey PRIMARY KEY (car_id)
);


-- public.popularity foreign keys

ALTER TABLE public.popularity ADD CONSTRAINT popularity_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id) ON DELETE CASCADE;