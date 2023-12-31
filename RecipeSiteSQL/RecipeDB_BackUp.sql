PGDMP                         {        
   RecipeSite    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16498 
   RecipeSite    DATABASE     �   CREATE DATABASE "RecipeSite" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "RecipeSite";
                postgres    false            �            1259    16500    authors    TABLE     j   CREATE TABLE public.authors (
    author_id integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.authors;
       public         heap    postgres    false            �            1259    16499    authors_author_id_seq    SEQUENCE     �   CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.authors_author_id_seq;
       public          postgres    false    215                       0    0    authors_author_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;
          public          postgres    false    214            �            1259    16522    ingredients    TABLE     �   CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    name character varying(100) NOT NULL,
    quantity character varying(100) NOT NULL,
    recipe_id integer
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false            �            1259    16521    ingredients_ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.ingredients_ingredient_id_seq;
       public          postgres    false    219                       0    0    ingredients_ingredient_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;
          public          postgres    false    218            �            1259    16507    recipes    TABLE     �   CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    title character varying(100) NOT NULL,
    instructions text NOT NULL,
    author_id integer,
    published_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    16506    recipes_recipe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.recipes_recipe_id_seq;
       public          postgres    false    217                       0    0    recipes_recipe_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;
          public          postgres    false    216            o           2604    16503    authors author_id    DEFAULT     v   ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);
 @   ALTER TABLE public.authors ALTER COLUMN author_id DROP DEFAULT;
       public          postgres    false    214    215    215            r           2604    16525    ingredients ingredient_id    DEFAULT     �   ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);
 H   ALTER TABLE public.ingredients ALTER COLUMN ingredient_id DROP DEFAULT;
       public          postgres    false    218    219    219            p           2604    16510    recipes recipe_id    DEFAULT     v   ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);
 @   ALTER TABLE public.recipes ALTER COLUMN recipe_id DROP DEFAULT;
       public          postgres    false    216    217    217            
          0    16500    authors 
   TABLE DATA           2   COPY public.authors (author_id, name) FROM stdin;
    public          postgres    false    215   k                 0    16522    ingredients 
   TABLE DATA           O   COPY public.ingredients (ingredient_id, name, quantity, recipe_id) FROM stdin;
    public          postgres    false    219                    0    16507    recipes 
   TABLE DATA           \   COPY public.recipes (recipe_id, title, instructions, author_id, published_date) FROM stdin;
    public          postgres    false    217   �                   0    0    authors_author_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.authors_author_id_seq', 10, true);
          public          postgres    false    214                       0    0    ingredients_ingredient_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 33, true);
          public          postgres    false    218                       0    0    recipes_recipe_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 10, true);
          public          postgres    false    216            t           2606    16505    authors authors_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public            postgres    false    215            x           2606    16527    ingredients ingredients_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    219            v           2606    16515    recipes recipes_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    217            z           2606    16528 &   ingredients ingredients_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);
 P   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_recipe_id_fkey;
       public          postgres    false    3190    217    219            y           2606    16516    recipes recipes_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id);
 H   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_author_id_fkey;
       public          postgres    false    215    217    3188            
   �   x���
�@E��W��������ݤ6t����ҿwpw�í�[��`���?��
�&�v����΢{�0҄k�JϪ���-⦔����|8���"���QI�p�T�$MX͡	��.����!�M�+         �  x�m�Mn�0���)t��%'�����tQ�h;����PY4$y�}�$��?I��{���Vw��(��(�B���#f�8w�xq[��;L�V��#�I�%<���$��9[�O�gi���j`�1r��Tk��A�Ja*�����B��rΞ
6�uޓ��B�s"si{\Hh})��+��A4�,�����^?�9�_~7c���>�O�	X��;F0?�;j�J�U�kq�u/D�R��c�4���M����������8�GZ���:�A����]�=�����O�����@�>AS��?a?P��K$��+x���/te9�þ��\���p3b�f	�ת�$�$tHߌ��ZO�o̻?�R��m�K�/:�װ��]�1���PJ��~�u         �  x�}�ώ�0��ӧ�`�����[��a�-BH\��ı���vZ�O�8a��-����o&s(�뫂�:��!tg�X;��O�����9�L.�՝�Qfr�0�b#72_�$*D��L;*��J9�\�������7�:�Ƈ���Ny�HET��3i���xh�f��M�кK{����Ö�ƯԶ���_Ի�e��U�js,
;n�_/����)R�m��*4�Y�p׸ҵ*�XO�� c�*C6�?�o�  ��,�3��|Me�ώ-2ɔG�P��T�g���a,�+�bM�Ń*]��.��,���7)3�Ӑ�p���=���
�049��j���o�;��ь�t�м�]�sx�b�����F1��C�,��bl��=�`x��0� n� ��?�A1��a3U{���G�2�u�o�j�{>r}��]��)!8@�� ��p}'�)]�ҫ[�қ�vB$U�?�M��l�� �     