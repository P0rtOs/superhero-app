--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: superheroes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.superheroes (
    id integer NOT NULL,
    nickname character varying(100) NOT NULL,
    real_name character varying(100) NOT NULL,
    origin_description text NOT NULL,
    superpowers text[] NOT NULL,
    catch_phrase text NOT NULL,
    images text[] NOT NULL
);


ALTER TABLE public.superheroes OWNER TO postgres;

--
-- Name: superheroes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.superheroes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.superheroes_id_seq OWNER TO postgres;

--
-- Name: superheroes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.superheroes_id_seq OWNED BY public.superheroes.id;


--
-- Name: superheroes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.superheroes ALTER COLUMN id SET DEFAULT nextval('public.superheroes_id_seq'::regclass);


--
-- Data for Name: superheroes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.superheroes (id, nickname, real_name, origin_description, superpowers, catch_phrase, images) FROM stdin;
1	Spider-Man	Peter Parker	Bitten by a radioactive spider, gained spider-like abilities.	{"Wall-crawling, super strength, spider-sense, agility"}	With great power comes great responsibility.	{/uploads/image-1750075827825-896685984.png}
2	Batman	Bruce Wayne	Witnessed parents' murder, trained to fight crime with intellect and gadgets.	{"Peak human conditioning, genius-level intellect, martial arts expert"}	I am the night.	{/uploads/image-1750075890897-371721236.png}
3	Wonder Woman	Diana Prince	Amazonian princess with divine powers.	{"Super strength, flight, combat skill, lasso of truth"}	Truth and justice will prevail.	{/uploads/image-1750075978510-963940060.jpg}
4	Iron Man	Tony Stark	Genius billionaire created powered armor to save his life and fight evil.	{"Powered armor suit, genius intellect, expert engineer"}	I am Iron Man.	{/uploads/image-1750076059248-845914297.png}
5	Superman	Clark Kent	Alien from Krypton with incredible powers on Earth.	{"Super strength, flight, heat vision, invulnerability"}	Up, up, and away!	{/uploads/image-1750076122153-430275828.png}
6	Black Widow	Natasha Romanoff	Trained spy and assassin with exceptional combat skills.	{"Expert martial artist, espionage, tactical skills"}	At some point, we all have to choose.	{/uploads/image-1750076231677-364498844.png}
7	Flash	Barry Allen	Gained super speed after a lightning strike and chemicals accident.	{"Super speed, time travel, accelerated healing"}	Life doesnтАЩt give us purpose. We give life purpose.	{/uploads/image-1750076301896-878190616.png}
8	Thor	Thor Odinson	Asgardian god of thunder wielding Mjolnir.	{"Godly strength, control over lightning, flight"}	For Asgard!	{/uploads/image-1750076387788-286331410.png}
9	Captain America	Steve Rogers	Super soldier from WWII fighting for justice.	{"Enhanced strength, agility, tactical genius"}	I can do this all day.	{/uploads/image-1750076512298-581535368.jpg}
10	Green Lantern	Hal Jordan	Chosen by the power ring to be a member of the Green Lantern Corps.	{"Power ring creates constructs, flight, energy blasts"}	In brightest day, in blackest night...	{/uploads/image-1750076752559-291347693.jpg}
11	Hulk	Bruce Banner	After exposure to gamma radiation, scientist Bruce Banner transforms into the powerful Hulk when angry.	{"Super strength, regeneration, durability, anger-fueled power"}	Hulk smash!	{/uploads/image-1750076845269-901404169.png}
\.


--
-- Name: superheroes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.superheroes_id_seq', 11, true);


--
-- Name: superheroes superheroes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.superheroes
    ADD CONSTRAINT superheroes_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

