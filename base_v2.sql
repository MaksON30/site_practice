PGDMP                  
        {           test    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16436    test    DATABASE     x   CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE test;
                postgres    false            �            1259    16583    orders    TABLE     �  CREATE TABLE public.orders (
    id integer DEFAULT nextval('public.olders_id_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    product_type character varying(255) NOT NULL,
    product_id integer NOT NULL,
    image_front text,
    image_back text,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    address_plates_type character varying(255) NOT NULL,
    address_plates_type_id integer NOT NULL,
    phone character varying(255)
);
    DROP TABLE public.orders;
       public         heap    postgres    false                      0    16583    orders 
   TABLE DATA           �   COPY public.orders (id, user_id, product_type, product_id, image_front, image_back, quantity, price, address_plates_type, address_plates_type_id, phone) FROM stdin;
    public          postgres    false    228   �          �   x���M
�0�דS���M�+�s�ʥ4�t�B�AO���şx�77rR ���>�RJ��^QN�$�Pᧅ��lnm�2r�=*<q�WT<㲋�ri�)�
4� Je�4Rp@���Qk���urT�'a�Bm~u�'�d�Ѹ�h�^\��%�pA�x�#�.�9/���s��F�V�m�U�G�g�e������I����a�     